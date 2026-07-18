import React from 'react';
import { Testimonials } from '@/components/creative/testimonials';

export default function Preview() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center">
      <Testimonials speed={1} />
    </div>
  );
}
