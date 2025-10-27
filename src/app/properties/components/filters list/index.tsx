"use client";

import s from "./_s.module.css";
import SearchI from "@/assets/icons/search.svg";
import { areas, prpType } from "@/data/filters";
import { Filter } from "./filter";
import { useEffect, useState } from "react";

export default function FiltersList() {
  const [openedF, setOpenedF] = useState<any>(null);

  const openF = (name) => {
    if (name == openedF) setOpenedF(null);
    else setOpenedF(name);
  };

  useEffect(()=>{
    // windo
  },[])

  return (
    <div className={s.f}>
      <div className={s.f_l}>
        <SearchI />
        <input type="text" placeholder="SEARCH" />
      </div>
      <div className={s.f_r}>
        <Filter
          name="area"
          options={areas}
          active={openedF === "area"}
          open={openF}
        />
        <Filter
          name="property type"
          options={prpType}
          active={openedF === "property type"}
          open={openF}
        />
        <Filter
          type="range"
          name="bedrooms"
          min={0}
          max={10}
          step={1}
          active={openedF === "bedrooms"}
          open={openF}
        />
        <Filter
          type="range"
          name="price"
          min={10000}
          max={500000}
          step={10000}
          active={openedF === "price"}
          open={openF}
        />
      </div>
    </div>
  );
}
