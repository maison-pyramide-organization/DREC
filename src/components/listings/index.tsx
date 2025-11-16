"use client";
import s from "./_s.module.css";
import FiltersList from "../filters-list";
import SearchBar from "../search-bar";
import PropertyCard from "@/components/property-card";
import { useState } from "react";
import { updateFilters, filterPrps } from "../filters-list/utils/filter";

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

  // store filtered list
  const [filters, setFilters] = useState(initFilters);
  const [filteredProperties, setFilteredProperties] = useState(properties);

  // main filter function

  const handleFilter = (filterName: string, filterValue: any) => {
    // Update filters object only

    const updatedFilters = updateFilters(filters, filterName, filterValue);
    const updatedPrps = filterPrps(updatedFilters, properties);

    setFilters(updatedFilters);
    setFilteredProperties(updatedPrps);
  };

  const handleClear = () => {
    setFilters(initFilters);
    setFilteredProperties(properties);
  };

  return (
    <div className={s.listings}>
      <div className={s.listings_h}>
        <div className={s.l}>
          <SearchBar />
        </div>
        <div className={s.r}>
          <FiltersList onFilter={handleFilter} onClear={handleClear} />
        </div>
      </div>
      <div className={s.listings_intro}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <ul className={s.prps}>
        {filteredProperties.map((prp, i) => (
          <li key={i}>
            <PropertyCard prp={prp} i={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}
