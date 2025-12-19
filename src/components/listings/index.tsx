"use client";
import s from "./_s.module.css";
import StarI from "@/assets/icons/star.svg";
import FiltersI from "@/assets/icons/filters.svg";
import FiltersList from "../filters-list";
import SearchBar from "../search-bar";
import PropertyCard from "@/components/property-card";
import { useEffect, useState } from "react";
import { updateFilters, filterPrps } from "./utils/filter";
import { getSavedIds } from "./utils/saved";
import prpTypes from "@/data/prp-types";
import { useSearchParams, useRouter } from "next/navigation";

interface Iprops {
  title: string;
  description: string;
  properties: any[];
  type?: string;
  showF?: boolean;
}

const initFilters: any = {
  area: null,
  type: null,
  bedrooms: null,
  min_price: null,
  max_price: null,
};

export default function Listings(props: Iprops) {
  let { title, description, properties, showF = true } = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const initType = searchParams?.get("type");

  const savedIds = getSavedIds();
  let savedPrps = properties.filter((prp) => savedIds.includes(prp.id));

  const [saveView, setSaveView] = useState(false);
  const [filters, setFilters] = useState(initFilters);
  const [filteredProperties, setFilteredProperties] = useState(properties);

  let type = filters.type || initType;

  if (type) {
    type = type.toLowerCase();
    title = prpTypes[type].title;
    description = prpTypes[type].description;
  }

  useEffect(() => {
    //reset filters
    if (saveView) setFilters(initFilters);
    //set filteredPrps
    if (saveView) setFilteredProperties(savedPrps);
    else setFilteredProperties(properties);
  }, [saveView]);

  useEffect(() => {
    if (!initType) return;

    const fprps = initType
      ? properties.filter((prp) => prp.type.toLowerCase() === initType)
      : properties;

    setFilteredProperties(fprps);
    setFilters({ ...initFilters, type: initType });
  }, []);

  // MAIN FILTER FUNCTION
  const handleFilter = (filterName: string, filterValue: any) => {
    const updatedFilters = updateFilters(filters, filterName, filterValue);
    const updatedPrps = filterPrps(updatedFilters, properties);

    setFilters(updatedFilters);
    setFilteredProperties(updatedPrps);

    if (filterName == "type") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("type", filterValue?.toLowerCase());
      router.replace(`/properties?${params.toString()}`, { scroll: false });
    }
  };

  const handleSearch = (text) => {
    const q = text.toLowerCase();
    if (!q) setFilteredProperties(properties);

    const result = properties.filter(
      (prp) =>
        prp.type?.toLowerCase().includes(q) ||
        prp.location?.toLowerCase().includes(q) ||
        prp.name?.toLowerCase().includes(q) ||
        Number(prp.index) == Number(q)
    );

    setFilteredProperties(result);
    // console.log("r", result);
  };

  const handleClear = () => {
    setFilters(initFilters);
    setFilteredProperties(properties);
  };

  const toogleView = () => {
    setSaveView((prev) => !prev);
  };

  const handleBtnClick = () => {
    const $fl = document.getElementById("filters");
    $fl?.classList.toggle("active");
  };

  return (
    <div className={s.listings}>
      <button
        type="button"
        className={`${saveView ? s.active : ""}`}
        onClick={toogleView}
      >
        <StarI />
        SAVED SEARCHES
      </button>

      {/* FILTERS AND SEARCH */}
      {showF && (
        <div className={s.listings_h}>
          <div className={s.l}>
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className={s.r}>
            <FiltersList
              onFilter={handleFilter}
              onClear={handleClear}
              filters={filters}
            />
          </div>
          <button className={`m-o`} onClick={handleBtnClick}>
            Filters
            <FiltersI />
          </button>
        </div>
      )}

      {/* TITLE AND DESCRIPTION */}
      <div className={s.listings_intro}>
        <h2>{saveView ? "YOUR SAVED SEARCHES" : title}</h2>
        {!saveView && <p>{description}</p>}
      </div>

      <ul className={s.prps}>
        {filteredProperties.map((prp, i) => (
          <li key={prp.id}>
            <PropertyCard prp={prp} i={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}
