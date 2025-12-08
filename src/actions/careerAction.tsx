"use server";

export async function careerAction(_prevState, formData: FormData) {
  const api = `https://c01-deu.integrate-test.boomi.com/ws/rest/DRECWEB/careerWithUs`;

  const username = "DRECWEB@dubairealestatecentre-SFOOXO.XCPS4H";
  const password = "e2bdc3c6-4f66-4e98-b17b-c6c7238db608";
  const token = Buffer.from(`${username}:${password}`).toString("base64");

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
      errors: { global: data?.errorMessage || `Boomi ${boomiRes.status}` },
    };
  }
  return { ok: true, message: "Application submitted" };
}
