import s from "./_s.module.css";
import { useState } from "react";

interface Iprops {
  min: number;
  max: number;
  step: number;
}

export default function MinMax(props: Iprops) {
  const { min, max, step } = props;
  const [range, setRange] = useState([min, max]);
  return (
    <div className={s.mm}>
      <div>
        <h3>Minimum</h3>
        <input
          name="min-price"
          type="number"
          //   value={range[0]}
          min={min}
          max={range[1]}
          step={step}
          // onChange={(e) => handleRangeChange(0, Number(e.target.value))}
        />
      </div>
      <span>–</span>

      <div>
        <h3>Maximum</h3>
        <input
          name="max-price"
          type="number"
          //   value={range[1]}
          min={range[0]}
          max={max}
          step={step}
          // onChange={(e) => handleRangeChange(1, Number(e.target.value))}
        />
      </div>
    </div>
  );
}
