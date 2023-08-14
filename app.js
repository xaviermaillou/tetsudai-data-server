const http = require('http')
const { readJSON, addElement, writeJSON, editElement } = require('./lib/handleData')

const server = http.createServer((req, res) => {
    console.log("Handling new request from server:", req.method, req.url)
    
    if (req.method === "GET") {
        let contentType = 'application/json'

        if (req.url.match('/kanji')) {
            console.log("Kanji JSON requested")
        }
        else if (req.url.match('/vocabulary')) {
            console.log("Vocabulary JSON requested")
        }
        else if (req.url.match('/sentences')) {
            console.log("Sentences JSON requested")
        }
        else {
            console.error("File not found for", req.url)
            res.writeHead(404)
            res.end("File not found for" + req.url)
            return
        }
    
        const data = readJSON(req.url)
        res.writeHead(200, {'Content-Type': contentType})
        res.end(data)
        return
    }

    const chunks = []
    req.on('data', (chunk) => {
        chunks.push(chunk)
    }).on('end', () => {
        body = Buffer.concat(chunks).toString()
        if (req.method === "POST") {
            if (req.url.match('/kanji')) {
                console.log("Kanji element added", body)
            }
            else if (req.url.match('/vocabulary')) {
                console.log("Vocabulary element added", body)
            }
            else if (req.url.match('/sentences')) {
                console.log("Sentences element added", body)
            }
            else {
                console.error("File not found for", req.url)
                res.writeHead(404)
                res.end("File not found for" + req.url)
                return
            }
    
            const data = readJSON(req.url)
            const updatedData = addElement(body, data)

            try {
                writeJSON(req.url, updatedData)
            } catch (error) {
                console.error(error)
                res.writeHead(500)
                res.end(error)
                return
            }

            res.writeHead(204)
            res.end("Element successfully added")
        }
        if (req.method === "PUT") {
            if (req.url.match('/kanji/')) {
                console.log("Kanji element edited", body)
            }
            else if (req.url.match('/vocabulary/')) {
                console.log("Vocabulary element edited", body)
            }
            else if (req.url.match('/sentences/')) {
                console.log("Sentences element edited", body)
            }
            else {
                console.error("File not found for", req.url)
                res.writeHead(404)
                res.end("File not found for" + req.url)
                return
            }


            const fileName = '/' + req.url.split('/')[1]
            const elementId = req.url.split('/')[2]

            const data = readJSON(fileName)
            const updatedData = editElement(body, data, elementId)

            try {
                writeJSON(fileName, updatedData)
            } catch (error) {
                console.error(error)
                res.writeHead(500)
                res.end(error)
                return
            }
            
            res.writeHead(204)
            res.end("Element successfully edited")
        }
    })
})

server.listen(9002)