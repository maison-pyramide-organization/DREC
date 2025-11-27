"use client";

import s from "./_s.module.css";
import { useState } from "react";
import Image from "next/image";
import map from "@/assets/images/home/map2.png";
import Popup from "./popup";
import { useLenis } from "lenis/react";

export default function Map() {
  const [isOpened, setIsOpened] = useState(false);
  const lenis = useLenis();

  function closePopup() {
    setIsOpened(false);
    lenis?.start();
  }
  function handleClick() {
    const $cursor = document?.getElementById("cursor") as any;
    setIsOpened(true);
    // disableScrolling();
    lenis?.stop();
    $cursor?.classList.add("close");
  }
  function show() {
    const $cursor = document?.getElementById("cursor") as any;
    $cursor?.classList.add("v");
  }
  function hide() {
    const $cursor = document?.getElementById("cursor") as any;
    $cursor?.classList.remove("v");
  }

  return (
    <>
      <section className={s.map}>
        <h2 a-t="r">
          LIFE WELL <br />
          PLACED
        </h2>
        <div
          className={s.mb}
          onClick={handleClick}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          {isOpened && <Popup closePopup={closePopup} />}
        </div>
        <figure>
          <Image src={map} alt="DREC Map" />
        </figure>
      </section>
    </>
  );
}
