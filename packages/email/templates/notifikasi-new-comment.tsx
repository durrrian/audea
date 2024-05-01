import { Container, Preview, Html, Tailwind } from '@react-email/components'
import { cardStyle, centerContainer } from '../lib/style'
import { Head, Body, LogoSupercuan, ContainerBody, Hr, Text, FooterText } from '../components'

interface EmailProps {
  email: string
  name: string
  replyCommentEmail: string
  comment: string
}

function Email({
  email = 'alvin@supercuansaham.id',
  name = 'Furqon Wilogo',
  replyCommentEmail = 'supercuansaham@gmail.com',
  comment = 'Wah mantap banget reviewnya! Terima kasih sudah support Supercuan Saham!',
}: EmailProps) {
  const title = `Ada yang balas komen kamu!`

  const previewText = `Pssst, ${replyCommentEmail} membalas komen / review kamu di website Supercuan Saham!`

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

            <Text>Ada yang membalas komen atau review kamu di website Supercuan Saham!</Text>

            <Container style={cardStyle}>
              <Container style={centerContainer}>
                <Text>Balasan dari {replyCommentEmail}:</Text>

                <Text>{comment}</Text>
              </Container>
            </Container>

            <Hr />

            <FooterText email={email} />
          </ContainerBody>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default Email
