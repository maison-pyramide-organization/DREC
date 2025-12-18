"use client";
import s from "./_s.module.css";
import { useActionState, useEffect, useState } from "react";
import { enquiryAction } from "@/actions/enquiryAction";
import Popup from "./popup";

export default function EnquiryForm() {
  const initial: any = { ok: null, error: null, message: null };
  const [state, action, isLoading] = useActionState(enquiryAction, initial);
  const { ok, error } = state;
  const [popup, setPopup] = useState(true);
  const closeP = () => setPopup(false);

  useEffect(() => {
    if (ok) {
      setPopup(true);
    }
  }, [ok]);

  return (
    <>
      <form action={action} className={`${s.enqF} ${s.f}`}>
        <input type="text" name="fullName" placeholder="FULL NAME *" required />
        <input type="email" name="email" placeholder="EMAIL ADDRESS *" required />
        <input type="text" name="subject" placeholder="SUBJECT *" required />
        <input type="text" name="phone" placeholder="PHONE NUMBER *" required />

        <div className={s.b}>
          <label htmlFor="message">MESSAGE</label>
          <textarea name="message" />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "SUBMITTING" : "SUBMIT"}
          </button>
          {error && <p className={s.error}>{state.error}</p>}
        </div>
      </form>
      {popup && (
        <Popup
          message="YOUR ENQUIRY HAS BEEN SUBMITTED SUCCESSFULLY"
          close={closeP}
        />
      )}
    </>
  );
}
