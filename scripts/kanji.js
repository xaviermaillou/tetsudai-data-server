const fs = require('fs')
const kanjiList = require('../data/kanji.json')

const cleanedKanjiList = kanjiList?.map((kanji) => ({
    id: Number(kanji.id),
    kanji: kanji.kanji,
    strokes: Number(kanji.strokes),
    level: kanji.level,
    frequency: Number(kanji.frequency),
    readings: {
        kunyomi: kanji.readings.kunyomi || [],
        onyomi: kanji.readings.onyomi || []
    },
    collections: kanji.collections || [],
    kanjiVariations: kanji.kanjiVariations || [],
    kanjiParts: kanji.kanjiParts || [],
    translation: kanji.translation || [],
    alternatives: kanji.alternatives || [],
    romaji: kanji.romaji || [],
    precisions: kanji.precisions || "",
    origin: {
        sameMeaning: kanji.origin?.sameMeaning || "",
        otherMeaning: {
            fr: kanji.origin?.otherMeaning.fr || [],
            en: kanji.origin?.otherMeaning.en || []
        },
        pinyin: kanji.origin?.pinyin || ""
    }
}))

fs.writeFile(process.cwd() + '/data/kanji.json', JSON.stringify(cleanedKanjiList), (err) => {
    if (err) {
        console.log("An error has occurred ", err)
        return
    }
    console.log("Data written successfully to the file: Kanji JSON")
})