"use client";
import s from "./_s.module.css";
import StarI from "@/assets/icons/star.svg";
import FiltersList from "../filters-list";
import SearchBar from "../search-bar";
import PropertyCard from "@/components/property-card";
import { useEffect, useState } from "react";
import { updateFilters, filterPrps } from "./utils/filter";
import { getSavedIds } from "./utils/saved";
import places from "@/data/places";

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
  const { title, description, properties: prps } = props;

  useEffect(() => {
    const x = properties.map((prp) => {
      const link = prp.googleMapsLink;
      const latLng = extractLatLng(link);
      return {
        name: prp.name.toLowerCase(),
        link: prp.googleMapsLink,
        lng: latLng?.lng,
        lat: latLng?.lat,
      };
    });

    const map = new Map();
    x.forEach((prp) => {
      const key = prp.name.toLowerCase();

      const lng = prp?.lng;
      const lat = prp?.lat;

      map.set(key, {
        name: key,
        link: prp.link,
        lng,
        lat,
        gml: createGML(lat, lng),
      });
    });

    const deduplicatedArray = Array.from(map.values());

    console.log(deduplicatedArray);
    function extractLatLng(iframe) {
      // Match the Google Maps embed URL inside the iframe
      const srcMatch = iframe.match(/src="([^"]+)"/);
      if (!srcMatch) return null;

      const url = srcMatch[1];

      // Match latitude and longitude in the URL (look for "!3dLAT!2dLNG" pattern)
      const latMatch = url.match(/!3d([-\d.]+)!2d([-\d.]+)/);
      if (latMatch) {
        return {
          lat: parseFloat(latMatch[1]),
          lng: parseFloat(latMatch[2]),
        };
      }

      // Some URLs might have "!2dLNG!3dLAT" pattern instead
      const altMatch = url.match(/!2d([-\d.]+)!3d([-\d.]+)/);
      if (altMatch) {
        return {
          lat: parseFloat(altMatch[2]),
          lng: parseFloat(altMatch[1]),
        };
      }

      return null; // if no coordinates found
    }
    function createGML(lat, lng) {
      return `https://www.google.com/maps?q=${lat},${lng}`;
    }
    function arrayToCSV(data, filename = "data.csv") {
      if (!data || !data.length) {
        console.error("Empty array provided");
        return;
      }

      // Get the headers (keys of the first object)
      const headers = Object.keys(data[0]) as any;
      const csvRows = [] as any;

      // Add headers row
      csvRows.push(headers.join(","));

      // Add data rows
      for (const row of data) {
        const values = headers.map((header) => {
          const val =
            row[header] === null || row[header] === undefined
              ? ""
              : row[header];
          // Escape quotes
          return `"${String(val).replace(/"/g, '""')}"`;
        });
        csvRows.push(values.join(","));
      }

      const csvString = csvRows.join("\n");

      // Create a Blob and download it
      const blob = new Blob([csvString], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", filename);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    // Example usage:

    arrayToCSV(places, "users.csv");

    // Output: { lat: 25.1826168, lng: 55.0928353 }
  }, []);

  let properties = prps;
  const savedIds = getSavedIds();
  let savedPrps = properties.filter((prp) => savedIds.includes(prp.id));

  const [saveView, setSaveView] = useState(false);
  const [filters, setFilters] = useState(initFilters);
  const [filteredProperties, setFilteredProperties] = useState(properties);

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
      </div>

      {/* TITLE AND DESCRIPTION */}
      <div className={s.listings_intro}>
        <h2>{saveView ? "YOUR SAVED SEARCHES" : title}</h2>
        {!saveView && <p>{description}</p>}
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
