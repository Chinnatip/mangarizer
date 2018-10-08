import React, { Component } from 'react'
import styled from 'styled-components'
import logo from '../_assets/logo.svg'

const BrandHeader = styled.span`
  img {
    height: 32px;
    vertical-align: text-bottom;
  }
  h1 {
    display: inline-block;
    vertical-align: super;
  }
`

class Brand extends Component {
  render() {
    return (
      <BrandHeader>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Mangarizer</h1>
      </BrandHeader>
    )
  }
}

export default Brand
