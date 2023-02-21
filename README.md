### Bumble

Это игра в слова!

Нужно собрать слово из букв за минуту. 
Чем длиннее - тем лучше.
 
За каждую букву начисляются победные баллы.


### Deploy 

https://wordrunners-bumble-20.ya-praktikum.tech/

### Stack:

TypeScript, Canvas API, React, Redux, nginx, Git, GitHub Actions, Docker, Vite, HTML5, SASS, Express, Node.JS, Postgresql, Sequelize, jest

### Основные функции:

- Игра Bumble
- Авторизация / регистрация (по логин/пароль и oAuth)
- Редактирование данных профиля
- Создание тем форума
- Создание сообщений, ответов и добавление реакций в форуме
- Сохранение результата в Лидерборде
- Переключение темы оформления 

###  Как собрать и запустить Сервер и БД в Docker?
```
yarn docker:build
```

###  Как начать разрабатывать в hot-reload режиме с БД в Docker?
По умолчанию запуститься на localhost:5000. После сборки Docker сервисов. В отдельных терминалах:

```
yarn docker:db
```
```
yarn dev
```

###  Как собрать Клиент с nginx и Сервер в prod?

```
yarn docker:prod
```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`
