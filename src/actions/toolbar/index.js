import { HIDE_TOOLBAR, SHOW_TOOLBAR } from  '../../constants';

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