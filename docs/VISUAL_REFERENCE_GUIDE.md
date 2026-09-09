# 🎬 VISUAL REFERENCE GUIDE - OLIMPÍADA EDUCATIVA

## 🎮 INSPIRAÇÕES VISUAIS

### 1. BATTLEFIELD 4 (Militar + Futurista)
```
O QUE PEGAR:
- Tons azul escuro + laranja
- Interfaces com gradientes
- Menu com glow neon
- Efeito de vidro futurista (glassmorphism)
- Scan lines animadas
- Particles e explosões visuais

ONDE VER:
- Menu principal do jogo
- HUD durante gameplay
- Tela de resultados
- Loadout screens
```

### 2. CYBERPUNK 2077 (Neon + Dark)
```
O QUE PEGAR:
- Neon glow effects (roxo, pink, ciano)
- Dark backgrounds com hologramas
- Text effects (glow, shadow)
- Glitch animations (ocasional)
- Futuristic UI elements
- Corpo de texto em cores vibrantes

COMO IMPLEMENTAR:
- Box-shadow: 0 0 20px cor-neon
- Text-shadow: 0 0 10px cor-neon
- Gradients com cores vibrantes
```

### 3. APEX LEGENDS (Limpo + Dinâmico)
```
O QUE PEGAR:
- Team-based color coding
- Dynamic leaderboards
- Smooth card designs
- Fast transitions
- Staggered animations
- Clean typography

PALETA:
- Azul + Laranja (como Battlefield)
- Tons metálicos
- Hover effects elegantes
```

### 4. HALO INFINITE (Limpo + Futurista)
```
O QUE PEGAR:
- Hexagonal shapes
- Blue + Orange color scheme
- Smooth animations
- Hierarchy clara
- Glow effects subtis
- Mini animations

ESPECÍFICO:
- Hexagons em backgrounds
- Circular progress bars
- Smooth easing curves
```

### 5. DESTINY 2 (Épico + Mystical)
```
O QUE PEGAR:
- Dramatic lighting
- Large typography
- Animated backgrounds
- Particle effects
- Golden accents
- Sense of achievement

PARÁ OLIMPÍADA:
- Medalhas com brilho
- Victory screens épicas
- Background videos animados
```

---

## 🎨 MOODBOARD DETALHADO

### Cor 1: Azul Escuro (#0a1428)
```
Características:
- Profundo, confiável
- Tipo "bunker militar"
- Perfeito para backgrounds
- Não cansa os olhos (modo noturno)

Uso:
- 80% do background
- Containers base
- Text backgrounds

Combinações:
+ Laranja (#ff6600) = Contraste épico
+ Roxo (#b923ff) = Futurista
+ Branco (#e8eef7) = Legibilidade
```

### Cor 2: Laranja (#ff6600)
```
Características:
- Energético, ação
- Tipo "perigo futurista"
- Contrasta bem com azul
- Atrai atenção

Uso:
- 15% dos elementos (CTAs, botões)
- Alertas críticos
- Hover states
- Títulos secundários

Combinações:
+ Azul = Militar
+ Roxo = Futurista
+ Amarelo = Quente e agressivo
```

### Cor 3: Roxo Neon (#b923ff)
```
Características:
- Futurista, mystical
- Cyberpunk vibes
- Glow intenso
- Diferenciador

Uso:
- Borders
- Glow effects
- Highlights
- Accents

Quando usar:
- Neon lights
- Focus states
- Special effects
```

### Cor 4: Branco Gelo (#e8eef7)
```
Características:
- Claro, legível
- Fresco
- Futurista
- Alto contraste

Uso:
- Texto principal
- High contrast areas
- Sobre backgrounds escuros

NUNCA:
- Background branco puro (#ffffff)
- Texto em branco 100%
```

---

## 🎬 ANIMATION REFERENCES

