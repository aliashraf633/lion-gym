'use client';
import { useEffect, useId, useRef, type ReactNode } from 'react';

interface Props { open: boolean; onClose: () => void; title: string; children: ReactNode; maxWidth?: string; variant?: 'center' | 'drawer' }

const shell = {
  center: (mw: string) => `m-auto w-[calc(100%-2rem)] ${mw} max-h-[90vh] rounded-2xl border-2 border-gold/40`,
  drawer: () => 'fixed inset-y-0 left-0 right-auto m-0 h-full max-h-none w-full max-w-sm rounded-none border-e-2 border-gold/40',
};

/** Accessible modal/drawer built on the native <dialog>: focus trap, Esc, inert background and backdrop come built in. */
export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg', variant = 'center' }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      className={`${shell[variant](maxWidth)} overflow-y-auto bg-cardbg p-0 text-right text-white shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm`}
    >
      {open && (
        <div className="relative p-6">
          <button type="button" onClick={onClose} aria-label="إغلاق النافذة" className="absolute top-4 start-4 text-2xl text-gray-400 transition hover:text-gold">×</button>
          <h2 id={titleId} className="mb-4 ps-8 text-xl font-extrabold text-gold">{title}</h2>
          {children}
        </div>
      )}
    </dialog>
  );
}
