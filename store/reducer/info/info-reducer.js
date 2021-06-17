import action from '../../action';

const { infoAction } = action

const initState = {
    detailCardInfo: {}
}

export const infoReducer = (state = initState, action) => {
    const {
        UPDATE_DETAIL_CARD_INFO
    } = infoAction
    switch (action.type) {
        case UPDATE_DETAIL_CARD_INFO:
            return {
                ...state,
                detailCardInfo: action.detailCardInfo
            }
        default:
            return {
                ...state
            }
    }
}

