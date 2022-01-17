import { CHANGE_THEME } from '../../config'

export function setTheme(theme: string) {
    return {
        type: CHANGE_THEME,
        payload: theme,
    }
}
