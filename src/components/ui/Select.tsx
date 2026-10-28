import { forwardRef, useId, type SelectHTMLAttributes } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> { label: string; error?: string }

const Select = forwardRef<HTMLSelectElement, Props>(function Select({ label, error, className = '', children, ...rest }, ref) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs text-gray-300 mb-1">{label}</label>
      <select
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        className={`w-full bg-sectionbg border rounded-lg p-2.5 text-sm text-white outline-none focus:border-gold ${error ? 'border-red-500' : 'border-gray-700'} ${className}`}
        {...rest}
      >
        {children}
      </select>
      <p id={errId} role={error ? 'alert' : undefined} className="text-xs text-red-400 mt-1 min-h-[1rem]">{error}</p>
    </div>
  );
});
export default Select;
