import { register } from "@physlane/auth/core";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { redirectUrl, ...rest } = await req.json();
    const user = await register(rest);

    const url = req.nextUrl.clone();
    url.pathname = redirectUrl;
    return NextResponse.json({
      redirectUrl: url,
      user,
    });
  } catch (error: unknown) {
    // TODO zod errors / email unique
    return new NextResponse(
      JSON.stringify({
        message: error instanceof Error ? error.message : "Cannot create user",
        status: "error",
      }),
      { status: 500 }
    );
  }
}
