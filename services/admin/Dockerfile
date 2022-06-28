FROM node:alpine
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
ENV NAME="Manikandan"
COPY package.json .
COPY package*.json .
RUN npm ci
COPY services/admin services/admin
EXPOSE 8000
# ENTRYPOINT [ "node", "index.js" ]