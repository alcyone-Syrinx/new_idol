import action from '../../action';
import moment from 'moment'

const { tradeAction } = action

const initState = {
    idolId: '',
    displayHandler: {
        showCardList: false,
        showTardChart: false,
        loading: true,
        idolCardsView: 'none'
    },
    cardInfo: {
        cardName: '',
        cardTradeInfos: []
    },
    tradeTimes: {
        beginTime: moment().add("-30", "d").format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD')
    }
}

export const tradeReducer = (state = initState, action) => {
    const { payload } = action

    switch (action.type) {
        case tradeAction.GET_CARD_BASIC_INFO: {
            return {
                ...state
            }
        }
        case tradeAction.GET_CARD_TRADE_INFO: {
            return {
                ...state
            }
        }
        case tradeAction.UPDATE_CARD_INFO: {
            return {
                ...state,
                cardInfo: payload.cardInfo
            }
        }
        case tradeAction.UPDATE_DISPLAY_HANDLER: {
            return {
                ...state,
                displayHandler: payload.displayHandler
            }
        }
        case tradeAction.UPDATE_IDOL_ID: {
            return {
                ...state,
                idolId: payload.idolId
            }
        }
        case tradeAction.UPDATE_TRADE_TIMES: {
            return {
                ...state,
                tradeTimes: payload.tradeTimes
            }
        }
        default:
            return {
                ...state
            }
    }
}
