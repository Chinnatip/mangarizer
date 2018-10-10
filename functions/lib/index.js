"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import Modules
const functions = require("firebase-functions");
const requestPromise = require("request-promise");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");
//
const static_1 = require("./_assets/static");
const scrap_1 = require("./_methods/scrap");
const scrap2_1 = require("./_methods/scrap2");
// Express setup
const app = express();
const corsHandler = cors({ origin: true });
const API_VERSION = '1.0.0';
// Express Path handler
app.use(bodyParser.json());
app.get(`/mangaApi`, (request, response) => {
    return corsHandler(request, response, () => response.send({
        title: 'Hello mangarizer'
    }));
});
// Export Functions
exports.api = functions.https.onRequest(app);
//
exports.mangaApi = functions.https.onRequest((request, response) => {
    return corsHandler(request, response, () => response.send(static_1.mangaSoma));
});
//
exports.mangaChapter = functions.https.onRequest((request, response) => {
    return corsHandler(request, response, () => {
        const { title, chapter } = request.body;
        const CUSTOM = title || 'boku_no_hero_academia';
        const CHAPTER = chapter || '1-TH';
        const URL = `http://www.niceoppai.net/${CUSTOM}/${CHAPTER}/?all`;
        const options = {
            uri: URL,
            transform: function (body) {
                const data = cheerio.load(body);
                return scrap_1.scrapChapter(data);
            }
        };
        requestPromise(options)
            .then(result => {
            response.send({
                status: true,
                message: result
            });
        })
            .catch(err => {
            response.send({
                status: false,
                message: err
            });
        });
    });
});
exports.mangaRelease = functions.https.onRequest((request, response) => {
    return corsHandler(request, response, () => {
        const URL = `http://www.niceoppai.net/`;
        // Cheerio setup
        const options = {
            uri: URL,
            transform: function (body) {
                const data = cheerio.load(body);
                return scrap2_1.mangarelease(data);
            }
        };
        requestPromise(options)
            .then(result => {
            response.send({
                status: true,
                message: result
            });
        })
            .catch(err => {
            response.send({
                status: false,
                message: err
            });
        });
    });
});
//# sourceMappingURL=index.js.map