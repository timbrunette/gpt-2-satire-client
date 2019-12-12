import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`
const Title = styled.h1`
  margin-bottom: 0;
`

const Header = ({ siteTitle }) => (
  <Wrapper>
    <Title>{siteTitle}</Title>
    <Typography variant='caption' align='center'>
      developed by <a href='https://timothybrunette.com'>Timothy Brunette</a>
    </Typography>
  </Wrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
