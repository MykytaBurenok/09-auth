import type { NextRequest } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_API_URL ?? "https://notehub-public.goit.study/api";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

function getHeaders(request: NextRequest) {
  const headers = new Headers();
  const cookie = request.headers.get("cookie");

  if (cookie) {
    headers.set("cookie", cookie);
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

export async function GET(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const response = await fetch(`${BACKEND_URL}/notes/${id}`, {
    headers: getHeaders(request),
    cache: "no-store",
  });

  return toResponse(response);
}

export async function DELETE(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const response = await fetch(`${BACKEND_URL}/notes/${id}`, {
    method: "DELETE",
    headers: getHeaders(request),
    cache: "no-store",
  });

  return toResponse(response);
}
