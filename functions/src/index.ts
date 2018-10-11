// Import Modules
import * as functions from 'firebase-functions'
import * as requestPromise from 'request-promise'
import * as bodyParser from 'body-parser'
import * as cheerio from 'cheerio'
import * as express from 'express'
import * as cors from 'cors'
//
import { mangaSoma } from './_assets/static'
import { scrapChapter,scrapmangarelease } from './_methods/scrap'

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
    const URL = `http://www.niceoppai.net/${CUSTOM}/${CHAPTER}/?all`
    const options = {
      uri: URL,
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
    const URL = `http://www.niceoppai.net/`
    // Cheerio setup
    const options = {
      uri: URL,
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
