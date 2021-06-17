export const UPDATE_DETAIL_CARD_INFO = 'UPDATE_DETAIL_CARD_INFO'

export const updateDetailCardInfo = (detailCardInfo) => {
    return {
        type: UPDATE_DETAIL_CARD_INFO,
        detailCardInfo
    }
}