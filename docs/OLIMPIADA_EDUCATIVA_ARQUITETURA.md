# 🏅 OLIMPÍADA EDUCATIVA - ARQUITETURA INOVADORA

## 📖 FILOSOFIA PEDAGÓGICA

**"Ninguém é inteligente de uma única forma"** — A Olimpíada Educativa rejeita o modelo tradicional de "pergunta única, resposta única". Em vez disso, ela usa a mesma **competência pedagógica** apresentada através de **7 formatos de perguntas diferentes**, garantindo que:

- 👁️ Alunos visuais ganham em modalidades gráficas
- 👂 Alunos auditivos ganham em modalidades descritivas
- 🤝 Alunos cinestésicos ganham em modalidades interativas
- 🧮 Alunos lógicos ganham em modalidades analíticas

**Resultado**: Todos têm chance de brilhar, ninguém se sente "burro" — a inteligência é **multi-dimensional**.

---

## 🏗️ ESTRUTURA DE SALA

### 1. CONFIGURAÇÃO DE EQUIPES

```
28 jogadores → 7 equipes de 4
          OU
          → 4 equipes de 7
```

**Sistema Dinâmico**:
- Sala cria equipes **balanceadas por série** (não pode ter equipe só com 1º ano)
- Distribuição: Se 28 jogadores com séries mistas, algoritmo garante:
  - Cada equipe tem pelo menos 1 aluno de série "avançada"
  - Score é calculado POR EQUIPE (não individual)
  - Pontos distribuídos: Leader (mais pontos), Mid-tier, Supporters

---

## ⏱️ SISTEMA DE TIMING INTELIGENTE

### 2. FLUXO TEMPORAL

```
[QUESTÃO APARECE]
    ↓
[0-40s: Período de Resposta]
    ├→ [0-30s]: Se todas as 7 equipes responderam
    │           → Avança IMEDIATAMENTE (não espera 40s)
    │           → Bônus "Rapidez": +20 pts para equipes que responderam em <15s
    │
    └→ [30-40s]: Espera respostas lentas
        ├→ Todas responderam antes de 40s? → Avança + bônus "Sincronização"
        └→ Timeout 40s? → Avança mesmo assim, equipes que não responderam: 0 pts

[FEEDBACK & LEADERBOARD ATUALIZA]
    ↓
[500ms de pausa]
    ↓
[PRÓXIMA QUESTÃO]
```

**Efeitos Visuais Dinâmicos**:
- 🟢 Barra de progresso circular (40s)
- 📊 Contador: "X equipes respondidas / 7"
- ⚡ Efeito "SPEEDRUN!" se todos respondem antes de 30s
- 🔴 Pisca último segundo (último 5s vira red)

---

## 🎓 SISTEMA DE QUESTÕES (7 FORMATOS)

### 3. ANATOMIA DE UMA QUESTÃO OLIMPÍADA

```typescript
interface QuestionBank {
  competency: Competency  // Ex: "Operações Básicas - Adição"
  series: 1 | 2 | 3 | 4 | 5
  formats: Format[]  // Array de 7 formatos diferentes
  tags: string[]
}

interface Competency {
  id: string
  name: string  // Ex: "Adição de números até 100"
  discipline: "portugues" | "matematica"
  level: "fundamental" | "intermediate" | "advanced"
  description: string
  learningOutcomes: string[]
}

interface Format {
  type: FormatType
  prompt: string
  options?: Option[]
  correctAnswer: string | string[]
  points: number
  difficulty: 1 | 2 | 3  // 1=fácil, 3=difícil
  timeLimit?: number  // sobrescreve 40s se necessário
}

type FormatType = 
  | "multiple-choice"
  | "true-false"
  | "matching"
  | "fill-blank"
  | "visual-click"
  | "drag-drop"
  | "numeric-input"
```

---

## 📋 OS 7 FORMATOS DE RESPOSTA

### 4. FORMATOS DETALHADOS COM EXEMPLOS

---

### **4.1 MÚLTIPLA ESCOLHA** (Multiple Choice)
**Tipo**: Tradicional, mas com twist

