import { HIDE_TOOLBAR, SHOW_TOOLBAR, FOCUS_TOOLBAR } from  '../../constants';

export const hideToolbar = () => {
    const action = {
        type: HIDE_TOOLBAR,
        show: false
    }

    return action;
}

export const showToolbar = () => {
    const action = {
        type: SHOW_TOOLBAR,
        show: true
    }

    return action;
}

export const focusToolbar = () => {
    const action = {
        type: FOCUS_TOOLBAR,
        focus: true
    }

    return action;
}