
const model = require('../../database/models')

exports.findCode = (req, res) => {
    model.TB_IDOLS.findAll().then(rst => {
        return res.json(rst)
    })
}

exports.reg = (req, res) => {
    const { data } = req.body
    model.TB_IDOLS.create(data).then((rst => {
        res.json({ result: true })
    }))
}

exports.update = (req, res) => {
    const { data } = req.body
    model.TB_IDOLS.update({ idol_trans_name: data.idol_trans_name }, {
        where: {
            idol_id: data.idol_id
        }
    }).then((rst => {
        res.json({ result: true })
    }))
}
