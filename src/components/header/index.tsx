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
          <Menu close={handleClick} isOpened={isOpened} />
        </div>
      </header>
      <Animation isOpened={isOpened} />
    </>
  );
}
