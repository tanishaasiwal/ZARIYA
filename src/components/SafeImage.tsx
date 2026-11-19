import React, {useState} from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export function SafeImage({
  src,
  alt,
  fallbackTitle,
  priority = false,
  className = '',
  ...rest
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#123F3A] via-[#1B4D47] to-[#303431] text-[#E8E5D9] p-6 text-center ${className}`}
      >
        <span className="font-accent text-2xl tracking-[0.2em] text-[#C3A66B]">ZARIYA</span>
        {fallbackTitle && (
          <span className="mt-2 font-display text-base text-[#E8E5D9]/90 max-w-[20ch]">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onError={() => setHasError(true)}
      className={className}
      {...rest}
    />
  );
}
