// LocalStorage-backed document store (frontend-first mock)
import { SAMPLE_INVOICES } from "../mock";

const KEY = "dd_documents";
const AUTH_KEY = "dd_admin_auth";

export function getDocuments() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(SAMPLE_INVOICES));
      return SAMPLE_INVOICES;
    }
    return JSON.parse(raw);
  } catch {
    return SAMPLE_INVOICES;
  }
}

export function saveDocument(doc) {
  const docs = getDocuments();
  const idx = docs.findIndex((d) => d.id === doc.id);
  if (idx >= 0) docs[idx] = doc;
  else docs.unshift(doc);
  localStorage.setItem(KEY, JSON.stringify(docs));
  return doc;
}

export function getDocument(id) {
  return getDocuments().find((d) => d.id === id);
}

export function deleteDocument(id) {
  const docs = getDocuments().filter((d) => d.id !== id);
  localStorage.setItem(KEY, JSON.stringify(docs));
}

export function nextNumber(type) {
  const docs = getDocuments().filter((d) => d.type === type);
  const prefix = type === "invoice" ? "INV" : "KW";
  const year = new Date().getFullYear();
  const seq = String(docs.length + 1).padStart(3, "0");
  return `${prefix}-${year}-${seq}`;
}

// Auth
export function setAuth(val) {
  if (val) localStorage.setItem(AUTH_KEY, "1");
  else localStorage.removeItem(AUTH_KEY);
}
export function isAuthed() {
  return localStorage.getItem(AUTH_KEY) === "1";
}
