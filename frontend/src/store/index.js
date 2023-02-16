import {createStore} from 'redux';

const user = {
    id: undefined,
}

const userReducer = (state = {user: user, socket: null}, action) => {
    if(action.type === 'login'){
        return {
            user: action.user,
            socket: state.socket
        }
    }

    if(action.type === 'socket'){
        return {
            user: state.user,
            socket: action.socket
        }
    }

    return state;
}

const store = createStore(userReducer);

export default store;