import { FETCH_FESTIVALS_FAILURE, FETCH_FESTIVALS_REQUEST, FETCH_FESTIVALS_SUCCESS } from "./festivalTypes"
import FestivalService from '../../../services/festival/festival'

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

export const fetchFestivals = () => {
    return function (dispatch) {
        dispatch(fetchFestivalsRequest())
        FestivalService.getFestivals()
            .then(response => {
                const festivals = response.data
                dispatch(fetchFestivalsSuccess(festivals))
            })
            .catch(err => {
                const error = "Example error message"
                dispatch(fetchFestivalsFailure(error))
            })
    }
}