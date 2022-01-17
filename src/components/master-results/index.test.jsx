import '@testing-library/jest-dom'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import MasterResults from '.'
import themeColors from '../../config/theme-colors'
import { THEME_DARK_SIDE, THEME_LIGHT_SIDE } from '../../config'
import { cleanup } from '@testing-library/react'
import { createStore } from 'redux'
import { renderWithRedux } from '../../utils/test-utils'

afterEach(cleanup)

describe('<MasterResults />', () => {
    it('Render with redux', () => {
        const { getByTestId } = renderWithRedux(
            <ThemeProvider theme={themeColors}>
                <MasterResults />
            </ThemeProvider>,
        )
        expect(getByTestId('button')).toMatchSnapshot()
    })

    it('should have Luke Skywalker as master when light theme is setted', () => {
        const store = createStore(() => ({ theme: THEME_LIGHT_SIDE }))
        const { getByRole } = renderWithRedux(
            <ThemeProvider theme={themeColors}>
                <MasterResults />
            </ThemeProvider>,
            { store },
        )
        expect(getByRole('heading')).toHaveTextContent('Luke Skywalker')
    })

    it('should have Darth Vader as master when dark theme is setted', () => {
        const store = createStore(() => ({ theme: THEME_DARK_SIDE }))
        const { getByRole } = renderWithRedux(
            <ThemeProvider theme={themeColors}>
                <MasterResults />
            </ThemeProvider>,
            { store },
        )
        expect(getByRole('heading')).toHaveTextContent('Darth Vader')
    })
})
