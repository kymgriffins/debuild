"use client";

import Image from "next/image";
import { useState } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  aspectRatio?: string;
  blurDataURL?: string;
  onLoad?: () => void;
}

/**
 * Responsive Image Component
 * Handles optimized images with modern format fallbacks and proper aspect ratios
 */
export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  fill = false,
  aspectRatio,
  blurDataURL,
  onLoad
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate fallback URLs for modern formats and responsive sizes
  const getFallbackSrc = (originalSrc: string) => {
    // Remove file extension and size suffix if present
    const basePath = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '').replace(/-desktop$/, '');
    return {
      avif: `${basePath}.avif`,
      webp: `${basePath}.webp`,
      mobile: `${basePath}-mobile.jpg`,
      tablet: `${basePath}-tablet.jpg`,
      desktop: `${basePath}-desktop.jpg`,
      original: originalSrc
    };
  };

  const fallbacks = getFallbackSrc(src);

  const containerClasses = aspectRatio
    ? `relative ${aspectRatio} ${className}`
    : `relative ${className}`;

  if (hasError) {
    return (
      <div className={`${containerClasses} bg-gray-100 flex items-center justify-center`}>
        <div className="text-gray-400 text-sm">Image unavailable</div>
      </div>
    );
  }

  // Debug: Log the paths being used
  console.log('ResponsiveImage Debug:', {
    src,
    fallbacks,
    hasError
  });

  if (hasError) {
    return (
      <div className={`${containerClasses} bg-gray-100 flex items-center justify-center`}>
        <div className="text-gray-400 text-sm">Image unavailable</div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {/* Simple image for now - debug mode */}
      <Image
        src={fallbacks.original}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } object-cover`}
        sizes={sizes}
        quality={quality}
        priority={priority}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        onLoad={() => {
          console.log('Image loaded successfully:', fallbacks.original);
          setIsLoaded(true);
          onLoad?.();
        }}
        onError={(e) => {
          console.error('Image failed to load:', fallbacks.original, e);
          setHasError(true);
        }}
      />

      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      )}
    </div>
  );
}
