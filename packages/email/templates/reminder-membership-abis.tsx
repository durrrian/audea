import { Container, Preview, Html, Row, Column, Tailwind } from '@react-email/components'
import { formatDate, parseUrl } from '@repo/helper'
import { containerStart, containerEnd, cardStyle } from '../lib/style'
import { Head, Body, LogoSupercuan, ContainerBody, Hr, Text, FooterText, Button } from '../components'

interface EmailProps {
  email: string
  name: string
  date: string
}

function Email({
  email = 'alvin@supercuansaham.id',
  name = 'Furqon Wilogo',
  date = new Date().toISOString(),
}: EmailProps) {
  const datetime = new Date(date)

  const title = `Reminder masa membership`

  const previewText = `Waktu membership kamu sebentar lagi habis nih!`

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
              Email ini merupakan pemberitahuan bahwa masa membership kamu sebagai member Supercuan Saham akan habis
              dalam <b>7 hari kedepan</b>. Kamu akan kehilangan seluruh informasi portofolio Supercuan Saham jika sudah
              melewati tanggal di bawah ini:
            </Text>

            <Container style={cardStyle}>
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

            <Text>Kamu bisa memperpanjang masa waktu atau meng-upgrade membership kamu di Laman Membership.</Text>

            <Button href={parseUrl('web', '/settings/membership').href}>Kunjungi Laman Membership</Button>

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
