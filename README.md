###  Как собрать и запустить Сервер и БД в Docker?
По умолчанию запуститься на localhost:5000
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

### Как зайти в БД через pgAdmin?
В скобках указано значение по умолчанию из файла .env.sample

1. yarn docker:pg
2. localhost:8080
- PGADMIN_DEFAULT_EMAIL (admin@admin.com)
- PGADMIN_DEFAULT_PASSWORD (secret)
3. Add New Server -> General
- name - LocalDB
4. Add New Server -> ConnectionHost
- name - postgres
- Port - POSTGRES_PORT (5432)
- Username - POSTGRES_PASSWORD (postgres)
- Password - POSTGRES_USER (postgres)
5. yarn docker:stop

### Как начать разрабатывать в пустой папке с SSR
Версия в dev:
```
git clone https://github.com/wordrunners/bumble
cd bumble
git checkout dev
yarn bootstrap
Y
yarn build
yarn dev
```

Версия в prod:
```
… после сборки клиента
cd packages/server
node dist/index.js
```

### Как запускать SSR в dev?
По умолчанию запуститься на localhost:5000
```
cd packages/client
yarn build:ssr
yarn build
cd ../..
yarn dev
```

### Как запускать SSR в prod?
По умолчанию запуститься на localhost:5000
```
cd packages/client
yarn build:ssr
yarn build
cd ../server
yarn build
node dist/index.js
```

### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Использовать Yarn Classic Stable (1.22.19)
3. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
4. Выполните команду `yarn dev`
5. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
6. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`
