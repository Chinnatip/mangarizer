"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapChapter = data => {
    const lists = data('div#sct_content div.mng_rdr center');
    let result = [];
    lists.map((index, item) => {
        try {
            const image = item.children.filter(tag => tag.name === 'img')[0];
            const imgAttr = image.attribs;
            result = [...result, ...[{ alt: imgAttr.alt, src: imgAttr.src }]];
        }
        catch (err) { }
    });
    return result;
};
exports.scrapmangarelease = data => {
    const list1 = data('li#text-24 div.mng_lts_chp a.ttl');
    const list2 = data('li#text-24 div.mng_lts_chp a.lst');
    let result = [];
    let result1 = [];
    let result2 = [];
    list1.map((index, item) => {
        try {
            const ReleaseMangatitle = item.attribs;
            result1 = [...result1, ...[{ title: ReleaseMangatitle.title,
                        links: ReleaseMangatitle.href }]];
        }
        catch (err) { }
    });
    list2.map((index, item) => {
        try {
            const ReleaseManga = item.attribs;
            result2 = [...result2, ...[{ ChapterName: ReleaseManga.title.replace(/[\n\t\r]/g, "").replace("อ่านการ์ตูน ", ""),
                        Chapterlink: ReleaseManga.href }]];
        }
        catch (err) { }
    });
    result1.map((index, item) => {
        result = [...result, Object.assign({}, result1[item], result2[item])];
    });
    return result;
};
//# sourceMappingURL=scrap.js.map