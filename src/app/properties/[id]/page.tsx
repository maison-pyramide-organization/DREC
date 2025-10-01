"use client";
import "swiper/css";

import s from "./_s.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import StarI from "@/assets/icons/star.svg";
import Info from "./info";
import Iprp1 from "@/assets/images/prp1.png";
import Iprp2 from "@/assets/images/prp2.png";
import Iprp3 from "@/assets/images/prp3.png";
import getPrp from "./utils/getPrp";

export default async function Property(props: any) {
  const { params } = props;

  const { id } = await params;
  const prp: any = getPrp(id);

  return (
    <div className={s.prp}>
      <h1>
        {prp?.title}
        <br />
        {prp?.areaTitle}
      </h1>

      <section className={s.prp_g}>
        <Swiper spaceBetween="20rem">
          <SwiperSlide>
            <figure>
              <Image src={Iprp1} alt="" />
            </figure>
          </SwiperSlide>
          <SwiperSlide>
            <figure>
              <Image src={Iprp2} alt="" />
            </figure>
          </SwiperSlide>
          <SwiperSlide>
            <figure>
              <Image src={Iprp3} alt="" />
            </figure>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className={s.prp_data}>
        <div className={s.data_l}>
          <Info prp={prp} />
        </div>
        <div className={s.data_r}>
          <button>
            <StarI />
            SAVE
          </button>
          <p className={s.data_desc}>{prp?.description}</p>
          <p className={s.data_com}>{prp?.community}</p>
        </div>
      </section>
    </div>
  );
}
