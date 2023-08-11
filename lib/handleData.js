const fs = require('fs');

module.exports = {
    readJSON: (fileName) => {
        const path = process.cwd() + "/data" + fileName + ".json"
        const result = fs.readFileSync(path)
        return result
    },
    writeJSON: (fileName, data) => {
        const path = process.cwd() + "/data" + fileName + ".json"
        fs.writeFileSync(path, JSON.stringify(data))
        return
    },
    addElement: (body, data) => {
        const parsedBody = JSON.parse(body)
        const parsedData = JSON.parse(data)
        parsedBody.id = parsedData.length + 1
        return [ parsedBody, ...parsedData ]
    },
    editElement: (body, data, id) => {
        const parsedBody = JSON.parse(body)
        const parsedData = JSON.parse(data)
        return parsedData.map((element) => {
            if (Number(element.id) === Number(id)) return parsedBody
            else return element
        })
    }
}