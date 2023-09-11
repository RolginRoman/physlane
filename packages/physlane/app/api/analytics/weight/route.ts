import { getUser } from '@physlane/auth/core';
import { db } from '@physlane/db';
import { ReportRequest, Weight, CreateWeight, Report } from '@physlane/domain';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { validated } from '../../../server/validate';

const getQueryParams = (req: NextRequest): URLSearchParams => {
  return new URL(req.url).searchParams;
};

export const PATCH = validated({ body: ReportRequest })((request) => {
  return NextResponse.json({ ok: true });
});

const withContext = async (
  handler: (user: Awaited<ReturnType<typeof getUser>>) => void | NextResponse
) => {
  const currentUser = await getUser();
  return handler(currentUser);
};

export async function GET(req: NextRequest) {
  const searchParams = getQueryParams(req);
  const queryFilters = {
    from: searchParams.get('from'),
    to: searchParams.get('to'),
  };
  const body = ReportRequest.passthrough().safeParse({ filters: queryFilters });
  const currentUser = await getUser();

  if (!currentUser) {
    return new NextResponse(
      JSON.stringify({
        message: 'Unauthorized',
        status: 'error',
      }),
      { status: 401 }
    );
  }
  if (!body.success) {
    return new NextResponse(
      JSON.stringify({
        message: body.error.format(),
        status: 'error',
      }),
      { status: 500 }
    );
  }

  const { filters } = body.data;

  try {
    const report = (await db.reportAggregator.findUnique({
      select: {
        createdAt: true,
        weightEntries: {
          orderBy: {
            createdAt: 'asc',
          },
          select: {
            createdAt: true,
            id: true,
            measure: true,
            weight: true,
          },
        },
      },
      where: {
        userId: (currentUser as any).id,
      },
    })) satisfies z.infer<typeof Report> | null;

    return NextResponse.json(report);
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error instanceof Error ? error.message : 'Cannot get entries',
        status: 'error',
      }),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const _longResponse = await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  const unsafeBody = await req.json();
  const body = CreateWeight.passthrough().safeParse(unsafeBody);
  const currentUser = await getUser();

  if (!currentUser) {
    return new NextResponse(
      JSON.stringify({
        message: 'Unauthorized',
        status: 'error',
      }),
      { status: 401 }
    );
  }
  if (!body.success) {
    return new NextResponse(
      JSON.stringify({
        message: body.error.format(),
        status: 'error',
      }),
      { status: 500 }
    );
  }

  const { createdAt, measure, weight } = body.data;
  try {
    await db.weightEntry.create({
      data: {
        createdAt,
        measure,
        reportAggregator: {
          connectOrCreate: {
            create: {
              userId: (currentUser as any).id,
            },
            where: {
              userId: (currentUser as any).id,
            },
          },
        },
        weight,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error instanceof Error ? error.message : 'Cannot create entry',
        status: 'error',
      }),
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
