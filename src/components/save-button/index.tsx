"use client";

import { useEffect, useState } from "react";
import s from "./_s.module.css";
import StarI from "@/assets/icons/star.svg";
import { isSavedId, toggleSavedPropertyId } from "../listings/utils/saved";

interface Iprops {
  prpId: string;
  wt: boolean;
}

export default function (props: Iprops) {
  const { prpId, wt } = props;
  const [isSaved, setIsSaved] = useState(false);

  const handleClick = (e) => {
    e.preventDefault(); // stop the href navigation
    e.stopPropagation(); // stop bubbling to the <a>
    toggleSavedPropertyId(prpId);
    setIsSaved((prev) => !prev);
  };

  useEffect(() => {
    const x = isSavedId(prpId);
    setIsSaved(x); // runs only in browser
  }, []);

  return (
    <button
      className={`${s.btn} ${isSaved ? s.saved : ""}`}
      onClick={handleClick}
    >
      <StarI />
      {wt && <span>{isSaved ? "SAVED" : "SAVE"}</span>}
    </button>
  );
}
