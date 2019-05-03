import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {

    switch (action.type) {
        case ActionTypes.ADD_FAVORATE:
            if (state.some(el => el === action.payload)) {
                return state;
            } else {
                return state.concat(action.payload);
            }
        case ActionTypes.DELETE_FAVORITE:
            return state.filter(f => f !== action.payload);
        default:
            return state;
    }

}