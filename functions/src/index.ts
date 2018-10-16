// Import Modules
import * as functions from 'firebase-functions'
import * as requestPromise from 'request-promise'
import * as bodyParser from 'body-parser'
import * as cheerio from 'cheerio'
import * as express from 'express'
import * as cors from 'cors'
//
import { mangaSoma } from './_assets/static'
import { scrapChapter,scrapmangarelease,scrapmangalist } from './_methods/scrap'

// Express setup
const app = express()
const corsHandler = cors({ origin: true })
const API_VERSION = '1.0.0'

// Express Path handler
app.use(bodyParser.json())
app.get(`/mangaApi`, (request, response) => {
  return corsHandler(request, response, () =>
    response.send({
      title: 'Hello mangarizer'
    })
  )
})

// Export Functions
export const api = functions.https.onRequest(app)
//
export const mangaApi = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, () => response.send(mangaSoma))
})
//
export const mangaChapter = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, () => {
    const { title, chapter } = request.body
    const CUSTOM = title || 'boku_no_hero_academia'
    const CHAPTER = chapter || '1-TH'
    const URLmangaChapter = `http://www.niceoppai.net/${CUSTOM}/${CHAPTER}/?all`
    const options = {
      uri: URLmangaChapter,
      transform: function(body) {
        const data = cheerio.load(body)
        return scrapChapter(data)
      }
    }
    requestPromise(options)
      .then(result => {
        response.send({
          status: true,
          message: result
        })
      })
      .catch(err => {
        response.send({
          status: false,
          message: err
        })
      })
  })
})
export const mangaRelease = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, () => {
    const URLmangaRelease = `http://www.niceoppai.net/`
    // Cheerio setup
    const options = {
      uri: URLmangaRelease,
      transform: function(body) {
        const data = cheerio.load(body)
        return scrapmangarelease(data)
      }
    }
    requestPromise(options)
      .then(result => {
        response.send({
          status: true,
          message: result
        })
      })
      .catch(err => {
        response.send({
          status: false,
          message: err
        })
      })
  })
})
export const ScrapMangaList = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, () => {
    const PageNumb = [...Array(30).keys()]
    let B = []
    PageNumb.map(item => {
      const URLScrapMangaList = `http://www.niceoppai.net/manga_list/all/any/name-az/${item+1}/`
      // Cheerio setup
      const options = {
        uri: URLScrapMangaList,
        transform: function(body) {
          const data = cheerio.load(body)
          return scrapmangalist(data)
        }
      }
      const A = a(options)
      .then()
      .catch()
      response.send({
        status: false,
        message: A
      })
    })
    async function a(options) {
      try {
        let ListResult = await requestPromise(options)
        .then()
        .catch() 
        B = {...B,...ListResult}

      } 
      catch(error) {
        err => {
            response.send({
              status: false,
              message: err
            })}
          }
    }
    
  })
})
