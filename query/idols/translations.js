
const model = require('../../database/models')
const sequelize = require('sequelize')
const Op = sequelize.Op

exports.findCode = (req, res) => {
    model.TB_IDOLS.findAll().then(rst => {
        return res.json(rst)
    })
}

exports.findCodeByName = (req, res) => {
    const { name } = req.query
    model.TB_IDOLS_TRANSLATIONS.findAll({
        where: {
            trans_name: {
                [Op.like]: `%${name}%`
            }
        }
    }).then(rst => {
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
    model.TB_IDOLS.update({ trans_name: data.trans_name }, {
        where: {
            idol_id: data.idol_id
        }
    }).then((rst => {
        res.json({ result: true })
    }))
}

exports.insertData = async (req, res) => {
    const { data } = req.body
    const idol = await model.TB_IDOLS.findAll();

    for (const a of idol) {
        const { dataValues } = a
        if (!data[dataValues.idol_name]) {
            continue;
        }
        model.TB_IDOLS_TRANSLATIONS.create({ idol_id: dataValues.idol_id, trans_name: data[dataValues.idol_name] })
    }
    res.json({ result: true })
}
