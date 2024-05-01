export const TELEGRAM_LINK = 'https://t.me/+b1YJuSgvf4dhMzE1'

export const TELEGRAM_CHAT_ID = -1001851772557

type TelegramParams = Record<string, string>

export class Telegram {
  private base = 'https://api.telegram.org'
  private botToken = process.env.TELEGRAM_BOT_TOKEN!
  private supercuanChatId = TELEGRAM_CHAT_ID
  private userId: string

  /**
   * @param user_id Telegram User ID of the user
   */
  constructor(user_id: string) {
    this.userId = user_id
  }

  private async request(endpoint: string, params: TelegramParams) {
    const url = new URL(`/bot${this.botToken}/${endpoint}`, this.base)

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, String(value))
      }
    })

    try {
      const response = await fetch(url.href, { method: 'GET' })

      if (!response.ok) {
        throw new Error('Failed to fetch')
      }

      return await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async banChatMember() {
    return this.request('banChatMember', { chat_id: this.supercuanChatId.toString(), user_id: this.userId })
  }

  async unbanChatMember() {
    return this.request('unbanChatMember', { chat_id: this.supercuanChatId.toString(), user_id: this.userId })
  }

  async sendMessage(text: string) {
    return this.request('sendMessage', { chat_id: this.userId, text })
  }
}
