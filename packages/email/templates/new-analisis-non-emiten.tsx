import { Container, Preview, Html, Row, Tailwind, Text as TextReactEmail } from '@react-email/components'
import type { AnalisisNonEmiten } from '@repo/prisma/client'
import { cardStyle, centerContainer } from '../lib/style'
import { Head, Body, LogoSupercuan, ContainerBody, Hr, Text, Link, FooterText, Button } from '../components'
import { NewAnalisisNonEmitenBanner } from '../components/banner/new-analisis-non-emiten-banner'
import { parseUrl } from '@repo/helper'

interface EmailProps {
  analisis: Omit<AnalisisNonEmiten, 'subtitle' | 'minRead' | 'createdDate' | 'updatedTime' | 'content'>
  email: string
  name: string
}

function Email({
  analisis = {
    id: '123123123',
    title: 'Analisis Non Emiten Terbaru Mantap!',
  },
  email = 'alvin@supercuansaham.id',
  name = 'Furqon Wilogo',
}: EmailProps) {
  const title = `Ada analisis terbaru!`

  const previewText = `Analisis terbaru siap untuk dibaca`

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
              <NewAnalisisNonEmitenBanner />
            </Container>

            <Text>Halo, {name} 👋🏼</Text>

            <Text>
              Kamu masih inget kan kalau kita menggunakan approach value investing? Karena itu, saya baru saja membuat
              analisis terbaru yang sudah bisa kamu baca.
            </Text>

            <Container
              style={{
                backgroundColor: '#D6D7CF',
                color: '#1F365F',
                ...cardStyle,
              }}
            >
              <Row>
                <TextReactEmail
                  style={{
                    color: '#1F365F',
                    fontSize: '20px',
                    lineHeight: '24px',
                    textAlign: 'center',
                  }}
                >
                  <Link href={parseUrl('web', `/analisis/non-emiten/${analisis.id}`).href}>{analisis.title}</Link>
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
