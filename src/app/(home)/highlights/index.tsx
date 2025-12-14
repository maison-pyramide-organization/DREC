"use client";

import s from "./_s.module.css";
import Ichev from "@a/icons/chev.svg";

export default function Highlights(props) {
  const { highlights } = props;

  const handleClick = (e) => {
    const isNext = e.currentTarget.dataset.d === "nxt";
    const $list = document.querySelector("#hi ul");
    const $firstItem = document.querySelector("#hi li") as HTMLElement;

    if (!$list || !$firstItem) return;

    const step = $firstItem.offsetWidth;

    if (isNext) {
      $list.scrollBy({ left: step, behavior: "smooth" });
    } else {
      $list.scrollBy({ left: -step, behavior: "smooth" });
    }
  };

  return (
    <section id="hi" className={s.hi}>
      <h1 a-t="r">HIGHLIGHTS</h1>
      <nav>
        <Ichev data-d="prv" onClick={handleClick} />
        <Ichev data-d="nxt" onClick={handleClick} />
      </nav>
      <ul className="h-s">
        {highlights.map((hi) => (
          <li key={hi.title}>
            <figure a-i="r">
              <img
                src={`${hi.image.url}?w=1500&fm=webp&q=100`}
                alt={hi.image.description || "DREC"}
              />
            </figure>
            <div className={s.type} a-t="r">
              {hi.type}
            </div>
            <div className={s.b}>
              <h3 a-t="r">{hi.title}</h3>
              <p a-t="r">{hi.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
