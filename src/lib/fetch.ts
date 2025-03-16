
interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache; // Supports Next.js caching strategies
  revalidate?: number; // Revalidation time in seconds (for Next.js ISR)
}

export async function fetchData<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T | null> {
  const {
    method = 'GET',
    headers = { 'Content-Type': 'application/json' },
    body,
    cache = 'no-cache', // Prevents stale data in Next.js
    revalidate = 10, // Default revalidation time (for Next.js ISR)
  } = options;

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache, // Enables caching control
      next: { revalidate }, // Revalidates every `revalidate` seconds (for Next.js API routes)
    });

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
    }

    // ✅ Check if response is empty before parsing JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return (await response.json()) as T;
    } else {
      return null; // Return null for empty responses
    }
  } catch (error: unknown) {
    console.error('Error fetching data:', error);
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}