declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL?: string
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?: string
    CLERK_SECRET_KEY?: string
    NEXT_PUBLIC_WEB_URL?: string
    NEXT_PUBLIC_MARKETING_URL?: string
    NEXT_PUBLIC_ADMIN_URL?: string
    NEXT_PUBLIC_WEBHOOK_URL?: string
    NEXT_PUBLIC_ADS_URL?: string
    NEXT_PUBLIC_TELEGRAM_URL?: string
    RESEND_API_KEY?: string
    TRIGGER_API_KEY?: string
    TRIGGER_API_URL?: string
    NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY?: string
    TELEGRAM_BOT_TOKEN?: string
    NOTION_INTEGRATION?: string
    NEXT_PUBLIC_LINEAR_TOKEN?: string
    MIDTRANS_SERVER_KEY?: string
    NEXT_PUBLIC_MIDTRANS_CLIENT_KEY?: string
    NEXT_PUBLIC_POSTHOG_KEY?: string
    NEXT_PUBLIC_POSTHOG_HOST?: string
  }
}
