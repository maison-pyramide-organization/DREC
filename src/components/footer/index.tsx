import s from "./_s.module.css";
import Link from "next/link";
import Logo from "@/assets/icons/logo2.svg";
import Fb from "@/assets/icons/fb.svg";
import Ig from "@/assets/icons/ig.svg";
import X from "@/assets/icons/x.svg";

const nav = [
  {
    title: "properties",
    links: [
      {
        name: "residential",
        link: "/properties?type=residential",
      },
      {
        name: "commercial",
        link: "/properties?type=commercial",
      },
      {
        name: "retail",
        link: "/properties?type=retail",
      },
      {
        name: "warehouse",
        link: "/properties?type=warehouse",
      },
    ],
  },
  {
    title: "discover",
    links: [
      {
        name: "beach centre",
        link: "/beach-centre",
      },
      {
        name: "about us",
        link: "/about-us",
      },
      {
        name: "good to know",
        link: "/good-to-know",
      },
      {
        name: "facilities",
        link: "/facilities",
      },
    ],
  },
  {
    title: "get in touch",
    links: [
      {
        name: "contact us",
        link: "/contact-us",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={s.f} id="footer">
      <div className={s.f_t}>
        <div className={s.f_lo}>
          <Logo />
        </div>

        <div className={`${s.f_n} d-o`}>
          {nav.map((n) => (
            <div key={n.title} className={s.f_n_c}>
              <h3>{n.title.toUpperCase()}</h3>
              <ul>
                {n.links.map((l) => (
                  <li key={l.name}>
                    <Link href={l.link}>{l.name.toUpperCase()}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={s.f_b}>
        <div className={s.socials}>
          <a target="_blank" href="https://www.facebook.com/drecuae/">
            <Fb />
          </a>
          <a target="_blank" href="https://www.instagram.com/drecuae">
            <Ig />
          </a>
          <a target="_blank" href="/">
            <X />
          </a>
        </div>

        <div className={s.inq}>
          <h3>NEED FURTHER ASSISTANCE?</h3>
          <p>
            DON’T HESISTATE TO CONTACT US REGARDING ANY INQUIRY YOU MAY HAVE.
          </p>
          <Link href="/contact-us">INQUIRE NOW</Link>
        </div>
      </div>
    </footer>
  );
}
