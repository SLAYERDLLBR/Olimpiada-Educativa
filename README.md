# Olimpíada Educativa - Arena Desafios

Plataforma gamificada de aprendizado (Português + Matemática) para alunos de 1º-5º ano, com pré-teste adaptativo, lobby estilo CoD Warzone com balanceamento automático de times, e um jogo em tempo real com 7 formatos de questão.

## Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion (`frontend/`)
- **Backend**: Node.js + Express + Socket.IO + TypeScript (`backend/`)
- **Database**: SQLite (via `better-sqlite3`) — arquivo local, sem servidor pra instalar; em produção mora num Volume persistente do Railway

## Status

Sprint 1 (Semanas 1-2): scaffold do projeto + fluxo de pré-teste (survey → questão PT → questão MAT → Skill Score).

Veja o plano completo em `docs/` (documentos de especificação originais) e o histórico de decisões de arquitetura no primeiro commit.

## Desenvolvimento local

Sem pré-requisito de servidor de banco — SQLite é um arquivo, criado pelo próprio projeto.

```bash
# Backend
cd backend
npm install
mkdir data
cp .env.example .env    # ajustar JWT_SECRET se necessário
npm run migrate           # cria data/olimpiada.db a partir de schema.sql
npm run seed               # popula as 50 questões de pré-teste (séries 1º-2º)
npm run seed:game          # popula as questões do jogo principal
npm run dev                 # http://localhost:3001

# Frontend (outro terminal)
cd frontend
npm install
cp .env.example .env
npm run dev               # http://localhost:5173
```
