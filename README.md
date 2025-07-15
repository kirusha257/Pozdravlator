# Full-stack приложение для отслеживания дней рождений. Backend на ASP.NET Core, frontend на React.

##  Требования

- [.NET SDK 8+](https://dotnet.microsoft.com/)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL 15+](https://www.postgresql.org/download/)
- npm (входит в Node.js)
- Git

###  Установка
Клонировать репозиторий
```
git clone https://github.com/your-username/BirthdayTracker.git
cd BirthdayTracker
```
### 
Установить зависимости frontend
```
cd client
npm install
cd ..
```
### Настройка базы данных PostgreSQL
Создать базу данных
```
createdb birthdaytracker
```
Обновить строку подключения в appsettings.json
```
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=birthdaytracker;Username=postgres;Password=yourpassword"
  }
}
```
Применить миграции
```
dotnet ef database update
```
### 
### Запуск
Запуск Backend
```
dotnet run
```
### 
Запуск Frontend
```
cd client
npm start
```
### 
React-приложение будет доступно по адресу: http://localhost:3000

### Пример главной страницы
<img width="1834" height="916" alt="image" src="https://github.com/user-attachments/assets/164f0113-5007-4d63-b74d-6b3eb5ad0d43" />


