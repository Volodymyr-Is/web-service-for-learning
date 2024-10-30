1) Встановити пакети:
npm install
2) Створити в корені проєкту файл .env

3) Створити та додати до .env наступні змінні оточення:
DATABASE_URL=postgresql://ІМ'Я_КОРИСТУВАЧА:ПАРОЛЬ@localhost:5432/ІМ'Я_БАЗИ_ДАНИХ
NEXTAUTH_SECRET=bf6f3655b83fd093ee6904d96cc9e422a252e752e2bcc9c65a8ca5b60e4449f3

4) Виконати міграцію Prisma:
npx prisma migrate dev
5) Запустити проєкт у режимі розробки:
npm run dev