FROM node:18-alpine

WORKDIR /app
COPY node_modules /app/node_modules
COPY src /app/src

ENTRYPOINT ["node", "src/ftp-files/app.js"]
