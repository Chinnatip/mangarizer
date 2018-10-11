// Require library
const request = require('request-promise')
const cheerio = require('cheerio')

// Scrapper config
const URL = `http://www.niceoppai.net/`
//
const scrapmangarelease = data => {
  const list1 = data('li#text-24 div.mng_lts_chp a.ttl')
  const list2 = data('li#text-24 div.mng_lts_chp ul.lst')
  let result = []
  let result1 = []
  let result2 = []
  list1.map((index, item) => {
    try {
      const ReleaseMangatitle = item.attribs
      result1 = [...result1, ...[{ title: ReleaseMangatitle.title, 
        links: ReleaseMangatitle.href }]]
    }
    catch (err) {}
  })
  list2.map((index, item) => {
    try {
      a = item.children.filter(tag => tag.name === 'li')[0]
      b = a.children.filter(tag => tag.name === 'a')[0]
      ReleaseManga = b.attribs
      console.log(ReleaseManga)
      result2 = [...result2,...[{ ChapterName: ReleaseManga.title.replace(/[\n\t\r]/g,"").replace("อ่านการ์ตูน ",""),
      Chapterlink: ReleaseManga.href }]]
    }
    catch (err) {}
  })
    result1.map((index,item) =>{
      result = [...result,{...result1[item],...result2[item]}]
      })
  return result
}
// Cheerio setup
const options = {
  uri: URL,
  transform: function(body) {
    const data = cheerio.load(body)
    const response = mangarelease(data)
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