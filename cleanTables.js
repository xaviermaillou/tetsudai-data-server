const fs = require('fs')
const kanjiList = require('./dataBackUp/kanji.json')
const vocabularyList = require('./dataBackUp/vocabulary.json')
const sentencesList = require('./dataBackUp/sentences.json')

/* const cleanedKanjiList = kanjiList?.map((kanji) => ({
    id: Number(kanji.id),
    kanji: kanji.kanji,
    strokes: Number(kanji.strokes),
    level: kanji.level,
    frequency: Number(kanji.frequency),
    readings: kanji.readings,
    collections: kanji.collections || [],
    kanjiVariations: kanji.kanjiVariations || [],
    kanjiParts: kanji.kanjiParts || [],
    translation: {
        fr: kanji.translation || [],
        en: kanji.translation || []
    },
    romaji: kanji.romaji || [],
    alternatives: {
        fr: kanji.alternatives || [],
        en: kanji.alternatives || []
    },
}))

fs.writeFile(process.cwd() + '/data/kanji.json', JSON.stringify(cleanedKanjiList), (err) => {
    if (err) {
        console.log("An error has occurred ", err)
        return
    }
    console.log("Data written successfully to the file: Kanji JSON")
})

const cleanedVocabularyList = vocabularyList?.map((word) => ({
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
        fr: word.translation || [],
        en: word.translation || []
    },
    alternatives: {
        fr: word.alternatives || [],
        en: word.alternatives || []
    },
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
})

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

const translate = require('google-translate-api');

async function translateToEnglish(frenchText) {
  try {
    const { text } = await translate(frenchText, { from: 'fr', to: 'en' })
    return text
  } catch (error) {
    console.error('Translation error :', error)
    return frenchText
  }
}

const kanjiData = kanjiList

kanjiData.forEach(async (kanji) => {
    const englishTranslation = await translateToEnglish(kanji.translation.fr)
    kanji.translation.en = englishTranslation
});

fs.writeFile(process.cwd() + '/data/kanji.json', JSON.stringify(kanjiData), (err) => {
    if (err) {
        console.log("An error has occurred ", err)
        return
    }
    console.log("Data written successfully to the file: Sentences JSON")
})

const vocabularyData = vocabularyList

vocabularyData.forEach(async (word) => {
    const englishTranslation = await translateToEnglish(word.translation.fr)
    word.translation.en = englishTranslation
});

fs.writeFile(process.cwd() + '/data/vocabulary.json', JSON.stringify(vocabularyData), (err) => {
    if (err) {
        console.log("An error has occurred ", err)
        return
    }
    console.log("Data written successfully to the file: Sentences JSON")
})

const sentencesData = sentencesList

sentencesData.forEach(async (sentence) => {
    const englishTranslation = await translateToEnglish(sentence.translation.fr)
    sentence.translation.en = englishTranslation
});

fs.writeFile(process.cwd() + '/data/sentences.json', JSON.stringify(sentencesData), (err) => {
    if (err) {
        console.log("An error has occurred ", err)
        return
    }
    console.log("Data written successfully to the file: Sentences JSON")
})
