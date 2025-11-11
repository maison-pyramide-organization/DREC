"use client";
import s from "./_s.module.css";

interface Iprops {
  options: string[];
  name: string;
}

export default function OptionsList(props: Iprops) {
  const { options, name } = props;

  return (
    <ul className={s.optionsList}>
      {options.map((opt) => (
        <li key={opt}>
          <input type="radio" name={name} id={`${name}_${opt}`} value={opt} />
          <label htmlFor={`${name}_${opt}`}>{opt}</label>
        </li>
      ))}
    </ul>
  );
}
