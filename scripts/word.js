const fs = require('fs')
const vocabularyList = require('../data/vocabulary.json')

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
})