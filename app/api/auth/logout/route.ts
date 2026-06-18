import type { NextRequest } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_API_URL ?? "https://notehub-public.goit.study/api";

export async function POST(request: NextRequest) {
  const headers = new Headers();
  const cookie = request.headers.get("cookie");

  if (cookie) {
    headers.set("cookie", cookie);
  }

  const response = await fetch(`${BACKEND_URL}/auth/logout`, {
    method: "POST",
    headers,
    cache: "no-store",
  });

  const responseHeaders = new Headers();
  const setCookie = response.headers.get("set-cookie");

  if (setCookie) {
    responseHeaders.set("set-cookie", setCookie);
  }

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}
