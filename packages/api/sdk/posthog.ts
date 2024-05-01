import type { MembershipTier } from '@repo/prisma/client'
import type { CaptureOptions, Properties } from 'posthog-js'
import posthog from 'posthog-js'

export type RegistrationEvent =
  | 'user_complete_biodata'
  | 'user_verified_email'
  | `user_pick_${MembershipTier}`
  | 'user_click_pay'
  | 'user-finish-payment'

export type NonRegistrationEvent =
  | 'login_button_clicked'
  | 'register_button_clicked'
  | 'user_logged_in'
  | 'user_logged_out'
  | 'user_signed_up'
  | 'manage_membership_button_clicked'
  | 'whatsapp_button_clicked'
  | 'popup_open'
  | 'popup_close'

export type EventName = RegistrationEvent | NonRegistrationEvent

export type LocationFrom =
  | 'footer'
  | 'nav'
  | 'hero'
  | 'pick-membership'
  | 'service-offered'
  | 'form-onsignin'
  | 'form-onsignup'
  | 'whatsapp-fixed-button'
  | 'faq'
  | 'google-sign-in'
  | 'popup-cta'
  | 'popup-image'

export type SourceFrom = 'marketing' | 'web' | 'ads' | 'telegram'

export type Location = `${LocationFrom}-${SourceFrom}`

export type PropertiesCustomPostHog = {
  location: Location
}

export function posthogCapture(
  event_name: EventName,
  properties?: Properties | null | undefined | PropertiesCustomPostHog,
  options?: CaptureOptions | undefined,
) {
  posthog.capture(event_name, properties, options)
}

export * from 'posthog-js'
