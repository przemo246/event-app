create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid () = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid () = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid () = id)
  with check (auth.uid () = id);

-- Auto-create a profile row whenever a new auth user is created (password or OAuth signup).
-- security definer so it can insert regardless of the caller's RLS context.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
