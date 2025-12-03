"use client";

import { useContext, useEffect, useRef } from "react";
import s from "./_s.module.css";
import Iplus from "@/assets/icons/plus.svg";
import { WindowContext } from "@/contexts/windowContext";

export default function Cursor() {
  const cursorRef = useRef(null);
  const { isMobile } = useContext(WindowContext);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currX = useRef(0);
  const currY = useRef(0);
  const ease = 0.5;
  const size = 34;

  useEffect(() => {
    let rafId = 0;
    const $cursor = cursorRef.current as any;

    function animate() {
      if (!$cursor) return;

      // interpolate
      currX.current += (mouseX.current - currX.current) * ease;
      currY.current += (mouseY.current - currY.current) * ease;

      // translate using transform (GPU-friendly)
      const tx = Math.round(currX.current - size / 2);
      const ty = Math.round(currY.current - size / 2);
      $cursor.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;

      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    function onDocMove(e: MouseEvent) {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    }
    document.addEventListener("mousemove", onDocMove, { passive: true });

    return () => {
      // cleanup
      document.removeEventListener("mousemove", onDocMove);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div id="cursor" className={s.cursor} ref={cursorRef}>
      <Iplus />
    </div>
  );
}
