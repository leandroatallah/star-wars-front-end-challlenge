import '@testing-library/jest-dom'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import Button from '.'
import themeColors from '../../config/theme-colors'
import { THEME_DARK_SIDE, THEME_LIGHT_SIDE } from '../../config'
import { cleanup } from '@testing-library/react'
import { createStore } from 'redux'
import { renderWithRedux } from '../../utils/test-utils'

afterEach(cleanup)

describe('<Button />', () => {
    it('Render with redux', () => {
        const { getByTestId } = renderWithRedux(
            <ThemeProvider theme={themeColors} >
                <Button>Button Text </Button>)
            </ThemeProvider>,
        )
        expect(getByTestId('button')).toMatchSnapshot()
    })

    it('should have blue background and white color by default', () => {
        const { getByTestId } = renderWithRedux(
            <ThemeProvider theme={themeColors} >
                <Button>Button Text </Button>)
            </ThemeProvider>,
        )
        expect(getByTestId('button')).toHaveStyleRule('background-color', themeColors.colors.blue)
        expect(getByTestId('button')).toHaveStyleRule('color', themeColors.colors.white)
    })

    it('should have black background and yellow color when theme is set to light', () => {
        const store = createStore(() => ({ theme: THEME_LIGHT_SIDE }))
        const { getByTestId } = renderWithRedux(
            <ThemeProvider theme={themeColors} >
                <Button>Button Text </Button>)
            </ThemeProvider>,
            { store },
        )
        expect(getByTestId('button')).toHaveStyleRule('background-color', themeColors.colors.black)
        expect(getByTestId('button')).toHaveStyleRule('color', themeColors.colors.yellow)
    })

    it('should have white background and black color when theme is set to dark', () => {
        const store = createStore(() => ({ theme: THEME_DARK_SIDE }))
        const { getByTestId } = renderWithRedux(
            <ThemeProvider theme={themeColors} >
                <Button>Button Text </Button>)
            </ThemeProvider>,
            { store },
        )
        expect(getByTestId('button')).toHaveStyleRule('background-color', themeColors.colors.white)
        expect(getByTestId('button')).toHaveStyleRule('color', themeColors.colors.black)
    })
})
