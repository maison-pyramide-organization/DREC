import Image from "next/image";
import s from "./_s.module.css";
import bannerI from "@/assets/images/facilities-banner.png";
import Listings from "@/components/listings";
import { getFacilities } from "@/services/api/properties";
import Animation from "./_animation";

export default async function Facilities() {
  const title = `
    Built around care, learning, and community
  `;
  const desc = `
    From education to wellbeing, DREC facilities are designed to enrich daily life. Our schools, healthcare centers, and community spaces bring quality and convenience closer to home, creating places where families can learn, grow, and thrive together.
  `;
  const fac = await getFacilities();

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

        <div className={s.prps}>
          <Listings title={title} description={desc} properties={fac} showF={false} />
        </div>
      </div>
      <Animation />
    </>
  );
}
