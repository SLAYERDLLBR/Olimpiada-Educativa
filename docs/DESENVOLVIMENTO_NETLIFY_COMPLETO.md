# 🚀 PLANO DE DESENVOLVIMENTO COMPLETO - NETLIFY DEPLOYMENT

## 📊 VISÃO EXECUTIVA

| Aspecto | Detalhe |
|---------|---------|
| **Projeto** | Olimpíada Educativa - Arena Desafios |
| **Plataforma** | Netlify (Frontend + Serverless) |
| **Backend** | Railway/Render (Node.js + Socket.IO) |
| **Database** | Supabase PostgreSQL |
| **Duração Total** | 8 semanas (2 sprints × 4 semanas) |
| **Deploy** | Staging (Semana 4), Produção (Semana 8) |
| **Públicoalvo** | Crianças 6-11 anos (1º-5º ano) |
| **Capacidade** | 28 jogadores por sala, 100+ salas simultâneas |

---

## 🏗️ ARQUITETURA GERAL

```
┌──────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                      │
│ ┌─────────────────────────────────────────────────────────┐  │
│ │ React SPA (Vite) - Netlify                              │  │
│ │ - Lobby (CoD Warzone Style)                            │  │
│ │ - Pre-Test (PT + MAT)                                  │  │
│ │ - Game Room (Real-time)                                │  │
│ │ - Leaderboard                                          │  │
│ │ - Results Screen                                       │  │
│ └─────────────────────────────────────────────────────────┘  │
│                          ↑↓ Socket.IO + HTTP                 │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                    NETLIFY FUNCTIONS (Serverless)             │
│ - Auth endpoints (/auth/register, /auth/login)              │
│ - Questions API (/questions/get)                            │
│ - Pre-test scoring (/pretest/calculate-score)               │
│ - Leaderboard queries (/leaderboard/get-rankings)           │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│           BACKEND (Railway/Render) - Node.js                 │
│ ┌──────────────────────────────────────────────────────┐    │
│ │ Socket.IO Server (Real-time Events)                  │    │
│ │ - Game room management                              │    │
│ │ - Team balancing                                    │    │
│ │ - Real-time scoring & leaderboard updates           │    │
│ │ - Broadcasting to 28 players                        │    │
│ └──────────────────────────────────────────────────────┘    │
│                          ↓                                    │
│ ┌──────────────────────────────────────────────────────┐    │
│ │ Express.js API (Backup/REST)                        │    │
│ │ - Game state persistence                            │    │
│ │ - Analytics data                                    │    │
│ └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│           DATABASE (Supabase PostgreSQL)                      │
│ - Players, Teams, Game Sessions                             │
│ - Pre-tests, Responses, Leaderboards                        │
│ - Questions Bank (250 questions)                            │
│ - Analytics & Reporting                                     │
└──────────────────────────────────────────────────────────────┘
```

---

## 📁 ESTRUTURA DE PROJETO

### Frontend (Netlify)

