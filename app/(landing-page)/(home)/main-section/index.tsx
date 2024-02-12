'use client'

import { useEffect, useRef, useState } from 'react'
import DemoDialog from './demo-dialog'
import Arrow from './arrow'
import RecordingButton from './recording-button'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js'
import WaveSurfer from 'wavesurfer.js'
import { Square } from 'lucide-react'
import { motion } from 'framer-motion'
import cn from '@/utils/cn'
import { Heading } from '../lib/heading'
import { SubHeading } from '../lib/sub-heading'
import { Button, LottieAnimation } from '@/components'
import { toast } from 'sonner'
import { whisper } from './whisper'
import { gpt } from './gpt'
import { LoadingAnimation } from '@/lib/loading-animation'

export default function MainSection() {
  const [showDemo, setShowDemo] = useState(false)

  const [startProgress, setStartProgress] = useState(false)

  const [currentProgress, setCurrentProgress] = useState<
    'initial' | 'talking' | 'processing-audio' | 'display-result' | 'error'
  >('initial')

  const [remainingTime, setRemainingTime] = useState(0)

  const [progressName, setProgressName] = useState('')

  const [displayResult, setDisplayResult] = useState('')
  const [displayTranscription, setDisplayTranscription] = useState('')

  const waveformRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const recordRef = useRef<RecordPlugin | null>(null)

  const streamRef = useRef<MediaStream | null>(null)

  const mediaRecorder = useRef<MediaRecorder | null>(null)

  const recordingTimer = useRef<number | null>(null)

  const getMicrophonePermission = async () => {
    //@ts-ignore
    if (MediaRecorder.notSupported) {
      toast.error('The MediaRecorder API is not supported in your browser.')
      return
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })
      return mediaStream
    } catch (err) {
      toast.error('You denied permission to use the microphone.')
      throw new Error(err as any)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop()
    }

    if (recordRef.current) {
      recordRef.current.stopRecording()
    }

    setRemainingTime(0)
  }

  const startRecording = () => {
    setRemainingTime(180) // 3 minutes in seconds

    if (streamRef.current) {
      mediaRecorder.current = new MediaRecorder(streamRef.current)

      mediaRecorder.current.addEventListener('dataavailable', async (e) => {
        const audioChunks: Blob[] = []
        audioChunks.push(e.data)

        const file = new File(audioChunks, 'audio.mpeg', {
          type: 'audio/mpeg',
        })

        runAudea(file)
      })

      mediaRecorder.current.start()

      recordingTimer.current = window.setInterval(() => {
        setRemainingTime((prevRemainingTime) => {
          if (prevRemainingTime <= 1) {
            clearInterval(recordingTimer.current!)
            stopRecording()
            return 0
          }
          return prevRemainingTime - 1
        })
      }, 1000)
    }
  }

  useEffect(() => {
    if (startProgress && waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgb(59, 130, 246)',
      })

      const recordPlugin = wavesurfer.registerPlugin(RecordPlugin.create())

      wavesurferRef.current = wavesurfer
      recordRef.current = recordPlugin

      return () => {
        wavesurfer.destroy()
        wavesurferRef.current = null
        recordRef.current = null
      }
    }
  }, [startProgress])

  const runAudea = async (file: File) => {
    try {
      setProgressName('Transcribing your audio...')

      const whisperResponse = await whisper(file)

      if (!whisperResponse) throw new Error('Whisper response is undefined')

      setDisplayTranscription(whisperResponse.text)

      setProgressName('Transcription is being analysed by AI...')

      const userPrompt = `Audio transcription:\n${whisperResponse.text}`

      const gptResponse = await gpt(userPrompt)

      if (!gptResponse) throw new Error('GPT response is undefined')

      setCurrentProgress('display-result')

      for await (const chunk of gptResponse) {
        const text = chunk.choices[0].delta.content

        if (text) {
          await new Promise((resolve) => setTimeout(resolve, 100))

          setDisplayResult((prev) => prev + text)
        }
      }
    } catch (error) {
      setCurrentProgress('error')
      console.error(error)
    }
  }

  return (
    <section className='mx-auto flex min-h-[82vh] max-w-[1300px] flex-col items-center justify-center gap-4 px-4 pt-6 text-center'>
      {(() => {
        if (currentProgress === 'initial') {
          return (
            <>
              <header className='flex flex-col gap-6'>
                <Heading as='h1'>Make a structured notes from your messy voice</Heading>
                <SubHeading>
                  Give it a shot by tapping the record button and start speaking. Audea will do its magic once
                  you&apos;re done.
                </SubHeading>
              </header>

              <Button variant='ghost' onClick={() => setShowDemo(true)}>
                See Audea demo
              </Button>

              <Arrow />

              <DemoDialog open={showDemo} setOpen={setShowDemo} />

              <RecordingButton
                onClick={() => {
                  setStartProgress(true)

                  setCurrentProgress('talking')

                  toast.promise(getMicrophonePermission(), {
                    loading: 'Getting your microphone ready...',
                    error: () => {
                      setCurrentProgress('initial')

                      return 'Microphone is not ready!'
                    },
                    success: (data) => {
                      streamRef.current = data as MediaStream

                      const wavesurfer = wavesurferRef.current
                      const recordPlugin = recordRef.current

                      if (!wavesurfer || !recordPlugin) return

                      const isPlaying = wavesurfer.isPlaying()

                      if (isPlaying) {
                        wavesurfer.pause()
                      }

                      recordPlugin
                        .startRecording()
                        .then(() => {
                          startRecording()
                        })
                        .catch((error) => {
                          console.error('Recording error:', error)
                        })

                      return 'Microphone is ready!'
                    },
                  })
                }}
              />
            </>
          )
        }

        if (currentProgress === 'talking') {
          return (
            <>
              <motion.section
                className='from-landingPage-linierGray to-landingPage-linierEndGray dark:from-landingPage-linierGray dark:to-landingPage-linierEndGray flex h-full max-h-[400px] min-h-[400px] w-full max-w-[1000px] flex-col items-center justify-center gap-12 rounded-2xl bg-gradient-to-br px-2 py-4 shadow-inner'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div ref={waveformRef} className='h-fit w-full' />

                <p className='font-base text-lg'>
                  Your recording is in session! Remaining time{' '}
                  <span className='text-red-500'>
                    {Math.floor(remainingTime / 60)}:
                    {remainingTime % 60 < 10 && remainingTime % 60 !== 0
                      ? `0${remainingTime % 60}`
                      : remainingTime % 60}
                    {remainingTime % 60 === 0 ? '0' : ''}
                  </span>
                </p>
              </motion.section>

              <motion.button
                onClick={() => {
                  stopRecording()
                  setCurrentProgress('processing-audio')
                }}
                type='button'
                className='h-fit w-fit rounded-full bg-red-500 p-4 text-white'
                whileHover={{ scale: 1.1 }}
              >
                <Square className='h-10 w-10' />
              </motion.button>
            </>
          )
        }

        if (currentProgress === 'processing-audio') {
          return (
            <motion.section
              className='from-landingPage-linierGray to-landingPage-linierEndGray dark:from-landingPage-linierGray dark:to-landingPage-linierEndGray flex h-full max-h-[400px] min-h-[400px] w-full max-w-[1000px] flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br px-2 py-4 shadow-inner'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <LoadingAnimation />

              <p className='font-medium'>{progressName}</p>
            </motion.section>
          )
        }

        if (currentProgress === 'display-result') {
          return (
            <motion.section
              className='from-landingPage-linierGray to-landingPage-linierEndGray dark:from-landingPage-linierGray dark:to-landingPage-linierEndGray mb-10 flex h-fit w-full max-w-[1000px] flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br shadow-inner'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <section className='flex h-fit w-full flex-col gap-0 p-4 text-justify md:p-8'>
                <p className='underline'>Audea&apos;s result:</p>
                <p>{displayResult}</p>
              </section>

              <div className='from-landingPage-audeaBlue via-landingPage-textSurfaceVariant to-landingPage-audeaBlue dark:from-landingPage-audeaBlue dark:via-landingPage-textSurfaceVariant dark:to-landingPage-audeaBlue h-[2px] w-full bg-gradient-to-r' />

              <section className='flex h-fit w-full flex-col gap-0 p-4 text-justify md:p-8'>
                <p className='underline'>Your transcription:</p>
                <p>{displayTranscription}</p>
              </section>

              <div className='from-landingPage-audeaBlue via-landingPage-textSurfaceVariant to-landingPage-audeaBlue dark:from-landingPage-audeaBlue dark:via-landingPage-textSurfaceVariant dark:to-landingPage-audeaBlue h-[2px] w-full bg-gradient-to-r' />

              <section className='flex h-fit w-full flex-col items-center justify-center gap-2 p-4 text-center text-xl font-medium md:p-8'>
                <p>Do you like it? Sign up and create unlimited notes.</p>

                <a href='https://app.audea.id/signup' className='block h-fit w-fit' target='_blank'>
                  <Button tabIndex={-1} className={cn('flex items-center justify-center gap-2')}>
                    <div className='h-fit w-fit overflow-hidden rounded-sm'>
                      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M0 0H24V24H0V0Z' fill='#2C5EA8' />
                        <path
                          d='M10.0568 13.6746H13.9839L12.062 7.68027H12.0207L10.0568 13.6746ZM9.82947 6.17104C10.1814 5.22043 10.9874 4.45581 12.0413 4.45581C13.1366 4.45581 13.9019 5.1791 14.2525 6.17104L18.3043 17.415C18.4276 17.7456 18.4696 18.0356 18.4696 18.1803C18.4696 18.9862 17.8076 19.5442 17.0437 19.5442C16.1751 19.5442 15.7411 19.0896 15.5344 18.4696L14.9145 16.5264H9.16818L8.54822 18.4489C8.34157 19.0896 7.90693 19.5442 7.05965 19.5442C6.23303 19.5442 5.53041 18.9242 5.53041 18.0976C5.53041 17.767 5.63374 17.519 5.67507 17.415L9.82947 6.17104Z'
                          fill='white'
                        />
                      </svg>
                    </div>
                    <span className='block'>Sign up</span>
                  </Button>
                </a>
              </section>
            </motion.section>
          )
        }

        return (
          <motion.section
            className='from-landingPage-linierGray to-landingPage-linierEndGray dark:from-landingPage-linierGray dark:to-landingPage-linierEndGray flex h-full max-h-[400px] min-h-[400px] w-full max-w-[1000px] flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br px-2 py-4 shadow-inner'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <LottieAnimation
              animationConfig={{
                path: 'https://assets5.lottiefiles.com/packages/lf20_qpwbiyxf.json',
                loop: false,
                autoplay: true,
              }}
              className='h-fit w-72'
            />

            <p className='font-medium'>Unexpected error...</p>

            <Button
              onClick={() => {
                setCurrentProgress('initial')
                setStartProgress(false)
              }}
            >
              Try again
            </Button>
          </motion.section>
        )
      })()}
    </section>
  )
}
