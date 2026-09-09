# 🎮 GINCANA EDUCATIVA INTERATIVA - PROMPT DE DESENVOLVIMENTO

## 🎯 VISÃO DO PROJETO

**"Arena Desafios"** — Uma plataforma gamificada de gincana educativa em tempo real que transforma aprendizado de Português e Matemática em experiência imersiva, colaborativa e visualmente deslumbrante. Sistema multi-modalidade onde alunos de 1º ao 5º ano (6-11 anos) competem simultaneamente em 6 desafios distintos, com progression dinâmica, avatares personalizados e sistema de badges/troféus.

---

## 📋 REQUISITOS FUNCIONAIS

### 1. SISTEMA DE ACESSO & LOBBY

#### 1.1 Cadastro & Autenticação
- **Registro simplificado**: Nome de usuário, série (seletor: 1º-5º ano), avatar (8 opções coloridas)
- **Modo offline-first**: Cache local para dados básicos
- **Persistência**: LocalStorage + sincronização com backend
- **Validação**: Nome 3-20 caracteres alfanuméricos + acentos

#### 1.2 Lobby Principal
- **Painel de conectados**: Cards de jogadores online com avatar, nome, série
- **Filtros dinâmicos**: Ver apenas jogadores da mesma série ou todas
- **Status visual**: Badges (Pronto, Jogando, Descansando)
- **Criar/Entrar em sala única**: Botão CTA "COMEÇAR GINCANA" que inicializa sala compartilhada
- **Contagem regressiva**: "Jogo começa em 3min quando 2+ jogadores entrarem"
- **Chat rápido**: Emojis + 3 mensagens pré-gravadas amigáveis ("Vamos lá!", "Tá difícil!", "Eba!")

#### 1.3 Sala de Jogo (Única & Persistente)
- **Limite dinâmico**: Máx 8 jogadores simultâneos por sala (auto-fila se exceder)
- **Placar em tempo real**: Ranking ao vivo com animações de pontos
- **Informações do jogador**: Série atual, pontos totais, combo (sequência de acertos)
- **Aviso de desconexão**: "Você saiu. Reconectando..." com retry automático

---

## 🎮 SISTEMA DE MODALIDADES (6 DESAFIOS)

### 2. MODALIDADES PEDAGÓGICAS

#### 2.1 **CARTAS** 🃏 (Memória + Associação)
**Foco**: Português (sinônimos/antônimos) | Matemática (operações/resultados)

**Mecânica**:
- Tabuleiro 4x4 (16 cartas face para baixo)
- Jogador clica 2 cartas por turno
- **Português**: Descubrir pares (palavra + sinônimo) ex: "Feliz ↔ Alegre"
- **Matemática**: Descubrir pares (conta + resultado) ex: "5+3 ↔ 8"
- Acerto = 100 pts + ganha par; Erro = 0 pts, cartas viram de novo
- Tempo limite: 60 segundos total
- **Dificuldade por série**: 
  - 1º-2º: Pares simples, operações até 10
  - 3º-4º: Operações até 50, sinônimos comuns
  - 5º: Frações/decimais simples, antônimos

**Visualização Épica**:
- Cartas com efeito flip 3D suave
- Sons/efeitos visuais ao acertar (confete animado)
- Feedback sonoro diferente para acertos/erros

---

#### 2.2 **SEQUÊNCIAS** 📊 (Lógica + Padrões)
**Foco**: Matemática (progressões) | Português (ordem alfabética/narrativa)

**Mecânica**:
- Mostrar 3-5 itens em ordem errada
- Jogador ARRASTA E SOLTA para ordenar corretamente
- **Matemática**: Sequência numérica "7, 2, 5, 1" → "1, 2, 5, 7" OU progressão "2, 4, 6, ?" → "8"
- **Português**: Ordenar palavras em ordem alfabética OU ordenar frases de uma história
- Acerto = 150 pts (+ difícil); Erro = 0 pts, can retry
- Tempo: 90 segundos

**Dificuldade Dinâmica**:
- 1º: Números 1-10, ordem alfabética até 3 palavras
- 2º: Números até 50, ordem alfabética até 5 palavras
- 3º+: Progressões aritméticas simples, narrativas curtas

**Visualização**:
- Drag-drop fluido com feedback visual
- Highlight ao passar por posição válida
- Animação de "correto!" quando sequência se ordena

---

#### 2.3 **INTERLIGAR** 🔗 (Associação Conceitual)
**Foco**: Ambas disciplinas (conexões lógicas)

**Mecânica**:
- Tela com 5 itens à esquerda (palavras/contas) + 5 respostas à direita (definições/resultados)
- Jogador clica em item esquerdo, depois no correspondente direito (desenha linha)
- **Português**: Palavra → Definição (ex: "Gato" → "Animal felino doméstico")
- **Matemática**: Operação → Resultado (ex: "12 ÷ 4" → "3")
- Acerto = 120 pts; Erro = linha fica vermelha 2 segs depois desaparece
- Tempo: 120 segundos para conectar todos