```
olimpiada-frontend/
├── src/
│   ├── pages/
│   │   ├── LandingPage.tsx           # Splash screen inicial
│   │   ├── PreTestPage.tsx           # Survey + Questões (PT + MAT)
│   │   ├── LobbyPage.tsx             # Tipo CoD Warzone
│   │   ├── GamePage.tsx              # Jogo principal (20 min)
│   │   ├── ResultsPage.tsx           # Placar final + badges
│   │   └── NotFound.tsx              # 404
│   │
│   ├── components/
│   │   ├── PreTest/
│   │   │   ├── SkillSurvey.tsx
│   │   │   ├── TestQuestion.tsx
│   │   │   └── SkillResults.tsx
│   │   │
│   │   ├── Lobby/
│   │   │   ├── PlayerCard.tsx        # Skill score, avatar, série
│   │   │   ├── TeamPreview.tsx       # Mostra equipes balanceadas
│   │   │   ├── BalanceStatus.tsx     # Variance score
│   │   │   └── RoomSelector.tsx      # 16 players vs 20+ players
│   │   │
│   │   ├── Game/
│   │   │   ├── QuestionRenderer.tsx  # Renderiza 7 formatos
│   │   │   ├── Timer.tsx             # 40s com fases (speedrun, early, normal, timeout)
│   │   │   ├── Leaderboard.tsx       # Placar em tempo real
│   │   │   └── Formats/
│   │   │       ├── MultipleChoice.tsx
│   │   │       ├── TrueFalse.tsx
│   │   │       ├── Matching.tsx
│   │   │       ├── FillBlank.tsx
│   │   │       ├── VisualClick.tsx
│   │   │       ├── NumericInput.tsx
│   │   │       └── Sequence.tsx
│   │   │
│   │   └── Common/
│   │       ├── Navbar.tsx
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Loading.tsx
│   │
│   ├── hooks/
│   │   ├── useSocket.ts              # Socket.IO connection
│   │   ├── useTimer.ts               # 40s timer logic
│   │   ├── useGameState.ts           # Zustand store
│   │   ├── usePreTest.ts             # Pre-test flow
│   │   └── useAuth.ts                # Login/Register
│   │
│   ├── services/
│   │   ├── api.ts                    # HTTP calls (Netlify Functions)
│   │   ├── socket.ts                 # Socket.IO setup
│   │   ├── auth.ts                   # Auth utils
│   │   └── scoring.ts                # Calcular pontos
│   │
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces
│   │
│   ├── assets/
│   │   ├── avatars/                  # 8 avatares × 5 séries
│   │   ├── sounds/                   # Efeitos sonoros (40 arquivos)
│   │   ├── icons/                    # UI icons (Tabler)
│   │   └── animations/               # Lottie JSONs
│   │
│   ├── styles/
│   │   ├── globals.css               # Tailwind
│   │   ├── animations.css            # Custom animations
│   │   └── themes.css                # Light/Dark mode
│   │
│   ├── App.tsx                       # Router + Context
│   └── main.tsx                      # Entry point
│
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico
│
├── .env.example
├── .env.production
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── netlify.toml                      # Deploy config
```

### Backend (Railway/Render)

```
olimpiada-backend/
├── src/
│   ├── server.ts                     # Express + Socket.IO
│   │
│   ├── routes/
│   │   ├── auth.ts                   # Register, Login
│   │   ├── game.ts                   # Create/Join room
│   │   ├── questions.ts              # Get questions
│   │   ├── pretest.ts                # Submit pre-test
│   │   └── leaderboard.ts            # Get rankings
│   │
│   ├── services/
│   │   ├── AuthService.ts            # JWT, password hashing
│   │   ├── GameService.ts            # Room management
│   │   ├── TeamBalanceService.ts     # CoD balancing algorithm
│   │   ├── ScoringService.ts         # Points calculation
│   │   ├── QuestionService.ts        # Get/cache questions
│   │   └── LeaderboardService.ts     # Real-time rankings
│   │
│   ├── models/
│   │   ├── Player.ts
│   │   ├── Team.ts
│   │   ├── GameSession.ts
│   │   ├── Round.ts
│   │   ├── PreTest.ts
│   │   └── Leaderboard.ts
│   │
│   ├── socket/
│   │   ├── events.ts                 # All Socket.IO events
│   │   ├── handlers/
│   │   │   ├── lobby.ts              # Player join/leave
│   │   │   ├── game.ts               # Question, answer, timer
│   │   │   ├── scoring.ts            # Update points
│   │   │   └── balance.ts            # Team balancing
│   │   └── middleware/
│   │       └── auth.ts               # JWT verification
│   │
│   ├── database/
│   │   ├── connection.ts             # Supabase connection
│   │   ├── migrations/
│   │   │   ├── 001_create_players.sql
│   │   │   ├── 002_create_teams.sql
│   │   │   ├── 003_create_sessions.sql
│   │   │   └── ... (rest)
│   │   └── seed.ts                   # Seed 250 questions
│   │
│   ├── cache/
│   │   └── redis.ts                  # Redis for leaderboard
│   │
│   ├── middleware/
│   │   ├── auth.ts                   # JWT validation
│   │   ├── cors.ts                   # CORS setup
│   │   ├── errorHandler.ts           # Error handling
│   │   └── logger.ts                 # Logging
│   │
│   ├── utils/
│   │   ├── jwt.ts                    # JWT utilities
│   │   ├── validators.ts             # Input validation
│   │   └── helpers.ts                # Generic helpers
│   │
│   └── config/
│       └── env.ts                    # Environment variables
│
├── tests/
│   ├── unit/
│   │   ├── scoring.test.ts
│   │   ├── balance.test.ts
│   │   └── validators.test.ts
│   │
│   └── integration/
│       ├── game.test.ts
│       └── socket.test.ts
│
├── .env.example
├── .env.production
├── package.json
├── tsconfig.json
├── docker-compose.yml                # Local development
└── README.md
```

