"use client";

import { useEffect, useState } from "react";

// True on a large screen with a real pointer, where scroll-driven pinned
// sections feel good. False on phones/tablets, where they stutter (the address
// bar resizes the viewport, seeking video is expensive) and can feel like the
// page is stuck. `null` until mounted so server and first client render agree.
export function useScrubCapable() {
  const [capable, setCapable] = useState<boolean | null>(null);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const update = () => setCapable(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return capable;
}
