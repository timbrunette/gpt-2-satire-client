/**
 * The apis for hitting the gpt-2 generation
 */
const BASE_URL = "https://gpt-i3kazt6kva-an.a.run.app"

export async function generateText(title) {
  let prefix = "<|startoftext|>\nTITLE:" + title
  let params = {
    prefix,
    temperature: 0.8,
    length: 100
  }
  let response = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(params)
  })

  return await response.json()
}

export async function generateMoreText(prefix) {}
