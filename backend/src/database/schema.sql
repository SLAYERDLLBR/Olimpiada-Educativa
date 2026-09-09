-- Sprint 1: players, pretest_questions, pretests
-- Rodar no Supabase SQL Editor. Tabelas de lobby/jogo (teams, game_sessions,
-- rounds, responses, leaderboards) entram no Sprint 2, quando o tamanho de
-- sala flexível e o balanceamento forem implementados.

create extension if not exists "pgcrypto";

create table players (
  id uuid primary key default gen_random_uuid(),
  username varchar(20) not null,
  series int not null check (series between 1 and 5),
  avatar_index int not null check (avatar_index between 0 and 7),
  skill_score int check (skill_score between 0 and 100),
  pretest_completed boolean not null default false,
  dominant_subjects text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table pretest_questions (
  id uuid primary key default gen_random_uuid(),
  series int not null check (series between 1 and 5),
  subject varchar(20) not null check (subject in ('portugues', 'matematica')),
  category varchar(50) not null,
  prompt text not null,
  options jsonb not null, -- [{ "id": "a", "text": "..." }, ...]
  correct_option_id varchar(5) not null,
  difficulty int not null check (difficulty between 1 and 3)
);

create table pretests (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references players(id) on delete cascade,
  portuguese_correct boolean not null,
  math_correct boolean not null,
  skill_score int not null check (skill_score between 0 and 100),
  survey_choice varchar(20) not null check (survey_choice in ('portugues', 'matematica', 'ambas', 'nenhuma')),
  created_at timestamptz not null default now()
);

create index idx_pretest_questions_series_subject on pretest_questions(series, subject);
create index idx_pretests_player_id on pretests(player_id);
