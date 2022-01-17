import { createStore } from 'redux'
import themeReducer from './reducers/themeReducer'

function storeConfig() {
    return createStore(themeReducer)
}

export default storeConfig
