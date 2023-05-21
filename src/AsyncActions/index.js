import {api} from "../helpers";
import {setPanties,setPanty,setOrders,setSlips,setKolgotky,setCollection,setSets} from "../store/user/userReducer";


export const fetchPanties = () => {
    return function (dispatch) {
        api.get(`/panties.json`)
            .then(res=>{
                const array = Object.keys(res.data).map(item=>{
                    return {...res.data[item],UnId: item}
                })
                dispatch(setPanties(array))
            })
            .catch(e=>{
                console.log(e)
            })
    }
}
export const fetchCollection = () => {
    return function (dispatch) {
        api.get(`/collection.json`)
            .then(res=>{
                dispatch(setCollection(res.data))
            })
            .catch(e=>{
                console.log(e)
            })
    }
}
export const fetchSlips = () => {
    return function (dispatch) {
        api.get(`/slips.json`)
            .then(res=>{
                const array = Object.keys(res.data).map(item=>{
                    return {...res.data[item],UnId: item}
                })
                dispatch(setSlips(array))
            })
            .catch(e=>{
                console.log(e)
            })
    }
}
export const fetchKolgotky = () => {
    return function (dispatch) {
        api.get(`/tights.json`)
            .then(res=>{
                const array = Object.keys(res.data).map(item=>{
                    return {...res.data[item],UnId: item}
                })
                dispatch(setKolgotky(array))
            })
            .catch(e=>{
                console.log(e)
            })
    }
}
export const fetchSets = () => {
    return function (dispatch) {
        api.get(`/sets.json`)
            .then(res=>{
                const array = Object.keys(res.data).map(item=>{
                    return {...res.data[item],UnId: item}
                })
                dispatch(setSets(array))
            })
            .catch(e=>{
                console.log(e)
            })
    }
}
export const fetchPantyById = (id,type) => {
    return function (dispatch) {
        api.get(`/${type}/${id}.json`)
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
        })
    }
}