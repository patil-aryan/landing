-- Create subscribers table
create table public.subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  first_name text,
  mailchimp_id text,
  status text default 'pending',
  subscribed_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table public.subscribers enable row level security;

-- Grant access to authenticated users
create policy "Enable insert for authenticated users only"
  on public.subscribers for insert
  to authenticated
  with check (true);

create policy "Enable read for authenticated users only"
  on public.subscribers for select
  to authenticated
  using (true);

-- Grant access to anon users (for public signup)
create policy "Enable insert for anonymous users"
  on public.subscribers for insert
  to anon
  with check (true);
