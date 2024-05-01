import { Container, Preview, Html, Row, Column, Tailwind } from '@react-email/components'
import { formatDate, parseUrl } from '@repo/helper'
import { containerStart, containerEnd, cardStyle } from '../lib/style'
import type { Tier } from '../components'
import { Head, Body, LogoSupercuan, ContainerBody, Hr, Text, Link, FooterText, Button, TierPill } from '../components'

interface EmailProps {
  tier: Tier
  email: string
  name: string
  date: string
}

function Email({
  tier = 'BRONZE',
  email = 'alvin@supercuansaham.id',
  name = 'Furqon Wilogo',
  date = new Date().toISOString(),
}: EmailProps) {
  const datetime = new Date(date)

  const title = `Selamat Bergabung di Supercuan Saham!`

  const previewText = `Terima kasih sudah menjadi member Supercuan Saham`

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
              Terimakasih atas pembayaran yang kamu lakukan dan selamat datang di Supercuan Saham Porto Sharing!
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
              Kamu akan mendapatkan email notifikasi seluruh transaksi saham aku kedepannya. Selain itu, kamu juga bisa
              bergabung di Channel Telegram Supercuan Saham, dan{' '}
              <Link href={parseUrl('web', '/settings/telegram').href}>connect Telegram</Link> kamu melalui aplikasi web
              Supercuan Saham.
            </Text>

            <Text>
              Karena kamu member baru di Supercuan Saham, alangkah lebih baiknya kalo kamu baca{' '}
              <Link href={parseUrl('web', '/starting-guide').href}>starting guide</Link> kami terlebih dahulu.
            </Text>

            <Text>
              Tapi kalau kamu langsung mau explore aplikasi Supercuan Saham, kamu bisa klik tombol di bawah ini
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

export default Email
