import React from 'react';
import { codeToHtml } from 'shiki';

interface CodeHighlightProps {
  code: string;
  lang?: string;
  className?: string;
}

export async function CodeHighlight({ code, lang = 'tsx', className = '' }: CodeHighlightProps) {
  try {
    const html = await codeToHtml(code, {
      lang,
      theme: 'vitesse-dark', // A clean, dark theme that fits our aesthetic
    });

    return (
      <div 
        className={`rounded-xl overflow-hidden border border-border bg-[#121212] p-4 text-sm [&>pre]:!bg-transparent [&>pre]:m-0 [&>pre]:p-0 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (error) {
    console.error('Error highlighting code with Shiki:', error);
    // Fallback to basic pre/code if Shiki fails
    return (
      <pre className={`rounded-xl overflow-hidden border border-border bg-[#121212] p-4 text-sm text-gray-300 ${className}`}>
        <code>{code}</code>
      </pre>
    );
  }
}
