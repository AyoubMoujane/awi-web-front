import { FETCH_FESTIVALS_FAILURE, FETCH_FESTIVALS_REQUEST, FETCH_FESTIVALS_SUCCESS } from "./festivalTypes"

export const fetchFestivalsRequest = () => {
    return {
        type: FETCH_FESTIVALS_REQUEST
    }
}

export const fetchFestivalsSuccess = (festivals) => {
    return {
        type: FETCH_FESTIVALS_SUCCESS,
        payload: festivals
    }
}

export const fetchFestivalsFailure = (error) => {
    return {
        type: FETCH_FESTIVALS_FAILURE,
        payload: error
    }
}