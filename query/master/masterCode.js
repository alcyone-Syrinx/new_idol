const model = require('../../database/models')

exports.findCode = (req, res) => {
    model.TB_MASTER_CODE.findAll().then(rst => {
        return res.json(rst)
    })
}

exports.reg = (req, res) => {
    const { data } = req.body
    model.TB_MASTER_CODE.create(data).then((rst => {
        res.json({ result: true })
    }))
}