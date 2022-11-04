FROM node:18-alpine as builder

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

FROM node:18-alpine

ENV PORT ${PORT}

WORKDIR /stage

RUN npm install pm2 -g

COPY --from=builder /app/pm2.config.js /stage
COPY --from=builder /app/build/ /stage

CMD ["pm2-runtime", "pm2.config.js"]
