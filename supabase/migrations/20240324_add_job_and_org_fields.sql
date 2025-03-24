-- Add new columns to subscribers table
alter table public.subscribers
  add column job_role text,
  add column organization_size text;
