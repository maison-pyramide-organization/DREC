"use client";

import { useRef, useState } from "react";
import s from "./_s.module.css";
import AddI from "@/assets/icons/plus.svg";
import MinusI from "@/assets/icons/minus.svg";

export default function Accordion(props: any) {
  const { title, children } = props;
  const [active, setActive] = useState(false);
  const itemBodyW = useRef<any>(null);

  const handleClick = () => {
    const $itemBodyW = itemBodyW.current;
    if (!active) {
      const itemBodyH = $itemBodyW.firstChild.clientHeight;
      $itemBodyW.style.height = `${itemBodyH}px`;
    } else {
      $itemBodyW.style.height = `0px`;
    }
    setActive(!active);
  };

  return (
    <div onClick={handleClick}>
      <div className={s.item_t}>
        <span>{title}</span>
        {active ? <MinusI /> : <AddI />}
      </div>

      <div className={s.item_b_} ref={itemBodyW}>
        <div className={s.item_b}>{children}</div>
      </div>
    </div>
  );
}
