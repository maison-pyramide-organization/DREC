import s from "./_s.module.css";
import Image from "next/image";
import Ibanner from "@/assets/images/ps-banner.png";
import Link from "next/link";
import StarI from "@/assets/icons/star.svg";
import prps from "@/data/prps";
import PropertyCard from "./components/property/property card";

export default function Properties() {
  return (
    <>
      <div className={s.he}>
        <h1>
          84 PROPERTIES
          <span>7 COMMUNITIES</span>
          15 YEARS OF EXPERIENCE
        </h1>
        <figure>
          <Image src={Ibanner} alt="DREC" />
        </figure>
      </div>

      <div className={s.prs}>
        <h2 className={s.prs_title}>PROPERTIES</h2>
        <Link href="" className={s.prs_saved}>
          <StarI />
          SAVED SEARCHES
        </Link>

        <div className={s.filter}></div>

        <div className={s.intro}>
          <h2>CITYWIDE COMMUNITIES, THOUGHTFULLY MANAGED</h2>
          <p>
            Every DREC address starts with comfort, safety and connection. We
            look beyond buildings to the life around them. With locations close
            to the routes and routines that matter, our communities fit the
            rhythm of daily life.
          </p>
        </div>

        <ul className={s.prs_list}>
          {prps.map((prp, i) => (
            <li key={i}>
              <PropertyCard prp={prp} i={i} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
