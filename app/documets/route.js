import { NextResponse } from "next/server";

export function GET(request) {
  const url = request.nextUrl.clone();
  url.pathname = "/documents";
  return NextResponse.redirect(url, 308);
}
