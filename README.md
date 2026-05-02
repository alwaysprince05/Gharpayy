# Gharpayy - Lead Management CRM

A production-ready Lead Management CRM MVP built for handling customer leads effectively. This project is built as a full-stack web application.

## Tech Stack

- **Framework**: TanStack Start
- **Frontend**: React, TailwindCSS, Radix UI, Framer Motion
- **Database**: SQLite
- **ORM**: Prisma
- **Routing**: TanStack Router

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   The project uses Prisma with SQLite. To initialize the database and run migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Seed Database**
   To seed the database with initial test data:
   ```bash
   npm run seed
   ```
   *(Note: Ensure you have a seed script defined in your package.json or run `ts-node prisma/seed.ts`)*

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Author

- [alwaysprince05](https://github.com/alwaysprince05)
