import s from "./_s.module.css";
import { Filter } from "./filter";
import { useEffect, useState } from "react";
import { areas, prpType } from "@/data/filters";

export default function FiltersList(props: any) {
  const { onFilter } = props;

  const [openedF, setOpenedF] = useState<any>(null);

  const openF = (name) => {
    if (name == openedF) setOpenedF(null);
    else setOpenedF(name);
  };

  useEffect(() => {
    const $filters_list = document.getElementById("filters") as HTMLElement;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if ($filters_list.contains(target)) return;
      else setOpenedF(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    if (!target.name || !target.value) return;
    onFilter(target.name, target.value);
  };

  return (
    <div
      id="filters"
      className={s["filters-list"]}
      onChange={handleFilterChange}
    >
      <Filter
        name="area"
        options={areas}
        active={openedF === "area"}
        open={openF}
      />
      <Filter
        name="property-type"
        options={prpType}
        active={openedF === "property-type"}
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
  );
}
