import s from "./_s.module.css";
import Image from "next/image";
import bannerI from "@/assets/images/ps-banner.png";
import getProperties from "@/services/api/properties";
import Listings from "@/components/listings";
import Animation from "./_animation";
// import { headers } from "next/headers";

export default async function Properties({ searchParams }) {
  let properties = await getProperties();
  const sp = await searchParams;
  const type = sp?.type?.toLowerCase();
  if (type)
    properties = properties.filter((prp) => prp.type.toLowerCase() == type);

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
        <h1 g-s="ti">
          <span>46 PROPERTIES</span>
          <span className={s.m}>15 LOCATIONS</span>
          <span>30+ YEARS OF EXPERIENCE</span>
        </h1>
        <figure className={s["b-f"]}>
          <Image src={bannerI} alt="DREC" />
        </figure>
      </div>

      <div className={s.prs}>
        <h2 className={s.prs_title}>PROPERTIES</h2>
        <Listings
          title={title}
          description={description}
          properties={properties}
        />
      </div>
      <Animation />
    </>
  );
}
