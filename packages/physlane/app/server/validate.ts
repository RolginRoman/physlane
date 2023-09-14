import { wrapper } from "./wrapper";
import { z } from "zod";
import { NextRequest } from "next/server";

export function validated<B extends z.Schema, Q extends z.Schema>(schemas: {
  body?: B;
  query?: Q;
}) {
  return wrapper(
    async (
      next,
      req: NextRequest & {
        bodyParsed?: z.infer<B>;
        queryParsed?: z.infer<Q>;
      }
    ) => {
      if (schemas.body) {
        const body = await req.json();
        req.bodyParsed = schemas.body.parse(body);
      }

      if (schemas.query) {
        const query = getQueryObject(req.url);
        req.queryParsed = schemas.query.parse(query);
      }

      return next();
    }
  );
}

function getQueryObject(url: string) {
  const query: Record<string, any> = {};

  new URL(url).searchParams.forEach((value, key) => {
    if (Array.isArray(query[key])) {
      query[key].push(value);
      return;
    }

    if (query[key]) {
      query[key] = [query[key], value];
      return;
    }

    query[key] = value;
  });

  return query;
}
