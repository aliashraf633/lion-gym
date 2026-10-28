import { forwardRef, useId, type InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> { label: string; error?: string; ltr?: boolean }

const Input = forwardRef<HTMLInputElement, Props>(function Input({ label, error, ltr = false, className = '', ...rest }, ref) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs text-gray-300 mb-1">{label}</label>
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        dir={ltr ? 'ltr' : undefined}
        className={`w-full bg-sectionbg border rounded-lg p-2.5 text-sm text-white outline-none focus:border-gold ${error ? 'border-red-500' : 'border-gray-700'} ${ltr ? 'text-right' : ''} ${className}`}
        {...rest}
      />
      <p id={errId} role={error ? 'alert' : undefined} className="text-xs text-red-400 mt-1 min-h-[1rem]">{error}</p>
    </div>
  );
});
export default Input;
