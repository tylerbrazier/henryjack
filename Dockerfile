# Remember to `npm build` before `docker build`

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# NODE_ENV=production will skip install dev deps
RUN NODE_ENV=production npm ci

COPY dist ./dist

EXPOSE 8080

CMD [ "node", "dist/server.js" ]
