import { useRef } from "react";
import s from "./_s.module.css";
import ChevI from "@/assets/icons/chev.svg";

export function Filter(props) {
  const { type, name, options, min, max, step, active, open } = props;

  const svRef = useRef(null);

  const onSliderMove = (e) => {
    const $sv = svRef.current as any;
    const $input = e.target;
    const value = +$input.value;
    const percent = ((value - min) / (max - min)) * 100;
    $sv.textContent = value;
    $sv.style.left = `calc(${percent}% )`;
  };

  return (
    <div className={s.ff}>
      <button onClick={() => open(name)}>
        {name}
        <ChevI />
      </button>
      {active && (
        <div className={s.dd}>
          {type === "range" ? (
            <div className={s.rs}>
              <div>{min}</div>
              <fieldset >
                <div className={s.rs_value} ref={svRef}>
                  {Math.floor((min + max) / 2)}
                </div>
                <input
                  onInput={onSliderMove}
                  type="range"
                  name={name}
                  id={name}
                  defaultValue={Math.floor((min + max) / 2)}
                  min={min}
                  max={max}
                  step={step}
                />
              </fieldset>
              <div>{max}</div>
            </div>
          ) : (
            <ul className={s.optionsList}>
              {options.map((opt) => (
                <li key={opt}>
                  <input
                    type="radio"
                    name={name}
                    id={`${name}_${opt}`}
                    value={opt}
                  />
                  <label htmlFor={`${name}_${opt}`}>{opt}</label>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
