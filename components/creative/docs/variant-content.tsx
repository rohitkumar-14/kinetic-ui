'use client';

import React from 'react';
import { usePreviewStore } from '@/hooks/use-preview-store';

interface VariantContentProps {
  /** The variant name(s) that should trigger this content to render */
  match: string | string[];
  children: React.ReactNode;
}

export function VariantContent({ match, children }: VariantContentProps) {
  const activeVariant = usePreviewStore((state) => state.activeVariant);

  const isMatch = Array.isArray(match)
    ? match.includes(activeVariant)
    : match === activeVariant;

  if (!isMatch) {
    return null;
  }

  return <>{children}</>;
}
