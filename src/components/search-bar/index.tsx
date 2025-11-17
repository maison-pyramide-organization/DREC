import SearchI from "@/assets/icons/search.svg";
import s from "./_s.module.css";
import { useEffect, useRef } from "react";

interface Iprops {
  onSearch: (text: string) => void;
}

export default function SearchBar(props: Iprops) {
  const { onSearch } = props;
  const timeoutRef = useRef<number | null>(null);
  const debounceMs = 300;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // clear previous timer
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    // set new timer
    timeoutRef.current = window.setTimeout(() => {
      onSearch(value);
    }, debounceMs);
  };

  // cleanup on unmount
  // (not strictly necessary in many cases but good practice)
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={s.search}>
      <SearchI />
      <input type="text" placeholder="SEARCH" onChange={handleChange} />
    </div>
  );
}
