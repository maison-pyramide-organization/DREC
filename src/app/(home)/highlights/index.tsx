import s from "./_s.module.css";
import getHighlights from "@/services/api/highlights";

export default async function Highlights() {
  const highlights = await getHighlights();

  return (
    <section className={s.hi}>
      <h1>HIGHLIGHTS</h1>

      <ul className="h-s">
        {highlights.map((hi) => (
          <li key={hi.title}>
            <figure>
              <img src={`${hi.image.url}?w=1500&fm=webp&q=100`} alt={hi.image.description || "DREC"} />
            </figure>
            <div className={s.type}>{hi.type}</div>
            <div className={s.b}>
              <div className={s.b_l}>
                <h3>{hi.title}</h3>
              </div>
              <div className={s.b_r}>
                <p>{hi.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
