import { Middleware } from 'redux';

interface clearAction {
    type: 'toDoSlice/clearCache';
}
interface updateAction {
    type: 'toDoSlice/addElement' | 'toDoSlice/removeElement',
    payload: string;
}
interface loginAction {
    type: 'loginSlice/login',
    payload: string;
}
interface logoutAction {
    type: 'loginSlice/logout';
}


const persistantMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    
    const state = store.getState();
    // console.log('STORE STATE', state);
    const undefinedAction = action as clearAction | updateAction | loginAction | logoutAction;

    if(undefinedAction.type === 'toDoSlice/clearCache') {
        localStorage.removeItem('elements');
    }
    
    if (['toDoSlice/addElement', 'toDoSlice/removeElement'].includes(undefinedAction.type)) { 
        localStorage.setItem('elements', JSON.stringify(state.toDoSlice.el));
    }

    if (undefinedAction.type === 'loginSlice/login') {
        localStorage.setItem('isAuthenticated', JSON.stringify(state.loginSlice.isAuthenticated));
    }

    if (undefinedAction.type === 'loginSlice/logout') {
        localStorage.removeItem('isAuthenticated');
    }

    return result
};

export default persistantMiddleware;