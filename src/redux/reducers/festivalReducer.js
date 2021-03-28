import { FETCH_FESTIVALS_FAILURE, FETCH_FESTIVALS_REQUEST, FETCH_FESTIVALS_SUCCESS } from "../actions/festival/festivalTypes"

const initialState = {
    data: [],
    loading: false,
    error: ''
}

const festivalReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FESTIVALS_REQUEST:
            return { ...state, loading: true }
        case FETCH_FESTIVALS_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: '' }
        case FETCH_FESTIVALS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}
export default festivalReducer