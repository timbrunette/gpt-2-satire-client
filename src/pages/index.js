import React, { useState, useEffect } from "react"
import styled from "styled-components"
import TextareaAutosize from "react-autosize-textarea"

import Header from "../components/header"

import { generateText } from "../api"

const Main = styled.div`
  width: 50%;
  margin: 0 auto;
`

const StyledTextArea = styled(TextareaAutosize)`
  font-size: 2rem;
  width: 100%;
  border: none;
  resize: none;
  &:disabled {
    background: none;
    color: black;
  }
`
const TitleWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
`

const Article = styled.div``

const SubmitButton = styled.button`
  width: max-content;
  height: 2rem;
  margin: 0 auto;
  margin-top: 1rem;
`

const IndexPage = () => {
  const [outputText, setOutputText] = useState("")
  const [inputTitle, setInputTitle] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async () => {
    let formattedInputTitle = inputTitle.replace(/\r?\n|\r/g, "")
    setInputTitle(formattedInputTitle)
    setIsGenerating(true)
    const { text } = await generateText(formattedInputTitle)
    // want to split the text into title and text
    const [outputTitle, outputText] = text
      .split("TITLE:")[1]
      .split("TEXT:")
      .map(str => str.trim())

    // map the \n to <br />
    console.log("Response text:")
    console.log(text)
    setOutputText(outputText)
    setInputTitle(outputTitle)
  }

  return (
    <Main>
      <Header siteTitle='GPT-2 Satire' />
      <TitleWrapper>
        <StyledTextArea
          rows='2'
          autoFocus
          disabled={isGenerating}
          value={inputTitle}
          placeholder='Enter a title for your satirical article or leave this blank to autogenerate'
          onChange={e => setInputTitle(e.target.value.replace(/\r?\n|\r/g, ""))}
        />
        {outputText === "" && (
          <SubmitButton onClick={handleSubmit} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate Text"}
          </SubmitButton>
        )}
      </TitleWrapper>
      <Article>
        {outputText.split("\n").map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </Article>
    </Main>
  )
}
export default IndexPage
