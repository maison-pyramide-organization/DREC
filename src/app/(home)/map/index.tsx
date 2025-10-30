"use client";

import s from "./_s.module.css";
import Image from "next/image";
import map from "@/assets/images/map.png";
import { useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import { disableScrolling, enableScrolling } from "@/utils/scrolling";
import Popup from "../map/Popup";

export default function Map() {
  const [isOpened, setIsOpened] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded) return <p>Loading map…</p>;

  const closePopup = () => {
    setIsOpened(false);
    enableScrolling();
  };
  const handleClick = () => {
    setIsOpened(true);
    disableScrolling();
    $cursor.classList.add("close");
  };

  const $cursor = document?.getElementById("cursor") as any;

  function show() {
    $cursor.classList.add("v");
  }
  function hide() {
    $cursor.classList.remove("v");
  }

  return (
    <>
      <section className={s.map}>
        <h2>
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
