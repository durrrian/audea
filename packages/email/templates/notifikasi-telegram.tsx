import { Container, Preview, Html, Tailwind } from '@react-email/components'
import { TELEGRAM_LINK } from '@repo/api'
import { cardStyle, centerContainer } from '../lib/style'
import { Head, Body, LogoSupercuan, ContainerBody, Hr, Text, Link, FooterText } from '../components'
import { telegramBenefit } from '../lib/telegram-benefit'

interface EmailProps {
  email: string
  name: string
}

function Email({ email = 'alvin@supercuansaham.id', name = 'Furqon Wilogo' }: EmailProps) {
  const title = `Akun Telegram Berhasil Terhubung!`

  const previewText = `Beberapa keuntungan dari menghubungkan Telegram`

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

            <Text>Akun Telegram kamu berhasil terhubung!</Text>

            <Hr />

            <Text>Karena kamu sudah menghubungkan akun Telegram, kamu jadi bisa:</Text>

            <ol>
              {telegramBenefit.map((benefit) => (
                <li key={benefit.id}>
                  <Text>{benefit.description}</Text>
                </li>
              ))}
            </ol>

            <Container style={cardStyle}>
              <Container style={centerContainer}>
                <Text>Link Channel Telegram Supercuan Saham</Text>

                <Link href={TELEGRAM_LINK}>{TELEGRAM_LINK}</Link>
              </Container>
            </Container>

            <Hr />

            <Text>
              Kalo ada apa-apa, jangan sungkan untuk email balik saya ya. Tinggal reply aja email ini. Happy value
              investing!
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
