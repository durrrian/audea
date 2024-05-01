import { Container, Preview, Html, Row, Column, Tailwind, Text as TextReactEmail, Img } from '@react-email/components'
import type { Analisis } from '@repo/prisma/client'
import { parseUrl, stockbitAsset } from '@repo/helper'
import { cardStyle, centerContainer } from '../lib/style'
import { Head, Body, LogoSupercuan, ContainerBody, Hr, Text, Link, FooterText, Button } from '../components'
import { NewAnalisisBanner } from '../components/banner/new-analisis-banner'

interface EmailProps {
  analisis: Omit<Analisis, 'subtitle' | 'minRead' | 'createdDate' | 'updatedTime' | 'content'> & { kodeEmiten: string }
  email: string
  name: string
}

function Email({
  analisis = {
    kodeEmiten: 'BBCA',
    title: 'Analisa Prospektus BBCA Tahun 2024 Kayaknya Suram',
    id: '123456789',
    emitenId: '987654321',
  },
  email = 'alvin@supercuansaham.id',
  name = 'Furqon Wilogo',
}: EmailProps) {
  const title = `Ada analisis emiten terbaru!`

  const previewText = `Analisis emiten terbaru siap untuk dibaca`

  return (
    <Html>
      <Head title={title} />

      <Preview>{previewText}</Preview>

      <Tailwind>
        <Body>
          <ContainerBody>
            <LogoSupercuan />

            <Hr />

            <Container style={centerContainer}>
              <NewAnalisisBanner />
            </Container>

            <Text>Halo, {name} 👋🏼</Text>

            <Text>
              Kamu masih inget kan kalau kita menggunakan approach value investing? Karena itu, saya baru saja membuat
              analisis emiten terbaru yang sudah bisa kamu baca.
            </Text>

            <Container
              style={{
                backgroundColor: '#D6D7CF',
                color: '#1F365F',
                ...cardStyle,
              }}
            >
              <Row>
                <Column align='right'>
                  <Img
                    src={stockbitAsset(analisis.kodeEmiten)}
                    alt={`${analisis.kodeEmiten} logo`}
                    width='40'
                    height='40'
                    style={{ marginRight: '16px' }}
                  />
                </Column>

                <Column align='left'>
                  <TextReactEmail
                    style={{
                      color: '#1F365F',
                      fontSize: '24px',
                      fontWeight: 600,
                      textAlign: 'left',
                    }}
                  >
                    {analisis.kodeEmiten}
                  </TextReactEmail>
                </Column>
              </Row>

              <Row>
                <TextReactEmail
                  style={{
                    color: '#1F365F',
                    fontSize: '20px',
                    lineHeight: '24px',
                    textAlign: 'center',
                  }}
                >
                  <Link href={parseUrl('web', `/analisis/${analisis.emitenId}/${analisis.id}`).href}>
                    {analisis.title}
                  </Link>
                </TextReactEmail>
              </Row>
            </Container>

            <Hr />

            <Text>
              Kamu juga bisa membaca seluruh analisis yang sudah saya buat di laman analisis. Selamat membaca!
            </Text>

            <Button href={parseUrl('web', '/analisis').href}>Kunjungi Laman Analisis</Button>

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
