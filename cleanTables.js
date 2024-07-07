const fs = require('fs')
const kanjiList = require('./data/kanji.json')
const vocabularyList = require('./data/vocabulary.json')
const sentencesList = require('./data/sentences.json')

// Iteration over each list (kanji, vocabulary, sentence) cleaning/transforming each element's attributes

/* const cleanedKanjiList = kanjiList?.map((kanji) => ({
    id: Number(kanji.id),
    kanji: kanji.kanji,
    strokes: Number(kanji.strokes),
    level: kanji.level,
    frequency: Number(kanji.frequency),
    readings: {
        kunyomi: kanji.readings.kunyomi,
        onyomi: kanji.readings.onyomi?.map((yomi) => ({kana: yomi.kana.replaceAll("二", "ニ")}))
    },
    collections: kanji.collections || [],
    kanjiVariations: kanji.kanjiVariations || [],
    kanjiParts: kanji.kanjiParts || [],
    translation: kanji.translation,
    romaji: kanji.romaji || [],
    alternatives: kanji.alternatives,
    precisions: kanji.precisions || "",
    origin: {
        sameMeaning: kanji.origin?.sameMeaning || "",
        otherMeaning: kanji.origin?.otherMeaning || "",
        pinyin: kanji.origin?.pinyin || ""
    }
}))

fs.writeFile(process.cwd() + '/data/kanji.json', JSON.stringify(cleanedKanjiList), (err) => {
    if (err) {
        console.log("An error has occurred ", err)
        return
    }
    console.log("Data written successfully to the file: Kanji JSON")
}) */

/* const cleanedVocabularyList = vocabularyList?.map((word) => ({
    id: Number(word.id),
    elements: word.elements,
    common: !!word.common,
    jukujikun: word.jukujikun,
    jukujikunAsMain: !!word.jukujikunAsMain,
    forceHiragana: !!word.forceHiragana,
    includesParticle: !!word.includesParticle,
    gender: word.gender,
    formality: word.formality,
    collections: word.collections,
    level: word.level,
    originLanguage: word.originLanguage,
    originLanguageWord: word.originLanguageWord,
    precisions: word.precisions,
    frequency: Number(word.frequency),
    romaji: word.romaji || [],
    translation: {
        en: word.translation.en || word.translation,
        fr: word.translation.fr
    },
    alternatives: word.alternatives,
    grammar: word.grammar,
    verbPrecisions: word.verbPrecisions,
    adjectivePrecisions: word.adjectivePrecisions,
    kosoado: word.kosoado,
}))

fs.writeFile(process.cwd() + '/data/vocabulary.json', JSON.stringify(cleanedVocabularyList), (err) => {
    if (err) {
        console.log("An error has occurred ", err)
        return
    }
    console.log("Data written successfully to the file: Vocabulary JSON")
}) */

/*

const cleanedSentencesList = sentencesList.map((sentence) => ({
    id: Number(sentence.id),
    elements: sentence.elements,
    translation: {
        fr: sentence.translation,
        en: sentence.translation
    }
}))

fs.writeFile(process.cwd() + '/data/sentences.json', JSON.stringify(cleanedSentencesList), (err) => {
    if (err) {
        console.log("An error has occurred ", err)
        return
    }
    console.log("Data written successfully to the file: Sentences JSON")
})

*/

// Translate each lists' elements' translations

/* const translate = require('node-google-translate-skidz')

const translateToEnglish = async (frenchText) => {
    return new Promise((resolve, reject) => {
        if (!!frenchText) {
            translate({
                text: frenchText,
                source: 'fr',
                target: 'en'
            }, (result) => {
                if (result) {
                    resolve(result.translation)
                } else {
                    reject('Translation error.');
                }
            })
        }
        else resolve('')
    })
}

const buildTranslation = async (frenchTranslation) => {
    if (typeof frenchTranslation === 'string') {
        return await translateToEnglish(frenchTranslation)
    }
    else {
        englishTextArray = []
        for (let i = 0; i < frenchTranslation.length; i++) {
            englishTextArray.push(await translateToEnglish(frenchTranslation[i]))
        }
        return englishTextArray
    }
}

const translateList = async (list) => {
    const listCopy = [ ...list ]
    for (let i = 0; i < listCopy.length; i++) {
        listCopy[i].alternatives.en = await buildTranslation(listCopy[i].alternatives.fr)
    }
    return listCopy
} */

/* translateList(kanjiList)
    .then((translatedKanji) => {
        fs.writeFile(process.cwd() + '/data/kanji.json', JSON.stringify(translatedKanji), (err) => {
            if (err) {
                console.log("An error has occurred ", err)
                return
            }
            console.log("Data written successfully to the file: Kanji JSON")
        })
    }) */
/* translateList(vocabularyList)
    .then((translatedVocabulary) => {
        fs.writeFile(process.cwd() + '/data/vocabulary.json', JSON.stringify(translatedVocabulary), (err) => {
            if (err) {
                console.log("An error has occurred ", err)
                return
            }
            console.log("Data written successfully to the file: Vocabulary JSON")
        })
    }) */
/* translateList(sentencesList)
    .then((translatedSentences) => {
        fs.writeFile(process.cwd() + '/data/sentences.json', JSON.stringify(translatedSentences), (err) => {
            if (err) {
                console.log("An error has occurred ", err)
                return
            }
            console.log("Data written successfully to the file: Sentences JSON")
        })
    }) */