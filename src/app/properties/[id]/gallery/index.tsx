"use client";
import s from "./_s.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import Ichev from "@/assets/icons/chev.svg";
import { Navigation } from "swiper/modules";
import iProp1 from "@/assets/images/prp1.png";
import iProp2 from "@/assets/images/prp2.png";
import iProp3 from "@/assets/images/prp3.png";

export default function Gallery(props: any) {
  let { gallery } = props;

  if (gallery.items.length == 0) {
    gallery.items = [iProp1, iProp2, iProp3];
  }

  const galleryR = useRef(null);

  const layout2 = gallery.items.length == 2;

  const [slide, setSlide] = useState(-1);

  const onContainerClick = (e: any) => {
    if (e.currentTarget == e.target) {
      setSlide(-1);
      const $cursor = document.getElementById("cursor") as any;
      $cursor.classList.remove("v", "close");
    }
    document.body.classList.remove("d-s");
  };

  const onEnter = () => {
    const $cursor = document.getElementById("cursor") as any;
    $cursor.classList.add("v");
  };

  const onLeave = () => {
    const $cursor = document.getElementById("cursor") as any;
    if (slide == -1) {
      $cursor.classList.remove("v");
    }
  };

  // const onSlideEnter = () => {};

  const onImageClick = (i) => {
    setSlide(i);
    const $cursor = document.getElementById("cursor") as any;
    $cursor.classList.add("v", "close");
    document.body.classList.add("d-s");
  };

  const onNavEnter = () => {
    const $cursor = document.getElementById("cursor") as any;
    $cursor.classList.remove("v");
  };
  const onNavLeave = () => {
    const $cursor = document.getElementById("cursor") as any;
    $cursor.classList.add("v");
  };

  useEffect(() => {
    const updateGalleryScroll = () => {
      const $gallery = galleryR.current! as HTMLElement;
      const midpoint = $gallery.scrollWidth - window.visualViewport!.width;
      if (midpoint) $gallery.scroll(midpoint / 2, 0);
    };
    if (!layout2) updateGalleryScroll();

    const handleMove = (e) => {
      const box = document.getElementById("g");
      const $cursor = document.getElementById("cursor") as any;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (box && el && box.contains(el)) $cursor.classList.add("v");

      // remove after the first run
      window.removeEventListener("mousemove", handleMove);
    };

    window.addEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      <div className={`${s.g_} h-s`} ref={galleryR}>
        <div className={`${s.g} ${layout2 ? s.l2 : ""}`} id="g">
          {gallery.items.map((img, i) => (
            <figure
              a-i="r"
              key={i}
              onClick={() => onImageClick(i)}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              <img src={`${img.url}?w=1000&fm=webp&q=90` || img} alt="" />
            </figure>
          ))}
        </div>

        {/* ZOOMED GALLERY POPUP */}
        {slide >= 0 && (
          <div className={s.gp_} onClick={onContainerClick}>
            <div
              className={s.gp}
              onMouseEnter={onNavEnter}
              onMouseLeave={onNavLeave}
            >
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                initialSlide={slide}
                allowTouchMove={false}
                navigation={{ nextEl: "#gp-next-btn", prevEl: "#gp-prev-btn" }}
              >
                {gallery.items.map((img, i) => (
                  <SwiperSlide key={i}>
                    <figure>
                      <img
                        src={`${img.url}?w=1500&fm=webp&q=100` || img}
                        alt=""
                      />
                    </figure>
                  </SwiperSlide>
                ))}
              </Swiper>
              <nav className={s.gp_n}>
                <button id="gp-prev-btn">
                  <Ichev />
                </button>
                <button id="gp-next-btn">
                  <Ichev />
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
