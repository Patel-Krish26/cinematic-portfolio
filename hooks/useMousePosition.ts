// ============================================================
// HOOKS/USEMOUSEPOSITION.TS
// Custom hook that tracks mouse position
// ============================================================

import { useState, useEffect } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalX: number; // -1 to 1
  normalY: number; // -1 to 1
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0, y: 0, normalX: 0, normalY: 0,
  });

  useEffect(() => {
    const update = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalX: (e.clientX / window.innerWidth - 0.5) * 2,
        normalY: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, []);

  return position;
}
