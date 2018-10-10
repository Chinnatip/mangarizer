export const mangarelease = data => {
  const lists = data('li#text-24 div.mng_lts_chp div.row a.lst')
  let result = []
  lists.map((index, item) => {
    try {
      // console.log(item)
      const Releasemangatitle = item.children("b.val").attribs
      result = [...result, ...[{ title: Releasemangatitle ,ChapterName: item.attribs.title.replace(/[\n\t\r]/g,"").replace("อ่านการ์ตูน ",""),
       link: item.attribs.href }]]
    } catch (err) {}
  })
  return result
}
