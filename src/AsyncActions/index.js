import {api} from "../helpers";
import {setPanties,setPanty,setOrders} from "../store/user/userReducer";

export const fetchPanties = () => {
    return function (dispatch) {
        api.get(`/panties.json`)
            .then(res=>{
                console.log(Object.keys(res.data))
                const array = Object.keys(res.data).map(item=>{
                    return {...res.data[item],UnId: item}
                })
                console.log(array)
                dispatch(setPanties(array))
            })
            .catch(e=>{
                console.log(e)
            })
    }
}
export const fetchPantyById = (id) => {
    return function (dispatch) {
        api.get(`/panties/${id}.json`)
            .then(res=>{
                dispatch(setPanty(res.data))
            })
            .catch(e=>{
                console.log(e)
            })
    }
}
export const fetchNumbers = () => {
    return function (dispatch) {
        api.get(`/orders.json`)
            .then(res=>{
                dispatch(setOrders(res.data))
            })
            .catch(e=>{
                console.log(e)
            })
    }
}
export const AddNumber = (data) => {
    return function (dispatch) {
        api.put(`/orders.json`,data).then(res=>{
            console.log(res)
        })
    }
}