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
    const list2 = data('li#text-24 div.mng_lts_chp ul.lst');
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
            const a = item.children.filter(tag => tag.name === 'li')[0];
            const b = a.children.filter(tag => tag.name === 'a')[0];
            const ReleaseManga = b.attribs;
            console.log(ReleaseManga);
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
exports.scrapmangalist = data => {
    const list = data('div#sct_content div.det a');
    let result = [];
    list.map((index, item) => {
        try {
            const b = item.children;
            const MangaListTitle = b[0];
            const MangaListLinks = item.attribs;
            result = [...result, ...[{ title: MangaListTitle.data, links: MangaListLinks.href }]];
        }
        catch (err) { }
    });
    return result;
};
//# sourceMappingURL=scrap.js.map