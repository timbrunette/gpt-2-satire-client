/**
 * The apis for hitting the gpt-2 generation
 */
const BASE_URL = "https://gpt-i3kazt6kva-an.a.run.app"
export const START_TOKEN = "<|startoftext|>"
export const END_TOKEN = "<|endoftext|>"

export async function generateText(prefix, length = 100) {
  let params = {
    prefix,
    temperature: 0.8,
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
      case 500:
        // waiting 2 seconds before trying again
        console.log("Server 500 Error when generating the text")
        return await generateText(prefix, length)
      default:
        console.log("Unknown server error")
        return await generateText(prefix, length)
    }
  } catch (err) {
    console.log(err)
    return await generateText(prefix, length)
  }
}