**Exemplo Matemática (1º-2º ano)**:
```
🧮 PERGUNTA
Quanto é 15 + 8?

[A] 20
[B] 23  ✓ CORRETO
[C] 25
[D] 30

Tempo: 40s | Pontos: 100
Dificuldade: ⭐ (Fácil)
```

**Exemplo Português (3º-4º ano)**:
```
📖 PERGUNTA
Qual é o sinônimo de "alegre"?

[A] Triste
[B] Contente  ✓ CORRETO
[C] Assustado
[D] Cansado

Tempo: 40s | Pontos: 100
Dificuldade: ⭐⭐ (Médio)
```

**Variação "Ênfase"**:
- Respostas aparecem uma por uma (não todas de vez)
- Simula suspense
- Mede tempo de reação

---

### **4.2 VERDADEIRO / FALSO** (True/False)
**Tipo**: Rápido e direto, mas ENGANOSO

**Exemplo Matemática (2º-3º ano)**:
```
✓ AFIRMAÇÃO
"Se tenho 10 maçãs e ganho 5, fico com 15"

[VERDADEIRO] ✓ CORRETO
[FALSO]

Tempo: 40s | Pontos: 80
Dificuldade: ⭐ (Fácil, mas pegadinha)
```

**Variação "Dupla Afirmação"**:
```
"A palavra 'gato' tem 4 letras E é um animal"

[AMBAS VERDADEIRAS] ✓ CORRETO
[PRIMEIRA VERDADEIRA, SEGUNDA FALSA]
[PRIMEIRA FALSA, SEGUNDA VERDADEIRA]
[AMBAS FALSAS]
```

---

### **4.3 ASSOCIAÇÃO / MATCHING** (Drag & Drop)
**Tipo**: Conectar conceitos, visual e tátil

**Exemplo Português (3º-5º ano)**:
```
🔗 CONECTE PALAVRAS A DEFINIÇÕES

Esquerda:               Direita:
1️⃣ Substantivo    ↔    A) Palavra que modifica
2️⃣ Adjetivo       ↔    B) Nome de pessoa, lugar ou coisa
3️⃣ Verbo          ↔    C) Ação, movimento

Respostas: 1→B, 2→A, 3→C ✓ CORRETO

Tempo: 40s | Pontos: 120 (mais pontos = mais cognitivo)
Dificuldade: ⭐⭐
```

**Exemplo Matemática (2º-4º ano)**:
```
🔗 CONECTE OPERAÇÃO A RESULTADO

      12 ÷ 3  ↔  A) 20
      5 × 4   ↔  B) 4
      2 + 8   ↔  C) 10

Respostas: 12÷3→B, 5×4→A, 2+8→C ✓ CORRETO

Tempo: 40s | Pontos: 120
Dificuldade: ⭐⭐
```

**Feedback Visual**:
- Linhas brilham ao conectar
- Verde se correto, vermelho se errado
- Pode "desfazer" clicando na linha

---

### **4.4 PREENCHA O BRANCO** (Fill in the Blank)
**Tipo**: Textual, testa compreensão profunda

**Exemplo Português (2º-3º ano)**:
```
📝 COMPLETE A FRASE

"A _______ é um animal felino que faz miau"

[Campo de input]
Resposta: gato (insensível a maiúscula)

Tempo: 40s | Pontos: 130
Dificuldade: ⭐⭐⭐
```

**Variação "Múltiplos Brancos"**:
```
"Se tenho _____ maçãs e compro _____ mais, fico com 12"

[Input 1] [Input 2]
Respostas: 7 e 5 (qualquer ordem)

Tempo: 50s (tempo extra para preencher 2 campos)
Pontos: 150
Dificuldade: ⭐⭐⭐
```

---

### **4.5 CLIQUE VISUAL** (Visual Click / Hotspot)
**Tipo**: Reação rápida, testa interpretação visual

