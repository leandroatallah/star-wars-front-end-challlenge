import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Button from '../../components/button'
import { connect } from 'react-redux'
import { THEME_DARK_SIDE, THEME_LIGHT_SIDE } from '../../config'
import { setTheme } from '../../store/actions/themeAction'

export const Section = styled.section`
    margin-top: 210px;
    text-align: center;
    color: ${props => props.theme.colors.blue};
    
    @media screen and (max-width: 800px) {
        margin-top: 175px;
    }

    h1 {
        font-size: 72px;
        line-height: 1.2;
        margin-bottom: 7px;
        font-weight: 400;

        br {
            display: none;

            @media (max-width: 800px) {
                display: block;
            }
        }

        @media screen and (max-width: 800px) {
            font-size: 52px;
        }
        
        strong{
            font-weight: 700;
            
            @media screen and (max-width: 800px) {
                font-size: 56px;
            }
        }
    }
    h2 {
        font-size: 14px;
        line-height: 1.218;
        font-weight: 400;
        letter-spacing: calc(14px * 0.35);
        text-transform: uppercase;
        margin-bottom: 162px;
        
        @media screen and (max-width: 800px) {
            margin-bottom: 90px;
        }
    }
`

const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`

const WarningAlert = styled.div`
    display: inline-block;
    margin-top: 40px;
    border: 1px solid ${props => props.theme.colors.blue};
    padding: 10px 16px;
    border-radius: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 1.218;
    animation: ${fadeUp} 0.5s ease-in-out;
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

    function resetState() {
        setWarning(false)
        setLight(null)
        setDark(null)
        setIsLoading(false)
    }

    function handleStart() {
        resetState()
        setIsLoading(true)

        let start: number

        start = performance.now()
        fetch('https://swapi.dev/api/people/1').then(res => {
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
        fetch('https://swapi.dev/api/people/4').then(res => {
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
            console.log(`Light side: ${light} ms - Dark side: ${dark} ms`)
        }
    }, [light, dark])

    return (
        <Section data-testid="welcome">
            <h1>Welcome <br />to <strong>iClinic</strong></h1>
            <h2>Frontend Challenge</h2>
            <Button onClick={() => { void handleStart() }} loading={isLoading ? 1 : 0}>S T A R T</Button>

            {warning &&
                <div>
                    <WarningAlert data-testid="warning">Something went wrong, please try again.</WarningAlert>
                </div>
            }
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
