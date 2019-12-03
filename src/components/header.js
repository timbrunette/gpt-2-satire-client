import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Header = ({ siteTitle }) => (
  <header>
    <Wrapper>
      <h1>{siteTitle}</h1>
    </Wrapper>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
