"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "colorsome:favorite-shades";

function readStoredFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

/**
 * localStorage-backed favourite shades — no authentication, persists across
 * refresh, syncs across tabs. Starts empty on first render (server and
 * client match) and hydrates from storage right after mount, which is the
 * standard tradeoff for client-only persisted state: a saved shade's heart
 * may render unfilled for one frame before hydrating.
 */
export function useFavoriteShades() {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavoriteIds(new Set(readStoredFavorites()));
    setHydrated(true);
  }, []);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setFavoriteIds(new Set(readStoredFavorites()));
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // localStorage unavailable (private mode / quota) — session state
        // still updates, it just won't survive a refresh.
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favoriteIds.has(id), [favoriteIds]);

  return { favoriteIds, isFavorite, toggleFavorite, hydrated, count: favoriteIds.size };
}
