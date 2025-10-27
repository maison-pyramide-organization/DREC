"use client";

import s from "./_s.module.css";
import Image from "next/image";
import IbedIcon from "@/assets/images/bed-icon.png";
import IbathIcon from "@/assets/images/bath-icon.png";
import IareaIcon from "@/assets/images/area-icon.png";
import StarI from "@/assets/icons/star.svg";
import iProp from "@/assets/images/prp1.png";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Ichev from "@/assets/icons/chev.svg";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import formatPrice from "@/utils/formatPrice";

export default function PropertyCard(props: any) {
  const { prp, i } = props;
  const { gallery, name, bedrooms, bathrooms, area, price } = prp;
  const prpId = prp._system_.id;

  const onNavBtnClick = (e) => {
    e.preventDefault(); // stop the href navigation
    e.stopPropagation(); // stop bubbling to the <a>
  };

  const nextBtnRef = useRef(null);
  const prevBtnRef = useRef(null);
  const swiperRef = useRef<any>(null);

  const onBeforeInit = (swiper) => {
    if (typeof swiper.params !== "undefined") {
      swiper.params.navigation.prevEl = prevBtnRef.current;
      swiper.params.navigation.nextEl = nextBtnRef.current;
    }
  };

  return (
    <Link className={s.pc} href={`/properties/${prpId}`}>
      <span className={s.pc_index}>0{i + 1}</span>
      <div className={s.pc_gallery}>
        <Swiper
          slidesPerView={1}
          modules={[Navigation]}
          onBeforeInit={onBeforeInit}
          onSwiper={(sw) => {
            swiperRef.current = sw;
            setTimeout(() => {
              try {
                sw.navigation?.init();
                sw.navigation?.update();
              } catch (err) {}
            }, 0);
          }}
        >
          {gallery.items.length == 0 && (
            <SwiperSlide>
              <figure>
                <Image src={iProp} alt={name} />
              </figure>
            </SwiperSlide>
          )}
          {gallery.items.map((img) => (
            <SwiperSlide>
              <figure>
                <img src={img.url} alt={name} />
              </figure>
            </SwiperSlide>
          ))}
          <div className={s.pc_nav}>
            <button onClick={onNavBtnClick} ref={prevBtnRef}>
              <Ichev />
            </button>
            <button onClick={onNavBtnClick} ref={nextBtnRef}>
              <Ichev />
            </button>
          </div>
        </Swiper>
      </div>
      <div className={s.pc_h}>
        <div>
          <h3>{name}</h3>
          <p>{formatPrice(price)}</p>
        </div>
        <button>
          <StarI />
        </button>
      </div>

      <div className={s.pc_features}>
        {bedrooms && (
          <div>
            <Image src={IbedIcon} alt="" />
            {bedrooms} bedrooms
          </div>
        )}
        {bathrooms && (
          <div>
            <Image src={IbathIcon} alt="" />
            {bathrooms} bathrooms
          </div>
        )}
        {area && (
          <div>
            <Image src={IareaIcon} alt="" />
            {area} Sq Ft.
          </div>
        )}
      </div>
    </Link>
  );
}
