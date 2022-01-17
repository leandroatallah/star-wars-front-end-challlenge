import { CHANGE_THEME } from '../../config'

type StateProp = {
    theme: string
}

type ActionProp = {
    type: string,
    payload: string
}

const initialState: StateProp = {
    theme: '',
}

const themeReducer = (state = initialState, action: ActionProp) => {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                theme: action.payload,
            }
        default:
            return state
    }
}

export default themeReducer
