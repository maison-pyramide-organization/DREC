"use client";

import s from "./_s.module.css";
import Link from "next/link";
import Logo from "@/assets/icons/logo.svg";
import Menu from "./menu";
import { useState } from "react";
import Animation from "./_animation";

export default function Header() {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(!isOpened);
    document.body.classList.toggle("d-s");
  };
  return (
    <>
      <header id="h">
        <Link href="/" className={`${s.lo} y_`}>
          <Logo g-s="he_lo" />
        </Link>

        <div className={`${s.t} y_`}>
          <span g-s="he_t">
            A SUBSIDIARY OF <br /> A.R.M. HOLDING
          </span>
        </div>

        <div className={s.menu_}>
          <button id="menu-btn" onClick={handleClick} g-s="mb">
            <div className={`${s.menu_i} ${isOpened ? s.open : ""}`}>
              <span></span>
              <span></span>
            </div>
          </button>

          <Menu close={handleClick} isOpened={isOpened} />
        </div>
      </header>
      <Animation isOpened={isOpened} />
    </>
  );
}
