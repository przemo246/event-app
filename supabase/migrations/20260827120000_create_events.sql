create type public.event_category as enum (
  'music_entertainment',
  'business_professional',
  'food_drink',
  'sports_wellness',
  'arts_culture',
  'community_hobbies'
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  category public.event_category not null,
  description text not null,
  date_time_from timestamptz not null,
  date_time_to timestamptz,
  location text not null,
  image text, -- Supabase Storage object path (bucket: event-images), not a public URL; client resolves the URL from this path
  link text,
  tags text[], -- simple array column, no separate tags/junction table
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint events_date_range_valid check (
    date_time_to is null or date_time_from < date_time_to
  ) -- only enforced when date_time_to is filled in, since it's optional
);

create index events_user_id_idx on public.events (user_id);
create index events_category_idx on public.events (category);
create index events_date_time_from_idx on public.events (date_time_from);
create index events_tags_gin_idx on public.events using gin (tags);

alter table public.events enable row level security;

create policy "Anyone can view events"
  on public.events for select
  using (true);

create policy "Users can insert own events"
  on public.events for insert
  with check (auth.uid () = user_id);

create policy "Users can update own events"
  on public.events for update
  using (auth.uid () = user_id)
  with check (auth.uid () = user_id);

create policy "Users can delete own events"
  on public.events for delete
  using (auth.uid () = user_id);

create function public.set_events_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger events_set_updated_at
  before update on public.events
  for each row
  execute function public.set_events_updated_at();

-- Storage: event images
-- Path convention "{user_id}/{event_id}/{filename}" lets storage.foldername(name)[1] scope
-- ownership without a join back to public.events.
insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do nothing;

create policy "Anyone can view event images"
  on storage.objects for select
  using (bucket_id = 'event-images');

create policy "Users can upload own event images"
  on storage.objects for insert
  with check (
    bucket_id = 'event-images'
    and auth.uid ()::text = (storage.foldername (name)) [1]
  );

create policy "Users can update own event images"
  on storage.objects for update
  using (
    bucket_id = 'event-images'
    and auth.uid ()::text = (storage.foldername (name)) [1]
  )
  with check (
    bucket_id = 'event-images'
    and auth.uid ()::text = (storage.foldername (name)) [1]
  );

create policy "Users can delete own event images"
  on storage.objects for delete
  using (
    bucket_id = 'event-images'
    and auth.uid ()::text = (storage.foldername (name)) [1]
  );
