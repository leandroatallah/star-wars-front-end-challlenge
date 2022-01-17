import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { CHANGE_THEME } from '../config'
import { createStore, Store } from 'redux'

const startingState = { theme: '' }
function reducer(state = startingState, action: { type: string; payload: string }) {
    switch (action.type) {
        case CHANGE_THEME:
            return { ...state, theme: action.payload }
        default:
            return state
    }
}

type storeProps = {
    initialState?: {
        theme: string
    },
    store?: Store<{
        theme: string;
    }, {
        type: string;
        payload: string;
    }>
}

export function renderWithRedux(
    component: JSX.Element,
    { initialState, store = createStore(reducer, initialState) }: storeProps = {},
) {
    return {
        ...render(<Provider store={store} > {component} </Provider>),
    }
}
