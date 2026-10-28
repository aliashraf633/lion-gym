/** Safe, typed localStorage helpers. Never throws (SSR, private mode, quota). */
export function loadJSON<T>(key: string, fallback: T, validate?: (v: unknown) => v is T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return validate ? (validate(parsed) ? parsed : fallback) : (parsed as T);
  } catch {
    return fallback;
  }
}

export function saveJSON(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}
