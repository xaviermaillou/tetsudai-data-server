const vocabularyList = require('../data/vocabulary.json')
const axios = require('axios')
const fs = require('fs')
const sentencesList = require('../data/sentences.json')
const sentencesListBackUp = require('../dataBackUp/sentences.json')

const fetchSentences = async () => {
    const sentencesList = []
    for (let i = 0; i < vocabularyList.length; i++) {
        const baseWord = vocabularyList[i].jukujikunAsMain ?
            (vocabularyList[i].jukujikun)
            :
            vocabularyList[i].elements.map((element) => element.option === "rareKanji" ? element.kana : element.kanji || element.kana).join('')
        
        console.log(i, baseWord)
        const response = await axios.post('http://localhost:9003/sentenceGeneration', {
            word: baseWord
        })
        const responseArray = response.data.choices[0].message.content.split(";")
        sentencesList.push(responseArray)
    }

    fs.writeFile(process.cwd() + '/data/sentences.json', JSON.stringify(sentencesList), (err) => {
        if (err) {
            console.log("An error has occurred ", err)
            return
        }
        console.log("Data written successfully to the file: Sentences JSON")
    })
}

const fetchTranslations = async () => {
    translatedSentencesList = []

    console.log("SENTENCES LIST LENGTH", sentencesList.length)

    for (let i = 4000; i < 4100; i++) {
        const currentSentence = sentencesListBackUp[i]
        if (!!!currentSentence) break;
        const response = await axios.post('http://localhost:9003/sentenceTranslate', {
            sentence: currentSentence.sentence,
            language: "en"
        })

        console.log("\n", i, currentSentence.translation.fr, "|", response.data, "\n")

        translatedSentencesList.push({
            id: i,
            sentence: currentSentence.sentence,
            translation: {
                fr: currentSentence.translation.fr,
                en: response.data
            }
        })
    }

    fs.writeFile(process.cwd() + '/data/sentences.json', JSON.stringify([ ...sentencesList, ...translatedSentencesList ]), (err) => {
        if (err) {
            console.log("An error has occurred ", err)
            return
        }
        console.log("Data written successfully to the file: Sentences JSON")
    })
}

const cleanSentences = async () => {
    const cleanedSentencesList = sentencesList.filter(sentence => (sentence.sentence.split("。").length - 1) < 2)

    fs.writeFile(process.cwd() + '/data/sentences.json', JSON.stringify(cleanedSentencesList), (err) => {
        if (err) {
            console.log("An error has occurred ", err)
            return
        }
        console.log("Data written successfully to the file: Sentences JSON")
    })
}

// fetchSentences()
// fetchTranslations()
// cleanSentences()