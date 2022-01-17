import styled from 'styled-components'
import { connect } from 'react-redux'
import Button from '../button'
import imgVader from '../../images/darth-vader.png'
import imgLuke from '../../images/luke-skywalker.png'
import { THEME_DARK_SIDE } from '../../config'
import { setTheme } from '../../store/actions/themeAction'

export const BackButton = styled.button<ThemeStyle>`
    display: inline-flex;
    align-items: center;
    position: absolute;
    top: 45px;
    left: 52px;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;

    span {
        display: inline-block;
        margin-left: 14px;
        font-size: 18px;
        line-height: 1.22;
    }
`

export const Inner = styled.div<ThemeStyle>`
    margin: 175px auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
        font-family: Montserrat;
        font-size: 36px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.218;
        letter-spacing: 0em;
        
        strong {
            font-weight: 700;
        }
    }
`

export const Section = styled.section<ThemeStyle>`
    background-color: ${props => props.themeStyle === THEME_DARK_SIDE ? props.theme.colors.black : props.theme.colors.yellow};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;

    ${BackButton} {
        color: ${props => props.themeStyle === THEME_DARK_SIDE ? props.theme.colors.white : props.theme.colors.black};

        svg {
            fill: ${props => props.themeStyle === THEME_DARK_SIDE ? props.theme.colors.white : props.theme.colors.black};
        }
    }

    ${Inner} {
        h2 {
            color: ${props => props.themeStyle === THEME_DARK_SIDE ? props.theme.colors.white : props.theme.colors.black};
        }
    }
`

export const MasterImg = styled.img`
    display: block;
    border-radius: 50%;
    margin: 90px 0 50px;
`

type ThemeStyle = {
    themeStyle?: string
}

type MasterProps = {
    theme: string
    setTheme: (theme: string) => void
}

type ThemeState = {
    theme: string
}

const MasterResults = ({ theme, setTheme }: MasterProps): JSX.Element => {
    return (
        <Section themeStyle={theme} data-testid="master-results">
            <BackButton onClick={() => { setTheme('') }}>
                <svg width="31" height="26" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.0001 11.3333H6.69006L15.5117 2.51166L13.1551 0.154999L0.310059 13L13.1551 25.845L15.5117 23.4883L6.69006 14.6667H31.0001V11.3333Z" />
                </svg>
                <span>back</span>
            </BackButton>
            <Inner>
                <Button size="sm" onClick={() => { setTheme('') }}>choose your path again, Padawan</Button>

                <MasterImg src={theme === THEME_DARK_SIDE ? imgVader : imgLuke} alt="" />

                <h2>Your master is <strong>{theme === THEME_DARK_SIDE ? 'Darth Vader' : 'Luke Skywalker'}</strong></h2>
            </Inner>
        </Section>
    )
}

const mapStateToProps = (state: ThemeState) => ({
    theme: state.theme,
})

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: string }) => unknown) => {
    return {
        setTheme() {
            const action = setTheme('')
            dispatch(action)
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterResults)
