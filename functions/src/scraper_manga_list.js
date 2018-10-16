// Require library
const request = require('request-promise')
const cheerio = require('cheerio')

// Scrapper config
const URL = `http://www.niceoppai.net/manga_list/`
//
const scrapmangalist = data => {
  const list = data('div#sct_content div.det a')
  let result = []
  list.map((index, item) => {
    try {
      b = item.children
      const MangaListTitle = b[0]
      const MangaListLinks = item.attribs
      result = [...result, ...[{ title : MangaListTitle.data ,links: MangaListLinks.href }]]
      console.log(MangaListTitle)
    }
    catch (err) {}
  })
  // result1.map((index,item) =>{
  //   result = [...result,{...result1[item],...result2[item]}]
  //   })
  return result
}
// Cheerio setup
const options = {
  uri: URL,
  transform: function(body) {
    const data = cheerio.load(body)
    const response = scrapmangalist(data)
    return response
  }
}

// Req-http sender
request(options)
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log(err)
  })