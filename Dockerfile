# BASE
FROM node:18 AS base

RUN npm i -g pnpm

# DEPENDENCIES
FROM base AS dependencies

WORKDIR /app
COPY package.json ./
COPY prisma ./prisma
COPY data ./data
RUN pnpm install
RUN pnpm prisma generate


# BUILD
FROM base AS build 

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build

# RELEASE
FROM base AS release

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=dependencies /app/prisma ./prisma
COPY --from=dependencies /app/package.json ./package.json
COPY --from=dependencies /app/data ./data


CMD ["pnpm", "run" ,"deploy"]