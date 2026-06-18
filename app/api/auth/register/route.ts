import type { NextRequest } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_API_URL ?? "https://notehub-public.goit.study/api";

async function forward(request: NextRequest, path: string) {
  const headers = new Headers();
  const contentType = request.headers.get("content-type");

  if (contentType) {
    headers.set("content-type", contentType);
  }

  const response = await fetch(`${BACKEND_URL}${path}`, {
    method: "POST",
    headers,
    body: await request.text(),
    cache: "no-store",
  });

  const responseHeaders = new Headers();
  const responseContentType = response.headers.get("content-type");
  const setCookie = response.headers.get("set-cookie");

  if (responseContentType) {
    responseHeaders.set("content-type", responseContentType);
  }

  if (setCookie) {
    responseHeaders.set("set-cookie", setCookie);
  }

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export async function POST(request: NextRequest) {
  return forward(request, "/auth/register");
}
