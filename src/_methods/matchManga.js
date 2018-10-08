import { MANGA_LISTS } from '../_assets/static'

export const matchChapter = title => {
  try {
    return MANGA_LISTS.find(lists => lists.title === title)['defaultChapter']
  } catch (err) {
    return 1
  }
}

export const matchMangaTag = title => {
  try {
    return MANGA_LISTS.find(lists => lists.title === title)['val']
  } catch (err) {
    return title
  }
}

export const matchMangaTitle = tag => {
  try {
    return MANGA_LISTS.find(lists => lists.val === tag)['title']
  } catch (err) {
    return tag
  }
}
