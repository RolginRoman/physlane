import { Prisma } from "@prisma/client";
import { getUser } from "@physlane/auth/core";
import { db } from "@physlane/db";
import { UserSettings } from "@physlane/domain";
import { NextRequest, NextResponse } from "next/server";
import _partition from "lodash/partition";

export async function GET() {
  const currentUser = await getUser();
  if (!currentUser) {
    return NextResponse.json({}, { status: 401 });
  }

  const settings = await db.setting.findMany({
    where: {
      userId: (currentUser as any).id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const response = settings.reduce(
    (aggregate, currentSetting) => {
      aggregate[currentSetting.name] = currentSetting.value;
      return aggregate;
    },
    {} as Record<string, unknown>
  );

  return NextResponse.json(response);
}

export async function PATCH(req: NextRequest) {
  const currentUser = await getUser();
  if (!currentUser) {
    return NextResponse.json({}, { status: 401 });
  }

  const unsafeBody = await req.json();
  const body = UserSettings.safeParse(unsafeBody);

  if (!body.success) {
    return NextResponse.json(
      { error: "Cannot handle body format" },
      { status: 422 }
    );
  }

  const settings = Object.entries(body.data);

  const existingSettings = await db.setting.findMany({
    where: {
      AND: [
        {
          name: {
            in: settings.map(([key]) => key),
          },
        },
        {
          userId: currentUser.id,
        },
      ],
    },
    select: {
      name: true,
    },
  });

  console.log(existingSettings);

  const [toUpdate, toCreate] = _partition(settings, ([settingName]) =>
    existingSettings.find(({ name }) => name === settingName)
  );

  console.log(toCreate);
  console.log(toUpdate);

  const updateQueries = (toUpdate ?? []).map(([name, value]) => {
    return db.setting.update({
      data: {
        name,
        value: value as Prisma.InputJsonValue,
      },
      where: {
        userId_name: {
          userId: currentUser.id,
          name: name,
        },
      },
    });
  }) as Prisma.PrismaPromise<unknown>[];
  const createQuery: Prisma.PrismaPromise<unknown>[] =
    toCreate && toCreate.length
      ? [
          db.setting.createMany({
            data: toCreate.map(([name, value]) => ({
              name,
              value: value as Prisma.InputJsonValue,
              userId: currentUser.id,
            })),
          }),
        ]
      : [];

  db.$transaction(updateQueries.concat(createQuery));

  return NextResponse.json(settings);
}
