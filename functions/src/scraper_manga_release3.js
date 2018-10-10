// Require library
const request = require('request-promise')
const cheerio = require('cheerio')

// Scrapper config
const URL = `http://www.niceoppai.net/`
//
const mangarelease = data => {
  const list1 = data('li#text-24 div.mng_lts_chp a.lst')
  const list2 = data('li#text-24 div.mng_lts_chp a.ttl')
  let result = []
  list1.map((index, item) => {
    try {
      const ReleaseManga = item.attribs
      result = [...result, ...[{ ChapterName: ReleaseManga.title.replace(/[\n\t\r]/g,"").replace("อ่านการ์ตูน ",""),
      Chapterlink: ReleaseManga.href }]]
    }
    catch (err) {}
  })
  list2.map((index, item) => {
    try {
      console.log('List:', index);
      const ReleaseMangatitle = item.attribs
      result = [...result, ...[{ title: ReleaseMangatitle.title, 
        links: ReleaseMangatitle.href }]]
    }
    catch (err) {}
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