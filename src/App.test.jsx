import '@testing-library/jest-dom'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import App from './App'
import themeColors from './config/theme-colors'
import { THEME_DARK_SIDE, THEME_LIGHT_SIDE } from './config'
import { cleanup, fireEvent } from '@testing-library/react'
import { createStore } from 'redux'
import { renderWithRedux } from './utils/test-utils'

afterEach(cleanup)

describe('<App />', () => {
    it('Render with redux', () => {
        const { container } = renderWithRedux(<App />)
        expect(container).toMatchSnapshot()
    })

    it('should render the Welcome and not render MasterResults by default', () => {
        const { getByTestId } = renderWithRedux(<App />)
        expect(getByTestId('welcome')).toBeInTheDocument()
        expect(() => getByTestId('master-results')).toThrow()
    })

    it('should render MasterResults and not render Welcome when dark theme is setted', () => {
        const store = createStore(() => ({ theme: THEME_DARK_SIDE }))
        const { getByTestId } = renderWithRedux(<App />, { store })
        expect(getByTestId('master-results')).toBeInTheDocument()
        expect(() => getByTestId('welcome')).toThrow()
    })

    it('should render MasterResults and not render Welcome when light theme is setted', () => {
        const store = createStore(() => ({ theme: THEME_LIGHT_SIDE }))
        const { getByTestId } = renderWithRedux(<App />, { store })
        expect(getByTestId('master-results')).toBeInTheDocument()
        expect(() => getByTestId('welcome')).toThrow()
    })

    it('should fetch swapi and show light side master if get light side result', () => {
        const { getByTestId } = renderWithRedux(
            <ThemeProvider theme={themeColors}>
                <App />
            </ThemeProvider>,
        )
        const welcome = getByTestId('welcome')
        const button = welcome.querySelector('button')
        fireEvent.click(button)
    })

    // it('should fetch swapi and show dark side master if get dark side result', () => {
    //     const { getByTestId, getByRole } = renderWithRedux(
    //         <ThemeProvider theme={themeColors}>
    //             <App />
    //         </ThemeProvider>,
    //     )
    //     const button = getByRole('button')
    //     fireEvent.click(button)
    //     // expect()
    // })

    // it('should fetch swapi and show warning if get no api result', () => {
    //     const { getByTestId, getByRole } = renderWithRedux(
    //         <ThemeProvider theme={themeColors}>
    //             <App />
    //         </ThemeProvider>,
    //     )
    //     const button = getByRole('button')
    //     fireEvent.click(button)
    //     expect(getByTestId('warning')).toBeInTheDocument()
    // })
})