**Exemplo Matemática (1º-3º ano)**:
```
👁️ CLIQUE NA RESPOSTA CERTA

Imagem: 2 maçãs + 3 maçãs = ?

[🍎🍎] [🍎🍎🍎] [🍎🍎🍎🍎🍎] [🍎🍎🍎🍎]

Clique no grupo com 5 maçãs ✓ CORRETO

Tempo: 40s | Pontos: 100
Dificuldade: ⭐ (Visual)
```

**Exemplo Português (2º-4º ano)**:
```
👁️ CLIQUE NO ADJETIVO

Frase: "O gato PRETO desceu rapidamente"

[O] [gato] [PRETO] ✓ [desceu] [rapidamente]

Clique na palavra que é adjetivo ✓ CORRETO

Tempo: 40s | Pontos: 110
Dificuldade: ⭐⭐
```

---

### **4.6 ENTRADA NUMÉRICA** (Numeric Input)
**Tipo**: Problema matemático com resultado numérico

**Exemplo Matemática (3º-5º ano)**:
```
🧮 RESOLVA O PROBLEMA

"Maria tinha R$ 50. Comprou um livro por R$ 15 e 
uma caneta por R$ 8. Quanto sobrou?"

[Campo: _____]

Resposta: 27

Tempo: 40s | Pontos: 140
Dificuldade: ⭐⭐⭐
Tipo: Problema com múltiplas etapas
```

**Variação "Intervalo Aceitável"**:
```
"Qual o perímetro aproximado de um retângulo com 
lados de 5cm e 3cm?"

Resposta esperada: 16
Intervalo aceito: 14-18 (permite margem de erro por arredondamento)

Tempo: 50s | Pontos: 150
Dificuldade: ⭐⭐⭐
```

---

### **4.7 ORDENAÇÃO / SEQUÊNCIA** (Sequence)
**Tipo**: Organização lógica, muito cognitivo

**Exemplo Português (3º-5º ano)**:
```
📖 ORDENE A HISTÓRIA

Frases soltas:
A) Ele saiu correndo pela porta
B) João ouviu um barulho assustador
C) Chegou em casa e foi deitar
D) Era apenas o vento batendo a janela

Ordem correta: B → D → A → C ✓ CORRETO

Tempo: 50s (mais tempo para organizar) | Pontos: 150
Dificuldade: ⭐⭐⭐
```

**Exemplo Matemática (2º-4º ano)**:
```
📊 ORDENE DO MENOR PARA O MAIOR

Números (em ordem aleatória):
45, 12, 89, 3, 67, 23

Ordem correta: 3 → 12 → 23 → 45 → 67 → 89 ✓ CORRETO

Tempo: 40s | Pontos: 120
Dificuldade: ⭐⭐
```

---

## 🎯 ESTRUTURA DE UMA COMPETÊNCIA OLIMPÍADA

### 5. EXEMPLO COMPLETO: "ADIÇÃO ATÉ 20"

