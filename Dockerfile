# Установите базовый образ
FROM node:20.10.0

# Установите рабочую директорию в контейнере
WORKDIR /app

# Копируйте файлы package.json и package-lock.json
COPY package*.json ./

# Установите зависимости
RUN npm install

# Копируйте остальные файлы проекта
COPY . .

# Компиляция TypeScript в JavaScript
# RUN npx tsc --p 'tsconfig.json'

RUN npm i ts-node-dev -g

# Запуск приложения
CMD [ "ts-node-dev", "app.ts" ]