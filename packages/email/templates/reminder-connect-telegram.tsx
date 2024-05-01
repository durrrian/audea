import { Preview, Html, Tailwind } from '@react-email/components'
import { parseUrl } from '@repo/helper'
import { Head, Body, LogoSupercuan, ContainerBody, Hr, Text, FooterText, Button } from '../components'
import { telegramBenefit } from '../lib/telegram-benefit'

interface EmailProps {
  email: string
  name: string
}

function Email({ email = 'alvin@supercuansaham.id', name = 'Furqon Wilogo' }: EmailProps) {
  const title = `Reminder connect Telegram!`

  const previewText = `Nampaknya kamu belum connect Telegram kamu di Web-App nih!`

  return (
    <Html>
      <Head title={title} />

      <Preview>{previewText}</Preview>

      <Tailwind>
        <Body>
          <ContainerBody>
            <LogoSupercuan />

            <Hr />

            <Text>Halo, {name} 👋🏼</Text>

            <Text>
              Email ini merupakan pemberitahuan bahwa kamu sampai saat ini belum mengkoneksikan Telegram kamu via
              Web-App Supercuan Saham.
            </Text>

            <Text>Beberapa keuntungan apabila kamu mengkoneksikan akun Telegram kamu:</Text>

            <ol>
              {telegramBenefit.map((benefit) => (
                <li key={benefit.id}>
                  <Text>{benefit.description}</Text>
                </li>
              ))}
            </ol>

            <Hr />

            <Text>Kamu bisa konekin Telegram kamu via Web-App dengan menekan tombol dibawah.</Text>

            <Button href={parseUrl('web', '/settings/telegram').href}>Kunjungi Settings Telegram</Button>

            <Text>
              Aku akan ngingetin kamu lagi yaa minggu depan apabila kamu belum juga mengkoneksikan Telegram kamu!
            </Text>

            <Text>
              <b className='font-semibold'>— Alvin Tanasta</b>
            </Text>

            <Hr />

            <FooterText email={email} />
          </ContainerBody>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default Email
