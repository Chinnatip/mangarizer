import React, { Component } from 'react'
import 'antd/dist/antd.css'
import './style/App.css'
import './style/Antd.css'
import Brand from './component/Brand'
import { Layout, Input, AutoComplete, Button, Icon } from 'antd'
import { URL, DEFAULT_MANGA, MANGA_LISTS } from './_assets/static'
import { fetchManga, setLoadingState } from './_methods/fetch'
import {
  matchChapter,
  matchMangaTag,
  matchMangaTitle
} from './_methods/matchManga'
import { Canvas } from './_styling/Canvas'
const { Header, Content } = Layout
//
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pages: [],
      active: 0,
      loaded: false,
      query: JSON.parse(localStorage.getItem('default_manga')) || DEFAULT_MANGA
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
    localStorage.setItem('default_manga', JSON.stringify(query))
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
  changeTitle(value) {
    this.setState({
      ...this.state,
      ...{
        query: {
          ...this.state.query,
          ...{
            title: matchMangaTag(value),
            chapter: matchChapter(value)
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
    const ButtonGroup = Button.Group
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
                    <h2>SELECT MANGA</h2>
                    <AutoComplete
                      dataSource={MANGA_LISTS.map(list => list.title)}
                      defaultValue={matchMangaTitle(query.title)}
                      placeholder="Input Manga name"
                      onChange={e => this.changeTitle(e)}
                    />
                    <Input
                      className="ant-input-chapter"
                      name="chapter"
                      type="text"
                      value={query.chapter}
                      onChange={e => this.changeChapter(e)}
                    />
                    <hr />
                    <ButtonGroup>
                      <Button onClick={() => this.searchManga()} type="primary">
                        Search
                      </Button>
                      <Button onClick={() => this.nextChapter()} type="primary">
                        Next Chapter
                        <Icon type="right" />
                      </Button>
                    </ButtonGroup>
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
