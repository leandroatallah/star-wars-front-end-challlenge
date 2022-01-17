import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'
import Button from '../button'
import imgVader from '../../images/darth-vader.png'
import imgLuke from '../../images/luke-skywalker.png'
import { THEME_DARK_SIDE } from '../../config'
import { setTheme } from '../../store/actions/themeAction'

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

export const BackButton = styled.button<ThemeStyle>`
    width: 129px;
    height: 47px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 35px;
    left: 48px;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;

    span {
        display: inline-block;
        padding-left: 20px;
        font-size: 18px;
        line-height: 1.22;
    }
`

export const AnchorBack = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    padding: 0 9.31px;
    display: flex;
    align-items: center;
`

export const Inner = styled.div<ThemeStyle>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0;

    @media screen and (max-width: 799px) {
        padding: 190px 0 100px;
    }

    h2 {
        font-family: Montserrat;
        font-size: 36px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.218;
        letter-spacing: 0em;
        margin-bottom: 40px;
        
        strong {
            font-weight: 700;

            @media screen and (max-width: 799px) {
                display: block;
            }
        }
    }
`

export const MasterWrapper = styled.div`
    text-align: center;

    @media screen and (max-width: 799px) {
        order: -1;
    }
`

export const Section = styled.section<ThemeStyle>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.themeStyle === THEME_DARK_SIDE ? props.theme.colors.black : props.theme.colors.yellow};
    text-align: center;
    animation: ${fadeIn} .5s ease-in-out;
    min-height: 100vh;

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
    margin: 91px auto 50px;
    max-width: 380px;
    height: auto;

    @media screen and (max-width: 799px) {
        margin: 20px auto 30px;
        max-width: 302px;
    }
`

type ThemeStyle = {
    themeStyle?: string
}

type MasterProps = {
    theme: string
    setNewTheme: (theme: string) => void
}

type ThemeState = {
    theme: string
}

const MasterResults = ({ theme, setNewTheme }: MasterProps): JSX.Element => {
    return (
        <Section themeStyle={theme} data-testid="master-results">
            <BackButton onClick={() => { setNewTheme('') }}>
                <AnchorBack>
                    <svg width="31" height="26" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M31.0001 11.3333H6.69006L15.5117 2.51166L13.1551 0.154999L0.310059 13L13.1551 25.845L15.5117 23.4883L6.69006 14.6667H31.0001V11.3333Z" />
                    </svg>
                </AnchorBack>
                <span>back</span>
            </BackButton>
            <Inner>
                <Button size="sm" onClick={() => { setNewTheme('') }}>choose your path again, Padawan</Button>

                <MasterWrapper>
                    <MasterImg src={theme === THEME_DARK_SIDE ? imgVader : imgLuke} alt="" />
                    <h2>Your master is <strong>{theme === THEME_DARK_SIDE ? 'Darth Vader' : 'Luke Skywalker'}</strong></h2>
                </MasterWrapper>
            </Inner>
        </Section>
    )
}

const mapStateToProps = (state: ThemeState) => ({
    theme: state.theme,
})

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: string }) => unknown) => {
    return {
        setNewTheme(newTheme: string): void {
            const action = setTheme(newTheme)
            dispatch(action)
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterResults)
