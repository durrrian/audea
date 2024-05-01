import { Container, Preview, Html, Row, Tailwind, Text as TextReactEmail } from '@react-email/components'
import type { Courses } from '@repo/prisma/client'
import { parseUrl } from '@repo/helper'
import { cardStyle, centerContainer } from '../lib/style'
import { Head, Body, LogoSupercuan, ContainerBody, Hr, Text, Link, FooterText, Button } from '../components'
import { NewCourseBanner } from '../components/banner/new-course-banner'

interface EmailProps {
  course: Omit<Courses, 'createdAt' | 'videoLink' | 'markAs'>
  email: string
  name: string
}

function Email({
  course = {
    id: '123123123',
    title: 'Part 1',
    subtitle: 'Essence of Investing',
  },
  email = 'alvin@supercuansaham.id',
  name = 'Furqon Wilogo',
}: EmailProps) {
  const title = `Ada course terbaru Supercuan Saham!`

  const previewText = `Course terbaru Supercuan Saham sudah siap buat kamu tonton!`

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
              <NewCourseBanner />
            </Container>

            <Text>Halo, {name} 👋🏼</Text>

            <Text>Ada course terbaru nih dari Supercuan Saham!</Text>

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
                  <Link href={parseUrl('web', `/courses/${course.id}`).href}>
                    {course.title}: {course.subtitle}
                  </Link>
                </TextReactEmail>
              </Row>
            </Container>

            <Hr />

            <Text>Kamu juga bisa melihat seluruh course yang sudah saya buat di laman courses. Selamat nonton!</Text>

            <Button href={parseUrl('web', '/courses').href}>Kunjungi Laman Courses</Button>

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
