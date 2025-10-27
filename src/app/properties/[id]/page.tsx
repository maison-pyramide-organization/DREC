import s from "./_s.module.css";

import StarI from "@/assets/icons/star.svg";
import Info from "./info";
import Gallery from "./gallery";
import Cursor from "@/components/cursor";
import { getPropertyById } from "@/services/api/properties";

export default async function Property(props: any) {
  const { params } = props;

  const { id } = await params;

  const prp = await getPropertyById(id);

  return (
    <>
      <div className={s.prp}>
        <h1>
          {prp?.name}
          <br />
          {prp?.location}
        </h1>

        <section className={s.prp_g}>
          <Gallery gallery={prp.gallery} />
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
            {/* <p className={s.data_com}>{prp?.community}</p> */}
          </div>
        </section>
      </div>
      <Cursor />
    </>
  );
}
