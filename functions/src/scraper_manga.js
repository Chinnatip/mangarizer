// Require library
const request = require('request-promise')
const cheerio = require('cheerio')

// Scrapper config
// const CUSTOM = 'Dorei-Yuugi'
// const CHAPTER = 32
// const URL = `http://www.niceoppai.net/${CUSTOM}/${CHAPTER}/?all`
// //
// const scrapTasker = data => {
//   const lists = data('div#sct_content div.mng_rdr center')
//   let result = []
//   lists.map((index, item) => {
//     try {
//       // console.log(item)
//       const image = item.children.filter(tag => tag.name === 'img')[0]
//       const imgAttr = image.attribs
//       result = [...result, ...[{ alt: imgAttr.alt, src: imgAttr.src }]]
//     } catch (err) {}
//   })
//   return result
// }

// Scrapper config
// const CUSTOM = 'Dorei-Yuugi'
// const CHAPTER = 32
const URL = `http://www.niceoppai.net/`
//
const scrapTasker = data => {
  const lists = data('li#text-24 div.mng_lts_chp ul.lst a.lst')
  let result = []
  lists.map((index, item) => {
    try {
      // console.log(item)
      const lastmangaAttr = item.attribs
      result = [...result, ...[{ title: lastmangaAttr.title.replace(/[อ่านการ์ตูน\n\t\r]/g,""), href: lastmangaAttr.href }]]
    } catch (err) {}
  })
  return result
}
// Cheerio setup
const options = {
  uri: URL,
  transform: function(body) {
    const data = cheerio.load(body)
    const response = scrapTasker(data)
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
