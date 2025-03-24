/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_MAILCHIMP_API_KEY: string
  readonly VITE_MAILCHIMP_LIST_ID: string
  readonly VITE_MAILCHIMP_SERVER_PREFIX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
