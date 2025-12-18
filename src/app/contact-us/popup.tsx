'use client";';

import s from "./_s.module.css";
import Iclose from "@ic/close.svg";

interface Iprops {
  message: string;
  close: () => void;
}

export default function Popup(props: Iprops) {
  const { message, close } = props;

  return (
    <div className={s.popup}>
      <div className={s.popup_}>
        <button onClick={close}>
          <Iclose />
        </button>

        <h1>
          THANK <span>YOU!</span>
        </h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
