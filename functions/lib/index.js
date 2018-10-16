"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        const URLmangaChapter = `http://www.niceoppai.net/${CUSTOM}/${CHAPTER}/?all`;
        const options = {
            uri: URLmangaChapter,
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
        const URLmangaRelease = `http://www.niceoppai.net/`;
        // Cheerio setup
        const options = {
            uri: URLmangaRelease,
            transform: function (body) {
                const data = cheerio.load(body);
                return scrap_1.scrapmangarelease(data);
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
exports.ScrapMangaList = functions.https.onRequest((request, response) => {
    return corsHandler(request, response, () => {
        const PageNumb = [...Array(30).keys()];
        let B = [];
        PageNumb.map(item => {
            const URLScrapMangaList = `http://www.niceoppai.net/manga_list/all/any/name-az/${item + 1}/`;
            // Cheerio setup
            const options = {
                uri: URLScrapMangaList,
                transform: function (body) {
                    const data = cheerio.load(body);
                    return scrap_1.scrapmangalist(data);
                }
            };
            a(options)
                .then()
                .catch();
        });
        function a(options) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let listresult = yield requestPromise(options)
                        .then()
                        .catch();
                    B = Object.assign({}, B, listresult);
                    response.send({
                        status: true,
                        message: [B]
                    });
                }
                catch (error) {
                    err => {
                        response.send({
                            status: false,
                            message: err
                        });
                    };
                }
            });
        }
    });
});
//# sourceMappingURL=index.js.map