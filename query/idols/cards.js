
const model = require('../../database/models')

exports.findAll = (req, res) => {
    model.TB_IDOLS_CARDS.findAll().then(rst => {
        return res.json(rst)
    })
}

exports.findByIdolId = (req, res) => {
    const { idolId } = req.query
    try {
        model.TB_IDOLS_CARDS.findAll({ where: { idol_id: idolId }, order: [[card_seq, 'ASC']] }).then(rst => { return res.json(rst) })
    } catch (error) {
        console.error(error)
        return res.json('fail')
    }
}

exports.findByHash = (req, res) => {
    const { hash } = req.query
    try {
        model.TB_IDOLS_CARDS.findAll({ where: { card_hash: hash } }).then(rst => { return res.json(rst) })
    } catch (error) {
        console.error(error)
        return res.json('fail')
    }
}

exports.reg = (req, res) => {
    const { data } = req.body
    model.TB_IDOLS_CARDS.create(data).then((rst => {
        res.json({ result: true })
    }))
}
