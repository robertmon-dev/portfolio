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

CMD ["yarn", "workspace", "@portfolio/app", "start"]
