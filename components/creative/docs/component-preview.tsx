'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePreviewStore } from '@/hooks/use-preview-store';
import { Settings2, Monitor, Tablet, Smartphone, Copy, Check, ExternalLink, Sliders, Terminal, FolderGit, RefreshCw, Download, Code2, FileCode, Wand2, Palette, Database, Sparkles, X, Layers, Activity, Building2, ShoppingCart, Coins, Eye, CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PropsTable, PropDef } from '@/components/docs/props-table';
import { PlaygroundContext } from './playground-context';
import { getVanillaCodeBundle, downloadFile } from '@/lib/vanilla-snippets';
import { DatasetType, StylePresetType, MOCK_DATASETS, STYLE_PRESETS, COLOR_ACCENTS } from '@/lib/mock-datasets';

export interface PlaygroundControl {
  name: string;
  label: string;
  type: 'select' | 'number' | 'boolean' | 'string' | 'color';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  default: any;
}

export interface ComponentVariant {
  name: string;
  code: string;
  params?: Record<string, any>;
}

interface ComponentPreviewProps {
  name: string;
  code?: string;
  children?: React.ReactNode;
  variants?: ComponentVariant[];
  controls?: Array<'speed' | 'duration' | 'scale' | 'color'>;
  previewLink?: string;
  /** Full source code of the component for direct copy-paste */
  sourceCode?: string;
  /** File path label shown above the source code */
  sourceFile?: string;
  
