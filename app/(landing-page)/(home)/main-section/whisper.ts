interface IWhisperResponse {
  text: string
}

export const whisper = async (file: File) => {
  try {
    const model = 'whisper-1'

    const formData = new FormData()
    formData.append('file', file)
    formData.append('model', model)

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_TOKEN}`,
        // 'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })

    const whisperData: IWhisperResponse = await response.json()

    return whisperData
  } catch (error) {
    console.error(error)
  }
}