**Visualização Wow**:
- Linhas animadas com gradiente
- Partículas brilhando ao conectar corretamente
- Efeito "spark" quando todas estão corretas

---

#### 2.4 **DESENHAR** 🎨 (Criatividade + Reconhecimento)
**Foco**: Português (interpretação de palavras)

**Mecânica**:
- Palavra/conceito aparece na tela ("Chuva", "Dinossauro", "Festa")
- Jogador tem **tela branca + pincéis coloridos** para desenhar
- Outros jogadores tentam adivinhar o que é (ver 2.6)
- Desenho postado no placar com votação: "O que é isso?"
- **Pontuação**:
  - Desenhista acerta = 100 pts
  - Se alguém adivinhar corretamente = ambos ganham 80 pts

**Dificuldade**:
- 1º-2º: Objetos simples (sol, casa, árvore)
- 3º+: Conceitos abstratos (sentimento, ação)

**Visualização Incrível**:
- Canvas com pincel responsivo, colors picker bonita
- Preview ao vivo do desenho com "undo" e "limpar"
- Animação ao revelar respostas corretas

---

#### 2.5 **COLORIR** 🌈 (Precisão + Velocidade)
**Foco**: Matemática (geometria/contagem)

**Mecânica**:
- Imagem com áreas numeradas ou coloridas parcialmente
- Instruções: "Pinte as regiões com números PARES de vermelho" OU "Complete a simetria"
- Jogador seleciona cor + clica nas regiões
- Sistema detecta automaticamente acertos
- Acerto = 90 pts por região + bônus de tempo
- Erro = 0 pts, feedback em vermelho

**Variações**:
- **Simetria**: Metade do desenho pronto, complete igual
- **Contagem**: "Pinte quadrados com números > 5"
- **Padrões**: "Siga a sequência de cores: vermelho, azul, vermelho, azul..."

**Dificuldade**:
- 1º: Figuras com 4-6 regiões, cores primárias
- 3º+: Figuras complexas, até 12 regiões, cores secundárias

**Visualização**:
- Ferramenta de "balde de tinta" com bucket fill suave
- Preview do resultado colorido em tempo real

---

#### 2.6 **ADIVINHAR** 🔮 (Dedução + Pensamento Crítico)
**Foco**: Ambas disciplinas

**Mecânica**:
- **Modo 1 - Adivinhar Desenho**: Desenho criado em 2.4 aparece, outros votam em múltipla escolha (3 opções)
- **Modo 2 - Adivinhar Charada**: Charada de Português OU problema de Matemática
  - Ex Português: "Tenho cidade mas não casas. Tenho água mas sem peixe. O que sou?" (Mapa)
  - Ex Matemática: "Se tenho 3 maçãs e ganhei 5, quantas fico?" (8)
- Resposta correta = 110 pts
- Resposta errada = 0 pts + perde 10 pts de "energia" (max 3 erros antes de "cooldown" 20s)

**Variações Dinâmicas**:
- Dificuldade adapta por série
- Charadas com múltipla escolha (3-4 opções)
- Tipo "Verdadeiro/Falso" em charadas

**Visualização**:
- Contador de vidas (3 corações) visível
- Animação de "acertou!" com efeito luminoso
- Placar de adivinhos ao final

---

## ⚙️ SISTEMA DE PROGRESSÃO & PONTUAÇÃO

### 3. MECÂNICAS DE ENGAJAMENTO

#### 3.1 Pontuação & Ranking
- **Pontos por modalidade**: Conforme detalhe acima (80-150 pts)
- **Bônus de combo**: 3+ acertos seguidos = +20 pts; 5+ = +50 pts
- **Bônus de série**: Alunos fazem desafios levemente diferentes (sem "fácil/difícil", apenas adaptado)
- **Placar ao vivo**: Atualiza a cada 2 segundos com animação suave

#### 3.2 Sistema de Badges (Achievements)
- 🥇 "Primeira Vitória" - Ganha uma modalidade
- 🔥 "Sequência Quente" - 5 acertos em sequência
- 🧠 "Mestre da Lógica" - Domina Sequências (80%+ acerto)
- 📚 "Literário" - Domina Português (80%+ acerto)
- 🎨 "Artista" - Desenho reconhecido por 80%+ dos votantes
- ⏱️ "Rápido" - Completa desafio em <30 segundos
- 🌟 "Imbatível" - Termina na posição #1

#### 3.3 Avatares Personalizáveis
- 8 avatares base (diversidade)
- Destaque de série (ícone pequeno 1º-5º)
- Efeito de "halo" para jogadores top 3 no ranking

---

## 🎨 DESIGN & UX

### 4. IDENTIDADE VISUAL

