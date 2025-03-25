-- Add new columns to beta_signups table
ALTER TABLE public.beta_signups
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS job_role text,
  ADD COLUMN IF NOT EXISTS organization_size text;

-- Add comment to help identify the purpose of these columns
COMMENT ON COLUMN public.beta_signups.job_role IS 'User''s job role or title';
COMMENT ON COLUMN public.beta_signups.organization_size IS 'Size of the user''s organization (0-10, 11-50, etc)';

-- Grant permissions to access the new columns
GRANT ALL ON public.beta_signups TO anon, authenticated;
