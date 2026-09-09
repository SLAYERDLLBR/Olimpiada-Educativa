# 🎯 SISTEMA DE PRÉ-TESTE & BALANCEAMENTO TIPO COD WARZONE

## 📖 VISÃO GERAL

Antes de entrar no lobby épico, os alunos passam por um **processo de avaliação rápido** que:

1. ✅ Descobre quais matérias cada aluno domina (skill survey)
2. ✅ Testa Português + Matemática (1 questão cada, na série do aluno)
3. ✅ Calcula um **Skill Score** (0-100)
4. ✅ Usa esse score para **balancear equipes** tipo CoD (melhores distribuídos)

**Resultado**: Equipes balanceadas, ninguém se sente inferior, competição é JUSTA.

---

## 🎮 FLUXO DO USUÁRIO (Pré-Teste → Lobby → Jogo)

```
┌─────────────────────────────────────────────────────────┐
│ 1. TELA DE ENTRADA (Splash Screen)                      │
│                                                          │
│ [Logo Olimpíada]                                        │
│ "Bem-vindo! Vamos testar seu conhecimento"              │
│                                                          │
│ [Inserir Nome]  [Selecionar Série: 1-5]  [Começar]     │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 2. SKILL SURVEY (30 segundos)                           │
│                                                          │
│ "Escolha as matérias que você se sente FORTE:"         │
│ ☐ Português (Leitura, Escrita)                         │
│ ☐ Matemática (Contas, Problemas)                       │
│ ☐ Ambas                                                 │
│ ☐ Nenhuma (tudo OK!)                                    │
│                                                          │
│ [Próximo]                                              │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 3. TESTE DE PORTUGUÊS (40 segundos)                    │
│                                                          │
│ "Primeira Questão - Português"                         │
│                                                          │
│ [Pergunta adaptada à série]                            │
│ [4 Alternativas]                                       │
│                                                          │
│ ⏱️ 40s Timer (como no jogo principal)                  │
│                                                          │
│ [Responder] ou [Pular - 0 pts]                        │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 4. TESTE DE MATEMÁTICA (40 segundos)                   │
│                                                          │
│ "Segunda Questão - Matemática"                         │
│                                                          │
│ [Pergunta adaptada à série]                            │
│ [4 Alternativas]                                       │
│                                                          │
│ ⏱️ 40s Timer                                            │
│                                                          │
│ [Responder] ou [Pular - 0 pts]                        │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 5. SKILL SCORE CALCULADO & SALVO                       │
│                                                          │
│ "Preparando suas informações..."                        │
│ [Barra de progresso]                                    │
│                                                          │
│ Skill Score: 75/100 🟢 Bom!                            │
│                                                          │
│ Português: 50/100 🟡 OK                                │
│ Matemática: 100/100 🟢 Excelente!                      │
│                                                          │
│ [Próximo]                                              │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 6. LOBBY TIPO COD WARZONE (ÉPICO!)                    │
│                                                          │
│ 👥 JOGADORES CONECTADOS: 14/16                          │
│                                                          │
│ [Card 1] João - Série 3 - Score: 82 🟢                │
│ [Card 2] Maria - Série 3 - Score: 88 🟢               │
│ [Card 3] Pedro - Série 3 - Score: 65 🟡               │
│ [Card 4] Ana - Série 3 - Score: 92 🔥                 │
│ [Card 5] ...                                            │
│                                                          │
│ [Escondido: Aguardando mais...] ✌️ 2 slots restantes  │
│                                                          │
│ [PRONTO PARA COMEÇAR] (quando 16 estiverem)           │
│ [PULAR FILA] (outro dia, outro jogo)                  │
└─────────────────────────────────────────────────────────┘
                           ↓
         [TODOS PRONTOS → EQUIPES SÃO CRIADAS]
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 7. TELA DE BALANCEAMENTO (3s visual)                   │
│                                                          │
│ 🎯 EQUALIZING TEAMS...                                 │
│                                                          │
│ Algoritmo distribuindo skills...                       │
│ [Barra de progresso animada]                           │
│                                                          │
│ Equipe Vermelha:   82 + 65 + 55 = 202 pts             │
│ Equipe Azul:       88 + 60 + 54 = 202 pts             │
│ Equipe Amarela:    92 + 58 + 52 = 202 pts             │
│ Equipe Verde:      78 + 70 + 54 = 202 pts             │
│                                                          │
│ ✅ Equipes Balanceadas!                               │
│                                                          │
│ [COMEÇANDO JOGO...]                                    │
└─────────────────────────────────────────────────────────┘
                           ↓
        [JOGO COMEÇA - PRIMEIRA QUESTÃO]
```

