"use client";

import { useContext, useEffect, useRef } from "react";
import s from "./_s.module.css";
import { WindowContext } from "@/contexts/windowContext";
import { usePathname } from "next/navigation";

export default function Loader() {
  const { loaderEnded, endLoader } = useContext(WindowContext);
  const path = usePathname();
  const vidR = useRef(null);

  useEffect(() => {
    if (path == "/beach-centre") {
      endLoader();
      return;
    }
    const $vid = vidR.current! as HTMLVideoElement;
    if (!$vid) return;
    $vid.addEventListener("ended", endLoader);
    $vid.play();
    return () => $vid.removeEventListener("ended", endLoader);
  }, []);

  return (
    <div className={loaderEnded ? `${s.end} ${s.lo}` : `${s.lo}`}>
      <video className={s.v} g-s="lo-v" muted playsInline ref={vidR}>
        <source type="video/mp4" />

        <source
          src="/videos/lo-m.mp4"
          type="video/mp4"
          media="(max-width: 769px)"
        />
        <source
          src="/videos/lo.mp4"
          type="video/mp4"
          media="(min-width: 770px)"
        />
      </video>
    </div>
  );
}
