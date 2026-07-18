import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ComponentDoc {
  slug: string;
  title: string;
  description: string;
  category: string;
  code: string;
  content: string;
}

export function getComponentSlugs() {
  const componentsDirectory = path.join(contentDirectory, 'components');
  if (!fs.existsSync(componentsDirectory)) {
    return [];
  }
  return fs.readdirSync(componentsDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getComponentSourceCode(slug: string): string {
  // 1. Try finding it in registry/components.json first
  try {
    const registryPath = path.join(process.cwd(), 'registry', 'components.json');
    if (fs.existsSync(registryPath)) {
      const registryContent = fs.readFileSync(registryPath, 'utf8');
      const categoriesRegistry = JSON.parse(registryContent);
      
      let componentFilePath = "";
      for (const category of Object.values(categoriesRegistry) as any) {
        if (category.items && category.items[slug]) {
          const item = category.items[slug];
          if (item.files && item.files.length > 0) {
            componentFilePath = item.files[0];
            break;
          }
        }
      }
      
      if (componentFilePath) {
        // Fix any known typos in components.json
        if (slug === 'mesh-gradient' && componentFilePath.includes('magnetic-button.tsx')) {
          componentFilePath = 'components/creative/mesh-gradient.tsx';
        }
        
        const fullPath = path.join(process.cwd(), componentFilePath);
        if (fs.existsSync(fullPath)) {
          return fs.readFileSync(fullPath, 'utf8');
        }
      }
    }
  } catch (err) {
    console.error(`Error searching registry for ${slug}:`, err);
  }

  // 2. Robust fallback locations based on slug
  const fallbackPaths = [
    `components/creative/${slug}.tsx`,
    `components/blocks/${slug}.tsx`,
    `components/ui/${slug}.tsx`,
    `components/creative/hero/${slug}.tsx`,
  ];

  for (const relativePath of fallbackPaths) {
    const fullPath = path.join(process.cwd(), relativePath);
    if (fs.existsSync(fullPath)) {
      try {
        return fs.readFileSync(fullPath, 'utf8');
      } catch (err) {
        console.error(`Error reading fallback file ${fullPath}:`, err);
      }
    }
  }

  return "";
}

export function extractProps(sourceCode: string, componentName: string): { name: string; type: string; isOptional: boolean }[] {
  const props: { name: string; type: string; isOptional: boolean }[] = [];
  const interfaceRegex = new RegExp(`(?:interface|type)\\s+${componentName}Props\\b[^\\{]*\\{([^\\}]*)\\}`, 's');
  const match = sourceCode.match(interfaceRegex);
  if (match) {
    const lines = match[1].split('\n');
    for (const line of lines) {
      const propMatch = line.trim().match(/^([a-zA-Z0-9_]+)(\??)\s*:\s*([^;]+);?/);
      if (propMatch) {
        props.push({
          name: propMatch[1],
          isOptional: propMatch[2] === '?',
          type: propMatch[3].trim()
        });
      }
    }
  }
  return props;
}

export function generateUsageMarkdown(slug: string, sourceCode: string): string {
  // 1. Get registry details
  let componentName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  let importPath = `@/components/creative/${slug}`;
  let relativeFilePath = `components/creative/${slug}.tsx`;
  
  try {
    const registryPath = path.join(process.cwd(), 'registry', 'components.json');
    if (fs.existsSync(registryPath)) {
      const registryContent = fs.readFileSync(registryPath, 'utf8');
      const categoriesRegistry = JSON.parse(registryContent);
      
      for (const category of Object.values(categoriesRegistry) as any) {
        if (category.items && category.items[slug]) {
          const item = category.items[slug];
          if (item.name) {
            componentName = item.name;
          }
          if (item.files && item.files.length > 0) {
            relativeFilePath = item.files[0];
            importPath = `@/${relativeFilePath.replace(/\.tsx?$/, '')}`;
            break;
          }
        }
      }
    }
  } catch (err) {
    console.error(`Error generating usage MDX for ${slug}:`, err);
  }

  // 2. Extract props to generate sample prop usage
  let samplePropsStr = "";
  if (sourceCode) {
    const props = extractProps(sourceCode, componentName);
    const demoProps = props.filter(p => p.name !== 'children' && p.name !== 'className');
    if (demoProps.length > 0) {
      // Pick top 3 props to show
      const propsToShow = demoProps.slice(0, 3);
      samplePropsStr = propsToShow.map(p => {
        let value = "";
        if (p.type.includes('string')) {
          value = `="example"`;
        } else if (p.type.includes('number')) {
          value = `{10}`;
        } else if (p.type.includes('boolean')) {
          value = `{true}`;
        } else {
          value = `{/* value */}`;
        }
        return `  ${p.name}${value}`;
      }).join('\n');
    }
  }

  const hasChildren = sourceCode ? sourceCode.includes('children') : true;
  
  let componentUsage = "";
  if (hasChildren) {
    componentUsage = `<${componentName}${samplePropsStr ? '\n' + samplePropsStr : ''}\n>\n  <div>Content goes here</div>\n</${componentName}>`;
  } else {
    componentUsage = `<${componentName}${samplePropsStr ? '\n' + samplePropsStr : ''}\n/>`;
  }

  return `
## Usage Guide

### 1. Import the Component

Import the component into your React or Next.js page:

\`\`\`tsx
import { ${componentName} } from "${importPath}";
\`\`\`

### 2. Implementation Example

Render the component and customize its behavior by passing props:

\`\`\`tsx
import { ${componentName} } from "${importPath}";

export default function Example() {
  return (
    <div className="w-full flex items-center justify-center p-8">
      ${componentUsage.split('\n').join('\n      ')}
    </div>
  );
}
\`\`\`
`;
}

export function getComponentDocBySlug(slug: string): ComponentDoc | null {
  try {
    const fullPath = path.join(contentDirectory, 'components', `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const code = getComponentSourceCode(slug);
    
    // Generate Usage Guide and append it to MDX content
    const usageGuide = generateUsageMarkdown(slug, code);
    const enrichedContent = `${content}\n\n${usageGuide}`;

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      category: data.category || 'General',
      code: code || data.code || '',
      content: enrichedContent,
    };
  } catch (error) {
    console.error(`Error reading MDX file for ${slug}`, error);
    return null;
  }
}

export function getAllComponentDocs(): ComponentDoc[] {
  const slugs = getComponentSlugs();
  const docs = slugs
    .map((slug) => getComponentDocBySlug(slug))
    .filter((doc): doc is ComponentDoc => doc !== null);
  return docs;
}