### Transição de Página (Inspirada em Cyberpunk)
```
Duração Total: 600ms
Composição:

1. Fade Out (0-100ms)
   - Opacity: 1 → 0
   - Ease: ease-out

2. Scan Line Down (100-400ms)
   - Line moves from top to bottom
   - Height: 2px
   - Color: #b923ff
   - Opacity: 0.5

3. Scale In (200-600ms)
   - Content: scale(0.8) → scale(1)
   - Ease: cubic-bezier(0.34, 1.56, 0.64, 1)

4. Glow Pulse (300-600ms)
   - Box shadow intensifies
   - Ease: ease-out

Resultado: Sensação de "Teletransporte Futurista"
```

### Button Hover (Inspirado em Halo)
```
Duração: 200ms
Composição:

1. Scale (0-200ms)
   - 1.0 → 1.08
   - Ease: ease-out

2. Glow Intensify (0-200ms)
   - Box-shadow: 20px → 40px blur
   - Ease: ease-out

3. Text Shine (50-200ms)
   - Inner gradient moves left to right
   - Opacity: 0 → 0.3 → 0

4. Sound (0ms)
   - Beep suave 50Hz

Resultado: Botão "acorda" e pede clique
```

### Número Animado (Inspirado em Apex)
```
Quando score atualiza:

1. Old number slides up (0-150ms)
   - Y: 0 → -20px
   - Opacity: 1 → 0
   - Ease: ease-out

2. New number slides down (150-350ms)
   - Y: 20px → 0
   - Opacity: 0 → 1
   - Scale: 0.8 → 1.2 → 1.0

3. Glow flash (0-300ms)
   - Box shadow pulsa
   - Cor do número intensifica

Resultado: Número "cai" e "pesa", mostrando impacto
```

### Leaderboard Position Change (Inspirado em Destiny)
```
Quando posição muda no ranking:

1. Current row highlights (0-200ms)
   - Background: transparent → cor neon
   - Ease: ease-out

2. Row moves to new position (200-600ms)
   - Slide suave
   - Ease: cubic-bezier

3. New position pulsa (500-1200ms)
   - Medal emoji scale: 1 → 1.3 → 1
   - Repeat 2x

4. Confeti menor (0-400ms)
   - 10 partículas caem suavemente

Resultado: Mudança de posição é ÉPICA
```

---

## 🎯 TIPOGRAFIA EM AÇÃO

### Headline (H1) - "OLIMPÍADA EDUCATIVA"
```
Font: Audiowide (Google Fonts)
Size: 64px
Weight: 700 (Bold)
Letter Spacing: +0.05em
Transform: UPPERCASE
Color: #e8eef7 (branco gelo)
Text Shadow: 0 0 10px #b923ff, 0 0 20px #ff006e
Line Height: 1.2

Animação ao carregar:
- Fade in (0-300ms)
- Scale in (0-400ms, overshoot)
- Glow pulse (0-800ms)

Resultado: Texto épico e futurista
```

### Subtitle (P) - "Tactical Learning • Competitive Spirit"
```
Font: Inter (Google Fonts)
Size: 18px
Weight: 400
Letter Spacing: +0.02em
Color: #00d9ff (cyan neon)
Text Shadow: 0 0 5px #00d9ff
Line Height: 1.4

Animação ao carregar:
- Fade in com delay 200ms
- Opacity: 0 → 1
- Y: 10px → 0

Resultado: Tagline elegante
```

### Button Text
```
Font: Poppins (Bold)
Size: 14px-18px (depende do tamanho)
Weight: 700
Letter Spacing: +0.05em
Transform: UPPERCASE
Color: #e8eef7

Efeito:
- Slight text-shadow
- Muda cor no hover

Resultado: Claro e forte
```

### Scoring Number
```
Font: IBM Plex Mono
Size: 48-52px (em jogo)
Weight: 700 (Bold)
Letter Spacing: +0.1em
Color: #ff6600 (laranja)
Text Shadow: 0 0 10px #ff6600

Animação:
- Bounce quando atualiza
- Glow intensifica

Resultado: Número impactante
```

---

## 🎬 DETALHES DE IMPLEMENTAÇÃO

### Background com Layers (Visually Rich)

