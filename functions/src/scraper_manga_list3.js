// Require library
const request = require('request-promise')
const cheerio = require('cheerio')

// Scrapper config
const PageNumb = [...Array(30).keys()].map(i=>i=i+1)

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
B =[]
// Req-http sender
PageNumb.map(item => {
  const URL = `http://www.niceoppai.net/manga_list/all/any/name-az/${item}/`
  // Cheerio setup
  const options = {
    uri: URL,
    transform: function(body) {
      const data = cheerio.load(body)
      const response = scrapmangalist(data)
      return response
    }
    
  }
  a(options)
  console.log(a(options))
  // const A = a(options)
  // console.log(A)
  // request(options)
  //   .then(response => {
      
  //     console.log(response)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
})

async function a(options) {
  try {
    let r = await request(options) 
    // console.log(r)
    return r
  }
  catch(error) {}
}
// console.log(a(r))