import toast from "react-hot-toast";
import {ResponseDto} from "@/lib/types";

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
    console.log(body)
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache, // Enables caching control
      next: { revalidate }, // Revalidates every `revalidate` seconds (for Next.js API routes)
    });
    const result:ResponseDto = await response.json();
    if (!response.ok) {
      toast.error(result.message);
      return null;
    }
    toast.success(result.message );
  
    const data= method=='GET'? result.data: result
    return data as T
  } catch (error: unknown) {
    console.error('Error fetching data:', error);
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}