import '@testing-library/jest-dom'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import App from './App'
import themeColors from './config/theme-colors'
import { THEME_DARK_SIDE, THEME_LIGHT_SIDE } from './config'
import { cleanup, fireEvent } from '@testing-library/react'
import { createStore } from 'redux'
import { renderWithRedux } from './utils/test-utils'
import { waitFor } from '@testing-library/dom'
import { rest } from 'msw'
import { server } from './mocks/server'

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

    it('should fetch swapi and show light side master if get light side result', async () => {
        const { getByTestId } = renderWithRedux(
            <ThemeProvider theme={themeColors}>
                <App />
            </ThemeProvider>,
        )

        // Delay dark side request with delay
        server.resetHandlers(
            rest.get('https://swapi.dev/api/people/1', (req, res, ctx) => res(ctx.json({ name: 'Luke Skywalker' }))),
            rest.get('https://swapi.dev/api/people/4', (req, res, ctx) => res(
                ctx.delay(500),
                ctx.json({ name: 'Darth Vader' })),
            ),
        )

        const welcome = getByTestId('welcome')
        const button = welcome.querySelector('button')
        fireEvent.click(button)

        await waitFor(() => {
            expect(welcome).not.toBeInTheDocument()
            expect(getByTestId('master-results')).toBeInTheDocument()
            expect(getByTestId('master-results').querySelector('h2 strong')).toHaveTextContent('Luke Skywalker')
        })
    })

    it('should fetch swapi and show dark side master if get dark side result', async () => {
        const { getByTestId } = renderWithRedux(
            <ThemeProvider theme={themeColors}>
                <App />
            </ThemeProvider>,
        )

        // Delay light side request with delay
        server.resetHandlers(
            rest.get('https://swapi.dev/api/people/1', (req, res, ctx) => res(
                ctx.delay(500),
                ctx.json({ name: 'Luke Skywalker' })),
            ),
            rest.get('https://swapi.dev/api/people/4', (req, res, ctx) => res(ctx.json({ name: 'Darth Vader' })),
            ),
        )

        const welcome = getByTestId('welcome')
        const button = welcome.querySelector('button')
        fireEvent.click(button)

        await waitFor(() => {
            expect(welcome).not.toBeInTheDocument()
            expect(getByTestId('master-results')).toBeInTheDocument()
            expect(getByTestId('master-results').querySelector('h2 strong')).toHaveTextContent('Darth Vader')
        })
    })

    it('should fetch swapi and show warning if get no api result', async () => {
        const { getByTestId, getByRole } = renderWithRedux(
            <ThemeProvider theme={themeColors}>
                <App />
            </ThemeProvider>,
        )

        // Delay light side request with delay
        server.resetHandlers(
            rest.get('https://swapi.dev/api/people/1', (req, res, ctx) => res(
                ctx.status(500),
            )),
            rest.get('https://swapi.dev/api/people/4', (req, res, ctx) => res(
                ctx.status(500),
            )),
        )

        const button = getByRole('button')
        fireEvent.click(button)

        await waitFor(() => {
            expect(getByTestId('welcome')).toBeInTheDocument()
            expect(() => getByTestId('master-results')).toThrow()
            expect(getByTestId('warning')).toBeInTheDocument()
        })
    })

    it('should hide warning if click on start', async () => {
        const { getByTestId, getByRole } = renderWithRedux(
            <ThemeProvider theme={themeColors}>
                <App />
            </ThemeProvider>,
        )

        // Delay light side request with delay
        server.resetHandlers(
            rest.get('https://swapi.dev/api/people/1', (req, res, ctx) => res(
                ctx.status(500),
            )),
            rest.get('https://swapi.dev/api/people/4', (req, res, ctx) => res(
                ctx.status(500),
            )),
        )

        const button = getByRole('button')
        fireEvent.click(button)

        await waitFor(() => {
            expect(getByTestId('warning')).toBeInTheDocument()
        })

        fireEvent.click(button)

        expect(() => getByTestId('warning')).toThrow()
    })
})
