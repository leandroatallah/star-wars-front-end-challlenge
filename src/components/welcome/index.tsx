import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/button'
import { connect } from 'react-redux'
import { THEME_DARK_SIDE, THEME_LIGHT_SIDE } from '../../config'
import { setTheme } from '../../store/actions/themeAction'

export const Section = styled.section`
    margin-top: 210px;
    text-align: center;
    color: ${props => props.theme.colors.blue};

    h1 {
        font-size: 72px;
        line-height: 1.2;
        margin-bottom: 7px;
        font-weight: 400;

        strong{
            font-weight: 700;
        }
    }
    h2 {
        font-size: 14px;
        line-height: 1.218;
        font-weight: 400;
        letter-spacing: calc(14px * 0.35);
        text-transform: uppercase;
        margin-bottom: 162px;
    }
`

const WarningAlert = styled.div<{ show: boolean }>`
    opacity: ${props => props.show ? '1' : '0'};
    display: inline-block;
    margin-top: 40px;
    border: 1px solid ${props => props.theme.colors.blue};
    padding: 10px 16px;
    border-radius: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 1.218;
`

type Props = {
    setNewTheme: (theme: string) => void
}

type ThemeState = {
    theme: string
}

const Welcome = ({ setNewTheme }: Props): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false)
    const [light, setLight] = useState<number | null>(null)
    const [dark, setDark] = useState<number | null>(null)
    const [warning, setWarning] = useState(false)

    function resetState(): void {
        setWarning(false)
        setLight(null)
        setDark(null)
        setIsLoading(false)
    }

    async function handleStart(): Promise<void> {
        resetState()
        setIsLoading(true)

        let start: number

        start = performance.now()
        await fetch('https://swapi.dev/api/people/1').then(res => {
            return res.json()
        }).then(res => {
            const end = performance.now()
            setLight(end - start)
            return res
        }).catch(() => {
            resetState()
            setWarning(true)
            return
        })

        start = performance.now()
        await fetch('https://swapi.dev/api/people/4').then(res => {
            return res.json()
        }).then(res => {
            const end = performance.now()
            setDark(end - start)
            return res
        }).catch(() => {
            resetState()
            setWarning(true)
            return
        })
    }

    useEffect(() => {
        if (light && dark) {
            setIsLoading(false)

            if (light < dark) {
                setNewTheme(THEME_LIGHT_SIDE)
            }
            else if (dark < light) {
                setNewTheme(THEME_DARK_SIDE)
            } else {
                void handleStart()
            }
            console.log(`Light side: ${light}ms - Dark side: ${dark}ms`)
        }
    }, [light, dark])

    return (
        <Section data-testid="welcome">
            <h1>Welcome to <strong>iClinic</strong></h1>
            <h2>Frontend Challenge</h2>
            <Button onClick={() => { void handleStart() }} loading={isLoading}>S T A R T</Button>

            <div>
                <WarningAlert show={warning}>Something went wrong, please try again.</WarningAlert>
            </div>
        </Section>
    )
}

const mapStateToProps = (state: ThemeState) => {
    return ({
        theme: state.theme,
    })
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: string }) => unknown) => {
    return {
        setNewTheme(newTheme: string): void {
            const action = setTheme(newTheme)
            dispatch(action)
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
