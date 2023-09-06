import { register } from '@physlane/auth/core';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const form = {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      password: formData.get('password') as string,
    };
    await register(form);

    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  } catch (error: unknown) {
    return new NextResponse(
      JSON.stringify({
        message: error instanceof Error ? error.message : 'Cannot create user',
        status: 'error',
      }),
      { status: 500 }
    );
  }
}