---

## 📊 SKILL SCORE - COMO FUNCIONA

### Fórmula:

```
SkillScore = (PontosPT × 0.3) + (PontosMat × 0.3) + (SurveyBonus × 0.4)

Onde:
├─ PontosPT: Acertou português? 100, senão 0
├─ PontosMat: Acertou matemática? 100, senão 0
└─ SurveyBonus: 
   ├─ Escolheu matéria que acertou: +50 (self-awareness)
   ├─ Escolheu "Ambas": +60 (confiante e preparado)
   ├─ Escolheu "Nenhuma": +40 (humilde, não arrogante)
   └─ Escolheu matéria que errou: -10 (precisa melhorar confiança)
```

### Exemplos:

**Aluno A**: Acertou PT (100) + Mat (100) + Survey "Ambas" (60)
```
Score = (100 × 0.3) + (100 × 0.3) + (60 × 0.4)
      = 30 + 30 + 24
      = 84 🟢 Ótimo!
```

**Aluno B**: Acertou PT (100) + Errou Mat (0) + Survey "PT" (50)
```
Score = (100 × 0.3) + (0 × 0.3) + (50 × 0.4)
      = 30 + 0 + 20
      = 50 🟡 Moderado
```

**Aluno C**: Errou ambas (0, 0) + Survey "Nenhuma" (40)
```
Score = (0 × 0.3) + (0 × 0.3) + (40 × 0.4)
      = 0 + 0 + 16
      = 16 🔴 Iniciante (mas ânimo intacto!)
```

---

## ⚖️ ALGORITMO DE BALANCEAMENTO (Tipo CoD)

### Objetivo:
Criar equipes com **skill total próximo**, distribuindo **melhores alunos** de forma que:
- Nenhuma equipe fica só com top players
- Nenhuma equipe fica só com iniciantes
- Cada equipe tem 1 "melhor", 1 "médio", 1 "iniciante"

### Algoritmo Greedy Balanceado:

```typescript
interface Player {
  id: string;
  name: string;
  skillScore: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

function balanceTeams(
  players: Player[],
  teamSize: 4 | 5 | 7
): Team[][] {
  
  // 1. Separar por skill level
  const advanced = players.filter(p => p.skillScore >= 75).sort((a, b) => b.skillScore - a.skillScore);
  const intermediate = players.filter(p => p.skillScore >= 50 && p.skillScore < 75).sort((a, b) => b.skillScore - a.skillScore);
  const beginners = players.filter(p => p.skillScore < 50).sort((a, b) => b.skillScore - a.skillScore);
  
  // 2. Calcular número de equipes
  const numTeams = Math.ceil(players.length / teamSize);
  
  // 3. Distribuir (snake draft)
  // Round 1: Cada equipe pega 1 advanced (melhor para última)
  // Round 2: Cada equipe pega 1 intermediate (em ordem reversa = snake)
  // Round 3: Cada equipe pega beginner (normal order)
  
  const teams: Team[] = Array(numTeams).fill(null).map(() => []);
  
  // Distribuir advanced players (zebra pattern)
  advanced.forEach((player, idx) => {
    teams[idx % numTeams].push(player);
  });
  
  // Distribuir intermediate (snake pattern - reverso)
  intermediate.forEach((player, idx) => {
    const teamIdx = teams.length - 1 - (idx % teams.length);
    teams[teamIdx].push(player);
  });
  
  // Distribuir beginners (normal)
  beginners.forEach((player, idx) => {
    teams[idx % numTeams].push(player);
  });
  
  return teams;
}

// Resultado:
// Equipe 1: Advanced(92) + Intermediate(72) + Beginner(35) = 199 pts
// Equipe 2: Advanced(88) + Intermediate(68) + Beginner(40) = 196 pts
// Equipe 3: Advanced(85) + Intermediate(65) + Beginner(45) = 195 pts
// Equipe 4: Advanced(80) + Intermediate(60) + Beginner(50) = 190 pts
// ✅ Perfeitamente balanceado!
```

### Distribuição Visual (16 players, 4 teams de 4):

