-- Sprint 1: players, pretest_questions, pretests
-- Sprint 5: migrado para SQLite (sem servidor pra instalar — decisão do usuário).
-- Aplicado via `npm run migrate` (backend/src/database/migrate.ts), não precisa
-- de cliente externo.

create table players (
  id text primary key,
  username text not null,
  series integer not null check (series between 1 and 5),
  avatar_index integer not null check (avatar_index between 0 and 7),
  skill_score integer check (skill_score between 0 and 100),
  pretest_completed integer not null default 0,
  dominant_subjects text not null default '[]', -- JSON array, parse manual no PlayerService
  created_at text not null default (datetime('now'))
);

create table pretest_questions (
  id text primary key,
  series integer not null check (series between 1 and 5),
  subject text not null check (subject in ('portugues', 'matematica')),
  category text not null,
  prompt text not null,
  options text not null, -- JSON [{ "id": "a", "text": "..." }, ...], parse manual
  correct_option_id text not null,
  difficulty integer not null check (difficulty between 1 and 3)
);

create table pretests (
  id text primary key,
  player_id text not null,
  portuguese_correct integer not null,
  math_correct integer not null,
  skill_score integer not null check (skill_score between 0 and 100),
  survey_choice text not null check (survey_choice in ('portugues', 'matematica', 'ambas', 'nenhuma')),
  created_at text not null default (datetime('now')),
  foreign key (player_id) references players(id) on delete cascade
);

create index idx_pretest_questions_series_subject on pretest_questions(series, subject);
create index idx_pretests_player_id on pretests(player_id);

-- Sprint 3: jogo principal (motor de rodadas). Separado de pretest_questions
-- porque tem propósito e ciclo de vida diferentes.
--
-- Sprint 4: format_type + answer_data suportam os outros 6 formatos.
-- options/correct_option_id continuam servindo multiple-choice, true-false
-- e visual-click (estruturalmente idênticos); os outros 3 formatos com forma
-- de resposta diferente (fill-blank, numeric-input, matching, sequence)
-- usam answer_data — ver formato de cada um em docs/ e no plano do Sprint 4.
create table questions (
  id text primary key,
  subject text not null check (subject in ('portugues', 'matematica')),
  competency text not null,
  format_type text not null default 'multiple-choice',
  prompt text not null,
  options text, -- JSON, parse manual
  correct_option_id text,
  answer_data text, -- JSON, parse manual
  points integer not null,
  difficulty integer not null check (difficulty between 1 and 3)
);
