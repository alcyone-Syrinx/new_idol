const puppeteer = require('puppeteer')
const model = require('../database/models')
const encoding = require('iconv-lite')
const client_id = 'cWVxE2ldPxuJdAabt081'
// const client_id = 'zKvwRS8fK5eXMmTP2Ewb'
const client_secret = '8PZSLcMOLW'
// const client_secret = '1JOkWx6b0L'
const axios = require('axios')

const sleep = (ms) => {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {
    }
}

const translate = async (text) => {
    const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    const body = { 'source': 'ja', 'target': 'ko', 'text': text }
    const header =
    {
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    }
    const data = await axios.post(api_url, body, header).then(rst => rst.data).catch(e => {
        console.log(e)
    })
    return (data?.message?.result.translatedText)
}

const convertMap = (str) => {
    const kanaMap = {
        'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
        'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
        'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
        'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
        'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
        'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
        'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
        'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
        'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
        'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
        'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
        'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
        'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
        'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
        'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
        'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
        'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
        'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
        '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・', '[': '［', ']': '］'
    };

    const reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    return str
        .replace(reg, function (match) {
            return kanaMap[match];
        })
        .replace(/ﾞ/g, '゛')
        .replace(/ﾟ/g, '゜')
        .split("[").join("［").split(']').join('］');
}

exports.trans = async () => {
    translate('test')
}

exports.test = async (id) => {
    let cardData = []
    try {
        cardData = await model.TB_IDOLS_CARDS.findAll({ where: { idol_id: id }, order: [['card_seq', 'ASC']] })
    } catch (error) {
        console.error(error)
        return ('fail')
    }

    let cardNameList = cardData.map(a => a.dataValues.card_name).filter(a => !a.includes('+'))
    let allScripts = []
    const cardHashMap = cardData.reduce((acc, val) => {
        return {
            ...acc,
            [val.card_name]: val.card_hash
        }
    }, {})

    for (let card of cardNameList) {
        const temp = convertMap(card)
        const encodeName = encoding.encode(temp, 'EUC-JP')
        const encodeUri = encodeName.reduce((acc, val) => {
            return `${acc}%${val.toString(16)}`
        }, '')
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()

        await page.goto(`https://seesaawiki.jp/imascg/d/${encodeUri}`)

        const data = await page.evaluate(({ cardData, card }) => {
            const el = Array.from(document.querySelectorAll('.wiki-section-body-2'))
            const d = el.filter(val => val.textContent.includes('あいさつ')).map(val => {
                const tableBody = Array.from(val.querySelectorAll('table > tbody > tr'))
                let title = ''
                let group = ''
                const td = tableBody.reduce((ac, a, i) => {
                    const td = a.querySelectorAll('td')

                    if (['あいさつ', 'お仕事', '親愛度MAX', '加入'].includes(td[0].textContent) && td.length < 2) {
                        title = td[0].textContent
                        return ac
                    }

                    if (td.length > 1) {
                        if (td[0].textContent === 'ガチャ' && td[1].textContent === '') {
                            return ac
                        }
                        group = td[0].textContent
                        return [...ac, { script_id: i, script_category: title, script_group: group, card_script: td[1].textContent }]
                    }
                    return [...ac, { script_id: i, script_category: title, script_group: group, card_script: td[0].textContent }]
                }, [])
                return td
            })
            return d
        }, { cardData, card })

        await browser.close()

        allScripts = [
            ...allScripts,
            { [card]: data }
        ]
    }

    if (allScripts) {
        const reduceScripts = allScripts.map(item => {
            const key = Object.keys(item)
            const bf = item[key][0]
            const af = item[key][1]
            return {
                [key]: bf,
                [`${key}+`]: af
            }
        })

        for (let item of reduceScripts) {
            const keys = Object.keys(item)
            for (let key of keys) {
                if (cardHashMap[key]) {
                    const scripts = item[key]
                    if (!scripts) continue
                    for (let script of scripts) {
                        await model.TB_IDOLS_SCRIPTS.findOne({ where: { card_script: script.card_script } }).then(async (rst) => {
                            if (!rst) {
                                console.log('new')
                                await model.TB_IDOLS_SCRIPTS.create({ ...script, idol_id: id, card_hash: cardHashMap[key] })
                            } else {
                                const { trans_script } = rst
                                if (!trans_script) {
                                    console.log('trans')
                                    const transData = await translate(script.card_script)
                                    await model.TB_IDOLS_SCRIPTS.upsert({ ...script, idol_id: id, card_hash: cardHashMap[key], trans_script: transData })
                                    await sleep(1000)
                                }
                            }
                        })
                    }
                }
            }
        }
    }

    return 'done'
}