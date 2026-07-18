'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePreviewStore } from '@/hooks/use-preview-store';
import { Settings2, Monitor, Tablet, Smartphone, Copy, Check, ExternalLink, Sliders, Terminal, FolderGit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PropsTable, PropDef } from '@/components/docs/props-table';

export interface PlaygroundControl {
  name: string;
  label: string;
  type: 'select' | 'number' | 'boolean' | 'string';
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

function updateCodeProps(baseCode: string, componentName: string, params: Record<string, any>, defaults: Record<string, any>) {
  if (!componentName) return baseCode;
  const regex = new RegExp(`<(${componentName})([^>]*?)(\\/?>)`, 'g');
  return baseCode.replace(regex, (match, p1, p2, p3) => {
    const propsList: string[] = [];
    Object.entries(params).forEach(([key, val]) => {
      if (val === undefined || val === null) return;
      if (val === defaults[key]) return;
      
      if (typeof val === 'string') {
        propsList.push(`${key}="${val}"`);
      } else if (typeof val === 'boolean') {
        if (val) {
          propsList.push(key);
        } else {
          propsList.push(`${key}={false}`);
        }
      } else {
        propsList.push(`${key}={${val}}`);
      }
    });
    
    const propsStr = propsList.length > 0 ? ' ' + propsList.join(' ') : '';
    return `<${p1}${propsStr}${p3.startsWith('/') ? ' /' : ''}>`;
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
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [customWidth, setCustomWidth] = useState<number>(800);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedSource, setCopiedSource] = useState(false);
  const [copiedCLI, setCopiedCLI] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'install'>('preview');
  
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
  const hasPlayground = playgroundControls.length > 0;
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
    const propsToInject: any = { ...params };
    const isDOMElement = typeof element.type === 'string';

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
    ? updateCodeProps(activeCode, componentName || '', params, defaultsMap)
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
    const cliCommand = `npx @kinetic-ui/cli add ${slug || 'component'}`;
    navigator.clipboard.writeText(cliCommand);
    setCopiedCLI(true);
    setTimeout(() => setCopiedCLI(false), 2000);
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

          {/* Interactive Playground Toggle */}
          {hasPlayground && (
            <button 
              onClick={() => setShowPlayground(!showPlayground)}
              className={cn(
                "p-1.5 rounded-full transition-colors flex items-center gap-1.5 px-3 text-xs font-semibold border border-white/5", 
                showPlayground 
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

          {/* External Link */}
          {previewLink && (
            <a 
              href={previewLink} 
              target="_blank" 
              rel="noreferrer"
              title="Expand in new window"
              className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'preview' | 'code' | 'install')} className="relative w-full">
            <div className="flex items-center gap-3 mb-4">
              <TabsList className="grid w-full grid-cols-3 max-w-[360px]">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Usage</TabsTrigger>
                <TabsTrigger value="install">Installation</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent 
              value="preview" 
              className="relative outline-none"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className={cn("col-span-1 transition-all duration-300 rounded-xl border border-border/50 bg-[#050505] relative", showPlayground && hasPlayground ? 'lg:col-span-8' : 'lg:col-span-12')}>
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

                      <div className={cn(
                        "p-6",
                        !isResponsiveMode && "md:p-8"
                      )}>
                        {activeComponent}
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

                {showPlayground && hasPlayground && (
                  <div className="col-span-1 lg:col-span-4">
                    <PlaygroundPanel 
                      controls={playgroundControls} 
                      values={params} 
                      onChange={handleParamChange} 
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

            <TabsContent value="install" className="relative outline-none space-y-6">
              {/* CLI command card */}
              <div className="p-6 rounded-xl border border-border bg-zinc-950/45 space-y-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Install via CLI</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-black/60 px-4 py-3">
                  <code className="font-mono text-xs text-zinc-300">
                    <span className="text-indigo-400">npx</span> @kinetic-ui/cli add {slug || 'component'}
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

function PlaygroundPanel({ 
  controls, 
  values, 
  onChange 
}: { 
  controls: PlaygroundControl[]; 
  values: Record<string, any>; 
  onChange: (name: string, value: any) => void;
}) {
  return (
    <div className="p-6 rounded-xl border border-border/50 bg-zinc-950/70 backdrop-blur-md space-y-6 h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <h4 className="font-semibold text-xs tracking-wider uppercase text-indigo-400">Live Parameters</h4>
      </div>
      <div className="space-y-5">
        {controls.map((ctrl) => {
          const val = values[ctrl.name] !== undefined ? values[ctrl.name] : ctrl.default;
          
          return (
            <div key={ctrl.name} className="space-y-2">
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
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  {ctrl.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
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
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!val}
                    onChange={(e) => onChange(ctrl.name, e.target.checked)}
                    className="w-4 h-4 rounded border-white/10 bg-zinc-900 text-indigo-500 focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="text-xs text-zinc-400 font-light">Enabled</span>
                </label>
              )}

              {ctrl.type === 'string' && (
                <input
                  type="text"
                  value={val}
                  onChange={(e) => onChange(ctrl.name, e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder={`Enter ${ctrl.label.toLowerCase()}...`}
                />
              )}
            </div>
          );
        })}
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
