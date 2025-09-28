import Link from "next/link";
import s from "./_s.module.css";
import Logo from "@/assets/icons/logo.svg";

export default function Header() {
  return (
    <>
      <header id="h">
        <Link href="/" className={s.lo}>
          <Logo />
        </Link>
        <div className={s.t}>A SUBSIDIARY OF A.R.M. HOLDING</div>
        <div className={s.menu_}>
          <button id="menu-btn">
            <div className={s.menu_i}>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </header>
    </>
  );
}
