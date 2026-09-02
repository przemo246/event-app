alter table public.events
  add column is_featured boolean not null default false;

create index events_is_featured_idx on public.events (is_featured)
  where is_featured;

-- is_featured must only ever be changed directly in the database (e.g. via the
-- SQL editor as the postgres/service_role), never through the app. Replace the
-- blanket insert/update grants with explicit column lists that omit it, so the
-- authenticated role (which is what the app always connects as) has no
-- privilege to write that column even if a client sent it in a payload.
revoke insert, update on public.events from authenticated;

grant insert (
  user_id,
  title,
  category,
  description,
  date_time_from,
  date_time_to,
  location,
  image,
  link,
  tags
) on public.events to authenticated;

grant update (
  title,
  category,
  description,
  date_time_from,
  date_time_to,
  location,
  image,
  link,
  tags
) on public.events to authenticated;
