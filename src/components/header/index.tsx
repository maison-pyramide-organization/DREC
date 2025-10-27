"use client";

import s from "./_s.module.css";
import Link from "next/link";
import Logo from "@/assets/icons/logo.svg";
import Menu from "./menu";
import { useState } from "react";

export default function Header() {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(!isOpened);
    document.body.classList.toggle("d-s");
  };
  return (
    <>
      <header id="h">
        <Link href="/" className={s.lo}>
          <Logo />
        </Link>
        <div className={s.t}>A SUBSIDIARY OF A.R.M. HOLDING</div>
        <div className={s.menu_}>
          <button id="menu-btn" onClick={handleClick}>
            <div className={`${s.menu_i} ${isOpened ? s.open : ""}`}>
              <span></span>
              <span></span>
            </div>
          </button>
          {isOpened && <Menu close={handleClick} />}
        </div>
      </header>
    </>
  );
}
