const puppeteer = require('puppeteer')
const model = require('../database/models')
const encoding = require('iconv-lite')

exports.test = async (id) => {
    id = 3
    let cardData = []
    let scripts = []
    try {
        cardData = await model.TB_IDOLS_CARDS.findAll({ where: { idol_id: id }, order: [['card_seq', 'ASC']] })
    } catch (error) {
        console.error(error)
        return ('fail')
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
                console.log(kanaMap[match])
                return kanaMap[match];
            })
            .replace(/ﾞ/g, '゛')
            .replace(/ﾟ/g, '゜')
            .split("[").join("［").split(']').join('］');
    }


    let cardNameList = cardData.map(a => a.dataValues.card_name).filter(a => !a.includes('+'))

    let allScripts = {}

    for (let card of cardNameList) {
        const temp = convertMap(card)
        const encodeName = encoding.encode(temp, 'EUC-JP')
        const encodeUri = encodeName.reduce((acc, val) => {
            return `${acc}%${val.toString(16)}`
        }, '')

        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(`https://seesaawiki.jp/imascg/d/${encodeUri}`)

        const data = await page.evaluate(sel => {
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
                        if (td[0].textContent === 'ガチャ') {
                            return ac
                        }
                        group = td[0].textContent
                        return [...ac, { index: i, title, group, text: td[1].textContent }]
                    }
                    return [...ac, { index: i, title, group, text: td[0].textContent }]
                }, [])
                return td
            })
            return d
        })
        await browser.close()
        allScripts = {
            ...allScripts,
            [card]: data
        }
    }

    return allScripts
}