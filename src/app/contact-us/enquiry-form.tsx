"use client";
import s from "./_s.module.css";
import { useActionState } from "react";
import { enquiryAction } from "@/actions/enquiryAction";

export default function EnquiryForm() {
  const initial: any = { ok: null, error: null, message: null };
  const [state, action, isLoading] = useActionState(enquiryAction, initial);

  return (
    <form action={action} className={`${s.enqF} ${s.f}`}>
      <input type="email" name="email" placeholder="EMAIL ADDRESS" required />
      <input type="text" name="fullName" placeholder="FULL NAME" required />
      <input type="text" name="subject" placeholder="SUBJECT" required />
      <input type="text" name="number" placeholder="PHONE NUMBER" required />

      <div className={s.b}>
        <label htmlFor="message">MESSAGE</label>
        <textarea name="message" />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "SUBMITTING" : "SUBMIT"}
        </button>
      </div>
    </form>
  );
}
