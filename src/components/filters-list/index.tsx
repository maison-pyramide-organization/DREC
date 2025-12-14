import s from "./_s.module.css";
import { Filter } from "./filter";
import { useEffect, useState } from "react";
import { areas, prpType } from "@/data/filters";
import Iclose from "@ic/close.svg";

export default function FiltersList(props: any) {
  const { onFilter, onClear, filters } = props;
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
    // if (!target.name || !target.value) return;
    onFilter(target.name, target.value);
  };

  const showBedroomsFilter =
    filters.type == "Residential" || filters.type == null;

  return (
    <div
      id="filters"
      className={s["filters-list"]}
      onChange={handleFilterChange}
    >
      <Filter
        name="area"
        type="options"
        options={areas}
        active={openedF === "area"}
        open={openF}
        selected={filters.area}
      />
      <Filter
        text="property type"
        name="type"
        type="options"
        options={prpType}
        active={openedF === "type"}
        open={openF}
        selected={filters.type}
      />
      {showBedroomsFilter && (
        <Filter
          type="range"
          name="bedrooms"
          min={0}
          max={6}
          step={1}
          active={openedF === "bedrooms"}
          open={openF}
          selected={!!filters.bedrooms}
        />
      )}
      <Filter
        type="minmax"
        name="price"
        min={10000}
        max={500000}
        step={10000}
        active={openedF === "price"}
        open={openF}
        selected={!!filters.min_price || !!filters.max_price}
      />
      <button type="button" onClick={onClear}>
        CLEAR FILTERS
        <Iclose />
      </button>
    </div>
  );
}
