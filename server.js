const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {
    const server = express();

    server.get('/', (req, res) => {
        const page = '/index'
        return app.render(req, res, page, { title: 'next' })
    })

    server.get('/idol', (req, res) => {
        const page = '/item/idolSearch';
        const id = { id: req.query.hash };
        return app.render(req, res, page, id);
    })

    server.get('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(3002, (err) => {
        if (err) throw err

        console.log('localhost 3002 listen')
    })
}).catch((ex) => {
    console.log(ex.stack)
    process.exit(1)
})