```json
{
  "competency": {
    "id": "mat-add-20",
    "name": "Adição até 20",
    "discipline": "matematica",
    "series": [1, 2],
    "level": "fundamental",
    "description": "Dominar operações de adição com números até 20",
    "learningOutcomes": [
      "Reconhecer símbolo de adição",
      "Calcular somas mentalmente",
      "Resolver problemas com múltiplas adições",
      "Validar respostas"
    ]
  },
  "formats": [
    {
      "id": "fmt-1",
      "type": "multiple-choice",
      "prompt": "Quanto é 7 + 5?",
      "options": [
        { "id": "a", "text": "10" },
        { "id": "b", "text": "12", "isCorrect": true },
        { "id": "c", "text": "13" },
        { "id": "d", "text": "15" }
      ],
      "points": 100,
      "difficulty": 1,
      "timeLimit": 40
    },
    {
      "id": "fmt-2",
      "type": "numeric-input",
      "prompt": "Complete: 8 + ? = 15",
      "correctAnswer": ["7"],
      "points": 130,
      "difficulty": 2,
      "timeLimit": 40
    },
    {
      "id": "fmt-3",
      "type": "visual-click",
      "prompt": "Quantas bolinhas no total?",
      "imageUrl": "/images/bolinha-7-e-6.png",
      "hotspots": [
        { "answer": "13", "correct": true },
        { "answer": "12", "correct": false },
        { "answer": "14", "correct": false }
      ],
      "points": 100,
      "difficulty": 1,
      "timeLimit": 40
    },
    {
      "id": "fmt-4",
      "type": "fill-blank",
      "prompt": "Se tenho 6 maçãs e ganho 8 mais, fico com _____ maçãs",
      "correctAnswer": ["14"],
      "points": 140,
      "difficulty": 2,
      "timeLimit": 45
    },
    {
      "id": "fmt-5",
      "type": "true-false",
      "prompt": "7 + 9 = 16",
      "correctAnswer": ["false"],
      "explanation": "7 + 9 = 16, não 16. A resposta certa seria 16.",
      "points": 80,
      "difficulty": 2,
      "timeLimit": 40
    },
    {
      "id": "fmt-6",
      "type": "drag-drop",
      "prompt": "Conecte cada operação ao seu resultado",
      "pairs": [
        { "left": "5 + 3", "right": "8" },
        { "left": "9 + 2", "right": "11" },
        { "left": "4 + 6", "right": "10" }
      ],
      "points": 120,
      "difficulty": 2,
      "timeLimit": 40
    },
    {
      "id": "fmt-7",
      "type": "fill-blank",
      "prompt": "Problema: Lucia tem 5 bonecas. Ganhou 8 de seu avó e 2 de sua avó. Quantas bonecas Lucia tem agora?",
      "correctAnswer": ["15"],
      "isWordProblem": true,
      "points": 150,
      "difficulty": 3,
      "timeLimit": 50
    }
  ]
}
```

**Resultado**: Mesma competência testada 7 vezes, de formas DIFERENTES.

---

## 🎪 CICLO DE QUESTÕES NA GINCANA

### 6. FLUXO DURANTE A PARTIDA

```
PARTIDA COMEÇA

Rodada 1:
├─ Competência: "Adição até 20" (Matemática, 1º-2º ano)
├─ Formato Sorteado: "Multiple Choice"
├─ Pergunta aparece para todas as 7 equipes
├─ 40s de timer
├─ Equipes respondendo em tempo real
├─ Se todas responderam antes de 30s → Avança + Bônus Rapidez
├─ Se timeout 40s → Avança mesmo assim
├─ Placar atualiza com pontos
└─ Pausa 500ms

Rodada 2:
├─ Competência: "Adição até 20" (MESMA)
├─ Formato Sorteado: "Numeric Input" (DIFERENTE!)
├─ Mesma pergunta conceitual, novo desafio
├─ ... (ciclo se repete)

...

Rodada 8:
├─ Competência: "Sinônimos" (Português, 3º-4º ano)
├─ Formato Sorteado: "Matching"
├─ Nova competência, novo contexto
└─ ...

RESULTADO FINAL: Leaderboard com ranking de equipes
```

---

## 🎖️ SISTEMA DE PONTUAÇÃO INOVADOR

### 7. CÁLCULO DE PONTOS DINÂMICO

```
PontosBrutos = pontos_do_formato

Multiplicadores:
├─ Bônus Velocidade:
│  └─ Se respondeu em <15s: ×1.5
│  └─ Se respondeu 15-25s: ×1.2
│  └─ Se respondeu >25s: ×1.0
│
├─ Bônus Sincronização:
│  └─ Se todas as 7 equipes responderam: +25 pts
│  └─ Se todos responderam antes de 30s: +50 pts (SPEEDRUN!)
│
├─ Bônus Acerto Consecutivo:
│  └─ 2 acertos seguidos: ×1.1
│  └─ 3 acertos seguidos: ×1.2
│  └─ 4+ acertos seguidos: ×1.3
│
└─ Penalidades:
   └─ Resposta errada: 0 pts (sem penalidade, sem desmotivar)
   └─ Não respondeu: 0 pts

PontosFinais = PontosBrutos × VelocidadeMultip × ComboMultip + BônusSincron
```

