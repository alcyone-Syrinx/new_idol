const express = require('express')
const router = express.Router()
const raw = require('./ect/raw')
const idols = require('./idols/idols')
const master = require('./master/masterCode')
const translations = require('./idols/translations')
const cards = require('./idols/cards')
const cardAbility = require('./idols/cardAbility')

/**raw query */
router.get('/raw/findCardData', raw.findCardData)

/**master */
router.put('/master/reg', master.reg)

/**idols */
router.put('/idols/reg', idols.reg)
router.get('/idols/findById', idols.findById)
router.get('/idols/findCode', idols.findCode)
router.put('/idols/update', idols.update)

/**translations */
router.get('/translations/findAll', translations.findCode)
router.put('/translations/insertData', translations.insertData)
router.get('/translations/findCodeByName', translations.findCodeByName)

/**cards */
router.put('/cards/reg', cards.reg)
router.get('/cards/findByIdolId', cards.findByIdolId)
router.get('/cards/findByHash', cards.findByHash)

/**cardAbility */
router.put('/cardAbility/reg', cardAbility.reg)

module.exports = router;