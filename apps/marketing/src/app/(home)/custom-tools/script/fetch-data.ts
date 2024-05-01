export async function fetchData(url: string, params: URLSearchParams): Promise<string> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'insomnia/8.4.2',
      },
      body: params,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const htmlText = await response.text()

    return htmlText
  } catch (error) {
    console.error(error)
    throw error
  }
}
