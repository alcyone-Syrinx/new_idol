const express = require('express')
const next = require('next')
const axios = require('axios')
const path = require('path')
const bodyParser = require('body-parser')
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()
const sequelize = require('./database/models').sequelize
const query = require('./query')

app.prepare().then(() => {
    const server = express()
    server.use(bodyParser.json())
    server.use(express.static(path.join(__dirname, '/public')))
    server.use('/query', query)
    // sequelize.sync()

    server.get('/', (req, res) => {
        const page = '/index'
        return app.render(req, res, page, { title: 'next' })
    })

    server.get('/idols', (req, res) => {
        const page = '/item/idolSearch'
        const id = { id: req.query.hash }
        return app.render(req, res, page, id)
    })

    server.get('/admin', (req, res) => {
        const page = '/admin/insertPage'
        return app.render(req, res, page)
    })

    server.get('/card-info/:hash', (req, res) => {
        const page = '/card-info/cardInfo'
        const { hash } = req.params
        return app.render(req, res, page, { hash })
    })

    server.get('/card-trades/:hash', (req, res) => {
        const page = '/item/cardTrades'
        const { hash } = req.params
        const body = { hash }
        return app.render(req, res, page, body)
    })

    // api
    server.get('/api/category/codes', async (req, res) => {
        try {
            const codes = await axios.get(`https://pink-check.school/api/v2/codes`)
            res.json(codes.data)
        } catch (error) {
            res.sendStatus(400)
        }
    })

    server.post('/api/card-trades/:hash', async (req, res) => {
        const { hash } = req.params
        const { beginTime, endTime } = req.body
        console.log(beginTime, endTime)
        const queryUrl = beginTime ? `?beginTime=${beginTime}&endTime=${endTime}` : ``;
        try {
            const tradeInfo = await axios.get('https://pink-check.school/api/v2/trades/' + hash + queryUrl)
            res.json(tradeInfo.data)
        } catch (err) {
            console.log(err)
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

    server.get('/api/card-search', async (req, res) => {
        const { id, hash } = req.query

        if (!id && !hash) {
            res.json()
        }

        const queryUrl = id ? `?idolId=${id}` : `/${hash}`

        try {
            const data = await axios.get(`https://pink-check.school/api/v2/cards${queryUrl}`)
            res.json(data.data)
        } catch (error) {
            res.json()
        }
    })

    server.get('/api/rank', async (req, res) => {
        const { id } = req.query

        if (!id && !hash) {
            res.json()
        }

        const queryUrl = id ? `?idolId=${id}` : `/${hash}`

        try {
            const data = await axios.get(`https://pink-check.school/api/v2/eventdetails/431/rankings/points?systemId=${id}&rankingTypeId=1`)
            res.json(data.data)
        } catch (error) {
            console.log(error)
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
