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

  const title = `Masa membership sudah habis 😞`

  const previewText = `Pemberitahuan berakhirnya membership Supercuan Saham`

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
              Email ini merupakan pemberitahuan bahwa masa membership kamu sebagai member Supercuan Saham sudah{' '}
              <b>habis</b>. Kamu kehilangan kesempatan mendapat seluruh informasi portofolio Supercuan Saham 😞
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

            <Text>
              Tapi tenang aja. Kamu tetap bisa menjadi membership Supercuan Saham dengan membeli pilihan paket
              membership yang tersedia.
            </Text>

            <Button href={parseUrl('web', '/settings/membership').href}>Kembali Jadi Member Supercuan Saham</Button>

            <Text>
              Aku penasaran, apa yang membuatmu berhenti jadi member Supercuan Saham? Jangan ragu untuk cerita dan
              berikan feedback dengan reply aja email ini ya!
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
