FROM node:22-alpine AS builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY app/package.json ./app/
COPY client/package.json ./client/
COPY shared/package.json ./shared/

RUN yarn install --frozen-lockfile

COPY . .

WORKDIR /usr/src/app/app
RUN npx prisma generate

WORKDIR /usr/src/app
RUN yarn workspace @portfolio/shared build
RUN yarn workspace @portfolio/app build

FROM node:22-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
COPY app/package.json ./app/
COPY client/package.json ./client/
COPY shared/package.json ./shared/

RUN yarn install --production --frozen-lockfile --ignore-scripts && yarn cache clean

COPY --from=builder /usr/src/app/app/prisma.config.ts ./app/prisma.config.ts
COPY --from=builder /usr/src/app/shared/dist ./shared/dist
COPY --from=builder /usr/src/app/app/dist ./app/dist
COPY --from=builder /usr/src/app/app/prisma ./app/prisma

COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/node_modules/@prisma ./node_modules/@prisma


CMD ["yarn", "workspace", "@portfolio/app", "start"]