**Exemplo**:
```
Formato: Numeric Input (140 pts base)
Equipe respondeu em 12s (bônus 1.5x)
Tem combo de 3 acertos (1.2x)
Todas as equipes responderam (bônus +25)

Pontos = (140 × 1.5 × 1.2) + 25
       = (140 × 1.8) + 25
       = 252 + 25
       = 277 pts
```

---

## 🧠 PROGRESSÃO E ROTAÇÃO

### 8. ESTRATÉGIA DE QUESTÕES

#### 8.1 Ordem de Competências
- **Dinâmica adaptativa**: Sistema seleciona próxima competência baseado em:
  - Taxa de acerto da turma
  - Séries presentes (prioriza série mais baixa se muitos acertos)
  - Alternância Português ↔ Matemática
  - Formato da questão anterior (não repetir formato 2x seguidas)

#### 8.2 Rotação de Formatos
```
Se última pergunta foi "Multiple Choice"
→ Próxima NÃO pode ser "Multiple Choice"
→ Sorteio entre: [Numeric, Matching, Fill-Blank, Visual, True-False, Sequence]

Objetivo: Forçar crianças a pensar de forma diferente a cada rodada
```

#### 8.3 Duração Total da Gincana
- **Partidas padrão**: 15 rodadas = ~15-18 minutos
  - (40s resposta × 15) + (500ms transição × 15) + (feedback visual 2s × 15)
  - = 600s + 7.5s + 30s ≈ 10.5min (seguro para atenção infantil)
- **Partidas estendidas**: 25 rodadas = ~20-25 minutos (para grupos mais engajados)

---

## 📊 LEADERBOARD DINÂMICO

### 9. VISUALIZAÇÃO EM TEMPO REAL

```
RANKING ATUAL - Rodada 8/15

🥇 Equipe "Gênios da Matemática"  ⭐⭐⭐⭐⭐  2240 pts  [8W-0L]
🥈 Equipe "Leitores"              ⭐⭐⭐⭐    1890 pts  [7W-1L]
🥉 Equipe "Rápidos"               ⭐⭐⭐⭐    1750 pts  [6W-2L]
4️⃣  Equipe "Estrategistas"        ⭐⭐⭐     1560 pts  [5W-3L]
5️⃣  Equipe "Criativas"            ⭐⭐⭐     1420 pts  [4W-4L]
6️⃣  Equipe "Persistentes"         ⭐⭐      1100 pts  [3W-5L]
7️⃣  Equipe "Em Desenvolvimento"   ⭐⭐      890 pts   [2W-6L]

Próxima: Português - "Conjugação Verbal" (True-False)
```

**Features do Leaderboard**:
- 🎯 Animação de +pontos ao vivo
- 📈 Gráfico sparkline de pontos ao longo das rodadas
- 🏆 Badges de melhor performance (mais rápido, maior acerto, etc)
- 📊 Stats por equipe: Total de acertos, velocidade média, combo máximo

---

## 🎨 INTERFACE VISUAL

### 10. LAYOUT DA TELA PRINCIPAL

