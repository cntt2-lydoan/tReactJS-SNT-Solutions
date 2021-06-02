import * as types from "./constant" 
const initialState = {
    animals: [],
    loading: false,
    authen: false,
    login: ""
};
const myReducer = (state = initialState,action) => {
    switch(action.type){
        case types.AUTHENTICATION:
            return {
                ...state,
                authen: true
            };
        case types.AUTHENTICATION_NO:
            return {
                ...state,
                authen: false
            };
        case types.GET_ANIMAL_PENDING:
            return{
                ...state,
                loading: true
            }
        case types.GET_ANIMAL_SUCCESS:
            return{
                ...state,
                loading: false,
                animal: action.payload.animals,
                totalPages: action.payload.pagination.total_pages
            }
        case types.GET_ANIMAL_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
                animal: []
            }
        default: return state;
    }
}
export default myReducer;