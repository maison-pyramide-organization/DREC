import s from "./_s.module.css";
import getHighlights from "@/services/api/highlights";

export default async function Highlights() {
  const highlights = await getHighlights();

  return (
    <section className={s.hi}>
      <h1 a-t="r">HIGHLIGHTS</h1>

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
