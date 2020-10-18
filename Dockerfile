FROM node:alpine as build
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
ARG PORT=8000
ENV PORT=${PORT}
EXPOSE ${PORT}
CMD ["node", "server.js"]