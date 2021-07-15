export const UPDATE_DETAIL_CARD_INFO = 'UPDATE_DETAIL_CARD_INFO'
export const UPDATE_CARD_SCRIPTS = 'UPDATE_CARD_SCRIPTS'

export const updateDetailCardInfo = (detailCardInfo) => {
    return {
        type: UPDATE_DETAIL_CARD_INFO,
        detailCardInfo
    }
}

export const updateCardScripts = (cardScripts) => {
    return {
        type: UPDATE_CARD_SCRIPTS,
        cardScripts
    }
}