---

## 📅 ROADMAP 8 SEMANAS

### Semana 1-2: Setup & MVP Básico (Sprint 1)

**Frontend (Netlify)**
- [ ] Setup Vite + React + TypeScript
- [ ] Tailwind CSS config
- [ ] Routing (React Router)
- [ ] Landing page (splash screen)
- [ ] Pre-test page (Survey + Q1 PT)
- [ ] Deploy em staging

**Backend (Railway)**
- [ ] Setup Express + Socket.IO
- [ ] PostgreSQL connection
- [ ] Auth endpoints (register, login)
- [ ] Pre-test submit endpoint
- [ ] Deploy em staging

**Database (Supabase)**
- [ ] Create players table
- [ ] Create pretests table
- [ ] Create auth system (JWT)
- [ ] Seed 50 pre-test questions (1º-2º série)

**Deliverable**: Pre-test funcional completo (Survey → PT → MAT → Skill Score)

---

### Semana 3-4: Lobby + Balanceamento (Sprint 1 continuação)

**Frontend**
- [ ] Lobby page (CoD Warzone style)
- [ ] Player cards com skill scores
- [ ] Team preview cards
- [ ] "Distribuir Novamente" button
- [ ] 16 vs 20+ player selector
- [ ] Socket.IO connection test

**Backend**
- [ ] Game room CRUD
- [ ] Team balancing algorithm (min-max variance)
- [ ] Socket events (player-joined, game-starting)
- [ ] Leaderboard real-time updates (Redis)

**Database**
- [ ] Create teams table
- [ ] Create game_sessions table
- [ ] Create leaderboards table
- [ ] Seed 250 pre-test questions (todas as séries)

**Testing**
- [ ] Test balancing com 16 players
- [ ] Test balancing com 28 players
- [ ] Variance score accuracy

**Deliverable**: Lobby completo + balanceamento automático ✅

---

### Semana 5-6: Jogo Principal (Sprint 2)

**Frontend**
- [ ] Game page layout
- [ ] Question renderer (7 formatos começando com Multiple Choice)
- [ ] Timer (40s com fases: speedrun 0-15s, early 15-30s, normal 30-40s, timeout)
- [ ] Leaderboard ao vivo (atualiza a cada resposta)
- [ ] Submit answer flow
- [ ] Real-time points animation

**Backend**
- [ ] Question delivery via Socket.IO
- [ ] Answer validation (per format)
- [ ] Scoring engine (com bônus: velocidade, sincronização, combo)
- [ ] Early advance logic (se todos responderam <30s)
- [ ] Leaderboard calculations
- [ ] Socket events (question-show, answer-submitted, leaderboard-update)

**Database**
- [ ] Create rounds table
- [ ] Create responses table
- [ ] Create scoring_history table
- [ ] Create questions table com 25 × 5 séries × 2 disciplinas

**Testing**
- [ ] Test scoring formula
- [ ] Test early advance trigger
- [ ] Test 16 players simultâneos
- [ ] Test points animations

**Deliverable**: Primeira questão (Multiple Choice) funcional 100% ✅

---

### Semana 7: 6 Formatos Extras + Polimento (Sprint 2 continuação)

**Frontend**
- [ ] True/False component
- [ ] Matching (Drag-Drop) component
- [ ] Fill Blank component
- [ ] Visual Click component
- [ ] Numeric Input component
- [ ] Sequence/Ordering component
- [ ] Results page (final leaderboard + badges)
- [ ] Animations (Framer Motion)
- [ ] Efeitos sonoros

**Backend**
- [ ] Answer validation para todos os 7 formatos
- [ ] Difficulty adaptation per serie

