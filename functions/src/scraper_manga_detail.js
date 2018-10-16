// Require library
const request = require('request-promise')
const cheerio = require('cheerio')

// Scrapper config
const PageNumb = [...Array(30).keys()]

const scrapmangalist = data => {
  const list = data('div#sct_content div.det a')
  let result = []
  list.map((index, item) => {
    try {
      b = item.children
      const MangaListTitle = b[0]
      const MangaListLinks = item.attribs
      result = [...result, ...[{ title : MangaListTitle.data ,links: MangaListLinks.href }]]
    }
    catch (err) {}
  })
  return result
}

async const Scraplistresult = PageNumb.map(item => {
  const URLScrapMangaList = `http://www.niceoppai.net/manga_list/all/any/name-az/${item}/`
  let Scrapresult = []
  // Cheerio setup
  const options = {
    uri: URLScrapMangaList,
    transform: function(body) {
      const data = cheerio.load(body)
      return scrapmangalist(data)
    }
  }
  requestPromise(options)
    .then(result => {
      Scrapresult = [...Scrapresult,...result]
        })
    .then(Scrapresult => {
        return Scrapresult
        })
    .catch(err => {
      consloe.log({
        status: false,
        message: err
      })
    })
})

consloe.log({
  status: true,
  message: await Scraplistresult
})