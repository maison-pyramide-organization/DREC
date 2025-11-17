import s from "./_s.module.css";

interface Iprops {
  options: string[];
  name: string;
  closeF: () => void;
  selected: string | null | boolean;
}

export default function OptionsList(props: Iprops) {
  const { options, name, selected, closeF } = props;

  return (
    <ul className={s.optionsList} onClick={closeF}>
      {options.map((opt) => (
        <li key={opt} className={`${selected == opt ? s.selected : ""}`}>
          <input type="radio" name={name} id={`${name}_${opt}`} value={opt} />
          <label htmlFor={`${name}_${opt}`}>{opt}</label>
        </li>
      ))}
    </ul>
  );
}