**Testing**
- [ ] Test cada formato com múltiplos players
- [ ] Test end-to-end (Pre-test → Lobby → Game → Results)
- [ ] Load test com 100 players em diferentes salas

**Deliverable**: Todos os 7 formatos funcionando ✅

---

### Semana 8: Deployment & Finalização (Sprint 2 fim)

**Frontend**
- [ ] Otimização de performance
- [ ] SEO meta tags
- [ ] Service Worker (offline support)
- [ ] Acessibilidade (WCAG AA)
- [ ] Build produção

**Backend**
- [ ] Performance tunning (WebSocket latência <100ms)
- [ ] Error handling robusto
- [ ] Logging & monitoring (Sentry)
- [ ] Database backups

**DevOps**
- [ ] Netlify deploy (produção)
- [ ] Railway deploy (produção)
- [ ] Supabase backups
- [ ] SSL certificates

**Testing**
- [ ] Smoke tests (basic flows)
- [ ] Load test 1000 players
- [ ] Stress test (28 simultâneos)
- [ ] Regression tests

**Documentation**
- [ ] README.md
- [ ] Deployment guide
- [ ] API docs
- [ ] Socket.IO events reference

**Deliverable**: Full production deployment ✅

---

## 🔧 NETLIFY.TOML CONFIGURATION

```toml
[build]
  command = "npm run build"
  functions = "functions"
  publish = "dist"
  environment = { NODE_VERSION = "18.17.0" }

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[dev]
  functions = "functions"
  port = 8888
  command = "npm run dev"

[context.production]
  environment = { 
    ENVIRONMENT = "production"
    NODE_ENV = "production"
  }

[context.deploy-preview]
  environment = { 
    ENVIRONMENT = "staging"
    NODE_ENV = "staging"
  }

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

---

## 🗄️ DATABASE SCHEMA (SQL)

```sql
-- Players
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(20) UNIQUE NOT NULL,
  series INT CHECK (series >= 1 AND series <= 5),
  avatar_index INT CHECK (avatar_index >= 0 AND avatar_index <= 7),
  skill_score INT DEFAULT 50 CHECK (skill_score >= 0 AND skill_score <= 100),
  total_points INT DEFAULT 0,
  games_played INT DEFAULT 0,
  dominant_subjects TEXT[],
  pretest_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pre-tests
CREATE TABLE pretests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  portuguese_correct BOOLEAN,
  math_correct BOOLEAN,
  skill_score INT,
  survey_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Teams
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES game_sessions(id),
  name VARCHAR(50),
  color VARCHAR(20), -- red, blue, yellow, green
  player_ids UUID[] NOT NULL,
  current_points INT DEFAULT 0,
  wins INT DEFAULT 0,
  losses INT DEFAULT 0,
  average_skill_score INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Game Sessions
CREATE TABLE game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status VARCHAR(20) DEFAULT 'waiting',
  max_players INT CHECK (max_players IN (16, 20, 28)),
  current_round INT DEFAULT 0,
  total_rounds INT DEFAULT 15,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Rounds
CREATE TABLE rounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES game_sessions(id),
  round_number INT,
  question_id UUID NOT NULL REFERENCES questions(id),
  format_type VARCHAR(30),
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  time_limit_ms INT DEFAULT 40000
);

-- Responses
CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  round_id UUID NOT NULL REFERENCES rounds(id),
  team_id UUID NOT NULL REFERENCES teams(id),
  answer JSONB,
  is_correct BOOLEAN,
  response_time_ms INT,
  points_earned INT,
  speed_multiplier FLOAT DEFAULT 1.0,
  combo_multiplier FLOAT DEFAULT 1.0,
  sync_bonus INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Questions
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  series INT CHECK (series >= 1 AND series <= 5),
  subject VARCHAR(20), -- português, matemática
  format_type VARCHAR(30),
  prompt TEXT NOT NULL,
  options JSONB,
  correct_answer TEXT OR TEXT[],
  points INT,
  difficulty INT CHECK (difficulty IN (1, 2, 3)),
  bloom_level VARCHAR(20),
  tags TEXT[],
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Leaderboards
CREATE TABLE leaderboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES game_sessions(id),
  team_id UUID NOT NULL REFERENCES teams(id),
  position INT,
  points INT,
  wins INT,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 DEPLOYMENT CHECKLIST

