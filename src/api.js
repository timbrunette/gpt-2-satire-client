/**
 * The apis for hitting the gpt-2 generation
 */
const BASE_URL = "https://gpt-i3kazt6kva-an.a.run.app"
export const START_TOKEN = "<|startoftext|>"
export const END_TOKEN = "<|endoftext|>"
const sleep = m => new Promise(r => setTimeout(r, m))

export async function generateText(
  prefix,
  length = 100,
  temperature = 1.0,
  top_p = 0.9
) {
  let params = {
    prefix,
    temperature,
    top_p,
    length,
    truncate: false
  }

  const url = BASE_URL
  const options = {
    method: "POST",
    body: JSON.stringify(params)
  }
  try {
    const res = await fetch(url, options)
    console.log(res.status)
    switch (res.status) {
      case 200:
        let { text } = await res.json()
        // determine if there is more text that we could generate
        // if the end token exists in the text
        // we want to get rid of it!
        let hasMore = !text.includes(END_TOKEN)
        text = text.split(END_TOKEN)[0]

        const [title, content] = text
          .split("TITLE:")[1]
          .split("TEXT:")
          .map(str => str.trim())

        return {
          text,
          title,
          content,
          hasMore
        }
      default:
        await sleep(2000)
        return await generateText(prefix, length)
    }
  } catch (err) {
    await sleep(2000)
    return await generateText(prefix, length)
  }
}
