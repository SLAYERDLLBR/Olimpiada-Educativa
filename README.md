# Olimpíada Educativa - Arena Desafios

Plataforma gamificada de aprendizado (Português + Matemática) para alunos de 1º-5º ano, com pré-teste adaptativo, lobby estilo CoD Warzone com balanceamento automático de times, e um jogo em tempo real com 7 formatos de questão.

## Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion (`frontend/`)
- **Backend**: Node.js + Express + Socket.IO + TypeScript (`backend/`)
- **Database**: PostgreSQL (local em desenvolvimento via `pg`; Supabase ou qualquer Postgres gerenciado em produção — o driver fala Postgres puro, então a `DATABASE_URL` é a única coisa que muda)

## Status

Sprint 1 (Semanas 1-2): scaffold do projeto + fluxo de pré-teste (survey → questão PT → questão MAT → Skill Score).

Veja o plano completo em `docs/` (documentos de especificação originais) e o histórico de decisões de arquitetura no primeiro commit.

## Desenvolvimento local

Pré-requisito: PostgreSQL rodando localmente (nativo ou `docker run --name olimpiada-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16`), com um banco `olimpiada_educativa` criado.

```bash
# Banco (uma vez)
createdb olimpiada_educativa   # ou: psql -U postgres -c "CREATE DATABASE olimpiada_educativa;"
psql -U postgres -d olimpiada_educativa -f backend/src/database/schema.sql

# Backend
cd backend
npm install
cp .env.example .env   # ajustar DATABASE_URL e JWT_SECRET se necessário
npm run seed             # popula as 50 questões de pré-teste (séries 1º-2º)
npm run dev               # http://localhost:3001

# Frontend (outro terminal)
cd frontend
npm install
cp .env.example .env
npm run dev               # http://localhost:5173
```
