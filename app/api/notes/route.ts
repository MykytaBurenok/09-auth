import type { NextRequest } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_API_URL ?? "https://notehub-public.goit.study/api";

function getHeaders(request: NextRequest) {
  const headers = new Headers();
  const cookie = request.headers.get("cookie");
  const contentType = request.headers.get("content-type");

  if (cookie) {
    headers.set("cookie", cookie);
  }

  if (contentType) {
    headers.set("content-type", contentType);
  }

  return headers;
}

function toResponse(response: Response) {
  return new Response(response.body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function GET(request: NextRequest) {
  const url = new URL(`${BACKEND_URL}/notes`);
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, {
    headers: getHeaders(request),
    cache: "no-store",
  });

  return toResponse(response);
}

export async function POST(request: NextRequest) {
  const response = await fetch(`${BACKEND_URL}/notes`, {
    method: "POST",
    headers: getHeaders(request),
    body: await request.text(),
    cache: "no-store",
  });

  return toResponse(response);
}
