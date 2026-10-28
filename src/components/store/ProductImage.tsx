'use client';
import { useState } from 'react';

/** Image with a graceful fallback if the remote photo fails to load. */
export default function ProductImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role="img" aria-label={alt} className={`flex items-center justify-center bg-darkbg text-4xl ${className}`}>🥤</div>;
  return <img loading="lazy" src={src} alt={alt} onError={() => setFailed(true)} className={className} />;
}
