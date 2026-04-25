create extension if not exists pgcrypto;

create table if not exists public.diagnosis_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  name text not null check (char_length(name) between 1 and 24),
  job_name text not null,
  element text not null,
  rarity text not null,
  stats jsonb not null,
  special_move text not null,
  adventure_style text not null,
  party_synergy text not null,
  story text not null,
  answers jsonb not null
);

alter table public.diagnosis_results enable row level security;

create index if not exists diagnosis_results_created_at_idx
  on public.diagnosis_results (created_at desc);

comment on table public.diagnosis_results is '架空RPG職業診断の診断結果';
