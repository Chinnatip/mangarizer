export const matchManga = (MangaList, value) => {
  return MangaList.find(lists => lists.val === value)['defaultChapter']
}
