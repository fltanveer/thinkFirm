-- Run this once in Supabase's SQL editor, then add VITE_SUPABASE_URL and
-- VITE_SUPABASE_ANON_KEY to the deployed site's environment variables.
create table if not exists public.design_comments (
  id text primary key,
  page text not null,
  selector text not null,
  element_label text not null,
  message text not null,
  author text not null,
  status text not null check (status in ('open', 'resolved')) default 'open',
  viewport text not null,
  created_at timestamptz not null default now()
);

alter table public.design_comments enable row level security;

create policy "Anyone can read design comments"
on public.design_comments for select using (true);

create policy "Anyone can create design comments"
on public.design_comments for insert with check (true);

create policy "Anyone can update design comments"
on public.design_comments for update using (true) with check (true);

create policy "Anyone can delete design comments"
on public.design_comments for delete using (true);
