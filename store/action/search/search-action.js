export const UPDATE_INPUTVALUE = 'UPDATE_INPUTVALUE'
export const UPDATE_IDOL_DATA = 'UPDATE_IDOL_DATA'
export const UPDATE_IMGDATA = 'UPDATE_IMGDATA'
export const UPDATE_IDOL_COLOR = 'UPDATE_IDOL_COLOR'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
export const UPDATE_LOADING_DISPLAY = 'UPDATE_LOADING_DISPLAY'
export const SEARCH_CARD_DATA = 'SEARCH_CARD_DATA'
export const SEARCH_IDOL_DATA = 'SEARCH_IDOL_DATA'
export const CODE_API = 'CODE_API'
export const UPDATE_MODAL_DISPLAY = 'UPDATE_MODAL_DISPLAY'
export const UPDATE_OVERLAP_IDOLS = 'UPDATE_OVERLAP_IDOLS'
export const RESET_MODAL = 'RESET_MODAL'

export const updateInputvalue = (inputValue) => {
    return {
        type: UPDATE_INPUTVALUE,
        inputValue
    }
}

export const updateIdolData = (idolData) => {
    return {
        type: UPDATE_IDOL_DATA,
        idolData
    }
}

export const updateImgData = (imgData) => {
    return {
        type: UPDATE_IMGDATA,
        imgData
    }
}

export const updateCategory = (codeCategory) => {
    return {
        type: UPDATE_CATEGORY,
        codeCategory
    }
}

export const updateLoadingDisplay = (loadingDisplay) => {
    return {
        type: UPDATE_LOADING_DISPLAY,
        loadingDisplay
    }
}

export const updateOverLapIdols = (overlapIdols) => {
    return {
        type: UPDATE_OVERLAP_IDOLS,
        overlapIdols
    }
}

export const updateIdolColor = (idolColor) => {
    return {
        type: UPDATE_IDOL_COLOR,
        idolColor
    }
}

export const updateModalDisplay = (modalDisplay) => {
    return {
        type: UPDATE_MODAL_DISPLAY,
        modalDisplay
    }
}

export const searchCardData = (inputValue) => {
    return {
        type: SEARCH_CARD_DATA,
        inputValue
    }
}

export const searchIdolData = () => {
    return {
        type: SEARCH_IDOL_DATA
    }
}

export const codeApi = () => {
    return {
        type: CODE_API
    }
}

export const resetModal = () => {
    return {
        type: RESET_MODAL
    }
}

