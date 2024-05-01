import {
  Container,
  Preview,
  Html,
  Row,
  Column,
  Tailwind,
  Section,
  Text as TextReactEmail,
  Hr as HrReactEmail,
  Img,
} from '@react-email/components'
import type { StockDivident } from '@repo/prisma/client'
import { formatDate, parseUrl, rupiah } from '@repo/helper'
import { cardStyle, centerContainer, tableHeaderText, tableItemsText } from '../lib/style'
import { Head, Body, LogoSupercuan, ContainerBody, Hr, Text, Link, FooterText, Button } from '../components'
import { NewDividentBanner } from '../components/banner/new-divident-banner'

interface EmailProps {
  email: string
  name: string
  divident: (Omit<StockDivident, 'id' | 'emitenId' | 'time'> & { kodeEmiten: string; shares: number; time: string })[]
  currentCash: number
}

function Email({
  email = 'alvin@supercuansaham.id',
  name = 'Furqon Wilogo',
  divident = [
    {
      time: new Date().toISOString(),
      kodeEmiten: 'BBCA',
      dps: 100,
      shares: 8000,
    },
    {
      time: new Date().toISOString(),
      kodeEmiten: 'BMRI',
      dps: 100,
      shares: 8000,
    },
  ],
  currentCash = 50_000_000,
}: EmailProps) {
  const title = `Notifikasi dividen`

  const previewText = `Ada ${divident.length} Emiten yang bagi-bagi dividen hari ini.`

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
              <NewDividentBanner />
            </Container>

            <Text>Halo, {name} 👋🏼</Text>

            <Text>Hari ini ada emiten yang bagi-bagi dividen yang ada di portofolio Supercuan Saham:</Text>

            <Section style={cardStyle}>
              <Row>
                <Column align='center'>
                  <TextReactEmail style={tableHeaderText}>Kode Emiten</TextReactEmail>
                </Column>

                <Column align='center'>
                  <TextReactEmail style={tableHeaderText}>DPS*</TextReactEmail>
                </Column>

                <Column align='center'>
                  <TextReactEmail style={tableHeaderText}>Divident Supercuan</TextReactEmail>
                </Column>

                <Column align='center'>
                  <TextReactEmail style={tableHeaderText}>Tgl Divident</TextReactEmail>
                </Column>
              </Row>

              <Row>
                <HrReactEmail style={{ borderColor: '#D6D7CF' }} />
              </Row>

              {divident.map((v) => {
                const datetime = new Date(v.time)

                return (
                  <Row key={datetime.toISOString()}>
                    <Column align='center'>
                      <Column align='right'>
                        <Img
                          src={`https://assets.stockbit.com/logos/companies/${v.kodeEmiten}.png`}
                          alt={`${v.kodeEmiten} logo`}
                          width='25'
                          height='25'
                          style={{ marginRight: '12px' }}
                        />
                      </Column>

                      <Column align='left'>
                        <TextReactEmail
                          style={{
                            color: '#1F365F',
                            fontSize: '16px',
                            fontWeight: 600,
                            textAlign: 'left',
                          }}
                        >
                          {v.kodeEmiten}
                        </TextReactEmail>
                      </Column>
                    </Column>

                    <Column align='center'>
                      <TextReactEmail style={tableItemsText}>{v.dps}</TextReactEmail>
                    </Column>

                    <Column align='center'>
                      <TextReactEmail style={tableItemsText}>{rupiah(v.dps * v.shares)}</TextReactEmail>
                    </Column>

                    <Column align='center'>
                      <TextReactEmail style={tableItemsText}>{formatDate(datetime, 'short')}</TextReactEmail>
                    </Column>
                  </Row>
                )
              })}
            </Section>

            <Container style={centerContainer}>
              <Text>
                Current Cash Supercuan Saham: <b>{rupiah(currentCash)}</b>
              </Text>
            </Container>

            <Text>DPS: Divident Per Share</Text>

            <Hr />

            <Text>
              Kamu bisa lihat transaksi dividen ini dan transaksi dividen saya yang lain melalui Laman Dividen.
            </Text>

            <Button href={parseUrl('web', '/portofolio/dividen').href}>Kunjungi Laman Dividen</Button>

            <Hr />

            <Text>
              Kamu juga bisa lihat portofolio lengkap saya melalui{' '}
              <Link href={parseUrl('web', '/portofolio/all').href}>Laman Portofolio.</Link>{' '}
            </Text>

            <Text>Selamat berinvestasi!</Text>

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
