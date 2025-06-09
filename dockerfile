FROM node:23-alpine
RUN npm i -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY ./prisma ./prisma

RUN pnpm install

COPY . .

RUN pnpm run db:generate

EXPOSE 3001

CMD ["pnpm", "run", "dev"]
