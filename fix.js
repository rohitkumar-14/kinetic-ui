const fs = require('fs');
const files = [
  { file: 'saas-landing-page.mdx', link: '/preview/saas-landing-page' },
  { file: 'agency-portfolio.mdx', link: '/preview/agency-portfolio' },
  { file: 'dashboard-01.mdx', link: '/preview/dashboard-01' },
  { file: 'creative-studio.mdx', link: '/preview/creative-studio' },
  { file: 'ecommerce-product.mdx', link: '/preview/ecommerce-product' },
  { file: 'feature-section.mdx', link: '/preview/feature-section' },
  { file: 'testimonials.mdx', link: '/preview/testimonials' },
  { file: 'scroll-story.mdx', link: '/preview/scroll-story' }
];

files.forEach(item => {
  const path = 'd:/Rohit/ui/content/components/' + item.file;
  let content = fs.readFileSync(path, 'utf8');
  
  // First, undo the bad replacement.
  // The bad replacement added: `n  previewLink="/preview/..."
  const badStr = '`n  previewLink="' + item.link + '"';
  content = content.split(badStr).join('');
  
  // Also clean up any messed up ComponentPreview tags
  // The original regex was: name="([^"]+)"
  // So it might have replaced: name="SaaS Landing Page"`n  previewLink="/preview/saas-landing-page"
  
  // Let's ensure it's clean:
  // Remove any previewLink properties already in the file to reset
  content = content.replace(/\s+previewLink=\"[^\"]+\"/g, '');

  // Now, do the correct replacement: add previewLink prop to <ComponentPreview
  content = content.replace(/<ComponentPreview\s+name=\"([^\"]+)\"/g, '<ComponentPreview \n  name="$1" \n  previewLink="' + item.link + '"');
  
  fs.writeFileSync(path, content);
});
console.log('Done!');
