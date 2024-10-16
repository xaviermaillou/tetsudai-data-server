const vocabularyList = require('../data/vocabulary.json')
const axios = require('axios')
const fs = require('fs')
const sentencesList = require('../data/sentences.json')

const fetchSentences = async () => {
    const newSentencesList = [ ...sentencesList ]

    for (let i = 0; i < 1400; i++) {
        if(!!!vocabularyList[i]) continue

        const fullWord = await axios.get(`http://localhost:9001/word/${vocabularyList[i].id}`)

        const baseWord = fullWord.data.word.primaryWord
        
        console.log("\n", i, baseWord, `matches ${fullWord.data.sentences.length} existing sentences.`)

        if (fullWord.data.sentences.length >= 5 || baseWord.includes("する")) continue

        const logSpacing = String(i).split("").map((_el) => " ").join("")

        console.log(logSpacing, "Proceeding to generate new sentences...")

        const response = await axios.post('http://localhost:9003/sentenceGeneration', {
            word: baseWord
        })
        const responseArray = response.data.split(";")
        console.log(logSpacing, `${responseArray.length} sentences generated from tetsudai-intelligence`)

        for (let j = 0; j < responseArray.length; j++) {
            const cleanSentence = responseArray[j].replaceAll(" ", "").replaceAll(".", "").replaceAll("1", "").replaceAll("\n", "").split("。")[0] + "。"
            console.log(logSpacing, "-", cleanSentence)

            const frTranslation = (await axios.post("http://localhost:9003/sentenceTranslate", {
                sentence: cleanSentence,
                language: "fr"
            })).data
            console.log(logSpacing, " ", "FR", frTranslation)

            const enTranslation = (await axios.post("http://localhost:9003/sentenceTranslate", {
                sentence: cleanSentence,
                language: "en"
            })).data
            console.log(logSpacing, " ", "EN", enTranslation)

            newSentencesList.push({
                sentence: cleanSentence,
                translation: {
                    fr: frTranslation,
                    en: enTranslation
                }
            })
        }
    }

    fs.writeFile(process.cwd() + '/data/sentences.json', JSON.stringify(newSentencesList.map((el, i) => ({ ...el, id: i }))), (err) => {
        if (err) {
            console.log("An error has occurred ", err)
            return
        }
        console.log("\nData written successfully to the file: Sentences JSON")
    })
}

const cleanSentencesList = async () => {
    const existingSentences = []
    
    const cleanedSentencesList = [ ...sentencesList ].filter(sentence => {
        if (existingSentences.includes(sentence.sentence)) {
            console.log("Duplicated sentence: ", sentence.id)
            return false
        }
        else {
            existingSentences.push(sentence.sentence)
            return true
        }
    })

    fs.writeFile(process.cwd() + '/data/sentences.json', JSON.stringify(cleanedSentencesList.map((el, i) => ({ ...el, id: i }))), (err) => {
        if (err) {
            console.log("An error has occurred ", err)
            return
        }
        console.log("\nData written successfully to the file: Sentences JSON")
    })
}

const detectMissingParts = async () => {
    const incompleteSentences = []

    for (let i = 0; i < sentencesList.length; i++) {
        const currentSentence = sentencesList[i].sentence

        const response = await axios.get(`http://localhost:9001/vocabularyList/0/0/0/0/${currentSentence}`)

        if (!response.data.sentence) {
            const unknownPieces = []
            const fusedUnknownPieces = []
            const splittedCurrentSentence = currentSentence.split("")
            let splittedFoundSentence = response.data.foundSentence.join("").split("")

            for (let j = 0; j < splittedCurrentSentence.length; j++) {
                if (splittedFoundSentence[j] !== splittedCurrentSentence[j]) {
                    unknownPieces.push({
                        index: j,
                        char: splittedCurrentSentence[j]
                    })
                    splittedFoundSentence = [ ...splittedFoundSentence.slice(0, j), null, ...splittedFoundSentence.slice(j) ]
                }
            }

            for (let j = 0; j < unknownPieces.length; j++) {
                if (j > 0 && (unknownPieces[j].index - unknownPieces[j - 1].index === 1)) fusedUnknownPieces[fusedUnknownPieces.length - 1] = fusedUnknownPieces[fusedUnknownPieces.length - 1] + unknownPieces[j].char
                else fusedUnknownPieces.push(unknownPieces[j].char)
            }

            console.log(i, currentSentence, fusedUnknownPieces)

            incompleteSentences.push(currentSentence)
        }
    }
    console.log("")
    console.log(incompleteSentences.length, "incomplete sentences:", Math.round((incompleteSentences.length / sentencesList.length) * 100), "% of total")
}

// fetchSentences()
// cleanSentencesList()
// detectMissingParts()