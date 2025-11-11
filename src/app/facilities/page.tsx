import Image from "next/image";
import s from "./_s.module.css";
import bannerI from "@/assets/images/facilities-banner.png";

export default async function Facilities() {
  return (
    <>
      <div className={s.he}>
        <h1>
          DREC
          <span>FACILITIES</span>
        </h1>
        <figure>
            <Image src={bannerI} alt="DREC" />
        </figure>
      </div>
    </>
  );
}
