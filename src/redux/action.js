import * as types from "./constant"

export const isAuthenAction = (token) => {
    return {
        type: types.AUTHENTICATION,
        payload: token
    }
};

export const noAuthenAction = () => {
    return{
        type: types.AUTHENTICATION_NO
    }
}
export const getAnimalPending = () => {
    return {
        type: types.GET_ANIMAL_PENDING
    }
}
export const getAnimalSuccess = (data) => {
    return {
        type: types.GET_ANIMAL_SUCCESS,
        payload: data
    }
}
export const getAnimalFail = (error) => {
    return {
        type: types.GET_ANIMAL_FAIL,
        payload: error
    }
}
// export const getAnimalList = (page) => {

// }
