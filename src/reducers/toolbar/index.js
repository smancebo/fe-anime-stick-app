import { HIDE_TOOLBAR, SHOW_TOOLBAR, FOCUS_TOOLBAR } from '../../constants';

const reducer = (state = { show: true, focus: false }, action) => {
    let newState = {};

    switch (action.type) {

        case HIDE_TOOLBAR:
            newState = { ...state, show: action.show }
            return newState;

        case SHOW_TOOLBAR:
            newState = { ...state, show: action.show }
            return newState;

        case FOCUS_TOOLBAR:
            newState = { ...state, focus: action.focus }
            return newState

        default:
            return state;
    }
}

export default reducer;