"use server";

export async function enquiryAction(_prevState, formData) {
  const api = `https://c01-deu.integrate-test.boomi.com/ws/rest/DRECWEB/careerWithUs`;
  const fullName = formData.get("fullName")?.toString() || "";
  const email = formData.get("email")?.toString() || "";

  if (!fullName || !email) {
    return { ok: false, error: "Please fill all form feilds." };
  }

  const payload = {
    fullName,
    email,
    phone: formData.get("phone")?.toString() || "",
    subject: formData.get("subject")?.toString() || "",
    message: formData.get("message")?.toString() || "",
  };

  const boomiRes = await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await boomiRes.json().catch(() => null);

  if (!boomiRes.ok || data?.status !== "success") {
    return {
      ok: false,
      error: data?.errorMessage || `Boomi ${boomiRes.status}`,
    };
  }

  return { ok: true, message: "Submitted" };
}
