"use client";
import s from "./_s.module.css";
import { useActionState } from "react";
import { careerAction } from "@/actions/careerAction";

export default function CareerForm() {
  const initial: any = { ok: null, error: null, message: null };
  const [state, action, isLoading] = useActionState(careerAction, initial);

  return (
    <form action={action} className={`${s.carF} ${s.f}`}>
      <input type="text" name="fullName" placeholder="FULL NAME" required />
      <input type="file" name="cv" placeholder="ATTACH CV" required />
      <div className={s.b}>
        <label htmlFor="message">MESSAGE</label>
        <textarea name="message" />
        <button type="submit">SUBMIT</button>
      </div>
    </form>
  );
}