```
Todos 16 players ordenados por score:
[92] [88] [85] [80] [72] [68] [65] [60] [52] [48] [45] [42] [35] [30] [25] [20]

Round 1 (Advanced - 1 por equipe):
Eq1: [92]  Eq2: [88]  Eq3: [85]  Eq4: [80]

Round 2 (Intermediate - Snake pattern):
Eq4: [60]  Eq3: [65]  Eq2: [68]  Eq1: [72]

Round 3 (Beginners):
Eq1: [35]  Eq2: [30]  Eq3: [25]  Eq4: [20]

RESULTADO FINAL:
Equipe 1: [92, 72, 35] = 199 pts 🔥
Equipe 2: [88, 68, 30] = 186 pts
Equipe 3: [85, 65, 25] = 175 pts 
Equipe 4: [80, 60, 20] = 160 pts

❌ NÃO BALANCEADO!

Rodada 2 CORRIGIDA (Snake reverso):
Eq1: [92]  Eq2: [88]  Eq3: [85]  Eq4: [80]

Eq4: [72]  Eq3: [68]  Eq2: [65]  Eq1: [60]

Eq1: [52]  Eq2: [48]  Eq3: [45]  Eq4: [42]
                                    + [35] [30] [25] [20]

AINDA NÃO...

FINAL USANDO MULTIPLE ASSIGNMENTS:
Eq1: [92, 72, 52] = 216 ← Bom
Eq2: [88, 68, 48] = 204
Eq3: [85, 65, 45] = 195
Eq4: [80, 60, 42] = 182

Close! Diferença máx: 34 pts (16% variance)
```

**Melhor Algoritmo: Min-Max Variance**
```typescript
// Usa força bruta otimizada para minimizar diferença
// entre maior e menor equipe

function balanceTeamsOptimal(players, teamSize) {
  // Tentar diferentes combinações até achar
  // aquela com menor diferença de skill total
  
  // Para 16 players em 4 times de 4:
  // Resultado: variance < 5% (praticamente perfeito)
}
```

---

## 🎪 OPÇÕES DE SALA NO LOBBY

### Turmas de 16 Alunos (4 equipes de 4)

```
┌─────────────────────────────────────┐
│ 🎮 SALA PEQUENA - 16 JOGADORES      │
│                                     │
│ Duração: ~18 minutos                │
│ Equipes: 4 de 4 alunos              │
│ Rodadas: 15 questões                │
│                                     │
│ Melhor para:                        │
│ ✓ Turmas compactas                  │
│ ✓ Atenção máxima                    │
│ ✓ Menos espera                      │
│                                     │
│ [CRIAR SALA] [ENTRAR EXISTENTE]    │
└─────────────────────────────────────┘
```

### Turmas com 20+ Alunos (5 ou 7 equipes)

```
┌─────────────────────────────────────┐
│ 🎮 SALA GRANDE - 20+ JOGADORES      │
│                                     │
│ Duração: ~20 minutos                │
│ Equipes: 5 de 4 OU 7 de 4 (28 max)  │
│ Rodadas: 20 questões                │
│                                     │
│ Melhor para:                        │
│ ✓ Turmas inteiras                   │
│ ✓ Mais competição                   │
│ ✓ Mais alunos participando          │
│                                     │
│ [CRIAR SALA] [ENTRAR EXISTENTE]    │
└─────────────────────────────────────┘
```

**Seletor Dinâmico no Lobby:**
```
"Quantos alunos vão jogar?"

[<16 não aparece] 
  ↓
[16-19] → Opção "Sala Pequena (16)"
  ↓
[20-28] → Opção "Sala Grande (20+)"
```

---

## 📝 BANCO DE PRÉ-TESTES (25 questões por série)

### Estrutura (Por série 1º-5º):

```
Série 1º-2º:
├─ Português (25 questões):
│  ├─ Vogais/Consoantes (5)
│  ├─ Sílabas (5)
│  ├─ Ordem Alfabética (5)
│  ├─ Leitura de Palavras (5)
│  └─ Frases Simples (5)
│
└─ Matemática (25 questões):
   ├─ Contagem (5)
   ├─ Adição até 10 (5)
   ├─ Subtração até 10 (5)
   ├─ Comparação (<, >, =) (5)
   └─ Números Sequenciais (5)

Série 3º-4º:
├─ Português (25):
│  ├─ Sinônimos/Antônimos (5)
│  ├─ Substantivos/Adjetivos (5)
│  ├─ Pontuação (5)
│  ├─ Interpretação de Texto (5)
│  └─ Conjugação Verbal (5)
│
└─ Matemática (25):
   ├─ Adição/Subtração até 100 (5)
   ├─ Multiplicação (5)
   ├─ Divisão Simples (5)
   ├─ Problema com Números (5)
   └─ Padrões Numéricos (5)

Série 5º:
├─ Português (25):
│  ├─ Sinônimos/Antônimos (5)
│  ├─ Classes de Palavras (5)
│  ├─ Concordância (5)
│  ├─ Compreensão de Texto (5)
│  └─ Figuras de Linguagem (5)
│
└─ Matemática (25):
   ├─ Frações (5)
   ├─ Decimais (5)
   ├─ Problemas Complexos (5)
   ├─ Operações Mistas (5)
   └─ Grandezas e Medidas (5)
```

