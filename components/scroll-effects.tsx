'use client';
import { useEffect } from 'react';

/**
 * Drives the page's effects, once per page:
 *
 *   [data-draw]      illustrations: `data-in` when they enter (they draw
 *                    themselves), `data-live` while visible (their loops run).
 *   [data-progress]  sets --p from 0 to 1 as the element crosses the viewport.
 *                    data-start and data-end, fractions of the viewport: where
 *                    its top is at 0, and where its bottom is at 1.
 */
export function ScrollEffects() {
  useEffect(() => {
    const draws = [...document.querySelectorAll('[data-draw]')];
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draws.forEach((d) => d.setAttribute('data-in', ''));
      document.querySelectorAll<HTMLElement>('[data-progress]').forEach((el) => el.style.setProperty('--p', '1'));
      return;
    }

    const seen = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          e.target.toggleAttribute('data-live', e.isIntersecting);
          if (e.isIntersecting) e.target.setAttribute('data-in', '');
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );
    draws.forEach((d) => seen.observe(d));

    const items = [...document.querySelectorAll<HTMLElement>('[data-progress]')].map((el) => ({
      el,
      start: parseFloat(el.dataset.start ?? '1'),
      end: parseFloat(el.dataset.end ?? '0'),
      now: -1,
      target: 0,
    }));

    function measure() {
      const vh = innerHeight;
      for (const item of items) {
        const box = item.el.getBoundingClientRect();
        const span = item.start * vh - item.end * vh + box.height;
        item.target = Math.min(1, Math.max(0, (item.start * vh - box.top) / span));
      }
    }

    let frame = 0;
    function tick() {
      frame = 0;
      let moving = false;
      for (const item of items) {
        const gap = item.target - item.now;
        item.now = item.now < 0 || Math.abs(gap) < 0.0006 ? item.target : item.now + gap * 0.16;
        if (item.now !== item.target) moving = true;
        item.el.style.setProperty('--p', item.now.toFixed(4));
      }
      if (moving) frame = requestAnimationFrame(tick);
    }
    function onScroll() {
      measure();
      if (!frame) frame = requestAnimationFrame(tick);
    }

    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      seen.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, []);

  return null;
}
