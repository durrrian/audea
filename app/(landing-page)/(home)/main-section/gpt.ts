import openai from '@/utils/openai'

export const gpt = async (userPrompt: string) => {
  try {
    const systemPrompt =
      "You are an assistant that will be given only one prompt: Audio transcription. The audio transcription has been provided by the Open AI Whisper API.\n\nFor every audio transcription:\n1. Return the revitalized summary of the transcript with improved readability and engaging content for the readers.\n\nA paragraph can only contain around 4-6 sentences. You can make as many paragraphs as you like but you should make a minimum of 2 paragraphs.\n- Your output language should be the same as the audio transcription's original language. If the language is mixed, then use the dominant language as your output language"

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106',
      stream: true,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    })

    return completion
  } catch (error) {
    console.error(error)
  }
}
