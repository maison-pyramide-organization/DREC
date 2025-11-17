const LS_KEY = "saved_properties_ids";

/** Read saved ids array from localStorage. Always returns array of strings. */
export function getSavedIds(): string[] {
  if (typeof window === "undefined") return []; // SSR safe
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map(String);
    return [];
  } catch (err) {
    console.error("getSavedIds error:", err);
    return [];
  }
}

/** Persist an array of ids to localStorage (overwrites). */
function setSavedIds(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(Array.from(new Set(ids))));
  } catch (err) {
    console.error("setSavedIds error:", err);
  }
}

/** Save a single property id (id can be number|string). Ensures uniqueness. */
export function savePropertyId(id: string | number) {
  const ids = getSavedIds();
  const sid = String(id);
  if (!ids.includes(sid)) {
    ids.push(sid);
    setSavedIds(ids);
  }
}

/** Remove a saved id. */
export function removeSavedPropertyId(id: string | number) {
  const sid = String(id);
  const ids = getSavedIds().filter((x) => x !== sid);
  setSavedIds(ids);
}

/** Toggle saved state: if saved -> remove, otherwise add. Returns new boolean saved state. */
export function toggleSavedPropertyId(id: string | number): boolean {
  const sid = String(id);
  const ids = getSavedIds();
  if (ids.includes(sid)) {
    const newIds = ids.filter((x) => x !== sid);
    setSavedIds(newIds);
    return false;
  } else {
    ids.push(sid);
    setSavedIds(ids);
    return true;
  }
}

export function isSavedId(id: string | number) {
  const ids = getSavedIds();
  return ids.includes(String(id));
}
