import s from "./_s.module.css";
import Link from "next/link";

interface Iprops {
  close: () => void;
  isOpened: boolean;
}

export default function Menu(props: Iprops) {
  const { close, isOpened } = props;

  const links = [
    { name: "properties", link: "/properties" },
    { name: "beach centre", link: "/beach-centre" },
    { name: "good to know", link: "/good-to-know" },
    { name: "about us", link: "/about-us" },
    { name: "contact us", link: "/contact-us" },
  ];

  return (
    <div id="menu" className={`${s.menu} ${isOpened ? "opened" : ""}`}>
      <ul>
        {links.map((l, i) => (
          <li key={i}>
            <Link href={l.link} onClick={close}>
              <div className="y_">
                <span g-s="y">{l.name}</span>
              </div>
              <div g-s="i" className="y_">
                <span g-s="y">0{i + 1}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
