'use client';

import { useEffect } from 'react';

/**
 * Site-wide IntersectionObserver that drives the `.reveal` / `.reveal-hero`
 * CSS classes defined in globals.css. Any element carrying one of those
 * classes fades/rises (and blurs, for `.reveal-hero`) into place once ~18%
 * of it enters the viewport, then is left alone (`.is-visible` persists).
 *
 * Mounted once in the root layout so it applies across client-side
 * navigations without every page needing to wire up its own observer.
 */
export function ScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const reveal = (el: Element) => el.classList.add('is-visible');

    if (reduceMotion) {
      document.querySelectorAll('.reveal, .reveal-hero').forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -5% 0px' }
    );

    const observeAll = () => {
      document.querySelectorAll('.reveal:not(.is-visible), .reveal-hero:not(.is-visible)').forEach((el) => {
        observer.observe(el);
      });
    };

    observeAll();

    // Pages/components render client-side after this effect runs (e.g. data
    // fetched product grids), so keep watching for newly mounted targets.
    const mutationObserver = new MutationObserver(() => observeAll());
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
