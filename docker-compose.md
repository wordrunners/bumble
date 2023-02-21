Содержание файла docker compose на ВМ в YC

version: "3.9"

services:
    postgres:
      image: postgres:14     
      ports:
        - "5432:5432"
      environment:
        POSTGRES_PASSWORD: ***
        POSTGRES_USER: ***
        POSTGRES_DB: ***
      volumes:
        - ./tmp/pgdata:/var/lib/postgresql/data
    client:
      container_name: practicum-client
      image: cr.yandex/***/practicum-client:latest
      restart: always
      ports:
        - "80:80"
        - "443:443"
      volumes:
        - /ssl/1:/var/www/ssl/ 
    server:
      container_name: practicum-server
      image: cr.yandex/***/practicum-server:latest
      restart: always
      ports:
          - "5000:5000"
      environment:
        SERVER_PORT: 5000
        POSTGRES_HOST: postgres
        POSTGRES_PORT: 5432
        POSTGRES_USER: ***
        POSTGRES_PASSWORD: ***
        POSTGRES_DB: ***
