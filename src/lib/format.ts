const egp = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 });
export const formatEGP = (n: number): string => egp.format(n);

const dateFmt = new Intl.DateTimeFormat('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
export const formatDate = (iso: string): string => dateFmt.format(new Date(iso));
