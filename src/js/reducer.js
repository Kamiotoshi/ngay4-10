export const ACTION = {
    UPDATE_CART: "UPDATE_CART",
    AUTHORIZE: "AUTHORIZE",
    LOADING: "LOADING",
    HIDE_LOADING:"HIDE_LOADING"
}
const updateLocalStorage = (state)=>{
    localStorage.setItem("state",JSON.stringify(state));
    return state;
}
const reducer = (state,action) => {
    // quy ước trong action sẽ có 2 dữ liêu: type, payload
    switch(action.type){
        case ACTION.UPDATE_CART: return updateLocalStorage({...state,cart:action.payload});
        case ACTION.AUTHORIZE: return updateLocalStorage({...state,jwt: action.payload});
    }
}
export default reducer;