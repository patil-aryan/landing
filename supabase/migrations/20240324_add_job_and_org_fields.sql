-- Add new columns to subscribers table
alter table public.subscribers
  add column job_role text,
  add column organization_size text;

-- Add policy for public signup including the new fields
create policy "Enable public signup with all fields"
  on public.subscribers for insert
  to anon
  with check (true);