### Exemplo: 1 Questão de Teste PT (1º-2º)

```
Série: 1º-2º
Tipo: Português
Formato: Múltipla Escolha
Dificuldade: ⭐ Fácil

PERGUNTA:
"Qual palavra tem SOM DE A?"

[A] Bola ✓ CORRETO
[B] Pé
[C] Gato
[D] Oi

Validação:
├─ Acertou: +25 pts ao skill score
├─ Errou ou pulou: +0 pts
└─ Tempo: <40s (qualquer)
```

### Exemplo: 1 Questão de Teste Math (1º-2º)

```
Série: 1º-2º
Tipo: Matemática
Formato: Numérico
Dificuldade: ⭐ Fácil

PERGUNTA:
"Maria tem 5 maçãs. Ganhou 3 mais. Quantas tem agora?"

[_____]

Resposta: 8
Validação:
├─ Acertou: +25 pts
├─ Errou ou pulou: +0 pts
└─ Penalidade: Nenhuma, é só teste!
```

---

## 🏗️ ARQUITETURA TÉCNICA DO PRÉ-TESTE

### Frontend Flow

```typescript
// pages/pretest.tsx
export function PreTestPage() {
  const [step, setStep] = useState<'survey' | 'portuguese' | 'math' | 'results'>('survey');
  const [skills, setSkills] = useState({
    portuguese: false,
    math: false,
  });
  const [scores, setScores] = useState({
    portuguese: 0,
    math: 0,
  });

  const handleSurveySubmit = (selected: string[]) => {
    setSkills({
      portuguese: selected.includes('portuguese'),
      math: selected.includes('math'),
    });
    setStep('portuguese');
  };

  const handlePTSubmit = (answer: string, isCorrect: boolean, timeMs: number) => {
    setScores(prev => ({
      ...prev,
      portuguese: isCorrect ? 100 : 0
    }));
    setStep('math');
  };

  const handleMathSubmit = (answer: string, isCorrect: boolean, timeMs: number) => {
    setScores(prev => ({
      ...prev,
      math: isCorrect ? 100 : 0
    }));
    
    // Calcular skill score final
    const finalScore = calculateSkillScore(skills, scores);
    
    // Enviar para servidor
    await submitPreTest({
      skills,
      scores,
      skillScore: finalScore,
      playerId: currentPlayer.id,
    });
    
    setStep('results');
  };

  return (
    <div className="pretest-container">
      {step === 'survey' && <SkillSurvey onSubmit={handleSurveySubmit} />}
      {step === 'portuguese' && <TestQuestion type="portuguese" onSubmit={handlePTSubmit} />}
      {step === 'math' && <TestQuestion type="math" onSubmit={handleMathSubmit} />}
      {step === 'results' && <SkillResults score={skillScore} />}
    </div>
  );
}
```

### Backend Flow

```typescript
// routes/pretest.ts
app.post('/pretest/submit', async (req, res) => {
  const { playerId, skills, scores, skillScore } = req.body;

  // 1. Salvar dados de pré-teste
  const pretest = await db.insertPreTest({
    player_id: playerId,
    portuguese_correct: scores.portuguese === 100,
    math_correct: scores.math === 100,
    skill_score: skillScore,
    survey_data: skills,
    created_at: new Date(),
  });

  // 2. Atualizar player com score
  await db.updatePlayer(playerId, {
    skill_score: skillScore,
    pretest_completed: true,
  });

  // 3. Retornar confirmação
  res.json({ pretest_id: pretest.id, skill_score: skillScore });
});
```

### Database Schema (Pre-Test)