```
┌─────────────────────────────────────────────────────────┐
│  🏅 OLIMPÍADA EDUCATIVA - SALA #42                      │
│  Rodada: 8/15 | Tempo: 40s ▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░ │
│  Respondidas: 5/7 equipes                               │
└─────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                                                          │
│  📖 QUESTÃO ATUAL - Português (Adjetivos)              │
│                                                          │
│  "Qual palavra é um ADJETIVO?"                          │
│                                                          │
│  [A] Casa      [B] Vermelho    [C] Correr   [D] Você   │
│      ☐          ✓ SELECIONADO    ☐            ☐       │
│                                                          │
│  Formato: Múltipla Escolha | Dificuldade: ⭐⭐         │
│  Pontos: 100 | Bônus Velocidade: +50%                 │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  🥇 RANKING AO VIVO                                      │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 1. Gênios da Matemática     2240 ▰▰▰▰▰▰ ✓ RESPONDIDO │ │
│  │ 2. Leitores                 1890 ▰▰▰▰▰_ ✓ RESPONDIDO │ │
│  │ 3. Rápidos                  1750 ▰▰▰▰__ ✓ RESPONDIDO │ │
│  │ 4. Estrategistas            1560 ▰▰▰___ ✓ RESPONDIDO │ │
│  │ 5. Criativas                1420 ▰▰____ ✗ ESPERANDO  │ │
│  │ 6. Persistentes             1100 ▰_____ ✗ ESPERANDO  │ │
│  │ 7. Em Desenvolvimento        890 ▰_____ ✗ ESPERANDO  │ │
│  └─────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## 🚀 ROADMAP TÉCNICO

### 11. DESENVOLVIMENTO

#### Fase 1: MVP (Sprint 1-2)
- [x] Estrutura de equipes (balanceamento por série)
- [x] Timer com lógica de 40s + early advance
- [x] Formato "Multiple Choice" funcional
- [x] Leaderboard básico em tempo real
- [x] Socket.IO sync para 28 jogadores

#### Fase 2: Formatos Avançados (Sprint 3-4)
- [ ] Numeric Input com validação fuzzy
- [ ] Drag-Drop matching com Dnd Kit
- [ ] Visual Click com hotspots
- [ ] Fill-Blank com auto-complete fuzzy
- [ ] True-False com explicações

#### Fase 3: Gamificação (Sprint 5-6)
- [ ] Sistema de bônus (velocidade, sincronização, combo)
- [ ] Badges e achievements
- [ ] Animações épicas (Framer Motion)
- [ ] Efeitos sonoros contextualizados

#### Fase 4: Pedagógico (Sprint 7-8)
- [ ] Question Bank com +200 questões
- [ ] Adaptação dinâmica por série
- [ ] Analytics para professor
- [ ] Relatório pós-partida

---

## 📚 ESTRUTURA DE QUESTÕES - DATABASE

### 12. EXEMPLO DE QUESTION BANK

```json
{
  "questionBanks": [
    {
      "bankId": "mat-add-20",
      "subject": "matematica",
      "competency": "Adição até 20",
      "targetSeries": [1, 2],
      "questions": [
        {
          "qId": "q001",
          "formats": [
            { "type": "multiple-choice", "prompt": "Quanto é 7 + 5?", ... },
            { "type": "numeric-input", "prompt": "Complete: 7 + ? = 12", ... },
            { "type": "visual-click", "prompt": "Quantas bolinhas?", ... },
            { "type": "fill-blank", "prompt": "7 + 5 = __", ... },
            { "type": "true-false", "prompt": "7 + 5 = 12", ... },
            { "type": "drag-drop", "prompt": "Conecte operação ao resultado", ... },
            { "type": "sequence", "prompt": "Ordene: 7, +, 5, =, 12", ... }
          ],
          "difficulty": 2,
          "bloomLevel": "understand",
          "tags": ["adição", "números-até-20", "básico"]
        },
        // ... mais questões
      ]
    },
    {
      "bankId": "por-sinônimos-3",
      "subject": "portugues",
      "competency": "Sinônimos",
      "targetSeries": [3, 4, 5],
      "questions": [
        {
          "qId": "q201",
          "formats": [
            { "type": "multiple-choice", "prompt": "Sinônimo de 'alegre'?", ... },
            { "type": "drag-drop", "prompt": "Conecte palavra a sinônimo", ... },
            // ... outros formatos
          ],
          "difficulty": 1,
          "bloomLevel": "remember",
          "tags": ["sinônimos", "vocabulário", "adjetivos"]
        }
      ]
    }
  ]
}
```

**Total de Question Banks necessários**:
- Matemática: ~20 competências × 3 séries = 60 bancos
- Português: ~20 competências × 3 séries = 60 bancos
- **Total**: ~120 bancos
- **Questões**: ~5 questões por banco × 7 formatos = 35 questões por banco
- **Total Questões**: ~4200 questões (escalável)

---

## ✨ EFEITOS VISUAIS & FEEDBACK

### 13. MOMENTOS "WOW"

#### Quando Equipe Responde:
```
Antes: [Esperando...]
Depois: 
  ✓ Check mark animado (0.5s)
  → Card da equipe brilha verde
  → +150 pts aparece com animação upward
  → Nome da equipe destaca no ranking
