const model = require('../../database/models')

exports.findByHash = (req, res) => {
    const { card_hash } = req.query
    model.TB_IDOLS_SCRIPTS.findAll({ where: { card_hash }, order: [['script_id', 'ASC']] }).then(rst => { return res.json(rst) })
}