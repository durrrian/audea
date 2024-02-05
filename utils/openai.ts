import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_TOKEN as string, dangerouslyAllowBrowser: true })

export default openai
