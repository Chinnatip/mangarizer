import axios from 'axios'

export const fetchManga = (url, query, that) => {
  const { title, chapter } = query
  return axios
    .post(url, {
      title: title,
      chapter: chapter
    })
    .then(res => {
      that.setState({
        ...that.state,
        ...{ loaded: true, pages: res.data.message }
      })
    })
}

export const setLoadingState = (that, newChapter) => {
  that.setState({
    ...that.state,
    ...{
      loaded: false,
      query: newChapter
    }
  })
}
