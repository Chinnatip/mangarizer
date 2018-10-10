// Require library
const request = require('request-promise')
const cheerio = require('cheerio')

// Scrapper config
const URL = `http://www.niceoppai.net/`
//
// const mangarelease = data => {
//   const list = data('li#text-24 div.mng_lts_chp div.row div.det a.ttl')
//   const list1 = data('li#text-24 div.mng_lts_chp a.ttl')
//   const list2 = data('li#text-24 div.mng_lts_chp ul.lst')
//   let result = []
//   let result1 = []
//   let result2 = []
//   list1.map((index, item) => {
//     try {
//       const ReleaseMangatitle = item.attribs
//       result1 = [...result1, ...[{Title: ReleaseMangatitle.title, 
//         TitleLinks: ReleaseMangatitle.href }]]
//     }
//     catch (err) {}
//   })
//   list2.map((index, item) => {
//     try {
//       console.log(item.children.filter(tag => tag.name === 'li')[0].children.filter(tag => tag.name === 'a'))
//       const ReleaseManga = item.children.filter(tag => tag.name === 'li')[0].children.filter(tag => tag.name === 'a').attribs
//       result2 = [...result2, ...[{ ChapterName: ReleaseManga.title.replace(/[\n\t\r]/g,"").replace("อ่านการ์ตูน ",""),
//       Chapterlink: ReleaseManga.href }]]
//     }
//     catch (err) {}
//   })
//   result = [...result1, ...result2]
//   return  result
// }

const mangarelease = data => {
  const list = data('li#text-24 div.mng_lts_chp div.row div.det')
  const list1 = data('li#text-24 div.mng_lts_chp a.ttl')
  const list2 = data('li#text-24 div.mng_lts_chp ul.lst')
  let result = []
  list1.map((index, item) => {
    try {
      const a1 = item.children.filter(tag => tag.name === 'a')[0]
      // const ReleaseMangatitle = a1.attribs
      // console.log(item.children.filter(tag => tag.name === 'ul').children)
      // const a2 = item.children.filter(tag => tag.name === 'ul')[0].children.filter(tag => tag.name === 'a')
      // const ReleaseManga = a2.attribs
      // result = [...result, ...[{Title: ReleaseMangatitle.title, 
      //   TitleLinks: ReleaseMangatitle.href }]]
      // result = [...result, ...[{ ChapterName: ReleaseManga.title.replace(/[\n\t\r]/g,"").replace("อ่านการ์ตูน ",""),
      // Chapterlink: ReleaseManga.href }]]
      result1 = [...result, ...[{Title: ReleaseMangatitle.title, 
        TitleLinks: ReleaseMangatitle.href }]]
    }
    catch (err) {}
  })
  list2.map((index, item) => {
    try {
      // console.log(item.children.filter(tag => tag.name === 'li')[0].children.filter(tag => tag.name === 'a'))
      const ReleaseManga = item.children.filter(tag => tag.name === 'li')[0].children.filter(tag => tag.name === 'a').attribs
      result2 = [...result2, ...[{ ChapterName: ReleaseManga.title.replace(/[\n\t\r]/g,"").replace("อ่านการ์ตูน ",""),
      Chapterlink: ReleaseManga.href }]]
    }
    catch (err) {}
  })
  result = [...result, ...result2]
  return  result
}


// Cheerio setup
const options = {
  uri: URL,
  transform: function(body) {
    const data = cheerio.load(body
      // , {normalizeWhitespace: true,
      // xmlMode: true}
      )
    
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