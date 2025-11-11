import s from "./_s.module.css";
import Image from "next/image";
import bannerI from "@/assets/images/ps-banner.png";
import Link from "next/link";
import StarI from "@/assets/icons/star.svg";
import getProperties from "@/services/api/properties";
import Listings from "@/components/listings";

export default async function Properties() {
  const properties = await getProperties();
  const title = "CITYWIDE COMMUNITIES, THOUGHTFULLY MANAGED";
  const description = `
            Every DREC address starts with comfort, safety and connection. We
            look beyond buildings to the life around them. With locations close
            to the routes and routines that matter, our communities fit the
            rhythm of daily life.
  `;

  return (
    <>
      <div className={s.he}>
        <h1>
          46 PROPERTIES
          <span>15 LOCATIONS</span>
          30+ YEARS OF EXPERIENCE
        </h1>
        <figure>
          <Image src={bannerI} alt="DREC" />
        </figure>
      </div>

      <div className={s.prs}>
        <h2 className={s.prs_title}>PROPERTIES</h2>
        <Link href="" className={s.prs_saved}>
          <StarI />
          SAVED SEARCHES
        </Link>

        {/* <div className={s.filter}>
          <FiltersList />
        </div> */}

        <Listings
          title={title}
          description={description}
          properties={properties}
        />
      </div>
    </>
  );
}
