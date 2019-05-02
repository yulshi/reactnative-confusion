import * as ActionTypes from './ActionTypes';

export const favorates = (state = [], action) => {

    switch(action.type) {
        case ActionTypes.ADD_FAVORATE:
            if(state.some(el => el === action.payload)) {
                return state;
            } else {
                return state.concat(action.payload);
            }
        default:
            return state;
    }

}