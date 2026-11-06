import React from 'react';

interface EloLinkLogoIconProps {
  className?: string;
  size?: number | string;
  style?: React.CSSProperties;
}

/**
 * EloLink brand logo icon component that adapts to currentColor
 * like Lucide icons (inheriting text-color from parent or className).
 */
export const EloLinkLogoIcon: React.FC<EloLinkLogoIconProps> = ({
  className = 'w-5 h-5',
  style,
}) => {
  return (
    <span
      role="img"
      aria-label="EloLink"
      className={`inline-block bg-current shrink-0 transition-colors ${className}`}
      style={{
        maskImage: 'url(/assets/brand/elolink_logo_monochrome.png)',
        WebkitMaskImage: 'url(/assets/brand/elolink_logo_monochrome.png)',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        ...style,
      }}
    />
  );
};

export default EloLinkLogoIcon;
