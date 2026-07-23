import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Plane, MapPin } from "lucide-react";

const EDGE_THRESHOLD_PX = 150;

// scroll edge detection
function useNearPageEdges() {
  const { pathname } = useLocation();
  const [nearTop, setNearTop] = useState(true);
  const [nearBottom, setNearBottom] = useState(false);

  useEffect(() => {
    let ticking = false;

    function measure() {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      setNearTop(scrollY <= EDGE_THRESHOLD_PX);
      setNearBottom(scrollY + viewportHeight >= pageHeight - EDGE_THRESHOLD_PX);
      ticking = false;
    }

    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    // catches async content growth
    const resizeObserver = new ResizeObserver(onScrollOrResize);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      resizeObserver.disconnect();
    };
  }, [pathname]);

  return { nearTop, nearBottom };
}

// pin-to-plane trail
function FlightPathTrail({
  corner,
  visible,
}: {
  corner: "top-right" | "bottom-left";
  visible: boolean;
}) {
  const isTopRight = corner === "top-right";

  return (
    <div
      className={
        "absolute hidden h-17.5 w-105 text-teal-600/30 transition-opacity duration-500 lg:block " +
        (isTopRight ? "right-6 top-24 " : "bottom-16 left-6 rotate-180 ") +
        (visible ? "opacity-100" : "opacity-0")
      }
    >
      <svg viewBox="0 0 420 70" fill="none" className="h-full w-full">
        <path
          d="M20 16 C 140 16, 200 60, 398 50"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 8"
        />
      </svg>
      <MapPin size={20} className="absolute left-1.5 top-1" />
      <Plane size={24} className="absolute bottom-1 right-1 rotate-[25deg]" />
    </div>
  );
}

export function BackgroundDecoration() {
  const { nearTop, nearBottom } = useNearPageEdges();

  return (
    <div className="pointer-events-none fixed inset-0 z-1 overflow-hidden" aria-hidden="true">
      <FlightPathTrail corner="top-right" visible={nearTop} />
      <FlightPathTrail corner="bottom-left" visible={nearBottom} />
    </div>
  );
}
