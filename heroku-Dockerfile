FROM node:alpine as build
RUN apk --no-cache add git
WORKDIR /app
COPY . .
RUN git clone https://github.com/7552-2020C2-grupo5/server-requester.git src/server-requester
RUN yarn
RUN yarn build
ARG PORT=8000
ENV PORT=${PORT}
EXPOSE ${PORT}
CMD ["node", "server.js"]