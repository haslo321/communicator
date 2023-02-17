import { createStore } from 'redux';

const stateObj = {
    socket: null,
    not: 0,
    user: {
        id: undefined
    }
}

const userReducer = (state = stateObj, action) => {
    if (action.type === 'login') {
        return {
            user: action.user,
            socket: state.socket,
            not: state.not,
        }
    }

    if (action.type === 'socket') {
        return {
            user: state.user,
            socket: action.socket,
            not: state.not,
        }
    }

    if (action.type === 'not') {
        return {
            ...state,
            not: action.not 
        }
    }

    if (action.type === 'notDec') {
        return {
            ...state,
            not: state.not - action.not 
        }
    }

    return state;
}

const store = createStore(userReducer);

export default store;