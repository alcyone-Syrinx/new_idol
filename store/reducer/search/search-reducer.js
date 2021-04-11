import action from '../../action';

const { searchAction } = action

const initState = {
    idolData: [],
    imgData: [],
    inputValue: "",
    loadingDisplay: 'none',
    idolColor: '',
    codeCategory: [],
}

export const searchReduecer = (state = initState, action) => {
    switch (action.type) {
        case searchAction.UPDATE_INPUTVALUE:
            return {
                ...state,
                inputValue: action.inputValue
            }
        case searchAction.UPDATE_IDOL_COLOR:
            return {
                ...state,
                idolColor: action.idolColor
            }
        case searchAction.UPDATE_IMGDATA:
            console.log(action)
            return {
                ...state,
                imgData: action.imgData
            }
        case searchAction.UPDATE_CATEGORY:
            return {
                ...state,
                codeCategory: action.codeCategory
            }
        case searchAction.UPDATE_IDOL_DATA:
            return {
                ...state,
                idolData: action.idolData
            }
        case searchAction.UPDATE_LOADING_DISPLAY:
            return {
                ...state,
                loadingDisplay: action.loadingDisplay
            }
        case searchAction.SEARCH_CARD_DATA:
            return {
                ...state,
            }
        case searchAction.SEARCH_IDOL_DATA:
            return {
                ...state
            }
        case searchAction.CODE_API:
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}
