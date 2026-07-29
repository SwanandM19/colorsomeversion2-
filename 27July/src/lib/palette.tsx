'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type PaletteMode = 'luxury' | 'vivid';

/** Restrained, paint-inspired luxury tones — the default brand direction. */
export const RESTRAINED_ACCENTS = ['#C9A858', '#C4704B', '#8B9E7E', '#2C3E50', '#8C6478'];

/** The site's original vivid rainbow accents — offered as an A/B comparison. */
export const VIVID_ACCENTS = ['#E91E8C', '#2196F3', '#4CAF50', '#FF5722', '#FFC107'];

const STORAGE_KEY = 'colorsome-palette';

interface PaletteContextValue {
  mode: PaletteMode;
  accents: string[];
  toggle: () => void;
  setMode: (mode: PaletteMode) => void;
}

const PaletteContext = createContext<PaletteContextValue | null>(null);

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PaletteMode>('luxury');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'luxury' || stored === 'vivid') setModeState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-palette', mode);
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const value: PaletteContextValue = {
    mode,
    accents: mode === 'luxury' ? RESTRAINED_ACCENTS : VIVID_ACCENTS,
    toggle: () => setModeState((m) => (m === 'luxury' ? 'vivid' : 'luxury')),
    setMode: setModeState,
  };

  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
}

/** Falls back to the restrained palette if used outside PaletteProvider (shouldn't happen once mounted in layout.tsx). */
export function usePalette(): PaletteContextValue {
  const ctx = useContext(PaletteContext);
  if (ctx) return ctx;
  return { mode: 'luxury', accents: RESTRAINED_ACCENTS, toggle: () => {}, setMode: () => {} };
}
