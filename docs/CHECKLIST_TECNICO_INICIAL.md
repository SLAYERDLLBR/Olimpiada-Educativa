# ⚙️ CHECKLIST TÉCNICO INICIAL - READY TO CODE

## 🚀 INÍCIO RÁPIDO (Hora 0)

### Pré-requisitos
```bash
# Node.js v18+
node --version

# npm ou yarn
npm --version

# Git (para versionamento)
git --version

# Editor: VS Code (recomendado)
code --version
```

---

## 📁 ESTRUTURA DE PROJETO

### Frontend (React + Vite)
```
olimpiada-frontend/
├── src/
│   ├── components/
│   │   ├── Lobby/
│   │   │   ├── LobbyPage.tsx
│   │   │   ├── PlayerCard.tsx
│   │   │   └── RoomCreator.tsx
│   │   ├── Game/
│   │   │   ├── GameRoom.tsx
│   │   │   ├── QuestionRenderer.tsx
│   │   │   ├── Timer.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   └── Formats/
│   │   │       ├── MultipleChoice.tsx
│   │   │       ├── TrueFalse.tsx
│   │   │       ├── Matching.tsx
│   │   │       ├── FillBlank.tsx
│   │   │       ├── VisualClick.tsx
│   │   │       ├── NumericInput.tsx
│   │   │       └── Sequence.tsx
│   │   └── Results/
│   │       ├── ResultsPage.tsx
│   │       └── Badges.tsx
│   ├── hooks/
│   │   ├── useSocket.ts
│   │   ├── useGameState.ts
│   │   └── useTimer.ts
│   ├── types/
│   │   └── index.ts (types compartilhados)
│   ├── styles/
│   │   └── globals.css
│   └── App.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Backend (Node.js + Express)
```
olimpiada-backend/
├── src/
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── game.ts
│   │   ├── questions.ts
│   │   └── leaderboard.ts
│   ├── services/
│   │   ├── GameService.ts
│   │   ├── TeamService.ts
│   │   ├── QuestionService.ts
│   │   └── ScoringService.ts
│   ├── models/
│   │   ├── Player.ts
│   │   ├── Team.ts
│   │   ├── GameSession.ts
│   │   ├── Question.ts
│   │   └── Leaderboard.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── socket/
│   │   ├── events.ts
│   │   └── handlers.ts
│   ├── database/
│   │   ├── connection.ts
│   │   └── migrations/
│   └── app.ts
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 🗄️ SCHEMA DO DATABASE (Supabase)

### Tabela: players
```sql
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(20) NOT NULL UNIQUE,
  series INT CHECK (series >= 1 AND series <= 5),
  avatar_index INT CHECK (avatar_index >= 0 AND avatar_index <= 7),
  total_points INT DEFAULT 0,
  games_played INT DEFAULT 0,
  badges JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabela: teams
```sql
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES game_sessions(id),
  name VARCHAR(50),
  player_ids UUID[] NOT NULL,
  current_points INT DEFAULT 0,
  wins INT DEFAULT 0,
  losses INT DEFAULT 0,
  average_series INT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabela: game_sessions
```sql
CREATE TABLE game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status VARCHAR(20) DEFAULT 'waiting',
  -- waiting | playing | finished
  max_players INT DEFAULT 28,
  current_round INT DEFAULT 0,
  total_rounds INT DEFAULT 15,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabela: rounds
```sql
CREATE TABLE rounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES game_sessions(id),
  round_number INT,
  question_id UUID NOT NULL REFERENCES questions(id),
  format_type VARCHAR(30),
  -- multiple-choice | true-false | matching | fill-blank | visual-click | numeric-input | sequence
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  responses JSONB DEFAULT '[]'
);
```

### Tabela: question_banks
```sql
CREATE TABLE question_banks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competency_id VARCHAR(50) NOT NULL,
  subject VARCHAR(20),
  -- matematica | portugues
  series_target INT[],
  difficulty INT CHECK (difficulty >= 1 AND difficulty <= 3),
  created_at TIMESTAMP
);
```

### Tabela: questions
```sql
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_id UUID NOT NULL REFERENCES question_banks(id),
  format_type VARCHAR(30) NOT NULL,
  prompt TEXT NOT NULL,
  options JSONB,
  correct_answer TEXT OR TEXT[],
  points INT,
  difficulty INT,
  bloom_level VARCHAR(20),
  tags TEXT[],
  image_url VARCHAR(255),
  created_at TIMESTAMP
);
```

### Tabela: responses
```sql
CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  round_id UUID NOT NULL REFERENCES rounds(id),
  team_id UUID NOT NULL REFERENCES teams(id),
  answer TEXT OR JSONB,
  is_correct BOOLEAN,
  response_time_ms INT,
  points_earned INT,
  speed_multiplier FLOAT DEFAULT 1.0,
  combo_multiplier FLOAT DEFAULT 1.0,
  sync_bonus INT DEFAULT 0,
  created_at TIMESTAMP
);
```

### Tabela: leaderboards
```sql
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

## 🔌 SOCKET.IO EVENTS

### Client → Server

