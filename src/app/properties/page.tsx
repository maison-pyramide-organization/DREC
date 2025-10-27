import s from "./_s.module.css";
import Image from "next/image";
import Ibanner from "@/assets/images/ps-banner.png";
import Link from "next/link";
import StarI from "@/assets/icons/star.svg";
import PropertyCard from "./components/property card";
import FiltersList from "./components/filters list";
import getProperties from "@/services/api/properties";

export default async function Properties() {
  const properties = await getProperties();

  return (
    <>
      <div className={s.he}>
        <h1>
          46 PROPERTIES
          <span>15 LOCATIONS</span>
          30+ YEARS OF EXPERIENCE
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

        <div className={s.filter}>
          <FiltersList />
        </div>

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
          {properties.map((prp, i) => (
            <li key={i}>
              <PropertyCard prp={prp} i={i} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
