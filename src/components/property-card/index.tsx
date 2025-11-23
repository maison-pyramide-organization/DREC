"use client";

import s from "./_s.module.css";
import Image from "next/image";
import IbedIcon from "@im/bed-icon.png";
import IbathIcon from "@im/bath-icon.png";
import IareaIcon from "@im/area-icon.png";
import iProp from "@im/prp1.png";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Ichev from "@ic/chev.svg";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import formatPrice from "@/utils/formatPrice";
import SaveButton from "../save-button";
import { useRouter } from "next/navigation";
// import Ibed from '@/assets/icons/bed.svg'

export default function PropertyCard(props: any) {
  const { prp, i } = props;
  const { gallery, name, bedrooms, bathrooms, area, price } = prp;
  const prpId = prp.id;
  const isFac = prp.type.toLowerCase() == "facilities";
  const router = useRouter();

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

  let href = `/properties/${prpId}`;
  if (prp.type.toLowerCase() == "facilities") href = "";

  const handleClick = (e) => {
    e.preventDefault();
    if (href) router.push(href);
  };

  return (
    <Link href={href} className={s.pc} onClick={handleClick}>
      <span className={s.pc_index}>{i < 9 ? `0${i + 1}` : `${i + 1}`}</span>
      <div className={s.pc_gallery}>
        <Swiper
          slidesPerView={1}
          spaceBetween={0.5}
          roundLengths={true}
          centeredSlides={false}
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
                <img src={`${img.url}?w=600&fm=webp&q=70`} alt={name} />
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
          {!isFac && <p>{formatPrice(price)}</p>}
        </div>
        <div className={s.pc_sb}>
          <SaveButton prpId={prpId} wt={false} />
        </div>
      </div>

      <div className={s.pc_features}>
        {bedrooms && (
          <div>
            <Image src={IbedIcon} alt="" />
            {/* <Ibed/> */}
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
