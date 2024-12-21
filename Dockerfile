# Write a docker file for nodejs 22 that performs npm ci
FROM node:22-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
CMD ["node", "main.mjs"]
