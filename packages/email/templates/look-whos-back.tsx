import { Container, Preview, Html, Row, Column, Tailwind } from '@react-email/components'
import { formatDate, parseUrl } from '@repo/helper'
import { containerStart, containerEnd, cardStyle } from '../lib/style'
import type { Tier } from '../components'
import { Head, Body, LogoSupercuan, ContainerBody, Hr, Text, FooterText, Button, TierPill } from '../components'

interface LookWhosBackEmailProps {
  tier: Tier
  email: string
  name: string
  date: string
}

function LookWhosBackEmail({
  tier = 'BRONZE',
  email = 'alvin@supercuansaham.id',
  name = 'Furqon Wilogo',
  date = new Date().toISOString(),
}: LookWhosBackEmailProps) {
  const datetime = new Date(date)

  const title = `Selamat datang kembali ke Supercuan Saham Membership!`

  const previewText = `Terima kasih sudah kembali menjadi member Supercuan Saham`

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
              Terimakasih atas pembayaran yang kamu lakukan dan selamat datang kembali ke Supercuan Saham Porto Sharing!
            </Text>

            <Text>Berikut adalah detail dari membership kamu:</Text>

            <Container style={cardStyle}>
              <Row>
                <Column>
                  <Container style={containerStart}>
                    <Text>Tipe membership:</Text>
                  </Container>
                </Column>
                <Column>
                  <Container style={containerEnd}>
                    <TierPill tier={tier} />
                  </Container>
                </Column>
              </Row>

              <Row>
                <Column>
                  <Container style={containerStart}>
                    <Text>Tanggal membership habis:</Text>
                  </Container>
                </Column>
                <Column>
                  <Container style={containerEnd}>
                    <Text>{formatDate(datetime, 'long')}</Text>
                  </Container>
                </Column>
              </Row>
            </Container>

            <Hr />

            <Text>
              Karena kamu sudah bergabung lagi, maka kamu akan mendapatkan email notifikasi seluruh transaksi saham aku
              kedepannya. Kamu juga bisa bergabung kembali ke Channel Telegram Supercuan Saham, dan connect Telegram
              kamu melalui aplikasi web Supercuan Saham.
            </Text>

            <Button href={parseUrl('web', '/sign-in').href}>Kunjungi Supercuan Saham</Button>

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

export default LookWhosBackEmail
