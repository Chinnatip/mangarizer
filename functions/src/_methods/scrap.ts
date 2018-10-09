export const scrapChapter = data => {
  const lists = data('div#sct_content div.mng_rdr center')
  let result = []
  lists.map((index, item) => {
    try {
      const image = item.children.filter(tag => tag.name === 'img')[0]
      const imgAttr = image.attribs
      result = [...result, ...[{ alt: imgAttr.alt, src: imgAttr.src }]]
    } catch (err) {}
  })
  return result
}
