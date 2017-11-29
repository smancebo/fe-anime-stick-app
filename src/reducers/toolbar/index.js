import { HIDE_TOOLBAR, SHOW_TOOLBAR } from '../../constants';

const reducer = (state = {show: true}, action) => {
    let newState = {};

    switch(action.type){
        
        case HIDE_TOOLBAR:
            newState = {...state, show: action.show}
            return newState;

        case SHOW_TOOLBAR:
            newState = { ...state, show: action.show }
            return newState;
    
        default: 
            return state;
    }
}

export default reducer;