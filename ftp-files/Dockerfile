FROM us-central1-docker.pkg.dev/hydro-dashboard-283320/aes-docker-repo/node:20231206

WORKDIR /app
COPY node_modules /app/node_modules
COPY src /app/src

ENTRYPOINT ["node", "src/app.js"]
