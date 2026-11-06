import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { seedWishes } from '../data/wishes';
import type { Wish } from '../types/wedding';

const STORAGE_KEY = 'alex-celine-wishes';

interface WishesContextValue {
  wishes: Wish[];
  upsertWish: (id: string, name: string, message: string) => void;
  removeWish: (id: string) => void;
}

const WishesContext = createContext<WishesContextValue | null>(null);

function loadWishes(): Wish[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedWishes;
    const parsed = JSON.parse(raw) as Wish[];
    if (!Array.isArray(parsed) || parsed.length === 0) return seedWishes;
    return parsed;
  } catch {
    return seedWishes;
  }
}

export function WishesProvider({ children }: {children: React.ReactNode;}) {
  const [wishes, setWishes] = useState<Wish[]>(loadWishes);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch {
      // Demo persistence is best-effort when storage is unavailable.
    }
  }, [wishes]);

  const upsertWish = useCallback((id: string, name: string, message: string) => {
    setWishes((prev) => [{ id, name, message, isNew: true }, ...prev.filter((w) => w.id !== id)]);
  }, []);

  const removeWish = useCallback((id: string) => {
    setWishes((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const value = useMemo(() => ({ wishes, upsertWish, removeWish }), [wishes, upsertWish, removeWish]);

  return <WishesContext.Provider value={value}>{children}</WishesContext.Provider>;
}

export function useWishes() {
  const ctx = useContext(WishesContext);
  if (!ctx) throw new Error('useWishes must be used within WishesProvider');
  return ctx;
}