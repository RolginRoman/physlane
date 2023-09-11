import { getUser } from '@physlane/auth/core';
import { NextRequest, NextResponse } from 'next/server';
import { DefaultSession } from 'next-auth';

export async function GET(req: NextRequest) {



  return NextResponse.json({});
}
