import SearchI from "@/assets/icons/search.svg";
import s from "./_s.module.css";

export default function SearchBar() {
  return (
    <div className={s.search}>
      <SearchI />
      <input type="text" placeholder="SEARCH" />
    </div>
  );
}