```css
/* Layer 1: Base Gradient */
background: linear-gradient(135deg, #0a1428 0%, #1a3a52 100%);

/* Layer 2: Grid Pattern (via pseudo-element) */
::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(0deg, transparent 24%, rgba(185, 35, 255, 0.05) 25%, rgba(185, 35, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(185, 35, 255, 0.05) 75%, rgba(185, 35, 255, 0.05) 76%, transparent 77%, transparent),
    linear-gradient(90deg, transparent 24%, rgba(185, 35, 255, 0.05) 25%, rgba(185, 35, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(185, 35, 255, 0.05) 75%, rgba(185, 35, 255, 0.05) 76%, transparent 77%, transparent);
  background-size: 50px 50px;
  transform: rotate(45deg);
  opacity: 0.5;
}

/* Layer 3: Animated Scan Lines (via animation) */
::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(185, 35, 255, 0.05) 2px,
      rgba(185, 35, 255, 0.05) 4px
    );
  animation: scan 8s linear infinite;
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
```

### Card Glass Effect

```css
.glass-card {
  background: rgba(26, 58, 82, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(185, 35, 255, 0.3);
  border-radius: 12px;
  box-shadow:
    0 0 20px rgba(185, 35, 255, 0.2) inset,
    0 0 30px rgba(185, 35, 255, 0.3);
  
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(185, 35, 255, 0.6);
    box-shadow:
      0 0 30px rgba(185, 35, 255, 0.4) inset,
      0 0 50px rgba(185, 35, 255, 0.5);
  }
}
```

### Glow Button

```css
.glow-button {
  background: linear-gradient(45deg, #ff6600 0%, #ff8533 100%);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(255, 102, 0, 0.5);
  padding: 12px 24px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: translateX(-100%);
  }
  
  &:hover {
    box-shadow: 0 0 40px rgba(255, 102, 0, 0.8);
    transform: scale(1.05);
    
    &::before {
      animation: shine 0.3s;
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
}

@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

## 🎮 SCREEN-BY-SCREEN VISUAL BREAKDOWN

### Landing Page
```
┌────────────────────────────────┐
│ [Background: Grid + Particles]  │
│                                │
│     [Animated Logo]            │
│     🌟 OLIMPÍADA EDUCATIVA 🌟   │
│                                │
│   Tactical Learning Compete    │
│                                │
│   [ENTRAR] [COMO JOGAR]        │
│                                │
│ [Vignette fade on edges]       │
│ [Scan lines moving]            │
└────────────────────────────────┘

Visual Details:
- Logo: Scale in + glow fade (500ms)
- Título: Fade in com text-shadow (300ms)
- Subtítulo: Fade in (100ms delay, 200ms)
- Botões: Bounce in (200ms each)
- Background: Always animating (particles, scan)
```

### Pre-Test
```
┌────────────────────────────────┐
│ TACTICAL ASSESSMENT            │
│ Step 1/3                       │
│                                │
│ Which subjects are strengths?  │
│                                │
│ ☐ Português                    │
│ ☐ Matemática                   │
│ ☐ Ambas                        │
│ ☐ Nenhuma                      │
│                                │
│ [PRÓXIMO]  [SKIP]              │
│                                │
│ [Progress bar with glow]       │
└────────────────────────────────┘

Visual Details:
- Container: Glass effect + border glow
- Checkbox: Hover = glow intensify
- Selected: Cor mudança + scale
- Progress: Animated fill
- Buttons: Glow hover
```

### Lobby
```
┌────────────────────────────────┐
│ SQUAD ASSEMBLY                 │
│ Players: 14/16 [Progress]      │
│                                │
│ [JOÃO - 92 - Série 3] [MARÍA]  │
│ [PEDRO - 82] [CARLOS]          │
│ ... (mais cards)               │
│                                │
│ ⚖️ BALANCE: 202pts each        │
│ Variance: 7pts (EXCELLENT)     │
│                                │
│ [COMEÇAR] [REDISTRIBUIR]       │
└────────────────────────────────┘

