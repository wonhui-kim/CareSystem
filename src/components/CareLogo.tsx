interface CareLogoProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'blue';
  className?: string;
}

export function CareLogo({ size = 'md', color = 'blue', className = '' }: CareLogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl', 
    lg: 'text-3xl'
  };

  const colorClasses = {
    white: 'text-white',
    blue: 'text-[#001e5a]'
  };

  return (
    <div className={`${sizeClasses[size]} font-bold ${colorClasses[color]} ${className}`}>
      C.A.R.E
    </div>
  );
}
