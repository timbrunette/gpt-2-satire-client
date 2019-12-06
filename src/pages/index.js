import React, { useState } from "react"
import styled from "styled-components"
import TextareaAutosize from "react-autosize-textarea"
import {
  Button,
  Typography,
  CircularProgress,
  Divider
} from "@material-ui/core"
import Header from "../components/header"

import { generateText, START_TOKEN } from "../api"

const Main = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-bottom: 1rem;
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

const LoadingMoreWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const Article = styled.div``

const ButtonWrapper = styled.div`
  && {
    position: relative;
    min-height: 1rem;
    margin: 0 auto;
    margin-top: 1rem;
  }
`

const ButtonProgress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
`

const IndexPage = () => {
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const handleSubmit = async () => {
    let length = 320
    let text = null
    let hasMore = true
    while (hasMore && length < 1023) {
      setIsGenerating(true)
      let prefix = text || `${START_TOKEN}\nTITLE:${title}`
      const output = await generateText(prefix, length)

      setContent(output.content)
      setTitle(output.title)
      hasMore = output.hasMore
      text = output.text
      length += 150
    }
    setIsGenerating(false)
    setIsFinished(true)
  }

  const handleReset = () => {
    setContent("")
    setTitle("")
    setIsGenerating(false)
    setIsFinished(false)
  }

  return (
    <Main>
      <Header siteTitle='GPT-2 Satire' />
      <TitleWrapper>
        <StyledTextArea
          rows='2'
          autoFocus
          disabled={isGenerating || isFinished}
          value={title}
          placeholder='Enter a title for your satirical article or leave this blank to autogenerate'
          onChange={e => setTitle(e.target.value.replace(/\r?\n|\r/g, ""))}
        />
        {content === "" && !isFinished && (
          <ButtonWrapper>
            <Button
              variant='outlined'
              color='primary'
              onClick={handleSubmit}
              disabled={isGenerating}
            >
              {"Generate Article"}
            </Button>
            {isGenerating && <ButtonProgress size={24} />}
          </ButtonWrapper>
        )}
      </TitleWrapper>
      <Article>
        {content !== "" &&
          content.split("\n").map((item, index) => (
            <Typography variant='body1' key={index} paragraph>
              {item}
            </Typography>
          ))}
      </Article>
      {content !== "" && isGenerating && !isFinished && (
        <LoadingMoreWrapper>
          <CircularProgress size={24} />
          <Typography variant='caption'>
            Generating the rest of the article
          </Typography>
        </LoadingMoreWrapper>
      )}
      {isFinished && (
        <>
          <Divider />
          <LoadingMoreWrapper>
            <Button variant='outlined' onClick={handleReset}>
              Generate Another
            </Button>
          </LoadingMoreWrapper>
        </>
      )}
    </Main>
  )
}
export default IndexPage
