import s from "./_s.module.css";
import FiltersList from "../filters-list";
import SearchBar from "../search-bar";
import PropertyCard from "@/components/property-card";

interface Iprops {
  title: string;
  description: string;
  properties: any[];
}

export default function Listings(props: Iprops) {
  const { title, description, properties } = props;

  return (
    <div className={s.listings}>
      <div className={s.listings_h}>
        <div className={s.l}>
          <SearchBar />
        </div>
        <div className={s.r}>
          <FiltersList />
        </div>
      </div>
      <div className={s.listings_intro}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <ul className={s.prps}>
        {properties.map((prp, i) => (
          <li key={i}>
            <PropertyCard prp={prp} i={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}
