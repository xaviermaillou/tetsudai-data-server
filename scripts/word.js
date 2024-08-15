const fs = require('fs')
const vocabularyList = require('../data/vocabulary.json')

const cleanedVocabularyList = vocabularyList?.map((word) => ({
    id: Number(word.id),
    elements: word.elements.map(element => ({
        kanji: element.kanji || "",
        kana: element.kana || "",
        options: {
            rareKanji: element.option === "rareKanji",
            politeElement: element.option === "politeElement",
            ateji: false,
            irregular: false
        }
    })),
    common: !!word.common,
    jukujikun: word.jukujikun || null,
    jukujikunAsMain: !!word.jukujikunAsMain,
    forceHiragana: !!word.forceHiragana,
    includesParticle: !!word.includesParticle,
    gender: word.gender || null,
    formality: word.formality || null,
    collections: word.collections || [],
    level: word.level || null,
    originLanguage: word.originLanguage || null,
    originLanguageWord: word.originLanguageWord || null,
    frequency: Number(word.frequency),
    translation: {
        fr: word.translation?.fr || [],
        en: word.translation?.en || []
    },
    alternatives: {
        fr: word.alternatives?.fr || [],
        en: word.alternatives?.en || []
    },
    romaji: word.romaji || [],
    precisions: {
        fr: word.precisions?.fr || "",
        en: word.precisions?.en || ""
    },
    grammar: word.grammar,
    verbPrecisions: word.verbPrecisions || null,
    adjectivePrecisions: word.adjectivePrecisions || null,
    kosoado: word.kosoado || false,
}))

fs.writeFile(process.cwd() + '/data/vocabulary.json', JSON.stringify(cleanedVocabularyList), (err) => {
    if (err) {
        console.log("An error has occurred ", err)
        return
    }
    console.log("Data written successfully to the file: Vocabulary JSON")
})