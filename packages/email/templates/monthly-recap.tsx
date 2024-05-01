import {
  Container,
  Preview,
  Html,
  Row,
  Column,
  Tailwind,
  Section,
  Text as TextReactEmail,
} from '@react-email/components'
import { rupiah, formatDate, parseUrl } from '@repo/helper'
import type { ReturnVsIndex } from '@repo/prisma/client'
import { centerContainer } from '../lib/style'
import { Head, Body, LogoSupercuan, ContainerBody, Hr, Text, Link, FooterText, Button } from '../components'
import { MonthlyRecapBanner } from '../components/banner/monthly-recap-banner'

interface EmailProps extends Omit<ReturnVsIndex, 'period' | 'startPeriod' | 'id' | 'endPeriod'> {
  email: string
  name: string
  cash: number
  endPeriod: string
}

function Email({
  email = 'alvin@supercuansaham.id',
  name = 'Furqon Wilogo',
  endPeriod = new Date().toISOString(),
  cash = 1_000_000,
  supercuan = 5.67,
  ihsg = -0.25,
  lq45 = -3.09,
}: EmailProps) {
  const title = `Laporan bulanan Supercuan Saham!`

  const previewText = `Ada laporan bulanan yang sudah siap kamu lihat`

  const date = new Date(endPeriod)

  date.setFullYear(date.getFullYear(), date.getMonth() + 1, 0)

  // Sample data for the bar chart
  const data = [supercuan, ihsg, lq45]
  const dataName = ['Supercuan', 'IHSG', 'LQ45']

  // Scale the chart between -10 and 10
  // const minValue = -10
  const maxValue = (() => {
    if (supercuan > ihsg && supercuan > lq45) {
      return supercuan + 2
    }

    if (ihsg > supercuan && ihsg > lq45) {
      return ihsg + 2
    }

    return lq45 + 2
  })()

  // Calculate the width of each bar and spacing
  const barWidth = 150
  const barSpacing = 30
  const chartWidth = data.length * (barWidth + barSpacing)
  const chartHeight = 200
  const baseline = chartHeight / 2 // Y-coordinate for the baseline

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
              <MonthlyRecapBanner />
            </Container>

            <Text>Halo, {name} 👋🏼</Text>

            <Text>Hari ini adalah jadwal saya mengirimkan laporan bulanan dari data investasi Supercuan Saham.</Text>

            <Text>Di bawah ini adalah metrics penting yang perlu kamu ketahui:</Text>

            <Container style={centerContainer}>
              <Container style={{ border: '2px solid #1F365F', padding: '5px 15px', borderRadius: '0.5rem' }}>
                <Container>
                  <TextReactEmail
                    style={{ color: '#1F365F', fontSize: '20px', lineHeight: '20px', textAlign: 'center' }}
                  >
                    Monthly return
                  </TextReactEmail>
                  <TextReactEmail
                    style={{ color: '#1F365F', fontSize: '12px', lineHeight: '12px', textAlign: 'center' }}
                  >
                    Periode: 1 - {formatDate(date, 'short')}
                  </TextReactEmail>
                </Container>

                <Section align='center'>
                  <Row align='center'>
                    <Column align='center' style={{ width: '50%' }}>
                      <TextReactEmail
                        style={{
                          color: supercuan >= 0 ? '#15803c' : '#b91c1c',
                          fontSize: '35px',
                          lineHeight: '35px',
                        }}
                      >
                        {(() => {
                          if (supercuan >= 0) {
                            return (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='#15803c'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='lucide lucide-chevron-up'
                              >
                                <path d='m18 15-6-6-6 6' />
                              </svg>
                            )
                          }

                          return (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='#b91c1c'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='lucide lucide-chevron-down'
                            >
                              <path d='m6 9 6 6 6-6' />
                            </svg>
                          )
                        })()}
                        {supercuan}%
                      </TextReactEmail>
                    </Column>
                  </Row>
                </Section>

                <Container style={{ color: '#1F365F', fontSize: '20px', lineHeight: '20px', textAlign: 'center' }}>
                  <Text>Cash by the end of the month: {rupiah(cash)}</Text>
                </Container>
              </Container>
            </Container>

            <Container style={{ ...centerContainer, marginTop: '30px' }}>
              <Container style={{ border: '2px solid #1F365F', padding: '5px 15px', borderRadius: '0.5rem' }}>
                <TextReactEmail style={{ color: '#1F365F', fontSize: '20px', lineHeight: '20px', textAlign: 'center' }}>
                  Supercuan Saham vs IHSG vs LQ45
                </TextReactEmail>

                <svg width={chartWidth} height={chartHeight}>
                  {/* Reference line at 0 */}
                  <line x1={0} y1={baseline} x2={chartWidth} y2={baseline} stroke='black' />

                  {/* Bars and text labels */}
                  {data.map((value, index) => {
                    const x = index * (barWidth + barSpacing)
                    const y = value >= 0 ? baseline - (value / maxValue) * baseline : baseline // Scale the y-coordinate
                    const height = (Math.abs(value) / maxValue) * baseline // Scale the height
                    const fillColor = value >= 0 ? '#15803c' : '#b91c1c'

                    const labelY = value >= 0 ? baseline - height - 5 : baseline + height + 15

                    return (
                      <g key={value}>
                        {/* Bar */}
                        <rect x={x} y={y} width={barWidth} height={height} fill={fillColor} />

                        {/* Text label below or above the bar */}
                        <text x={x + barWidth / 2} y={labelY} textAnchor='middle' fill='#1F365F'>
                          {dataName[index]}: {value}%
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </Container>

              <TextReactEmail style={{ fontSize: '8px' }}>
                Apabila grafik diatas tidak muncul, silahkan membuka emailnya melalui email client yang lain. Atau, kamu
                bisa pergi ke Laman Metrics.
              </TextReactEmail>
            </Container>

            <Hr />

            <Text>Kamu bisa lihat seluruh metrics yang lain melalui Laman Metrics.</Text>

            <Button href={parseUrl('web', '/portofolio/metrics').href}>Kunjungi Laman Metrics</Button>

            <Hr />

            <Text>
              Kamu juga bisa lihat portofolio lengkap saya per bulan ini melalui{' '}
              <Link href={parseUrl('web', '/portofolio/all').href}>Laman Portofolio.</Link>{' '}
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
