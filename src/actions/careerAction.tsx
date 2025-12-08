"use server";

export async function careerAction(_prevState, formData: FormData) {
  const api = `https://c01-deu.integrate-test.boomi.com/ws/rest/DRECWEB/careerWithUs`
  const fullName = formData.get("fullName")?.toString() || "";
  const message = formData.get("message")?.toString() || "";
  const file: any = formData.get("cv");

  if (!fullName) return { ok: false, errors: { fullName: "Required" } };

  let fileBase64 = "";
  if (file && typeof file.arrayBuffer === "function") {
    const buffer = Buffer.from(await file.arrayBuffer());
    fileBase64 = buffer.toString("base64");
  }

  const payload = { fullName, message, fileBase64 };

  const boomiRes = await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await boomiRes.json().catch(() => null);
  if (!boomiRes.ok || data?.status !== "success") {
    return {
      ok: false,
      errors: { global: data?.errorMessage || `Boomi ${boomiRes.status}` },
    };
  }
  return { ok: true, message: "Application submitted" };
}