```typescript
// Conexão inicial
socket.on('join-lobby', { username, series, avatar });
socket.on('create-room', { max_players });
socket.on('join-room', { room_id });
socket.on('ready');

// Durante o jogo
socket.on('submit-answer', { format, answer, time_ms });
socket.on('skip-question');

// Outros
socket.on('disconnect');
```

### Server → Client

```typescript
// Lobby events
socket.emit('player-joined', { player });
socket.emit('players-list', { players });
socket.emit('room-created', { room_id });
socket.emit('game-starting', { teams, countdown: 3 });

// Game events
socket.emit('question-show', { question, timer: 40 });
socket.emit('team-answered', { team_id, time_ms });
socket.emit('timer-tick', { remaining: 35 });
socket.emit('question-end', { correct_answer, results });
socket.emit('leaderboard-update', { rankings });

// Special events
socket.emit('speedrun-achieved', { teams });
socket.emit('early-advance', { time_remaining: 10 });
socket.emit('timeout', {});
socket.emit('game-ended', { final_rankings, winners });
```

---

## 🛣️ REST API ENDPOINTS (Backend)

### Authentication
```
POST /auth/register
  Body: { username, series, avatar_index }
  Response: { player_id, token }

POST /auth/login
  Body: { username }
  Response: { player_id, token }
```

### Game Management
```
GET /game/rooms
  Response: { rooms: [] }

POST /game/rooms
  Body: { max_players, name }
  Response: { room_id }

GET /game/rooms/:id
  Response: { room, players, status }

POST /game/rooms/:id/join
  Body: { player_id }
  Response: { team_assignment }
```

### Questions
```
GET /questions/banks?series=1&subject=matematica
  Response: { banks: [] }

GET /questions/:bank_id/:format
  Response: { question }

POST /questions/:id/validate
  Body: { format, answer }
  Response: { is_correct, expected_answer }
```

### Leaderboard
```
GET /leaderboard/session/:session_id
  Response: { rankings: [] }

GET /leaderboard/all-time?limit=10
  Response: { top_teams: [] }
```

---

## 📦 DEPENDENCIES (npm install)

### Frontend
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "socket.io-client": "^4.5.0",
    "zustand": "^4.3.0",
    "tailwindcss": "^3.2.0",
    "@headlessui/react": "^1.7.0",
    "framer-motion": "^10.0.0",
    "konva": "^9.2.0",
    "react-konva": "^18.2.0",
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^7.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^4.2.0",
    "@vitejs/plugin-react": "^3.1.0",
    "@types/react": "^18.0.0"
  }
}
```

### Backend
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "socket.io": "^4.5.0",
    "@supabase/supabase-js": "^2.20.0",
    "redis": "^4.6.0",
    "dotenv": "^16.0.0",
    "jsonwebtoken": "^9.0.0",
    "cors": "^2.8.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^18.0.0",
    "@types/express": "^4.17.0",
    "ts-node": "^10.0.0"
  }
}
```

---

## 🔐 VARIÁVEIS DE AMBIENTE (.env)

### Backend (.env)
```
# Database
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyxx...

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=seu_segredo_super_seguro_aqui

# Socket.IO
SOCKET_PORT=3001
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:5173

# Logging
LOG_LEVEL=debug
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
```

---

## 🏃 COMO COMEÇAR (Passo a Passo)

### 1. Setup Inicial
```bash
# Clone o repo (criar depois)
git clone https://github.com/luizfernando/olimpiada-educativa.git
cd olimpiada-educativa

# Frontend
cd frontend
npm install
npm run dev  # Abre em http://localhost:5173

# Backend (novo terminal)
cd ../backend
npm install
npm run dev  # Abre em http://localhost:3001
```

### 2. Database Setup (Supabase)
```bash
# 1. Criar projeto em supabase.com
# 2. Copiar credenciais para .env
# 3. Rodar migrations:
# SQL → Copy-paste cada tabela do schema acima
# 4. Criar índices para performance
```

### 3. Primeiro Teste (Socket.IO)
```typescript
// Frontend - test-connection.ts
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('✅ Conectado ao servidor!');
  socket.emit('join-lobby', {
    username: 'TestPlayer',
    series: 1,
    avatar: 0
  });
});

socket.on('disconnect', () => {
  console.log('❌ Desconectado');
});
```

### 4. Primeiro Componente (Multiple Choice)
```typescript
// src/components/Game/Formats/MultipleChoice.tsx
import { useState } from 'react';

export function MultipleChoice({ question, onAnswer, timeLeft }) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selected) {
      onAnswer({
        format: 'multiple-choice',
        answer: selected,
        time_ms: (40 - timeLeft) * 1000
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{question.prompt}</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`p-4 rounded-lg border-2 transition
              ${selected === opt.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
              }`}
          >
            {opt.text}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selected}
        className="w-full bg-green-500 text-white p-3 rounded-lg
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Responder ({timeLeft}s)
      </button>
    </div>
  );
}
```

