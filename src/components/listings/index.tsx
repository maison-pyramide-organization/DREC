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

interface Iprops {
  title: string;
  description: string;
  properties: any[];
}

const initFilters = {
  area: null,
  type: null,
  bedrooms: null,
  min_price: null,
  max_price: null,
};

export default function Listings(props: Iprops) {
  const { title, description, properties } = props;

  const savedIds = getSavedIds();
  let savedPrps = properties.filter((prp) => savedIds.includes(prp.id));

  const [saveView, setSaveView] = useState(false);
  const [filters, setFilters] = useState(initFilters);
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  useEffect(() => {
    //reset filters
    setFilters(initFilters);
    //set filteredPrps
    if (saveView) setFilteredProperties(savedPrps);
    else setFilteredProperties(properties);
  }, [saveView]);

  // main filter function

  const handleFilter = (filterName: string, filterValue: any) => {
    // Update filters object only

    const updatedFilters = updateFilters(filters, filterName, filterValue);
    const updatedPrps = filterPrps(updatedFilters, properties);

    setFilters(updatedFilters);
    setFilteredProperties(updatedPrps);
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
