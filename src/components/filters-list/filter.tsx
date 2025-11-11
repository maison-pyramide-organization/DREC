import s from "./_s.module.css";
import ChevI from "@/assets/icons/chev.svg";
import RangeSlider from "@/components/filters-list/rangeSlider";
import OptionsList from "@/components/filters-list/optionsList";

interface Iprops {
  type?: string;
  name: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  active: boolean;
  open: (name: string) => void;
}
export function Filter(props: Iprops) {
  const { type, name, options, min, max, step, active, open } = props;

  const handleClick = (e) => {
    // e.stopPropagation();
    open(name);
  };

  return (
    <div className={`${s.filter} ${active ? "active" : ""}`}>
      <button onClick={handleClick}>
        {name}
        <ChevI />
      </button>
      <div className={s.dropdown}>
        {type === "range" ? (
          <RangeSlider min={min!} max={max!} step={step!} name={name} />
        ) : (
          <OptionsList options={options!} name={name} />
        )}
      </div>
    </div>
  );
}
