import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base = 'inline-flex items-center justify-center gap-2 font-extrabold rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed';
const variants: Record<Variant, string> = {
  primary: 'bg-gold hover:bg-gold-dark text-black shadow-lg shadow-gold/20',
  secondary: 'bg-sectionbg hover:bg-gray-800 text-white border border-gray-700',
  ghost: 'text-gold hover:bg-gold/10',
};
const sizes: Record<Size, string> = { sm: 'text-xs px-4 py-2', md: 'text-sm px-6 py-3', lg: 'text-base px-8 py-3.5' };

/** Class helper so <Link> and <a> can look like buttons too. */
export const buttonClasses = (variant: Variant = 'primary', size: Size = 'md') => `${base} ${variants[variant]} ${sizes[size]}`;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; size?: Size; loading?: boolean;
}

export default function Button({ variant = 'primary', size = 'md', loading = false, className = '', children, disabled, type = 'button', ...rest }: Props) {
  return (
    <button type={type} disabled={disabled || loading} aria-busy={loading} className={`${buttonClasses(variant, size)} ${className}`} {...rest}>
      {loading && <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
