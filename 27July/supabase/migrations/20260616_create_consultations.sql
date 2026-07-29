create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  city text not null,
  property_type text not null,
  interior_exterior text not null,
  area_size text,
  preferred_finish text,
  timeline text,
  notes text,
  status text not null default 'new'
);

alter table public.consultations enable row level security;

grant insert on public.consultations to anon;
grant insert on public.consultations to authenticated;
grant select, update on public.consultations to authenticated;

create policy "Anyone can insert consultations"
on public.consultations
for insert
to anon, authenticated
with check (true);

create policy "Authenticated users can view consultations"
on public.consultations
for select
to authenticated
using (true);

create policy "Authenticated users can update consultations"
on public.consultations
for update
to authenticated
using (true);