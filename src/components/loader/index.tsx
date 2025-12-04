"use client";

import { useContext, useEffect, useRef } from "react";
import s from "./_s.module.css";
import { WindowContext } from "@/contexts/windowContext";

export default function Loader() {
  const { loaderEnded, endLoader } = useContext(WindowContext);

  const vidR = useRef(null);

  useEffect(() => {
    const $vid = vidR.current! as HTMLVideoElement;
    if (!$vid) return;
    $vid.addEventListener("ended", endLoader);
    $vid.play();
    return () => $vid.removeEventListener("ended", endLoader);
  }, []);

  return (
    <div className={loaderEnded ? `${s.end} ${s.lo}` : `${s.lo}`}>
      <video className={s.v} g-s="lo-v" muted ref={vidR}>
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
