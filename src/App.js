import React, { Component } from 'react'
import 'antd/dist/antd.css'
import './style/App.css'
import './style/Antd.css'
import Brand from './component/Brand'
import { Layout } from 'antd'
import { URL, DEFAULT_MANGA, MANGA_LISTS } from './_assets/static'
import { fetchManga, setLoadingState } from './_methods/fetch'
import { matchManga } from './_methods/matchManga'
import { Canvas } from './_styling/Canvas'
const { Header, Footer, Sider, Content } = Layout
//
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pages: [],
      active: 0,
      loaded: false,
      query: DEFAULT_MANGA
    }
    this.handleActive = this.handleActive.bind(this)
    this.changeTitle = this.changeTitle.bind(this)
    this.changeChapter = this.changeChapter.bind(this)
    this.nextChapter = this.nextChapter.bind(this)
    this.searchManga = this.searchManga.bind(this)
  }
  componentDidMount() {
    const { query } = this.state
    fetchManga(URL, query, this)
  }
  searchManga() {
    const { query } = this.state
    setLoadingState(this, query)
    fetchManga(URL, query, this)
  }
  handleActive(pointer) {
    this.setState({
      ...this.state,
      ...{ active: pointer }
    })
  }
  nextChapter() {
    const { query } = this.state
    const nextChapterQuery = {
      ...query,
      ...{ chapter: Number(query.chapter) + 1 }
    }
    setLoadingState(this, nextChapterQuery)
    fetchManga(URL, nextChapterQuery, this)
  }
  changeTitle(e) {
    const { value } = e.target
    this.setState({
      ...this.state,
      ...{
        query: {
          ...this.state.query,
          ...{
            title: value,
            chapter: matchManga(MANGA_LISTS, value)
          }
        }
      }
    })
  }
  changeChapter(e) {
    this.setState({
      ...this.state,
      ...{
        query: {
          ...this.state.query,
          ...{ chapter: e.target.value }
        }
      }
    })
  }
  render() {
    const { query, loaded, pages, active } = this.state
    return (
      <div className="App">
        <Layout>
          <Header>
            <Brand />
          </Header>
          <Layout>
            <Content>
              <Canvas>
                <div className="_container">
                  <span className="_lefter">
                    <select
                      value={query.title}
                      onChange={e => this.changeTitle(e)}
                    >
                      {MANGA_LISTS.map(({ val, title }) => (
                        <option value={val}>{title}</option>
                      ))}
                    </select>
                    <br />
                    <input
                      name="chapter"
                      type="text"
                      value={query.chapter}
                      onChange={e => this.changeChapter(e)}
                    />
                    <br />
                    <a onClick={() => this.searchManga()}>Search</a>
                    <br />
                    <a onClick={() => this.nextChapter()}>Next Chapter</a>
                    <br />
                  </span>
                  {loaded ? (
                    pages.map((page, index) => (
                      <img
                        className={active === index && '_active'}
                        onMouseOver={() => this.handleActive(index)}
                        src={page.src}
                        key={index}
                        alt=""
                      />
                    ))
                  ) : (
                    <span>Loading ....</span>
                  )}
                  <a onClick={() => this.nextChapter()}>Next Chapter</a>
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