#### 4.1 Paleta de Cores
- **Primária**: Azul vibrante (#0066FF) + Amarelo enérgico (#FFD700)
- **Secundária**: Verde sucesso (#22C55E), Rosa alegria (#FF1493)
- **Acentos**: Roxo (#9D4EDD), Laranja (#FF8C00)
- **Neutros**: Branco (#FFF), Cinza leve (#F3F4F6)

#### 4.2 Tipografia
- **Display**: "Fredoka One" ou "Baloo 2" (amigável, infantil porém profissional)
- **Corpo**: "Inter" ou "Poppins" (legível, moderna)

#### 4.3 Componentes
- Botões com efeito "press" (depth)
- Cards com sombra e hover zoom leve
- Animações 300-500ms (não muito rápido pra crianças acompanharem)
- Ícones feitos ou iconset infantil consistente
- Feedback sonoro: Sons suaves, não assustadores

#### 4.4 Responsividade
- **Desktop** (1024px+): Lobby + jogo side-by-side quando possível
- **Tablet** (600-1024px): Otimizado para touch, modal placar
- **Mobile** (< 600px): Stack vertical, botões maiores

---

## 💻 ARQUITETURA TÉCNICA

### 5. TECH STACK

#### Frontend
- **Framework**: React 18 + TypeScript
- **State Management**: Zustand (simplificado) OU Jotai
- **Styling**: Tailwind CSS + shadcn/ui components
- **Realtime**: Socket.IO client
- **Animações**: Framer Motion OU React Spring
- **Canvas Drawing**: Konva.js (2.4 Desenhar)
- **Drag & Drop**: Dnd Kit (2.3 Interligar)

#### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js OU Fastify
- **Realtime**: Socket.IO (suporta up to 1k conexões simultâneas em servidor único)
- **Database**: Supabase PostgreSQL (user, session, leaderboard, game_stats)
- **Caching**: Redis (placar em tempo real, ranking)
- **Auth**: JWT + Google OAuth (opcional, para professor acessar analytics)

#### DevOps & Deploy
- **Hosting Frontend**: Vercel OU Netlify
- **Hosting Backend**: Railway, Render, Heroku OU VPS (DigitalOcean)
- **Realtime WebSocket**: Keep-alive em produção
- **Monitoring**: Sentry (errors), LogRocket (session replay)

---

## 📊 ESTRUTURA DE DADOS

### 6. SCHEMA PRINCIPAL

```typescript
// User/Player
interface Player {
  id: string
  username: string
  series: 1 | 2 | 3 | 4 | 5
  avatar: string // URL ou índice
  totalPoints: number
  gamesPlayed: number
  badges: Badge[]
  lastLogin: Date
}

// Game Session
interface GameSession {
  id: string
  status: 'waiting' | 'playing' | 'finished'
  players: Player[]
  currentModality: Modality
  startedAt: Date
  endedAt?: Date
  rounds: Round[]
}

// Round
interface Round {
  id: string
  modality: Modality
  playerId: string
  question: Question
  answer: Answer
  points: number
  timestamp: Date
}

// Leaderboard (real-time)
interface Leaderboard {
  sessionId: string
  rankings: {
    position: number
    playerId: string
    points: number
    combo: number
  }[]
  updatedAt: Date
}
```

---

## 🚀 ROADMAP DE DESENVOLVIMENTO

### Fase 1 (Sprint 1-2): MVP Core
- [ ] Sistema de cadastro & lobby
- [ ] Modalidade "Cartas" completa
- [ ] Placar em tempo real
- [ ] Socket.IO sync básico

### Fase 2 (Sprint 3-4): Modalidades
- [ ] Sequências + Interligar
- [ ] Colorir (básico)
- [ ] Sistema de pontos e bônus combo

### Fase 3 (Sprint 5-6): Gamificação
- [ ] Desenhar + Adivinhar
- [ ] Sistema de Badges
- [ ] Avatares com efeitos

### Fase 4 (Sprint 7+): Polimento
- [ ] Animações épicas (Framer Motion)
- [ ] Sons ambiente + efeitos
- [ ] Analytics para professor
- [ ] Temas (claro/escuro)
- [ ] Suporte offline com Service Worker

---

## ✅ CRITÉRIOS DE SUCESSO

1. **Performance**: Latência <100ms em ações do jogador
2. **Acessibilidade**: WCAG AA, suporte a leitores de tela
3. **Engajamento**: Sessões 15-20min, retenção >60% na semana seguinte
4. **Pedagogia**: Cobertura equilibrada de Português/Matemática por série
5. **Estabilidade**: Uptime 99.5%, sem crash com 8 jogadores simultâneos
6. **UX**: NPS >80 em teste com 10 crianças (6-11 anos)

---

## 📝 NOTAS FINAIS

- **Acessibilidade First**: Testes com crianças neurodiversas
- **Sem Publicidade**: Ambiente seguro, sem ads ou dark patterns
- **Professor Dashboard** (Future): Ver histórico de cada aluno, exportar relatórios
- **Colaborativo, Não Competitivo**: Embora haja ranking, ênfase em "todos podem ganhar"
- **Inclusividade**: Diferentes modalidades permitem diferentes aprendizados

---

**Versão**: 1.0 | **Última Atualização**: 2026-09-08 | **Autor**: Luiz Fernando
