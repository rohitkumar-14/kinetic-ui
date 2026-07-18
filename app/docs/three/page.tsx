'use client';

import React from 'react';
import { Layers, Lightbulb, Box } from 'lucide-react';

export default function ThreeDocsPage() {
  return (
    <div className="space-y-12">
      <div>
        <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
          WebGL &amp; Shaders
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4 mb-4 text-white">
          Three.js &amp; Canvas
        </h1>
        <p className="text-base text-zinc-400 font-light max-w-2xl leading-relaxed">
          Unlock the third dimension. Kinetic UI incorporates WebGL objects to render interactive, glassmorphic 3D shapes that float dynamically within your layouts.
        </p>
      </div>

      {/* WebGL Architecture */}
      <section className="p-8 rounded-2xl border border-white/5 bg-zinc-950/50 space-y-6">
        <h2 id="r3f-fresnel" className="text-2xl font-bold text-white">Fresnel Reflection Shader</h2>
        <p className="text-zinc-400 text-sm font-light leading-relaxed">
          Instead of standard flat colors, our WebGL floating objects (toruses, knots) use custom fragment shaders mimicking glass refraction. By calculating the angle between the viewer's camera and the object's normal vector, we emit bright edges (Fresnel limits) that simulate premium physical materials.
        </p>

        <div className="p-6 rounded-xl bg-black border border-white/5 font-mono text-xs text-zinc-400 space-y-2">
          <p className="text-indigo-400">// custom shader snippet used for physical materials</p>
          <p>uniform float bias;</p>
          <p>uniform float scale;</p>
          <p>uniform float power;</p>
          <p>varying vec3 vEye;</p>
          <p>varying vec3 vNormal;</p>
          <p>void main() &#123;</p>
          <p>&nbsp;&nbsp;float factor = bias + scale * power(1.0 + dot(vEye, vNormal), power);</p>
          <p>&nbsp;&nbsp;gl_FragColor = vec4(vec3(factor), 1.0);</p>
          <p>&#125;</p>
        </div>
      </section>

      {/* Grid columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-white/5 bg-zinc-950/30 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400">
            <Box className="w-4.5 h-4.5" />
            <span>React Three Fiber</span>
          </div>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            By wrapping Three.js primitives in React hooks, we allow standard React state triggers to dynamically scale and animate WebGL properties smoothly.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-zinc-950/30 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <Layers className="w-4.5 h-4.5" />
            <span>Optimized RequestAnimationFrame</span>
          </div>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            R3F Canvas elements suspend frame loops when scrolled out of view, reducing CPU and battery overhead when the user navigates other parts of the site.
          </p>
        </div>
      </div>
    </div>
  );
}
