import React, { Component } from 'react'
import styled from 'styled-components'
import 'antd/dist/antd.css'
import './style/App.css'
import './style/Antd.css'
import Brand from './component/Brand'
import { Layout } from 'antd'

function importAll(r) {
  return r.keys().map(r)
}

const imagesImport = importAll(
  require.context('./assets/manga/', false, /\.(png|jpe?g|svg)$/)
)

const { Header, Footer, Sider, Content } = Layout

const imageAmount = imagesImport.length + 1
const imageWidth = 540

const Canvas = styled.div`
  flex-grow: 1;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
  div._container {
    height: 100%;
    width: ${imageAmount * imageWidth}px;
    span._lefter {
      width: 500px;
      display: inline-block;
    }
    img {
      height: 98%;
      opacity: 0.35;
      margin-right: 4px;
      cursor: pointer;
      transition: 0.35s;
      &._active {
        opacity: 1;
        box-shadow: 0 0 5px grey;
      }
    }
  }
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0
    }
    this.handleActive = this.handleActive.bind(this)
  }
  componentDidMount() {}
  handleActive(pointer) {
    this.setState({
      active: pointer
    })
  }
  render() {
    return (
      <div className="App">
        <Layout>
          <Header>
            <Brand />
          </Header>
          <Layout>
            {/* <Sider>
              <Sample />
            </Sider> */}
            <Content>
              <Canvas>
                <div className="_container">
                  <span className="_lefter" />
                  {imagesImport.map((img, index) => (
                    <img
                      className={this.state.active === index && '_active'}
                      onMouseOver={() => this.handleActive(index)}
                      src={img}
                      alt=""
                    />
                  ))}
                </div>
              </Canvas>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default App
