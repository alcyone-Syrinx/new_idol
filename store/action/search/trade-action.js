export const UPDATE_IDOL_ID = 'UPDATE_IDOL_ID'
export const UPDATE_DISPLAY_HANDLER = 'UPDATE_DISPLAY_HANDLER'
export const UPDATE_CARD_INFO = 'UPDATE_CARD_INFO'
export const UPDATE_TRADE_TIMES = 'UPDATE_TRADE_TIMES'
export const GET_CARD_BASIC_INFO = 'GET_CARD_BASIC_INFO'
export const GET_CARD_TRADE_INFO = 'GET_CARD_TRADE_INFO'


export const getCardBasicInfo = (hash) => {
    return {
        type: GET_CARD_BASIC_INFO,
        payload: {
            hash
        }
    }
}

export const getCardTradeInfo = (hash) => {
    return {
        type: GET_CARD_TRADE_INFO,
        payload: {
            hash
        }
    }
}

export const updateIdolId = (idolId) => {
    return {
        type: UPDATE_IDOL_ID,
        payload: {
            idolId
        }
    }
}

export const updateDisplayHandler = (displayHandler) => {
    return {
        type: UPDATE_DISPLAY_HANDLER,
        payload: {
            displayHandler
        }
    }
}

export const updateCardInfo = (cardInfo) => {
    return {
        type: UPDATE_CARD_INFO,
        payload: {
            cardInfo
        }
    }
}

export const updateTradeTimes = (tradeTimes) => {
    return {
        type: UPDATE_TRADE_TIMES,
        payload: {
            tradeTimes
        }
    }
}