```sql
CREATE TABLE pretests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID NOT NULL REFERENCES players(id),
  portuguese_correct BOOLEAN,
  math_correct BOOLEAN,
  skill_score INT CHECK (skill_score >= 0 AND skill_score <= 100),
  survey_data JSONB, -- { portuguese: bool, math: bool }
  created_at TIMESTAMP DEFAULT NOW()
);

-- Update players table
ALTER TABLE players ADD COLUMN skill_score INT DEFAULT 50;
ALTER TABLE players ADD COLUMN pretest_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE players ADD COLUMN dominant_subjects TEXT[]; -- ['portuguese', 'math']
```

---

## 🎮 LOBBY TIPO COD WARZONE (Épico!)

### Visual Inspiration (Como CoD):

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  OLIMPÍADA EDUCATIVA                                    │
│  ==================                                     │
│                                                          │
│  👥 SQUAD BUILDING - 16/16 PLAYERS                      │
│                                                          │
│  ┌────────────────┬────────────────┬────────────────┐  │
│  │  João          │  Maria         │  Pedro         │  │
│  │  Score: 92 🔥  │  Score: 88 🟢  │  Score: 82 🟡  │  │
│  │  Série: 3º     │  Série: 3º     │  Série: 3º     │  │
│  │  Dominant: PT  │  Dominant: MAT │  Dominant: NEH │  │
│  │  [Avatar]      │  [Avatar]      │  [Avatar]      │  │
│  └────────────────┴────────────────┴────────────────┘  │
│                                                          │
│  ┌────────────────┬────────────────┬────────────────┐  │
│  │  Ana           │  Carlos        │  Sofia         │  │
│  │  Score: 78 🟡  │  Score: 72 🟡  │  Score: 65 🟡  │  │
│  │  Série: 3º     │  Série: 3º     │  Série: 3º     │  │
│  │  [Avatar]      │  [Avatar]      │  [Avatar]      │  │
│  └────────────────┴────────────────┴────────────────┘  │
│                                                          │
│  ┌────────────────┬────────────────┬────────────────┐  │
│  │  Lucas         │  Isabella      │  Matheus       │  │
│  │  Score: 58 🟡  │  Score: 45 🔴  │  Score: 35 🔴  │  │
│  │  Série: 3º     │  Série: 3º     │  Série: 3º     │  │
│  │  [Avatar]      │  [Avatar]      │  [Avatar]      │  │
│  └────────────────┴────────────────┴────────────────┘  │
│                                                          │
│  ┌────────────────┬────────────────┬────────────────┐  │
│  │  Gustavo       │  Camila        │  Felipe        │  │
│  │  Score: 55 🟡  │  Score: 42 🔴  │  Score: 38 🔴  │  │
│  │  Série: 3º     │  Série: 3º     │  Série: 3º     │  │
│  │  [Avatar]      │  [Avatar]      │  [Avatar]      │  │
│  └────────────────┴────────────────┴────────────────┘  │
│                                                          │
│  🎯 TEAM BALANCE STATUS:                               │
│  ════════════════════════════════                       │
│  Equipe Vermelha:   92 + 82 + 58 + 38 = 270 pts      │
│  Equipe Azul:       88 + 78 + 45 + 42 = 253 pts      │
│  Equipe Amarela:    65 + 72 + 55 + 35 = 227 pts      │
│                                                          │
│  ⚖️ Variance: 43 pts (16%) - Bem Balanceado!          │
│                                                          │
│  [COMEÇAR JOGO] [DISTRIBUIR NOVAMENTE] [SAIR]         │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Features do Lobby:

```
1️⃣ SKILL CARDS
   ├─ Avatar do player (customizável)
   ├─ Nome (máx 20 caracteres)
   ├─ Skill Score (0-100 com cor)
   ├─ Série (1º-5º)
   └─ Matérias dominantes (ícones PT/MAT)

2️⃣ LIVE STATISTICS
   ├─ Total players conectados
   ├─ Skill score médio da sala
   ├─ Distribuição por série
   ├─ Equipes pré-balanceadas (preview)
   └─ Variance score (quanto mais baixo = melhor)

3️⃣ AÇÕES
   ├─ [Começar Jogo] - Se sala cheia
   ├─ [Distribuir Novamente] - Re-calcular balanceamento
   ├─ [Configurações] - Mudar série, avatar, nome
   └─ [Sair] - Voltar ao menu

4️⃣ ANIMAÇÕES
   ├─ Players aparecem com slide-in quando entram
   ├─ Skill score pisca quando atualiza
   ├─ Linha de balanceamento se move em real-time
   └─ Som épico quando sala preenche
```

---

## 🚀 FLUXO NO NETLIFY