```

#### Quando Todas Respondem Antes de 30s:
```
🔥 SPEEDRUN! 🔥
├─ Tela inteira pisca dourado
├─ Explosão de confete animado
├─ Som épico (chime ascendente)
├─ Tooas as equipes ganham +50 bônus
└─ Transição para próxima questão
```

#### Quando Timeout:
```
Último 5s:
├─ Barra fica VERMELHA
├─ Beep sonoro acelerando
├─ "5... 4... 3..."
Timeout:
├─ Gong sonoro
├─ Equipes que não responderam: cinzento/desativado
├─ Avança automático
```

#### Ao Terminar Partida:
```
🏆 RESULTADO FINAL 🏆
├─ Placar GIGANTE com ranking
├─ Medalhas animadas (1º-3º lugar)
├─ Confete cai da tela
├─ Cada equipe tem chance de "acenar"
├─ Prêmios virtuais aparecem (badges/troféus)
└─ Botão "Próxima Partida"
```

---

## 🧮 ALGORITMO DE SELEÇÃO DINÂMICA

### 14. IA PEDAGÓGICA

```typescript
// Pseudo-código
function selectNextQuestion(currentRound: number, teamStats: TeamStats[]) {
  
  // Estratégia 1: Alternância disciplinar
  const lastWasPortuguese = getCurrentQuestion().subject === "portugues"
  const nextSubject = lastWasPortuguese ? "matematica" : "portugues"
  
  // Estratégia 2: Dificuldade adaptativa
  const avgAccuracy = calculateAverageAccuracy(teamStats)
  if (avgAccuracy > 0.75) nextDifficulty = "harder"
  else if (avgAccuracy < 0.5) nextDifficulty = "easier"
  else nextDifficulty = "normal"
  
  // Estratégia 3: Não repetir formato
  const lastFormat = getCurrentQuestion().format
  const availableFormats = ALL_FORMATS.filter(f => f !== lastFormat)
  const nextFormat = randomSelect(availableFormats)
  
  // Estratégia 4: Considerar série dos jogadores
  const seriesMix = getStudentSeriesMix(teamStats)
  const competenciesByAvgSeries = filterByAverageSeries(seriesMix)
  
  // Seleção final
  const question = competenciesByAvgSeries
    .filter(q => q.difficulty === nextDifficulty)
    .getFormatVariant(nextFormat)
  
  return question
}
```

---

## 📋 CHECKLIST FINAL

### ✅ Requisitos Atendidos

- ✅ 28 jogadores por sala
- ✅ Timing de 40s (com early advance se todos responderam antes de 30s)
- ✅ Auto-avança em timeout
- ✅ 7 formatos diferentes de perguntas
- ✅ Mesma competência testada de múltiplas formas
- ✅ Abordagem pedagógica inovadora (Bloom + Multi-inteligências)
- ✅ Sistema de pontuação dinâmico
- ✅ Gamificação completa
- ✅ Visualização épica
- ✅ Adaptação por série
- ✅ Escalável para +200 competências

---

## 🎓 CONCLUSÃO

A **Olimpíada Educativa** não é apenas um jogo. É uma **revolução no ensino**:

1. **Múltiplas Inteligências**: Cada criança encontra seu estilo
2. **Sem Humilhação**: Não há "burro", apenas "não seu formato"
3. **Engajamento Real**: 40s de pura adrenalina, não tédio
4. **Pedagogia Sólida**: Alinhado com BNCC + Bloom
5. **Competição Saudável**: Foco em aprendizado, não em derrota

**Resultado Esperado**: Crianças pedindo "mais uma rodada!" 🎮✨

---

**Versão**: 2.0 | **Data**: 2026-09-08 | **Autor**: Luiz Fernando