### 5. Timer Component
```typescript
// src/hooks/useTimer.ts
import { useState, useEffect } from 'react';

export function useTimer(initialSeconds: number, onTimeUp: () => void) {
  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (remaining <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setRemaining(r => r - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining, onTimeUp]);

  const getPhase = () => {
    if (remaining > 30) return 'normal';
    if (remaining > 0) return 'warning';
    return 'timeout';
  };

  return { remaining, phase: getPhase() };
}
```

---

## ✅ SPRINT 1-2 DELIVERABLES

### O que entregar em 2 semanas:

```
Frontend:
├── ✓ Página de Lobby
├── ✓ Entrada em Sala
├── ✓ Cadastro de Jogador (username, série, avatar)
├── ✓ Componente de Timer (40s)
├── ✓ Multiple Choice funcionando
├── ✓ Leaderboard básico (atualiza a cada resposta)
└── ✓ Socket.IO sync básico

Backend:
├── ✓ Endpoints de auth (register, login)
├── ✓ Endpoints de game (create-room, join-room)
├── ✓ Socket handlers (join-lobby, submit-answer)
├── ✓ Scoring básico (sem bônus ainda)
├── ✓ Database com tabelas core
└── ✓ Teste com 5+ jogadores simultâneos

QA:
├── ✓ Sem crash com múltiplos clientes
├── ✓ Timer sincronizado entre clientes (<1s diferença)
├── ✓ Respostas salvas no banco
└── ✓ Leaderboard atualizado em tempo real
```

---

## 🧪 TESTE LOCAL COM 28 JOGADORES

### Simulação de Carga
```bash
# Backend deve rodar em:
# http://localhost:3001

# Abrir 28 abas do browser (ou script):
# http://localhost:5173?player=1
# http://localhost:5173?player=2
# ... até ?player=28

# Monitorar:
# - CPU usage
# - Memória (deve ficar <500MB)
# - Latência de mensagens
# - Taxa de erro (<1%)

# Ferramentas:
# - Chrome DevTools: Network tab
# - Socket.IO Admin UI (para debug)
# - Supabase Dashboard (queries/performance)
```

---

## 📊 MONITORING & DEBUGGING

### Logs
```bash
# Backend
LOG_LEVEL=debug npm run dev
# Verá: [DEBUG] Player joined, [DEBUG] Answer received, etc

# Frontend
localStorage.setItem('debug', '*')
# Verá logs de Socket.IO, Redux, etc
```

### Socket.IO Admin UI (dev only)
```typescript
// Backend - app.ts
import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

const io = new Server(server, {
  adapter: createAdapter(pubClient, subClient)
});

instrument(io, { auth: false }); // ⚠️ Only dev!

// Acessa em http://localhost:3001/admin/
```

---

## 📝 PRÓXIMA ETAPA (após Sprint 1-2)

Quando o MVP estiver rodando:

1. **Adicionar mais formatos** (Sprint 3-4)
   - Copiar padrão do MultipleChoice
   - Criar Matching, FillBlank, etc
   - Testar validação de cada formato

2. **Gamificação** (Sprint 5-6)
   - Implementar bônus (velocidade, combo)
   - Animations com Framer Motion
   - Efeitos sonoros (HTML5 Audio API)

3. **Pedagógico** (Sprint 7+)
   - Expandir banco de questões (100+ competências)
   - Algoritmo de seleção dinâmica
   - Analytics para professor

---

## 🆘 TROUBLESHOOTING

### Socket.IO não conecta
```
✗ Erro: "Cannot connect to localhost:3001"
✓ Solução: 
  - Verificar se backend está rodando: lsof -i :3001
  - Verificar CORS em backend
  - Verificar firewall
```

### Leaderboard não atualiza
```
✗ Erro: Placar congelado
✓ Solução:
  - Verificar se Socket.on('leaderboard-update') está ouvindo
  - Verificar se servidor está emitindo
  - Console.log tudo para debugar
```

### Banco de dados vazio
```
✗ Erro: Erro 404 ao fazer query
✓ Solução:
  - Verificar SUPABASE_URL e SUPABASE_KEY
  - Verificar se tabelas foram criadas
  - Usar Supabase Dashboard para testar queries
```

---

## 📞 ARQUIVOS DE REFERÊNCIA

Para dúvidas, consulte:

| Arquivo | Conteúdo |
|---------|----------|
| `PROMPT_GINCANA_EDUCATIVA.md` | Especificação completa |
| `OLIMPIADA_EDUCATIVA_ARQUITETURA.md` | Arquitetura pedagógica detalhada |
| `BANCO_QUESTOES_EXEMPLO.md` | 70 questões modeladas |
| `RESUMO_EXECUTIVO.md` | Visão geral executiva |
| `CHECKLIST_TECNICO_INICIAL.md` | Este arquivo |

---

**Versão**: 1.0 | **Data**: 2026-09-08 | **Status**: Ready to Code 🚀

**Comandos Mágicos**:
```bash
# Full setup
git clone <repo> && cd olimpiada && npm install && npm run setup:db && npm run dev

# Depois, abra outro terminal:
cd frontend && npm run dev

# 🎮 Abra http://localhost:5173 - Jogo pronto para jogar!
```
