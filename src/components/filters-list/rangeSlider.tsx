"use client";
import s from "./_s.module.css";
import { useRef } from "react";

interface Iprops {
  min: number;
  max: number;
  step: number;
  name: string;
}

export default function RangeSlider(props: Iprops) {
  const { min, max, step, name } = props;

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
    <>
      <div className={s.rs}>
        <div>{min}</div>
        <fieldset>
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
    </>
  );
}
