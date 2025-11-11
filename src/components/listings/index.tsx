"use client";
import s from "./_s.module.css";
import FiltersList from "../filters-list";
import SearchBar from "../search-bar";
import PropertyCard from "@/components/property-card";
import { useState } from "react";

interface Iprops {
  title: string;
  description: string;
  properties: any[];
}

export default function Listings(props: Iprops) {
  const { title, description, properties } = props;

  // store filtered list
  const [filteredProperties, setFilteredProperties] = useState(properties);

  // main filter function
  const handleFilter = (filterName: string, filterValue: any) => {
    let result = [...properties];
    // console.log("hf",filterName, filterValue);

    switch (filterName) {
      case "area":
        result = result.filter(
          (prp) => prp.location.toLowerCase() === filterValue.toLowerCase()
        );
        break;

      case "property-type":
        result = result.filter(
          (prp) => prp.type.toLowerCase() === filterValue.toLowerCase()
        );
        break;

      case "bedrooms":
        result = result.filter((prp) => prp.bedrooms === Number(filterValue));
        break;

      case "price":
        const [min, max] = filterValue; // e.g. [1000, 3000]
        result = result.filter((prp) => prp.price >= min && prp.price <= max);
        break;

      default:
        break;
    }

    setFilteredProperties(result);
  };

  return (
    <div className={s.listings}>
      <div className={s.listings_h}>
        <div className={s.l}>
          <SearchBar />
        </div>
        <div className={s.r}>
          <FiltersList onFilter={handleFilter} />
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