Visual Details:
- Cards: Slide in staggered (100ms each)
- Cards: Hover = glow + scale
- Names: Pulse subtle
- Score: Bounce animation
- Team color: Border com glow
- Balance: Changes color (good/bad)
- Buttons: Glow intense
```

### Game - Question
```
┌────────────────────────────────┐
│ [TIMER: 25s] NORMAL ⏱️          │
│                                │
│ PERGUNTA AQUI?                 │
│                                │
│ [OPÇÃO 1]  [OPÇÃO 2]           │
│ [OPÇÃO 3]  [OPÇÃO 4]           │
│                                │
│ [PLACAR]       [LEADERBOARD]   │
│                                │
│ Equity Vermelha: 2240 pts 🥇   │
│ Equipe Azul: 1890 pts 🥈       │
│ ...                            │
└────────────────────────────────┘

Visual Details:
- Timer: Cor muda com fase
- Pergunta: Slide in + scan effect
- Opções: Slide in staggered
- Hover opção: Glow + scale
- Click opção: Pop effect
- Selected: Color + glow
- Leaderboard: Updates animate
```

### Results
```
┌────────────────────────────────┐
│                                │
│ PARTIDA FINALIZADA             │
│                                │
│ 🥇 Equipe Vermelha - 2240 pts   │
│    [Confeti caindo]            │
│                                │
│ 🥈 Equipe Azul - 1890 pts       │
│                                │
│ 🥉 Equipe Amarela - 1750 pts    │
│                                │
│ [JOGAR NOVAMENTE] [SAIR]       │
│                                │
│ [Medalhas animadas caindo]     │
│ [Números contam up]            │
│ [Confeti explode]              │
└────────────────────────────────┘

Visual Details:
- Fade in screen (300ms)
- Medals fall from top (bounce)
- Numbers count up (1000ms)
- Confeti explode (400ms)
- Winner row highlight
- Sound: Celebratory sting
```

---

## 📱 RESPONSIVE CONSIDERATIONS

### Desktop (1920px+)
- Full resolution backgrounds
- All animations at 100%
- Large text sizes
- Sidebar visible
- 3D effects if available

### Tablet (1024px-1919px)
- Backgrounds slightly reduced
- Animations: 80% speed
- Medium text sizes
- Touch-optimized buttons (44px+)

### Mobile (< 1024px)
- Simplified backgrounds (grid + base gradient)
- Animations: 60% speed
- Smaller text but readable
- Buttons: 48px×48px minimum
- Single column layout
- Landscape mode optimized

---

## 🎵 SOUND DESIGN QUICK REFERENCE

| Evento | Som | Duração | Volume |
|--------|-----|---------|--------|
| Hover Button | Beep 50Hz | 200ms | 70dB |
| Click Button | Whoosh + Pop | 300ms | 75dB |
| Correct Answer | Chime | 600ms | 80dB |
| Wrong Answer | Bass Thump | 400ms | 75dB |
| Question Show | Sci-fi Beeps | 800ms | 70dB |
| Speedrun! | Futuristic Explosion | 800ms | 85dB |
| Timeout | Deep Gong | 1500ms | 80dB |
| Team Update | Notification Beep | 300ms | 70dB |
| Victory | Orchestral Sting | 2000ms | 80dB |

---

## 🎯 QUICK CHECKLIST

### Antes de Implementar
- [ ] Paleta de cores aprovada
- [ ] Tipografia escolhida
- [ ] Animações aprovadas
- [ ] Assets de áudio prontos
- [ ] Grid/Layout definido

### Ao Implementar
- [ ] Tailwind config atualizado
- [ ] Framer Motion instalado
- [ ] Global styles aplicados
- [ ] Componentes base testados
- [ ] Animations suaves em 60fps

### Teste de Performance
- [ ] Animations não dropam FPS
- [ ] Glow effects otimizados
- [ ] Particles não travam
- [ ] Mobile performance OK
- [ ] Sound loading rápido

---

**Status**: 🎮 Production Design System ✅  
**Tema**: Battlefield 4 + Cyberpunk 2077  
**Pronto para**: Implementação Imediata  

**"Mais que uma gincana educacional. É uma EXPERIÊNCIA de game AAA." 🚀✨**
