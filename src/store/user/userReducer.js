import {ADD_PRODUCT,INCREASE_AMOUNT,DECREASE_AMOUNT,DELETE_PRODUCT,SET_PANTIES,SET_PANTY,SET_ORDERS} from "./actionsTypes";


const defaultState = {
    panties: [],
    cart: [],
    panty: {},
    orders: 0
}
const updateCartAmount = (state,id) =>{
    const newCart = state.cart.map((item)=>{
        if (item.id===id) return {...item,amount: item.amount+1}
        return item
    })
    return newCart
}

export function userReducer(state=defaultState,action) {
    switch (action.type) {
        case ADD_PRODUCT : {
            const item = state.cart.findIndex(({id})=>id===action.payload.id)
            if (item!==-1) {
                const newItem = updateCartAmount(state,action.payload.id)
                localStorage.setItem("cart-items", JSON.stringify({...state,cart: [...newItem]}));
                return {...state,cart: [...newItem]}
            }
            return {...state, cart: [...state.cart,action.payload]}
        }
        case INCREASE_AMOUNT : {
            console.log(action.payload)
           const newItem = updateCartAmount(state,action.payload)
            return {...state,cart: [...newItem]}
        }
        case DECREASE_AMOUNT : {
            const newCart = state.cart.map((item)=>{
                if (item.id===action.payload && item.amount>1) return {...item,amount: item.amount-1}
                return item
            })
            return {...state,cart: [...newCart]}
        }
        case DELETE_PRODUCT : {
            console.log(action.payload)
            const newCart = state.cart.filter((item)=>item.id!==action.payload)
            return {...state,cart: [...newCart]}
        }
        case SET_PANTIES : {
            return {...state,panties: action.payload}
        }
        case SET_PANTY : {
            return {...state,panty: action.payload}
        }
        case SET_ORDERS : {
            console.log(action.payload)
            return {...state,orders: action.payload}
        }
        default:{
            return {...state}
        }
    }
}

export const addProduct = (payload) => ({type: ADD_PRODUCT,payload})
export const increaseAmount = (payload) => ({type: INCREASE_AMOUNT ,payload})
export const decreaseAmount = (payload) => ({type: DECREASE_AMOUNT ,payload})
export const deleteProduct = (payload) => ({type: DELETE_PRODUCT ,payload})
export const setPanties = (payload) => ({type: SET_PANTIES ,payload})
export const setPanty = (payload) => ({type: SET_PANTY ,payload})
export const setOrders = (payload) => ({type: SET_ORDERS ,payload})