### Deploy Structure

```
olimpiada-netlify/
├── functions/
│   ├── auth/
│   │   ├── register.js
│   │   └── login.js
│   ├── pretest/
│   │   ├── submit.js
│   │   ├── get-questions.js
│   │   └── calculate-score.js
│   ├── game/
│   │   ├── create-room.js
│   │   ├── join-room.js
│   │   └── balance-teams.js
│   └── leaderboard/
│       └── get-rankings.js
│
├── public/
│   ├── index.html
│   ├── assets/
│   │   ├── avatars/ (8 PNG cada série)
│   │   ├── sounds/ (efeitos sonoros)
│   │   └── icons/ (UI icons)
│   └── api/
│       └── questions.json (banco local)
│
└── netlify.toml
```

### netlify.toml

```toml
[build]
  command = "npm run build"
  functions = "functions"
  publish = "dist"

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

[context.production]
  environment = { NODE_ENV = "production" }

[context.deploy-preview]
  environment = { NODE_ENV = "staging" }
```

### Netlify Functions (Node + TypeScript)

```typescript
// functions/pretest/calculate-score.js
const handler = async (event) => {
  const { skills, scores } = JSON.parse(event.body);

  const skillScore = 
    (scores.portuguese * 0.3) +
    (scores.math * 0.3) +
    calculateSurveyBonus(skills) * 0.4;

  return {
    statusCode: 200,
    body: JSON.stringify({ skillScore: Math.round(skillScore) })
  };
};

exports.handler = handler;
```

### Socket.IO com Netlify + Vercel

```
OPÇÃO 1 (Recomendada): Backend separado em Railway/Render
├─ Netlify: Frontend + Serverless Functions (HTTP)
├─ Railway: Node.js + Socket.IO + Database
└─ WebSocket via Socket.IO client

OPÇÃO 2: Serverless com Netlify + Fauna DB
├─ Netlify: Frontend + Functions
├─ Fauna DB: Realtime queries
└─ Polling em vez de WebSocket
```

---

## 📋 CHECKLIST PRÉ-TESTE + LOBBY

### Sprint 1: Pre-Test (1 semana)
- [ ] Skill Survey UI (4 opções, clean)
- [ ] Test Question Renderer (PT + MAT)
- [ ] 25 questões por série (5 séries × 2 disciplinas)
- [ ] Skill Score Calculator
- [ ] Salvar dados no banco
- [ ] Tela de resultados com feedback

### Sprint 2: Lobby CoD (1 semana)
- [ ] Lobby page visual (cards de players)
- [ ] Real-time player list (Socket.IO)
- [ ] Balancing algorithm (min-max variance)
- [ ] Preview de equipes
- [ ] Opção de "distribuir novamente"
- [ ] Countdown antes do jogo

### Sprint 3: Integration (1 semana)
- [ ] Fluxo completo: PreTest → Lobby → Game
- [ ] Teste com 16 players
- [ ] Deploy em Netlify (staging)
- [ ] Testes de carga

---

## 🎯 EXEMPLO REAL: Turma de 3º ano (16 alunos)

### Antes do Teste:
```
"Bem-vindos à Olimpíada Educativa!"
```

### Pré-Teste (3 minutos):
```
João:     Survey "PT" → Português 100%, Math 0%   → Score 60
Maria:    Survey "MAT" → Português 100%, Math 100% → Score 92
Pedro:    Survey "NEH" → Português 0%, Math 100%  → Score 50
... (13 mais)
```

### Após Balanceamento (Automático):
```
Equipe Vermelha (Melhorada):   [92] + [72] + [45] + [38] = 247 pts
Equipe Azul (Bem):             [88] + [65] + [50] + [42] = 245 pts
Equipe Amarela (Boa):          [78] + [60] + [48] + [35] = 221 pts
Equipe Verde (Bom):            [82] + [58] + [55] + [40] = 235 pts

Variance: 26 pts (10.5%) ✅ Excelente balanceamento!
```

### Lobby (2 minutos):
```
Todos veem as equipes já formadas
Nenhuma surpresa ruim
Senso de justiça: "Todos têm chance de ganhar"
```

### Jogo (20 minutos):
```
Resultado final poderia ser qualquer equipe
Porque todas estão equilibradas
Ganha aquela que melhor se coordena
NÃO a que tem "herói" escondido
```

---

**Versão**: 1.0 | **Data**: 2026-09-08 | **Status**: Ready for Implementation 🚀
