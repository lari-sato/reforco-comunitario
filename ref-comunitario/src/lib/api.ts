const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

function toQuery(params?: Record<string, unknown>): string {
  if (!params) return "";
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v == null) continue;
    if (Array.isArray(v)) {
      v.forEach((x) => usp.append(k, String(x)));
    } else {
      usp.append(k, String(v));
    }
  }
  const s = usp.toString();
  return s ? `?${s}` : "";
}

export async function apiGet<T>(
  path: string,
  params?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(`${BASE}${path}${toQuery(params)}`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`GET ${path} -> ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`POST ${path} -> ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function apiPostForm<T>(path: string, form: FormData): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    throw new Error(`POST(form) ${path} -> ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function apiPut<T>(
  path: string,
  body: unknown,
  params?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(`${BASE}${path}${toQuery(params)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`PUT ${path} -> ${res.status}`);
  }
  return (await res.json()) as T;
}
