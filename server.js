const express = require('express')
const next = require('next')
const axios = require('axios')
const path = require('path')
const bodyParser = require('body-parser')
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()
    server.use(bodyParser.json())
    server.use(express.static(path.join(__dirname, '/public')))

    server.get('/', (req, res) => {
        const page = '/index'
        return app.render(req, res, page, { title: 'next' })
    })

    server.get('/idols', (req, res) => {
        const page = '/item/idolSearch'
        const id = { id: req.query.hash }
        return app.render(req, res, page, id)
    })

    server.get('/card-trades/:hash', (req, res) => {
        const page = '/item/cardTrades'
        const { hash } = req.params
        const body = { hash }
        return app.render(req, res, page, body)
    })

    // api

    server.get('/api/card-trades/:hash', async (req, res) => {
        const { hash } = req.params
        try {
            const tradeInfo = await axios.get(' https://pink-check.school/api/v2/trades/' + hash)
            res.json(tradeInfo.data)
        } catch (err) {
            res.sendStatus(400)
        }
    })

    server.get('/api/idols', async (req, res) => {
        try {
            const data = await axios.get('https://pink-check.school/api/v2/idols')
            res.json(data.data)
        } catch (error) {
            res.json()
        }
    })

    server.get('/idolCardList', async (req, res) => {
        const { id } = req.query

        if (!id) {
            res.json()
        }

        try {
            const data = await axios.get(`https://pink-check.school/api/v2/cards?idolId=${id}`)
            res.json(data.data)
        } catch (error) {
            res.json()
        }
    })

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(3002, (err) => {
        if (err) throw err

        console.log('localhost 3002 listen')
    })
}).catch((ex) => {
    console.log(ex.stack)
    process.exit(1)
})
