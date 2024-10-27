const fs = require('fs')
const kanjiList = require('../data/kanji.json')
const axios = require('axios')

const detectObsoleteKanji = async () => {
    const newKanjiList = [ ...kanjiList ]
    for (let i = 1000; i < 1100; i++) {
        if (!!!newKanjiList[i]) break
        const kanji = newKanjiList[i].kanji
        const response = await axios.get(`http://localhost:9003/wiktionnary/kanji/${kanji}`)
        if (response.data.obsolete && !!!newKanjiList[i].obsolete) {
            console.log(i, kanji)
            newKanjiList[i].obsolete = true
        }
        else {
            console.log(i, "-")
            newKanjiList[i].obsolete = false
        }
    }

    fs.writeFile(process.cwd() + '/data/kanji.json', JSON.stringify(newKanjiList), (err) => {
        if (err) {
            console.log("An error has occurred ", err)
            return
        }
        console.log("Data written successfully to the file: Kanji JSON")
    })
}

const cleanKanjiList = async () => {
    const cleanedKanjiList = kanjiList?.map((kanji) => ({
        id: Number(kanji.id),
        kanji: kanji.kanji,
        strokes: Number(kanji.strokes),
        level: kanji.level || null,
        frequency: Number(kanji.frequency),
        readings: {
            kunyomi: kanji.readings.kunyomi || [],
            onyomi: kanji.readings.onyomi || []
        },
        collections: kanji.collections || [],
        kanjiVariations: kanji.kanjiVariations || [],
        kanjiParts: kanji.kanjiParts || [],
        translation: {
            fr: kanji.translation?.fr || [],
            en: kanji.translation?.en || []
        },
        alternatives: {
            fr: kanji.alternatives?.fr || [],
            en: kanji.alternatives?.en || []
        },
        romaji: kanji.romaji || [],
        precisions: {
            fr: kanji.precisions?.fr || "",
            en: kanji.precisions?.en || ""
        },
        origin: {
            sameMeaning: kanji.origin?.sameMeaning || false,
            sinogram: kanji.origin?.sinogram || "",
            otherMeaning: {
                fr: kanji.origin?.otherMeaning.fr || [],
                en: kanji.origin?.otherMeaning.en || []
            },
            pinyin: kanji.origin?.pinyin || ""
        },
        obsolete: kanji.obsolete || false
    }))
    
    fs.writeFile(process.cwd() + '/data/kanji.json', JSON.stringify(cleanedKanjiList), (err) => {
        if (err) {
            console.log("An error has occurred ", err)
            return
        }
        console.log("Data written successfully to the file: Kanji JSON")
    })
}

detectObsoleteKanji()
// cleanKanjiList()