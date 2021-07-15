import action from '../../action';

const { infoAction } = action

const initState = {
    detailCardInfo: {},
    cardScripts: []
}

export const infoReducer = (state = initState, action) => {
    const {
        UPDATE_DETAIL_CARD_INFO
        , UPDATE_CARD_SCRIPTS
    } = infoAction
    switch (action.type) {
        case UPDATE_DETAIL_CARD_INFO:
            return {
                ...state,
                detailCardInfo: action.detailCardInfo
            }
        case UPDATE_CARD_SCRIPTS:
            return {
                ...state,
                cardScripts: action.cardScripts
            }
        default:
            return {
                ...state
            }
    }
}

