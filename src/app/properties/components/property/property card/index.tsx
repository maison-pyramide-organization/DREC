import s from "./_s.module.css";
import Image from "next/image";
import Iprp from "@/assets/images/prp1.png";
import IbedIcon from "@/assets/images/bed-icon.png";
import IbathIcon from "@/assets/images/bath-icon.png";
import IareaIcon from "@/assets/images/area-icon.png";
import StarI from "@/assets/icons/star.svg";
import Link from "next/link";

export default function PropertyCard(props: any) {
  const { prp, i } = props;
  const { images, title, bedrooms, bathrooms, area } = prp;

  return (
    <Link className={s.pc} href={`/properties/${prp.id}`}>
      <span className={s.pc_index}>0{i + 1}</span>
      <div className={s.pc_gallery}>
        <figure>
          <Image src={Iprp} alt={title} />
        </figure>
      </div>
      <div className={s.pc_h}>
        <h3>{title}</h3>
        <button>
          <StarI />
        </button>
      </div>

      <div className={s.pc_features}>
        <div>
          <Image src={IbedIcon} alt="" />
          {bedrooms} bedrooms
        </div>
        <div>
          <Image src={IbathIcon} alt="" />
          {bathrooms} bathrooms
        </div>
        <div>
          <Image src={IareaIcon} alt="" />
          {area} Sq Ft.
        </div>
      </div>
    </Link>
  );
}