  // Advanced features
  slug?: string;
  dependencies?: string[];
  componentName?: string;
  playgroundControls?: PlaygroundControl[];
  propsData?: PropDef[];
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile' | 'custom';

const VIEWPORT_WIDTHS: Record<Exclude<ViewportMode, 'custom' | 'desktop'>, number> = {
  tablet: 768,
  mobile: 375,
};

// Client-side lightweight TSX syntax highlighter
function HighlightedCode({ code }: { code: string }) {
  const highlight = (txt: string) => {
    let processed = txt;
    
    // 1. Extract strings to protect them from keyword/tag matching
    const strings: string[] = [];
    processed = processed.replace(/(["'`])(.*?)\1/g, (match) => {
      strings.push(match);
      return `___STRING_PLACEHOLDER_${strings.length - 1}___`;
    });

    // 2. Mark keywords
    const keywords = ['import', 'export', 'default', 'function', 'return', 'const', 'let', 'var', 'from', 'as', 'className'];
    keywords.forEach(kw => {
      const reg = new RegExp(`\\b${kw}\\b`, 'g');
      processed = processed.replace(reg, `___KEYWORD_START___${kw}___KEYWORD_END___`);
    });

    // 3. Mark tags (both custom components and standard HTML elements)
    processed = processed.replace(/(<\/?[a-zA-Z][a-zA-Z0-9]*|\/?>)/g, `___TAG_START___$1___TAG_END___`);
    
    // 4. Mark props
    processed = processed.replace(/\b([a-z][a-zA-Z0-9]*)=/g, `___PROP_START___$1___PROP_END___=`);

    // 5. Escape HTML characters safely
    processed = processed
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 6. Replace markers with actual styled HTML spans
    processed = processed.replace(/___KEYWORD_START___(.*?)___KEYWORD_END___/g, '<span class="text-violet-400 font-semibold">$1</span>');
    processed = processed.replace(/___TAG_START___(.*?)___TAG_END___/g, '<span class="text-indigo-400 font-semibold">$1</span>');
    processed = processed.replace(/___PROP_START___(.*?)___PROP_END___/g, '<span class="text-sky-400">$1</span>');

    // 7. Restore and escape strings
    processed = processed.replace(/___STRING_PLACEHOLDER_(\d+)___/g, (match, p1) => {
      const originalStr = strings[parseInt(p1)];
      const escapedStr = originalStr
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<span class="text-amber-300">${escapedStr}</span>`;
    });

    return processed;
  };

  return (
    <pre className="font-mono text-xs md:text-sm text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre">
      <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
    </pre>
  );
}

function updateCodeProps(
  baseCode: string, 
  componentName: string, 
  params: Record<string, any>, 
  defaults: Record<string, any>,
  studioProps?: { stylePreset?: string; dataset?: string; accentColor?: string }
) {
  const targetTag = componentName || (baseCode.match(/<([A-Z][a-zA-Z0-9]*)/)?.[1] ?? '');
  if (!targetTag) return baseCode;

  const regex = new RegExp(`<(${targetTag})([^>]*?)(\\/?>)`, 'g');
  return baseCode.replace(regex, (match, tag, existingProps, closing) => {
    const propsMap = new Map<string, string>();

    // Parse existing props if any
    const propRegex = /([a-zA-Z0-9_-]+)(?:=(?:{([^}]+)}|"([^"]*)"))?/g;
    let pMatch;
    while ((pMatch = propRegex.exec(existingProps)) !== null) {
      if (pMatch[1] && pMatch[1] !== tag) {
        const val = pMatch[2] ? `{${pMatch[2]}}` : pMatch[3] !== undefined ? `"${pMatch[3]}"` : '';
        propsMap.set(pMatch[1], val);
      }
    }

    // Update with studio visual style props
    if (studioProps?.stylePreset && studioProps.stylePreset !== 'glass') {
      propsMap.set('variant', `"${studioProps.stylePreset}"`);
    } else if (studioProps?.stylePreset === 'glass') {
      propsMap.delete('variant');
    }

    // Update with studio dataset props
    if (studioProps?.dataset && studioProps.dataset !== 'saas') {
      propsMap.set('dataset', `"${studioProps.dataset}"`);
    } else if (studioProps?.dataset === 'saas') {
      propsMap.delete('dataset');
    }

    // Update with studio accent color
    if (studioProps?.accentColor && studioProps.accentColor !== '#6366f1') {
      propsMap.set('accentColor', `"${studioProps.accentColor}"`);
    } else if (studioProps?.accentColor === '#6366f1') {
      propsMap.delete('accentColor');
    }

    // Update with parameter overrides
    Object.entries(params).forEach(([key, val]) => {
      if (val === undefined || val === null || val === defaults[key]) {
        propsMap.delete(key);
        return;
      }
      if (typeof val === 'string') {
        propsMap.set(key, `"${val}"`);
      } else if (typeof val === 'boolean') {
        propsMap.set(key, val ? '' : '{false}');
      } else {
        propsMap.set(key, `{${val}}`);
      }
    });

    const renderedProps = Array.from(propsMap.entries())
      .map(([k, v]) => v ? `${k}=${v}` : k)
      .join(' ');

    const propsStr = renderedProps.length > 0 ? ' ' + renderedProps : '';
    return `<${tag}${propsStr}${closing.startsWith('/') ? ' /' : ''}>`;
  });
}

export function ComponentPreview({ 
  name, 
  code, 
  children, 
  variants, 
  controls = [], 
  previewLink, 
  sourceCode, 
  sourceFile,
  slug,
  dependencies = [],
  componentName,
  playgroundControls = [],
  propsData
}: ComponentPreviewProps) {
  const { isPlaying, setIsPlaying, retrigger, theme, setTheme, speed, duration, scale: controlScale, color, setActiveVariant } = usePreviewStore();
  const [showControls, setShowControls] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);
  const [showStudio, setShowStudio] = useState(false);
  const [studioTab, setStudioTab] = useState<'styles' | 'data' | 'props'>('styles');
  const [stylePreset, setStylePreset] = useState<StylePresetType>('glass');
  const [dataset, setDataset] = useState<DatasetType>('saas');
  const [accentColor, setAccentColor] = useState<string>('#6366f1');
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [customWidth, setCustomWidth] = useState<number>(800);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedSource, setCopiedSource] = useState(false);
  const [copiedCLI, setCopiedCLI] = useState(false);
  const [copiedVanilla, setCopiedVanilla] = useState(false);
  const [downloadedHtml, setDownloadedHtml] = useState(false);
  const [downloadedTsx, setDownloadedTsx] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'vanilla' | 'install'>('preview');
  const [vanillaSubTab, setVanillaSubTab] = useState<'standalone' | 'html' | 'css' | 'js'>('standalone');
  const [refreshKey, setRefreshKey] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Initialize playground parameters state
  const [params, setParams] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    playgroundControls.forEach((c) => {
      initial[c.name] = c.default;
    });
    return initial;
  });

  // Sync parameters state if playgroundControls changes
  useEffect(() => {
    if (playgroundControls.length > 0) {
      const initial: Record<string, any> = {};
      playgroundControls.forEach((c) => {
        initial[c.name] = c.default;
      });
      setParams(initial);
    }
  }, [playgroundControls]);

  // Synchronize variant selection parameter overrides
  useEffect(() => {
    if (variants && variants[activeVariantIdx]?.params) {
      setParams(prev => ({
        ...prev,
        ...variants[activeVariantIdx].params
      }));
    }
  }, [activeVariantIdx, variants]);

  const hasControls = controls.length > 0;
  const hasPlayground = playgroundControls.length > 0 || (variants && variants.length > 0);
  const activeCode = variants && variants.length > 0 ? variants[activeVariantIdx].code : code;
  const childrenArray = React.Children.toArray(children);

  const isResponsiveMode = viewport !== 'desktop';
  const targetWidth = viewport === 'custom' 
    ? customWidth 
    : viewport === 'desktop' 
      ? 0 
      : VIEWPORT_WIDTHS[viewport];

  // Measure the outer container width
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Compute the CSS zoom factor
  const zoomFactor = (() => {
    if (!isResponsiveMode || containerWidth === 0 || targetWidth === 0) return 1;
    if (targetWidth <= containerWidth) return 1;
    return containerWidth / targetWidth;
  })();

  // Clone element recursively to inject playground state props
  const injectPlaygroundProps = (element: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(element)) return element;

    const elementProps = (element.props as any) || {};
    const isDOMElement = typeof element.type === 'string';
    const propsToInject: any = isDOMElement ? {} : { ...params };

    if (!isDOMElement) {
      if (controls.includes('speed')) {
        propsToInject.speed = speed;
      }
      if (controls.includes('duration')) {
        propsToInject.duration = duration;
      }
      if (controls.includes('scale')) {
        propsToInject.scale = controlScale;
      }
      if (controls.includes('color')) {
        propsToInject.color = color;
        propsToInject.accentColor = color;
      }
    }

    if (controls.includes('color')) {
      propsToInject.style = { ...elementProps.style, '--accent-color': color };
    }

    if (elementProps.children) {
      const childrenWithProps = React.Children.map(elementProps.children, child => 
        injectPlaygroundProps(child)
      );
      return React.cloneElement(element, propsToInject, childrenWithProps);
    }

    return React.cloneElement(element, propsToInject);
  };
  
  const activeComponent = (() => {
    if (variants && variants.length > 0) {
      if (childrenArray.length > activeVariantIdx) {
        return injectPlaygroundProps(childrenArray[activeVariantIdx]);
      }
      if (childrenArray.length > 0) {
        return injectPlaygroundProps(childrenArray[0]);
      }
    }
    return injectPlaygroundProps(children);
  })();

  // Drag-to-resize handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(e.clientX - center);
      const newWidth = distance * 2;
      setCustomWidth(Math.max(320, Math.min(newWidth, 1440)));
      if (viewport !== 'custom') setViewport('custom');
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, viewport]);

  useEffect(() => {
    if (variants && variants.length > 0) {
      setActiveVariant(variants[0].name);
    }
  }, [variants, setActiveVariant]);

  // Construct dynamic copy JSX code
  const defaultsMap: Record<string, any> = {};
  playgroundControls.forEach(c => {
    defaultsMap[c.name] = c.default;
  });
  const dynamicJSXCode = activeCode 
    ? updateCodeProps(activeCode, componentName || '', params, defaultsMap, { stylePreset, dataset, accentColor })
    : '';

  const handleCopy = () => {
    if (!dynamicJSXCode) return;
    navigator.clipboard.writeText(dynamicJSXCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySource = () => {
    if (!sourceCode) return;
    navigator.clipboard.writeText(sourceCode);
    setCopiedSource(true);
    setTimeout(() => setCopiedSource(false), 2000);
  };

  const handleCopyCLI = () => {
    const cliCommand = `npx kinetic-ui-cli@latest add ${slug || 'component'}`;
    navigator.clipboard.writeText(cliCommand);
    setCopiedCLI(true);
    setTimeout(() => setCopiedCLI(false), 2000);
  };

  const vanilla = getVanillaCodeBundle(slug || 'component', name, sourceCode, dynamicJSXCode, {
    stylePreset,
    dataset,
    accentColor,
  });

  const handleDownloadHtml = () => {
    downloadFile(`${slug || 'component'}.html`, vanilla.standaloneHtml, 'text/html;charset=utf-8');
    setDownloadedHtml(true);
    setTimeout(() => setDownloadedHtml(false), 2000);
  };

  const handleDownloadTsx = () => {
    const codeToDownload = sourceCode || dynamicJSXCode || '// Kinetic UI Component';
    downloadFile(`${slug || 'component'}.tsx`, codeToDownload, 'text/typescript;charset=utf-8');
    setDownloadedTsx(true);
    setTimeout(() => setDownloadedTsx(false), 2000);
  };

  const handleCopyVanilla = () => {
    let contentToCopy = vanilla.standaloneHtml;
    if (vanillaSubTab === 'html') contentToCopy = vanilla.html;
    if (vanillaSubTab === 'css') contentToCopy = vanilla.css;
    if (vanillaSubTab === 'js') contentToCopy = vanilla.js;
    
    navigator.clipboard.writeText(contentToCopy);
    setCopiedVanilla(true);
    setTimeout(() => setCopiedVanilla(false), 2000);
  };

  const handleParamChange = (name: string, value: any) => {
    setParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="relative my-8 flex flex-col space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-3">
          <div className="text-xl font-medium tracking-tight text-white">{name}</div>
          {variants && variants.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {variants.map((v, i) => (
                <button
                  key={v.name}
                  onClick={() => {
                    setActiveVariantIdx(i);
                    setActiveVariant(v.name);
                    if (v.params) setParams(prev => ({ ...prev, ...v.params }));
                  }}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                    activeVariantIdx === i 
                      ? "bg-foreground text-background" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  {v.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-muted/30 p-1.5 rounded-full border border-border/50">
          {/* Viewport Toggles */}
          <div className="flex items-center pr-2 border-r border-border/30">
            <button 
              onClick={() => setViewport('desktop')} 
              className={cn("p-1.5 rounded-full transition-colors", viewport === 'desktop' ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
              title="Desktop"
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button 
              onClick={() => setViewport('tablet')} 
              className={cn("p-1.5 rounded-full transition-colors", viewport === 'tablet' ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
              title="Tablet (768px)"
            >
              <Tablet className="h-3.5 w-3.5" />
            </button>
            <button 
              onClick={() => setViewport('mobile')} 
              className={cn("p-1.5 rounded-full transition-colors", viewport === 'mobile' ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
              title="Mobile (375px)"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Interactive Studio Toggle */}
          <button 
            onClick={() => {
              if (showStudio && studioTab === 'styles') {
                setShowStudio(false);
              } else {
                setShowStudio(true);
                setStudioTab('styles');
              }
            }}
            className={cn(
              "p-1.5 rounded-full transition-all flex items-center gap-1.5 px-3 text-xs font-semibold border cursor-pointer", 
              showStudio && studioTab !== 'props'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/25 ring-1 ring-white/20' 
                : 'hover:bg-muted text-zinc-300 border-white/10 hover:text-white'
            )}
            title="Interactive Studio - Live Styles & Data Customizer"
          >
            <Sparkles className={cn("h-3.5 w-3.5", showStudio && studioTab !== 'props' ? "text-amber-300" : "text-indigo-400")} />
            <span>Studio</span>
            {(stylePreset !== 'glass' || dataset !== 'saas') && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            )}
          </button>

          {/* Interactive Playground Toggle */}
          {hasPlayground && (
            <button 
              onClick={() => {
                if (showStudio && studioTab === 'props') {
                  setShowStudio(false);
                } else {
                  setShowStudio(true);
                  setStudioTab('props');
                }
              }}
              className={cn(
                "p-1.5 rounded-full transition-colors flex items-center gap-1.5 px-3 text-xs font-semibold border border-white/5 cursor-pointer", 
                showStudio && studioTab === 'props'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
                  : 'hover:bg-muted text-zinc-400 hover:text-white'
              )}
              title="Toggle Live Parameters"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Playground</span>
            </button>
          )}

          {/* Responsive Width indicators */}
          {isResponsiveMode && (
            <span className="text-[10px] font-mono text-muted-foreground tabular-nums px-1">
              {targetWidth}px {zoomFactor < 1 && `(${Math.round(zoomFactor * 100)}%)`}
            </span>
          )}

          {/* Legacy Settings */}
          {hasControls && (
            <button 
              onClick={() => setShowControls(!showControls)}
              className={cn("p-1.5 rounded-full transition-colors", showControls ? 'bg-foreground text-background' : 'hover:bg-muted text-muted-foreground')}
            >
              <Settings2 className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Direct Download HTML in toolbar */}
          <button 
            onClick={handleDownloadHtml}
            className="p-1.5 rounded-full hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-400 transition-colors"
            title="Download Standalone Single-File HTML"
          >
            {downloadedHtml ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Download className="h-3.5 w-3.5" />}
          </button>

          {/* Reload Animation */}
          <button 
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Reload Animation"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>

          {/* External Link */}
          {(previewLink || slug) && (
            <a 
              href={previewLink || `/preview/${slug}`} 
              target="_blank" 
              rel="noreferrer"
              title="Open in Full Window"
              className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="relative w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <TabsList className="flex flex-wrap sm:inline-flex items-center w-full sm:w-auto bg-zinc-900/90 p-1.5 border border-border/50 rounded-xl gap-1.5">
                <TabsTrigger 
                  value="preview" 
                  className="text-xs px-3.5 py-2 data-[state=active]:px-5 transition-all"
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger 
                  value="code" 
                  className="text-xs px-3.5 py-2 data-[state=active]:px-5 transition-all"
                >
                  React (TSX)
                </TabsTrigger>
                <TabsTrigger 
                  value="vanilla" 
                  className="text-xs flex items-center justify-center gap-1.5 px-4 py-2 data-[state=active]:px-7 transition-all"
                >
                  <span>HTML / CSS / JS</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-semibold px-1.5 py-0.5 rounded">Pure</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="install" 
                  className="text-xs px-4 py-2 data-[state=active]:px-7 transition-all"
                >
                  Install & Download
                </TabsTrigger>
              </TabsList>

              {/* Direct Quick Download Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={handleDownloadHtml}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium transition-all shadow-sm cursor-pointer"
                  title="Download self-contained single HTML file (Zero build setup)"
                >
                  {downloadedHtml ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                  <span>Download .html</span>
                </button>
                {sourceCode && (
                  <button
                    onClick={handleDownloadTsx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-medium transition-all shadow-sm cursor-pointer"
                    title="Download React TypeScript file"
                  >
                    {downloadedTsx ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                    <span>Download .tsx</span>
                  </button>
                )}
              </div>
            </div>
            
            <TabsContent 
              value="preview" 
              className="relative outline-none"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className={cn("col-span-1 transition-all duration-300 rounded-xl border border-border/50 bg-[#050505] relative", showStudio ? 'lg:col-span-8' : 'lg:col-span-12')}>
                  {/* Dot grid background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,128,128,0.15)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none z-0 rounded-xl overflow-hidden" />
                  
                  {/* Viewport container */}
                  <div ref={containerRef} className="relative w-full group">
                    <div 
                      className={cn(
                        "relative transition-all duration-500 ease-out",
                        isResponsiveMode && "mx-auto"
                      )}
                      style={{
                        width: isResponsiveMode ? `${targetWidth}px` : '100%',
                        maxWidth: isResponsiveMode ? `${targetWidth}px` : '100%',
                        zoom: zoomFactor,
                      }}
                    >
                      {isResponsiveMode && (
                        <div 
                          className="absolute inset-0 border-x border-dashed pointer-events-none z-20"
                          style={{ borderColor: 'rgba(99, 102, 241, 0.2)' }} 
                        />
                      )}

                      <div key={refreshKey} className={cn(
                        "p-6",
                        !isResponsiveMode && "md:p-8"
                      )}>
                        <PlaygroundContext.Provider value={{
                          ...params,
                          stylePreset,
                          dataset,
                          accentColor,
                          datasetData: MOCK_DATASETS[dataset],
                        }}>
                          <div 
                            className={cn(
                              "w-full transition-all duration-300 rounded-xl",
                              stylePreset === 'neon' && "p-4 sm:p-6 rounded-2xl bg-[#080811] ring-1 ring-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.2)]",
                              stylePreset === 'glass' && "p-2 rounded-xl backdrop-blur-md bg-white/[0.015] border border-white/5",
                              stylePreset === 'flat' && "p-2 rounded-xl bg-zinc-900/60 border border-zinc-800",
                              stylePreset === 'borderless' && "p-0 bg-transparent border-0 shadow-none"
                            )}
                            style={{ '--accent-color': accentColor } as React.CSSProperties}
                          >
                            {activeComponent}
                          </div>
                        </PlaygroundContext.Provider>
                      </div>

                      {/* Drag handle */}
                      <div 
                        onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }}
                        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-muted border border-border rounded shadow-sm flex items-center justify-center cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity z-50"
                      >
                        <div className="w-1 h-4 border-x border-muted-foreground/30" />
                      </div>
                    </div>
                  </div>
                </div>

                {showStudio && (
                  <div className="col-span-1 lg:col-span-4">
                    <InteractiveStudioPanel 
                      activeTab={studioTab}
                      setActiveTab={setStudioTab}
                      stylePreset={stylePreset}
                      setStylePreset={setStylePreset}
                      dataset={dataset}
                      setDataset={setDataset}
                      accentColor={accentColor}
                      setAccentColor={setAccentColor}
                      controls={playgroundControls} 
                      values={params} 
                      onChange={handleParamChange} 
                      variants={variants}
                      activeVariantIdx={activeVariantIdx}
                      onVariantChange={(idx) => {
                        setActiveVariantIdx(idx);
                        setActiveVariant(variants![idx].name);
                      }}
                      onCopyJSX={handleCopy}
                      copiedJSX={copied}
                      onClose={() => setShowStudio(false)}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="code" className="relative outline-none space-y-8">
              <div className="relative">
                <button 
                  onClick={handleCopy}
                  className="absolute top-4 right-4 z-20 p-2 bg-background/50 backdrop-blur border border-border rounded-md text-muted-foreground hover:text-white transition-colors"
                  title="Copy JSX"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
                <div className="rounded-xl border border-border bg-[#121212] p-6 pt-12 overflow-x-auto">
                  <HighlightedCode code={dynamicJSXCode} />
                </div>
              </div>

              {propsData && propsData.length > 0 && (
                <div className="pt-4">
                  <h3 className="text-xl font-bold tracking-tight text-white mb-2">Props Reference</h3>
                  <p className="text-zinc-400 text-sm mb-4 font-light">Customize component behavior using these configuration options:</p>
                  <PropsTable data={propsData} />
                </div>
              )}
            </TabsContent>

            <TabsContent value="vanilla" className="relative outline-none space-y-6 px-1 sm:px-3">
              <div className="flex flex-col space-y-4">
                {/* Sub-navigation for Vanilla: Standalone HTML / HTML / CSS / JS */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-xl bg-zinc-950/60 border border-border/50">
                  <div className="flex flex-wrap items-center gap-1.5 bg-zinc-900/80 p-1 rounded-lg border border-white/5">
                    <button
                      onClick={() => setVanillaSubTab('standalone')}
                      className={cn(
                        "px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer",
                        vanillaSubTab === 'standalone' 
                          ? "bg-indigo-600 text-white shadow-sm px-5" 
                          : "text-zinc-400 hover:text-white"
                      )}
                    >
                      Standalone .html (Ready to Run)
                    </button>
                    <button
                      onClick={() => setVanillaSubTab('html')}
                      className={cn(
                        "px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer",
                        vanillaSubTab === 'html' 
                          ? "bg-indigo-600 text-white shadow-sm px-5" 
                          : "text-zinc-400 hover:text-white"
                      )}
                    >
                      HTML
                    </button>
                    <button
                      onClick={() => setVanillaSubTab('css')}
                      className={cn(
                        "px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer",
                        vanillaSubTab === 'css' 
                          ? "bg-indigo-600 text-white shadow-sm px-5" 
                          : "text-zinc-400 hover:text-white"
                      )}
                    >
                      CSS
                    </button>
                    <button
                      onClick={() => setVanillaSubTab('js')}
                      className={cn(
                        "px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer",
                        vanillaSubTab === 'js' 
                          ? "bg-indigo-600 text-white shadow-sm px-5" 
                          : "text-zinc-400 hover:text-white"
                      )}
                    >
                      JavaScript
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyVanilla}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-zinc-200 hover:text-white transition-colors cursor-pointer"
                      title="Copy Code"
                    >
                      {copiedVanilla ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedVanilla ? "Copied!" : "Copy Snippet"}</span>
                    </button>

                    <button
                      onClick={handleDownloadHtml}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors shadow-sm cursor-pointer"
                      title="Download full standalone HTML file"
                    >
                      {downloadedHtml ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                      <span>Download .html</span>
                    </button>
                  </div>
                </div>

                {/* Code Display */}
                <div className="relative rounded-xl border border-border bg-[#121212] p-6 max-h-[550px] overflow-auto">
                  <HighlightedCode 
                    code={
                      vanillaSubTab === 'standalone' ? vanilla.standaloneHtml :
                      vanillaSubTab === 'html' ? vanilla.html :
                      vanillaSubTab === 'css' ? vanilla.css :
                      vanilla.js
                    } 
                  />
                </div>

                {/* Quick Integration Guide */}
                <div className="p-5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                    <FileCode className="w-4 h-4" />
                    <span>Quick Integration Guide (Zero-Build Setup)</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    <strong className="text-white">Option 1 (Instant Single File):</strong> Click <strong className="text-emerald-400">"Download .html"</strong> above. You'll get a self-contained HTML file with Tailwind CSS and fonts already embedded. You can double click it to open locally or embed it into Webflow, WordPress, Shopify, or any HTML project!
                  </p>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    <strong className="text-white">Option 2 (Direct Copy-Paste):</strong> Copy the HTML, CSS, and JS tabs directly into your existing project files. If using Tailwind classes, ensure you include Tailwind CDN (<code className="text-indigo-300 font-mono">&lt;script src="https://cdn.tailwindcss.com"&gt;&lt;/script&gt;</code>) in your document &lt;head&gt;.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="install" className="relative outline-none space-y-6 px-1 sm:px-3">
              {/* Single File Download section */}
              <div className="p-6 rounded-xl border border-border bg-zinc-950/45 space-y-4">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Single Downloadable File</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Standalone HTML Download Card */}
                  <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50 transition-colors flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-sm font-semibold text-white">Standalone HTML (.html)</h4>
                      </div>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        Self-contained HTML with embedded styles & JS. Zero npm, no build step. Open directly in any browser!
                      </p>
                    </div>
                    <button
                      onClick={handleDownloadHtml}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xs transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                      {downloadedHtml ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                      <span>{downloadedHtml ? "Downloaded!" : `Download ${slug || 'component'}.html`}</span>
                    </button>
                  </div>

                  {/* React Component Download Card */}
                  <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500/50 transition-colors flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-indigo-400" />
                        <h4 className="text-sm font-semibold text-white">React TypeScript (.tsx)</h4>
                      </div>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        Single TSX component file with TypeScript types. Drop directly into your project's components directory.
                      </p>
                    </div>
                    <button
                      onClick={handleDownloadTsx}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-indigo-500/20 cursor-pointer"
                    >
                      {downloadedTsx ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                      <span>{downloadedTsx ? "Downloaded!" : `Download ${slug || 'component'}.tsx`}</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* CLI command card */}
              <div className="p-6 rounded-xl border border-border bg-zinc-950/45 space-y-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Install via CLI</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-black/60 px-4 py-3">
                  <code className="font-mono text-xs text-zinc-300">
                    <span className="text-indigo-400">npx</span> kinetic-ui-cli@latest add {slug || 'component'}
                  </code>
                  <button
                    onClick={handleCopyCLI}
                    className="p-1.5 hover:bg-white/5 border border-transparent hover:border-white/10 rounded-md text-muted-foreground hover:text-white transition-all"
                  >
                    {copiedCLI ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Manual code card */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FolderGit className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Manual Installation</span>
                </div>
                
                <div className="space-y-6">
                  {/* Step 1: dependencies */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-white">1. Install dependencies</h4>
                    {dependencies.length > 0 ? (
                      <div className="flex items-center justify-between rounded-lg border border-border bg-black/40 px-4 py-2.5">
                        <code className="font-mono text-xs text-zinc-300">
                          npm install {dependencies.join(' ')}
                        </code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`npm install ${dependencies.join(' ')}`);
                          }}
                          className="text-zinc-500 hover:text-white transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-zinc-500 text-xs italic">Zero dependencies! No additional packages required.</p>
                    )}
                  </div>

                  {/* Step 2: source code */}
                  {sourceCode && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white">2. Copy code into your project</h4>
                      <p className="text-zinc-400 text-xs font-light">Create a file at <code className="text-indigo-300 font-mono">{sourceFile || `components/${slug}.tsx`}</code> and paste the following:</p>
                      
                      <div className="relative">
                        <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border border-border rounded-t-xl border-b-0">
                          <span className="text-xs font-mono text-zinc-500">{sourceFile || `${slug}.tsx`}</span>
                          <button 
                            onClick={handleCopySource}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                          >
                            {copiedSource ? (
                              <><Check className="h-3 w-3 text-emerald-400" /> Copied!</>
                            ) : (
                              <><Copy className="h-3 w-3" /> Copy Code</>
                            )}
                          </button>
                        </div>
                        <div className="rounded-b-xl border border-border bg-[#121212] p-4 text-sm text-gray-300 max-h-[500px] overflow-auto">
                          <HighlightedCode code={sourceCode} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {showControls && hasControls && (
          <div className="col-span-1 lg:col-span-4">
             <ControlsPanel activeControls={controls} />
          </div>
        )}
      </div>
    </div>
  );
}

function InteractiveStudioPanel({
  activeTab,
  setActiveTab,
  stylePreset,
  setStylePreset,
  dataset,
  setDataset,
  accentColor,
  setAccentColor,
  controls = [],
  values = {},
  onChange,
  variants,
  activeVariantIdx,
  onVariantChange,
  onCopyJSX,
  copiedJSX,
  onClose,
}: {
  activeTab: 'styles' | 'data' | 'props';
  setActiveTab: (tab: 'styles' | 'data' | 'props') => void;
  stylePreset: StylePresetType;
  setStylePreset: (val: StylePresetType) => void;
  dataset: DatasetType;
  setDataset: (val: DatasetType) => void;
  accentColor: string;
  setAccentColor: (val: string) => void;
  controls?: PlaygroundControl[];
  values?: Record<string, any>;
  onChange?: (name: string, value: any) => void;
  variants?: ComponentVariant[];
  activeVariantIdx?: number;
  onVariantChange?: (idx: number) => void;
  onCopyJSX?: () => void;
  copiedJSX?: boolean;
  onClose?: () => void;
}) {
  const hasProps = (controls && controls.length > 0) || (variants && variants.length > 0);
  const activeDatasetDef = MOCK_DATASETS[dataset];

  return (
    <div className="p-5 rounded-xl border border-border/60 bg-zinc-950/85 backdrop-blur-xl flex flex-col justify-between h-full min-h-[460px] shadow-2xl shadow-black/60">
      <div className="space-y-4">
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs tracking-wider uppercase text-white">Interactive Studio</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30 font-semibold">LIVE</span>
            </div>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close Panel"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sub-Tabs Switcher */}
        <div className="grid grid-cols-3 gap-1 bg-zinc-900/90 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setActiveTab('styles')}
            className={cn(
              "flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium rounded-md transition-all cursor-pointer",
              activeTab === 'styles'
                ? "bg-indigo-600 text-white shadow-sm font-semibold"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <Palette className="w-3 h-3" />
            <span>Styles</span>
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={cn(
              "flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium rounded-md transition-all cursor-pointer",
              activeTab === 'data'
                ? "bg-indigo-600 text-white shadow-sm font-semibold"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <Database className="w-3 h-3" />
            <span>Data</span>
          </button>
          <button
            onClick={() => setActiveTab('props')}
            disabled={!hasProps}
            className={cn(
              "flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium rounded-md transition-all",
              !hasProps 
                ? "opacity-35 cursor-not-allowed text-zinc-500" 
                : activeTab === 'props'
                  ? "bg-indigo-600 text-white shadow-sm font-semibold cursor-pointer"
                  : "text-zinc-400 hover:text-white cursor-pointer"
            )}
            title={!hasProps ? "No custom props registered for this component" : "Component-specific Props"}
          >
            <Sliders className="w-3 h-3" />
            <span>Props</span>
          </button>
        </div>

        {/* Tab 1: Styles */}
        {activeTab === 'styles' && (
          <div className="space-y-4 pt-1">
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                <span>Visual Style Preset</span>
                <span className="text-indigo-400 font-semibold lowercase">.{stylePreset}</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {(['glass', 'neon', 'flat', 'borderless'] as StylePresetType[]).map((preset) => {
                  const def = STYLE_PRESETS[preset];
                  const isSelected = stylePreset === preset;
                  return (
                    <button
                      key={preset}
                      onClick={() => setStylePreset(preset)}
                      className={cn(
                        "p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 relative group",
                        isSelected
                          ? "bg-indigo-500/15 border-indigo-400 text-white shadow-md shadow-indigo-500/10 ring-1 ring-indigo-400/30"
                          : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:bg-zinc-900 hover:border-white/20 hover:text-zinc-200"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-semibold text-white">{def.label}</span>
                        {isSelected && <Check className="w-3 h-3 text-indigo-400" />}
                      </div>
                      <span className="text-[10px] leading-tight text-zinc-400 line-clamp-2">{def.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accent Color Picker */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                <span>Color Accent</span>
                <span className="font-mono text-xs" style={{ color: accentColor }}>{accentColor}</span>
              </label>
              
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {COLOR_ACCENTS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setAccentColor(c.hex)}
                      className={cn(
                        "w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer shadow-sm",
                        accentColor.toLowerCase() === c.hex.toLowerCase() ? "border-white scale-110 shadow-md ring-2 ring-white/30" : "border-transparent opacity-80 hover:opacity-100"
                      )}
                      style={{ backgroundColor: c.hex }}
                      title={c.label}
                    />
                  ))}
                </div>

                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20 shadow-sm shrink-0">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="absolute inset-[-10px] w-12 h-12 cursor-pointer"
                    title="Choose custom hex color"
                  />
                </div>
              </div>
            </div>

            {/* Live Style Preview Card */}
            <div className={cn(
              "p-3 rounded-lg border text-xs text-zinc-300 transition-all",
              stylePreset === 'neon' ? "bg-zinc-950 border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]" :
              stylePreset === 'glass' ? "backdrop-blur-md bg-white/[0.04] border-white/10" :
              stylePreset === 'flat' ? "bg-zinc-900 border-zinc-800" :
              "bg-transparent border-dashed border-white/10"
            )}>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span className="font-semibold text-white text-[11px]">Active Preset: {STYLE_PRESETS[stylePreset].label}</span>
              </div>
              <p className="text-[10px] text-zinc-400">
                Injected into TSX as <code className="text-indigo-300 font-mono">variant="{stylePreset}"</code> and HTML classes.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Data Generator */}
        {activeTab === 'data' && (
          <div className="space-y-4 pt-1">
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                <span>Select Mock Dataset</span>
                <span className="text-emerald-400 font-semibold">{activeDatasetDef.label}</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {([
                  { id: 'saas', icon: Building2, label: 'B2B SaaS', desc: 'ARR, pipeline & churn' },
                  { id: 'ecommerce', icon: ShoppingCart, label: 'E-Commerce', desc: 'GMV, orders & cart' },
                  { id: 'crypto', icon: Coins, label: 'Crypto / Web3', desc: 'TVL, pools & gas' },
                  { id: 'healthcare', icon: Activity, label: 'Healthcare', desc: 'Triage & clinical vitals' },
                ] as const).map((ds) => {
                  const Icon = ds.icon;
                  const isSelected = dataset === ds.id;
                  return (
                    <button
                      key={ds.id}
                      onClick={() => setDataset(ds.id)}
                      className={cn(
                        "p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 relative group",
                        isSelected
                          ? "bg-emerald-500/15 border-emerald-400 text-white shadow-md shadow-emerald-500/10 ring-1 ring-emerald-400/30"
                          : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:bg-zinc-900 hover:border-white/20 hover:text-zinc-200"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1.5">
                          <Icon className={cn("w-3.5 h-3.5", isSelected ? "text-emerald-400" : "text-zinc-400")} />
                          <span className="text-xs font-semibold text-white">{ds.label}</span>
                        </div>
                        {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                      </div>
                      <span className="text-[10px] leading-tight text-zinc-400">{ds.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Dataset KPI Cards Preview */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Sample Metrics Preview ({activeDatasetDef.label})
              </label>
              
              <div className="grid grid-cols-2 gap-2">
                {activeDatasetDef.metrics.slice(0, 4).map((m, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-zinc-900/80 border border-white/5 space-y-1">
                    <span className="text-[10px] text-zinc-400 block truncate">{m.title}</span>
                    <div className="flex items-baseline justify-between gap-1">
                      <span className="text-xs font-bold text-white font-mono">{m.value}</span>
                      <span className="text-[9px] font-mono text-emerald-400 flex items-center">
                        <TrendingUp className="w-2.5 h-2.5 mr-0.5 inline" />
                        {m.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-zinc-400 leading-relaxed font-light">
              Switching dataset dynamically hydrates tables, KPI cards, and sparklines with industry-specific schemas.
            </p>
          </div>
        )}

        {/* Tab 3: Props */}
        {activeTab === 'props' && hasProps && (
          <div className="space-y-4 pt-1 max-h-[360px] overflow-y-auto pr-1">
            {variants && variants.length > 0 && onVariantChange && activeVariantIdx !== undefined && (
              <div className="space-y-1.5 border-b border-white/10 pb-3">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Preset Variant</span>
                <select
                  value={activeVariantIdx}
                  onChange={(e) => onVariantChange(parseInt(e.target.value))}
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  {variants.map((v, idx) => (
                    <option key={v.name} value={idx}>
                      {v.name.charAt(0).toUpperCase() + v.name.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {controls && controls.length > 0 && onChange && (
              <div className="space-y-3.5">
                {controls.map((ctrl) => {
                  const val = values[ctrl.name] !== undefined ? values[ctrl.name] : ctrl.default;
                  return (
                    <div key={ctrl.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-300">{ctrl.label}</span>
                        {ctrl.type === 'number' && (
                          <span className="text-indigo-400 font-semibold">{val}</span>
                        )}
                      </div>

                      {ctrl.type === 'select' && (
                        <select
                          value={val}
                          onChange={(e) => onChange(ctrl.name, e.target.value)}
                          className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        >
                          {ctrl.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt.charAt(0).toUpperCase() + opt.slice(1)}
                            </option>
                          ))}
                        </select>
                      )}

                      {ctrl.type === 'number' && (
                        <input
                          type="range"
                          min={ctrl.min ?? 0}
                          max={ctrl.max ?? 100}
                          step={ctrl.step ?? 1}
                          value={val}
                          onChange={(e) => onChange(ctrl.name, parseFloat(e.target.value))}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                      )}

                      {ctrl.type === 'boolean' && (
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!val}
                            onChange={(e) => onChange(ctrl.name, e.target.checked)}
                            className="w-3.5 h-3.5 rounded border-white/10 bg-zinc-900 text-indigo-500 focus:ring-0"
                          />
                          <span className="text-xs text-zinc-400 font-light">Enabled</span>
                        </label>
                      )}

                      {ctrl.type === 'string' && (
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => onChange(ctrl.name, e.target.value)}
                          className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder={`Enter ${ctrl.label.toLowerCase()}...`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Copy & Status */}
      <div className="pt-3 border-t border-white/10 mt-4 space-y-2">
        {onCopyJSX && (
          <button
            onClick={onCopyJSX}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            {copiedJSX ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedJSX ? "Copied Customized JSX!" : "Copy Customized TSX"}</span>
          </button>
        )}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 font-mono">
          <Code2 className="w-3 h-3 text-indigo-400" />
          <span>React & Vanilla tabs sync live</span>
        </div>
      </div>
    </div>
  );
}

function ControlsPanel({ activeControls }: { activeControls: Array<'speed' | 'duration' | 'scale' | 'color'> }) {
  const { speed, setSpeed, duration, setDuration, scale, setScale, color, setColor, reset } = usePreviewStore();

  return (
    <div className="p-6 rounded-xl border border-border/50 bg-muted/20 space-y-6 h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-4">
         <h4 className="font-medium">Controls</h4>
         <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground">Reset</button>
      </div>

      {activeControls.includes('speed') && (
        <div className="space-y-3">
          <label className="text-sm font-medium flex justify-between">
            <span>Speed</span>
            <span className="text-muted-foreground">{speed}x</span>
          </label>
          <input 
            type="range" min="0.1" max="3" step="0.1" 
            value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full accent-foreground"
          />
        </div>
      )}

      {activeControls.includes('duration') && (
        <div className="space-y-3">
          <label className="text-sm font-medium flex justify-between">
            <span>Duration</span>
            <span className="text-muted-foreground">{duration}s</span>
          </label>
          <input 
            type="range" min="0.5" max="5" step="0.1" 
            value={duration} onChange={(e) => setDuration(parseFloat(e.target.value))}
            className="w-full accent-foreground"
          />
        </div>
      )}

      {activeControls.includes('scale') && (
        <div className="space-y-3">
          <label className="text-sm font-medium flex justify-between">
            <span>Scale</span>
            <span className="text-muted-foreground">{scale}</span>
          </label>
          <input 
            type="range" min="0.5" max="2" step="0.1" 
            value={scale} onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-full accent-foreground"
          />
        </div>
      )}

      {activeControls.includes('color') && (
        <div className="space-y-3">
          <label className="text-sm font-medium">Accent Color</label>
          <div className="flex gap-2">
            {['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#ef4444'].map((c) => (
              <button
                key={c} onClick={() => setColor(c)}
                className={cn("w-8 h-8 rounded-full border-2", color === c ? 'border-foreground' : 'border-transparent')}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
