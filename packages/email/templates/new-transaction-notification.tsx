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
import type { StockTransaction } from '@repo/prisma/client'
import { formatDate, parseUrl, rupiah } from '@repo/helper'
import { centerContainer, tableHeaderText, renderTransactionType, tableItemsText, cardStyle } from '../lib/style'
import { Head, Body, LogoSupercuan, ContainerBody, Hr, Text, Link, FooterText, Button } from '../components'
import { NewTransactionBanner } from '../components/banner/new-transaction-banner'

interface EmailProps {
  email: string
  name: string
  transactions: (Omit<StockTransaction, 'emitenId' | 'id' | 'time'> & { kodeEmiten: string; time: string })[]
  currentCash: number
}

function Email({
  email = 'alvin@supercuansaham.id',
  name = 'Furqon Wilogo',
  transactions = [
    {
      type: 'BUY',
      time: new Date().toISOString(),
      kodeEmiten: 'BBCA',
      lot: 10,
      price: 8850,
    },
    {
      type: 'SELL',
      time: new Date().toISOString(),
      kodeEmiten: 'BMRI',
      lot: 10,
      price: 8850,
    },
  ],
  currentCash = 50_000_000,
}: EmailProps) {
  const title = `Ada transaksi emiten terbaru!`

  const previewText = `Ada ${transactions.length} Transaksi Baru Supercuan Saham`

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
              <NewTransactionBanner />
            </Container>

            <Text>Halo, {name} 👋🏼</Text>

            <Text>Hari ini ada transaksi di portofolio Supercuan Saham sebagai berikut:</Text>

            <Section style={cardStyle}>
              <Row>
                <Column align='center'>
                  <TextReactEmail style={tableHeaderText}>Tipe</TextReactEmail>
                </Column>

                <Column align='center'>
                  <TextReactEmail style={tableHeaderText}>Kode Emiten</TextReactEmail>
                </Column>

                <Column align='center'>
                  <TextReactEmail style={tableHeaderText}>Lot</TextReactEmail>
                </Column>

                <Column align='center'>
                  <TextReactEmail style={tableHeaderText}>Harga</TextReactEmail>
                </Column>

                <Column align='center'>
                  <TextReactEmail style={tableHeaderText}>Tgl Transaksi</TextReactEmail>
                </Column>
              </Row>

              <Row>
                <HrReactEmail style={{ borderColor: '#D6D7CF' }} />
              </Row>

              {transactions.map((v) => {
                const datetime = new Date(v.time)

                /**
                 * Hours + 7
                 * Weird Vercel behaviour
                 */
                // const hours = datetime.getHours()

                return (
                  <Row key={datetime.toISOString()}>
                    <Column align='center'>
                      <TextReactEmail
                        style={{
                          padding: '0.25rem 1rem',
                          borderRadius: '1.5rem',
                          width: 'fit-content',
                          ...renderTransactionType(v.type as 'BUY' | 'SELL'),
                        }}
                      >
                        {v.type[0]}
                        {v.type.slice(1, v.type.length).toLowerCase()}
                      </TextReactEmail>
                    </Column>

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
                      <TextReactEmail style={tableItemsText}>{v.lot}</TextReactEmail>
                    </Column>

                    <Column align='center'>
                      <TextReactEmail style={tableItemsText}>{v.price}</TextReactEmail>
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

            <Hr />

            <Text>Kamu bisa lihat transaksi ini dan transaksi saya yang lain melalui Laman Transaksi.</Text>

            <Button href={parseUrl('web', '/portofolio/transaksi').href}>Kunjungi Laman Transaksi</Button>

            <Hr />

            <Text>
              Kamu juga bisa lihat portofolio lengkap saya melalui{' '}
              <Link href={parseUrl('web', '/portofolio/all').href}>Laman Portofolio.</Link>
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
