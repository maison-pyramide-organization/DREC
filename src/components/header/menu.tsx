import s from "./_s.module.css";
import Link from "next/link";

export default function Menu(props: any) {
  const { close } = props;
  const links = [
    { name: "properties", link: "/properties" },
    { name: "beach center", link: "/beach-center" },
    { name: "good to know", link: "/good-to-know" },
    { name: "about us", link: "/about-us" },
    { name: "contact us", link: "/contact-us" },
  ];

  return (
    <div className={s.menu}>
      <ul>
        {links.map((l, i) => (
          <li key={i}>
            <Link href={l.link} onClick={close}>
              {l.name}
              <span>0{i + 1}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
