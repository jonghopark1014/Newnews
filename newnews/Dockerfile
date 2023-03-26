FROM node:18.15.0 as builder

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install

RUN npm install -g typescript

RUN npm run build

FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]