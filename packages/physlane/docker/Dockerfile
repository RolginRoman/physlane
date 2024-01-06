FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
WORKDIR /app
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

COPY ./package.json ./pnpm-lock.yaml* ./pnpm-workspace.yaml ./nx.json ./.npmrc ./tsconfig.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps ./app/node_modules ./node_modules
COPY --from=deps ./app/package.json ./app/pnpm-lock.yaml* ./app/pnpm-workspace.yaml ./app/.npmrc ./app/nx.json ./app/tsconfig.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY ./libs ./libs
COPY ./packages/physlane ./packages/physlane
COPY ./types ./types

ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm exec nx prebuild db
RUN pnpm exec nx build physlane

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir public
RUN mkdir .next

# Set the correct permission for prerender cache
RUN chown nextjs:nodejs public
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs ./app/dist/packages/physlane/public ./public
COPY --from=builder --chown=nextjs:nodejs ./app/dist/packages/physlane/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs ./app/dist/packages/physlane/.next/static ./dist/packages/physlane/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "packages/physlane/server.js"]