import { Preview, Html, Tailwind } from '@react-email/components'
import { Head, Body, LogoAudea, ContainerBody, Hr, Text, Link } from '@/email-component'

interface Props {
  name: string
}

const WelcomeNewUser = ({ name = 'Furqon Wilogo' }: Props) => {
  const title = `Welcome to Audea!`

  const previewText = `Hi ${name}, welcome to Audea!`

  return (
    <Html>
      <Head title={title} />

      <Preview>{previewText}</Preview>

      <Tailwind>
        <Body>
          <ContainerBody>
            <LogoAudea />

            <Hr />

            <Text>Hi, {name} 👋🏼</Text>

            <Text>Welcome to Audea!</Text>

            <Text>
              We've build Audea to be a useful little AI tools that can help you transfrom your messy thoughts that you
              record and transformed it into a more well-structured notes.
            </Text>

            <Hr />

            <Text>
              If you have any feedback, questions, or need help, just{' '}
              <Link href='https://join.slack.com/t/audeance/shared_invite/zt-208pmr6tg-Fle~ZGO9F4lxWaYPx28QdQ'>
                join our slack channel
              </Link>
              . We are there and we're ready to help!
            </Text>

            <Text>
              <b className='font-semibold'>— Audea Team</b>
            </Text>
          </ContainerBody>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default WelcomeNewUser
