import {
    ADD_PRODUCT,
    INCREASE_AMOUNT,
    DECREASE_AMOUNT,
    DELETE_PRODUCT,
    SET_PANTIES,
    SET_SLIPS,
    SET_PANTY,
    SET_ORDERS,
    CLEAN_ORDER, SET_KOLGOTKY
} from "./actionsTypes";


const defaultState = {
    panties: [],
    slips: [],
    kolgotky: [],
    cart: [],
    CartCount: 0,
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
                return {...state,cart: [...newItem],CartCount: state.CartCount+1}
            }
            return {...state, cart: [...state.cart,action.payload],CartCount: state.CartCount+1}
        }
        case INCREASE_AMOUNT : {
           const newItem = updateCartAmount(state,action.payload)
            return {...state,cart: [...newItem],CartCount: state.CartCount+1}
        }
        case DECREASE_AMOUNT : {
            const newCart = state.cart.map((item)=>{
                if (item.id===action.payload && item.amount>1) return {...item,amount: item.amount-1}
                return item
            })
            return {...state,cart: [...newCart],CartCount: state.CartCount-1}
        }
        case DELETE_PRODUCT : {
            const newCart = state.cart.filter((item)=>item.id!==action.payload.id)
            return {...state,cart: [...newCart],CartCount: state.CartCount-action.payload.count}
        }
        case SET_PANTIES : {
            return {...state,panties: action.payload}
        }
        case SET_SLIPS : {
            return {...state,slips: action.payload}
        }
        case SET_KOLGOTKY : {
            return {...state,kolgotky: action.payload}
        }
        case SET_PANTY : {
            return {...state,panty: action.payload}
        }
        case SET_ORDERS : {
            return {...state,orders: action.payload}
        }
        case CLEAN_ORDER : {
            return {...state,cart: [],CartCount: 0}
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
export const setSlips = (payload) => ({type: SET_SLIPS ,payload})
export const setKolgotky = (payload) => ({type: SET_KOLGOTKY ,payload})
export const setPanty = (payload) => ({type: SET_PANTY ,payload})
export const setOrders = (payload) => ({type: SET_ORDERS ,payload})
export const cleanOrder = () => ({type: CLEAN_ORDER})


