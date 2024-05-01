import { Container, Preview, Html, Row, Column, Tailwind } from '@react-email/components'
import { formatDate, parseUrl } from '@repo/helper'
import { containerStart, containerEnd, cardStyle } from '../lib/style'
import type { Tier } from '../components'
import { Head, Body, LogoSupercuan, ContainerBody, Hr, Text, FooterText, Button, TierPill } from '../components'

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

  const title = `Perpanjang membership berhasil!`

  const previewText = `Terima kasih sudah tetap menjadi member Supercuan Saham`

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
              Terimakasih atas perpanjangan member yang kamu lakukan. Membership kamu sudah otomatis diperbarui.
            </Text>

            <Text>Detail membership kamu sekarang:</Text>

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
              Kunjungi aplikasi web Supercuan Saham untuk dapetin informasi portofolio saham terbaru saya melalui tombol
              di bawah
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
