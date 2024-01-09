# Kazon Backend

## Backend REST api that implements the CRUD model. Tech stack is PostgreSQL 15, Express.js and, Node.js

## Database ER model
![](public/kazonDB.png)

## There are two ways to run the backend
## 1. Use docker to first run database and the backend
```
docker run -p 5433:5432 clasher/kazondb
docker run -p 3008:3001 clasher/kazon-backend
```

## 2. Setup without docker
### Make a database "kazonDB" and run createDB.sql to initialize the tables
### Create a credentials.json in src/, for the db credentials
### Create .env in root folder for the 'ACCESS_TOKEN_SECRET'
### Run commands below
```
npm install
npm run devStart
```