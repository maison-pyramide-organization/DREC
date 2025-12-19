"use client";
import s from "./_s.module.css";
import { useActionState, useEffect, useState } from "react";
import { careerAction } from "@/actions/careerAction";
import Popup from "./popup";

export default function CareerForm() {
  const initial: any = { ok: null, error: null, message: null };
  const [state, action, isLoading] = useActionState(careerAction, initial);
  const { ok, error } = state;
  const [fileName, setFileName] = useState("");

  const [popup, setPopup] = useState(false);
  const closeP = () => setPopup(false);

  useEffect(() => {
    if (ok) {
      setPopup(true);
    }
  }, [ok]);

  return (
    <>
      <form action={action} className={`${s.carF} ${s.f}`}>
        <input type="text" name="fullName" placeholder="FULL NAME *" required />
        <input
          type="file"
          id="cv"
          hidden
          required
          onChange={(e: any) => setFileName(e.target.files[0]?.name || "")}
        />
        <label htmlFor="cv">{fileName || "ATTACH CV *"}</label>
        <div className={s.b}>
          <label htmlFor="message">MESSAGE</label>
          <textarea name="message" />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "SUBMITTING" : "SUBMIT"}
          </button>
          {error && <p className={s.error}>{error}</p>}
        </div>
      </form>
      {popup && (
        <Popup
          message="YOUR CV HAS BEEN SUBMITTED SUCCESSFULLY"
          close={closeP}
        />
      )}
    </>
  );
}
