import { useState, useEffect, useRef } from "react";

export function useBreakpoint(bp = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < bp);
  const [activeIndex, setActiveIndex] = useState(null);
  const activeIndexRef = useRef(null);

  // Keep ref in sync so resize handler can read latest value
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const handler = () => {
      const mobile = window.innerWidth < bp;
      setIsMobile(prev => {
        if (prev !== mobile) {
          // Context lock: transfer active index across breakpoint
          // activeIndex is already in state, accordion reads it directly
          return mobile;
        }
        return prev;
      });
    };

    const resizeObserver = new ResizeObserver(handler);
    resizeObserver.observe(document.documentElement);

    return () => resizeObserver.disconnect();
  }, [bp]);

  return { isMobile, activeIndex, setActiveIndex };
}