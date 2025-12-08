"use server";

export async function enquiryAction(_prevState, formData) {
  const api = `https://c01-deu.integrate-test.boomi.com/ws/rest/DRECWEB/submitEnquiry`;
  const username = "DRECWEB@dubairealestatecentre-SFOOXO.XCPS4H";
  const password = "e2bdc3c6-4f66-4e98-b17b-c6c7238db608";
  const token = Buffer.from(`${username}:${password}`).toString("base64");

  const fullName = formData.get("fullName")?.toString() || "";
  const email = formData.get("email")?.toString() || "";

  if (!fullName || !email) {
    return { ok: false, error: "Please fill all form feilds." };
  }

  const payload = {
    fullName,
    email,
    phone: Number(formData.get("phone")) || 0,
    subject: formData.get("subject")?.toString() || "",
    message: formData.get("message")?.toString() || "",
  };

  const boomiRes = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
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
