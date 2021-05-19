
const model = require('../../database/models')

exports.findAll = (req, res) => {
    model.TB_IDOLS_CARDS.findAll().then(rst => {
        return res.json(rst)
    })
}

exports.reg = (req, res) => {
    const { data } = req.body
    model.TB_IDOLS_CARDS.create(data).then((rst => {
        res.json({ result: true })
    }))
}
