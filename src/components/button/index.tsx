import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { THEME_DARK_SIDE, THEME_LIGHT_SIDE } from '../../config'

export const ButtonStyle = styled.button<ButtonProps>`
    background-color: ${props => {
        switch (props.themeStyle) {
            case THEME_DARK_SIDE:
                return props.theme.colors.white
            case THEME_LIGHT_SIDE:
                return props.theme.colors.black
            default:
                return props.theme.colors.blue
        }
    }};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    font-size: ${props => props.size == 'sm' ? '16' : '18'}px;
    line-height: 1.218;
    font-weight: 700;
    padding: 0 37px;
    border-radius: 10px;
    color: ${props => {
        switch (props.themeStyle) {
            case THEME_DARK_SIDE:
                return props.theme.colors.black
            case THEME_LIGHT_SIDE:
                return props.theme.colors.yellow
            default:
                return props.theme.colors.white
        }
    }};
    cursor: ${props => props.loading ? 'not-allowed' : 'pointer'};
    pointer-events: ${props => props.loading ? 'none' : 'auto'};
    transition: all .2s ease-out;

    &:hover {
        opacity: 0.8;
    }

    svg {
        display: ${props => props.loading ? 'inline-block' : 'none'};
        width: 20px;
        height: 20px;
        margin: 0;
        margin-left: 10px;
        vertical-align: middle;
    }
`

type ButtonProps = {
    theme?: string
    themeStyle?: string
    size?: string
    children?: React.ReactNode
    onClick?: () => void
    loading?: number
}

type ThemeState = {
    theme: string
}

const Button = (props: ButtonProps): JSX.Element => {
    const { theme, size, loading, onClick, children } = props

    return (
        <ButtonStyle
            type="button"
            size={size || 'md'}
            onClick={onClick}
            themeStyle={theme}
            data-testid="button"
            loading={loading ? 1 : 0}
        >
            <span>{children}</span>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#ffffff" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
            </svg>
        </ButtonStyle>
    )
}

const mapStateToProps = (state: ThemeState) => ({
    theme: state.theme,
})

export default connect(mapStateToProps)(Button)