### Netlify Frontend
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] Environment variables set (.env.production)
- [ ] Build output in `dist/`
- [ ] Connect GitHub repo
- [ ] Deploy preview working
- [ ] Production deploy successful
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled

### Railway Backend
- [ ] Dockerfile created & tested locally
- [ ] Environment variables set
- [ ] GitHub connection authorized
- [ ] Auto-deploy on push enabled
- [ ] Health check endpoint working
- [ ] Database connection string set
- [ ] Redis connection string set
- [ ] Logs accessible
- [ ] Monitoring alerts configured

### Supabase Database
- [ ] All tables created
- [ ] Row-level security (RLS) policies set
- [ ] Backups enabled
- [ ] Indexes created for performance
- [ ] Seed data loaded (250 questions)
- [ ] Connection pooling enabled

### Security
- [ ] JWT secret configured (prod vs staging)
- [ ] CORS whitelist set
- [ ] Rate limiting enabled
- [ ] SQL injection prevention checked
- [ ] XSS headers set
- [ ] HTTPS enforced
- [ ] Sensitive data never logged

### Testing
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] Load test with 100+ concurrent users
- [ ] Stress test with 28 simultaneous players
- [ ] End-to-end test flow
- [ ] Browser compatibility tested
- [ ] Mobile responsiveness verified

### Monitoring
- [ ] Sentry error tracking enabled
- [ ] LogRocket session replay enabled (optional)
- [ ] Database query monitoring
- [ ] API latency monitoring
- [ ] WebSocket connection monitoring
- [ ] Error alerts configured
- [ ] Performance alerts configured

---

## 💻 DESENVOLVIMENTO LOCAL

### Setup Inicial

```bash
# Clone repos
git clone https://github.com/seu-user/olimpiada-frontend.git
git clone https://github.com/seu-user/olimpiada-backend.git

# Frontend setup
cd olimpiada-frontend
npm install
cp .env.example .env.development
npm run dev  # http://localhost:5173

# Backend setup (novo terminal)
cd olimpiada-backend
npm install
cp .env.example .env
docker-compose up -d  # PostgreSQL + Redis local
npm run migrate
npm run seed
npm run dev  # http://localhost:3001

# Socket.IO test
# Abrir http://localhost:5173 e ver conexão em action
```

### Debugging

```bash
# Frontend logs
VITE_DEBUG=* npm run dev

# Backend logs
DEBUG=* npm run dev

# Socket.IO debug
npm run dev -- --inspect

# Database queries
# Supabase Dashboard > SQL Editor
# Ver todas as queries em real-time
```

---

## 📊 MÉTRICAS DE SUCESSO

- ✅ Pre-test: <5 minutos completo
- ✅ Lobby: <2 minutos até jogo começar
- ✅ Game: 15-20 minutos
- ✅ Total time: <30 minutos (aluno → logout)
- ✅ Engagement: 80%+ alunos pedem "outra rodada"
- ✅ Performance: <100ms latência Socket.IO
- ✅ Uptime: 99.5%+
- ✅ Load: 1000+ concurrent players
- ✅ Retention: 60%+ play again next week

---

## 📞 SUPORTE

**Documentação Relacionada**:
- `PRE_TESTE_BALANCEAMENTO_COD.md` - Sistema de pré-teste
- `BANCO_QUESTOES_PRE_TESTE_25.md` - 250 questões prontas
- `OLIMPIADA_EDUCATIVA_ARQUITETURA.md` - Pedagogia + 7 formatos
- `RESUMO_EXECUTIVO.md` - Quick overview

**Quick Links**:
- Netlify Docs: https://docs.netlify.com
- Railway Docs: https://railway.app/docs
- Supabase Docs: https://supabase.com/docs
- Socket.IO Docs: https://socket.io/docs

---

**Versão**: 2.0 | **Data**: 2026-09-08 | **Status**: Ready to Start Development 🚀

**Lema**: "8 semanas → 1000 crianças felizes jogando!" 🎮✨
