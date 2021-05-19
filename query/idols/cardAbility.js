const model = require('../../database/models')

exports.findAll = (req, res) => {
    model.TB_CARDS_ABILITY.findAll().then(rst => {
        return res.json(rst)
    })
}

exports.reg = (req, res) => {
    const { data } = req.body
    model.TB_CARDS_ABILITY.create(data).then((rst => {
        res.json({ result: true })
    }))
}
