import '@testing-library/jest-dom'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import Welcome from '.'
import themeColors from '../../config/theme-colors'
import { renderWithRedux } from '../../utils/test-utils'

describe('<Welcome />', () => {
    it('Render with redux', () => {
        const { getByTestId } = renderWithRedux(
            <ThemeProvider theme={themeColors}>
                <Welcome />
            </ThemeProvider>,
        )
        expect(getByTestId('welcome')).toMatchSnapshot()
    })
})
