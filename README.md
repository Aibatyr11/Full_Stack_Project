# 🛒 Интернет-магазин на React + Express + SQLite

## 🎯 Цель проекта
Этот проект создан в учебных целях, чтобы закрепить знания и навыки разработки.  
Я выбрал интернет-магазин, потому что в нём можно реализовать множество реальных функций:  
- работа с товарами и каталогом  
- авторизация и регистрация пользователей  
- корзина и оформление заказов  
- взаимодействие фронтенда и бэкенда через REST API  
- использование базы данных для хранения информации  
Таким образом, проект помог мне потренироваться в **полном цикле разработки**: от создания интерфейса до настройки базы данных и деплоя.
---
## 📌 Описание
Учебный проект интернет-магазина.  
Фронтенд построен на **React (Vite + Ant Design)**, а бэкенд — на **Express.js** с базой данных **SQLite**.  
Проект поддерживает авторизацию, регистрацию, работу с каталогом товаров, корзину и поиск.  

---

## ⚙️ Стек технологий
- **Frontend**: React, Vite, Ant Design, React Router  
- **Backend**: Node.js, Express.js  
- **База данных**: SQLite  
- **Прочее**: Nginx (для деплоя)  

---

## 🚀 Как запустить проект

### 1. Клонирование репозитория
```bash
git clone (https://github.com/Aibatyr11/Full_Stack_Project.git)
cd project-name

2. Установка зависимостей
Backend

cd express-server
npm install

Frontend
cd ../vite-front
npm install

3. Запуск проекта
Backend (Express + SQLite)

cd express-server
node server.js
Сервер запустится на: http://localhost:5000

Frontend (React + Vite)

cd vite-front
npm run dev

Фронтенд будет доступен на: http://localhost:5173

Настройки базы данных

База данных хранится в файле:
express-server/mydatabase.db

Конфигурация подключения находится в файле:
express-server/db.js

При первом запуске сервер сам создаёт нужные таблицы (если их нет).

🌍 Инструкции по деплою
Вариант 1: Локальный запуск (npm)

Поднять backend (Express + SQLite)

Поднять frontend (Vite)

Проксировать запросы через Nginx или Vite proxy

Вариант 2: Nginx + PM2 (рекомендуется)

Собрать фронтенд:
cd vite-front
npm run build

Готовые файлы будут в папке vite-front/dist/

Настроить Nginx для раздачи статичных файлов и проксирования API-запросов на Express.

Запустить Express-сервер с помощью PM2:

cd express-server
pm2 start server.js --name shop-server
