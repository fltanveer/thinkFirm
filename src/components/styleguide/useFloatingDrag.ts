import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react';

interface Position { x: number; y: number }

export function useFloatingDrag(storageKey: string) {
  const [position, setPosition] = useState<Position | null>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) as Position : null;
    } catch {
      return null;
    }
  });
  const drag = useRef<{ offsetX: number; offsetY: number; width: number; height: number; startX: number; startY: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    const keepInViewport = () => {
      setPosition((current) => current ? {
        x: Math.max(8, Math.min(current.x, window.innerWidth - 54)),
        y: Math.max(8, Math.min(current.y, window.innerHeight - 54)),
      } : null);
    };
    window.addEventListener('resize', keepInViewport);
    return () => window.removeEventListener('resize', keepInViewport);
  }, []);

  function onPointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    drag.current = {
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      width: rect.width,
      height: rect.height,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const current = drag.current;
    if (!current) return;
    if (Math.hypot(event.clientX - current.startX, event.clientY - current.startY) > 4) current.moved = true;
    if (!current.moved) return;
    event.preventDefault();
    const next = {
      x: Math.max(8, Math.min(event.clientX - current.offsetX, window.innerWidth - current.width - 8)),
      y: Math.max(8, Math.min(event.clientY - current.offsetY, window.innerHeight - current.height - 8)),
    };
    setPosition(next);
  }

  function onPointerUp(event: ReactPointerEvent<HTMLButtonElement>) {
    const current = drag.current;
    if (!current) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    suppressClick.current = current.moved;
    drag.current = null;
    if (current.moved) {
      setPosition((next) => {
        if (next) localStorage.setItem(storageKey, JSON.stringify(next));
        return next;
      });
    }
  }

  function onClickCapture(event: ReactMouseEvent<HTMLButtonElement>) {
    if (!suppressClick.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  }

  const style: CSSProperties | undefined = position
    ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto' }
    : undefined;

  return { style, onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp, onClickCapture };
}
