import { Resend } from 'resend'
import { defer } from '@defer/client'
import WelcomeNewUser from '@/emails/welcome-new-user'

const resend = new Resend(process.env.RESEND_API_KEY!!)

async function sendWelcomeEmail(email: string, firstName: string, lastName: string) {
  return new Promise(async (resolve, reject) => {
    try {
      await resend.emails.send({
        from: 'Audea <no_reply@audea.id>',
        to: email,
        subject: 'Welcome to Audea!',
        react: <WelcomeNewUser name={`${firstName} ${lastName}`} />,
      })

      console.log(`Successfully send email to ${email}`)

      resolve('Successfully run sendWelcomeEmail function! Check logs.')
    } catch (error) {
      console.error(JSON.stringify(error, null, 2))
      reject(error)
    }
  })
}

export default defer(sendWelcomeEmail, {
  concurrency: 10,
  retry: 5,
})
