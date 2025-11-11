import s from "./_s.module.css";

interface Iprops {
  options: string[];
  name: string;
  closeF: () => void;
}

export default function OptionsList(props: Iprops) {
  const { options, name, closeF } = props;

  return (
    <ul className={s.optionsList} onClick={closeF}>
      {options.map((opt) => (
        <li key={opt}>
          <input type="radio" name={name} id={`${name}_${opt}`} value={opt} />
          <label htmlFor={`${name}_${opt}`}>{opt}</label>
        </li>
      ))}
    </ul>
  );
}
