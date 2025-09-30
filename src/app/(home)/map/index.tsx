"use client";

import s from "./_s.module.css";
import Image from "next/image";
import map from "@/assets/images/map.png";
import { useLoadScript } from "@react-google-maps/api";
import { useRef, useState } from "react";
import Popup from "./popup";
import { disableScrolling, enableScrolling } from "@/utils/scrolling";
import Iplus from "@/assets/icons/plus.svg";

export default function Map() {
  const [isOpened, setIsOpened] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const closePopup = () => {
    setIsOpened(false);
    enableScrolling();
  };
  const handleClick = () => {
    setIsOpened(true);
    disableScrolling();
  };

  const cursorRef = useRef(null);

  function show() {
    const $cursor = cursorRef.current as any;
    $cursor.style.opacity = "1";
  }
  function hide() {
    console.log("left");
    const $cursor = cursorRef.current as any;
    $cursor.style.opacity = "0";
  }
  function move(e: any) {
    const $cursor = cursorRef.current as any;
    let x = e.clientX;
    let y = e.clientY;
    $cursor.style.left = `${x}px`;
    $cursor.style.top = `${y}px`;
  }

  if (!isLoaded) return <p>Loading map…</p>;
  return (
    <>
      <div className={s.test} onMouseMove={move}>
        <div id="map-cursor" className={s.cursor} ref={cursorRef}>
          <Iplus />
        </div>
      </div>
      <section className={s.map}>
        <h2>
          LIFE WELL <br />
          PLACED
        </h2>
        <div
          className={s.mb}
          onClick={handleClick}
          // onMouseEnter={show}
          onMouseMove={move}
          // onMouseLeave={hide}
        >
          {/* <div id="map-cursor" className={s.cursor} ref={cursorRef}>
          <Iplus />
        </div> */}
        </div>
        <figure>
          <Image src={map} alt="DREC Map" />
        </figure>
        {isOpened && <Popup closePopup={closePopup} />}
      </section>
    </>
  );
}
