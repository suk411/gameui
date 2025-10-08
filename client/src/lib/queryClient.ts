import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey.filter(k => k != null).join('/');
        const res = await fetch(url);
        if (!res.ok) {
          const error = await res.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(error.error || `HTTP ${res.status}`);
        }
        return res.json();
      },
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    },
  },
});

export async function apiRequest(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}
