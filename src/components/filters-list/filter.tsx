import s from "./_s.module.css";
import ChevI from "@/assets/icons/chev.svg";
import RangeSlider from "@/components/filters-list/rangeSlider";
import OptionsList from "@/components/filters-list/optionsList";
import MinMax from "./minMax";

interface Iprops {
  type?: string;
  text?: string;
  name: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  active: boolean;
  open: (name: string | null) => void;
}
export function Filter(props: Iprops) {
  const { text, type, name, options, min, max, step, active, open } = props;

  const handleClick = (e) => {
    // e.stopPropagation();
    open(name);
  };

  return (
    <div className={`${s.filter} ${active ? "active" : ""}`}>
      <button onClick={handleClick}>
        {text || name}
        <ChevI />
      </button>
      <div className={s.dropdown}>
        {type === "range" && (
          <RangeSlider min={min!} max={max!} step={step!} name={name} />
        )}

        {type === "options" && (
          <OptionsList
            options={options!}
            name={name}
            closeF={() => open(null)}
          />
        )}

        {type === "minmax" && <MinMax min={min!} max={max!} step={step!} />}
      </div>
    </div>
  );
}
