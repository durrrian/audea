declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL?: string
    AWS_ACCESS_KEY_ID?: string
    AWS_SECRET_ACCESS_KEY?: string
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?: string
    CLERK_SECRET_KEY?: string
    NEXT_PUBLIC_MARKETING_URL?: string
    NEXT_PUBLIC_WEB_URL?: string
    NEXT_PUBLIC_WEBHOOK_URL?: string
    RESEND_API_KEY?: string
    TRIGGER_API_KEY?: string
    NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY?: string
    TRIGGER_API_URL?: string
    NOTION_INTERNAL?: string
    NEXT_PUBLIC_LINEAR_TOKEN_INTERNAL?: string
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string
    STRIPE_SECRET_KEY?: string
    NEXT_PUBLIC_POSTHOG_KEY?: string
    NEXT_PUBLIC_POSTHOG_HOST?: string
    NODE_ENV?: string
  }
}
