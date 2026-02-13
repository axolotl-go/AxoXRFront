const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}
