import { getUser } from '@physlane/auth/core';
import { db } from '@physlane/db';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  _: NextRequest,
  { params }: { params: { entryId: string } }
) {
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

  try {
    const isEntryRelatedToUser = db.weightEntry.findUniqueOrThrow({
      where: {
        id: params.entryId,
        reportAggregator: {
          is: {
            userId: currentUser.id,
          },
        },
      },
    });
    if (!isEntryRelatedToUser) {
      throw new Error('Cannot delete entry on behalf of other user');
    }
    const result = await db.weightEntry.delete({
      where: {
        id: params.entryId,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error instanceof Error ? error.message : 'Cannot delete entry',
        status: 'error',
      }),
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
