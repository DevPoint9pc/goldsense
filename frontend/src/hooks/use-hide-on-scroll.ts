"use client";

import { useEffect, useState } from "react";

interface Options {
  topOffset?: number;
  tolerance?: number;
}

export function useHideOnScroll({ topOffset = 80, tolerance = 6 }: Options = {}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < topOffset) setHidden(false);
      else if (delta > tolerance) setHidden(true);
      else if (delta < -tolerance) setHidden(false);
      if (Math.abs(delta) > tolerance || y < topOffset) lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [topOffset, tolerance]);

  return hidden;
}
