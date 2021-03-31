import { FETCH_FESTIVALS_FAILURE, FETCH_FESTIVALS_REQUEST, FETCH_FESTIVALS_SUCCESS, SWITCH_FESTIVAL_FAILURE, SWITCH_FESTIVAL_REQUEST, SWITCH_FESTIVAL_SUCCESS } from "./festivalTypes"
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

export const switchCurrentFestival = (newCurrentFestival, previousCurrentFestival) => {
    return function (dispatch) {
        let updatedPreviousCurrentFestival = { ...previousCurrentFestival, estCourant: false }
        FestivalService.switchCurrentFestival(updatedPreviousCurrentFestival, newCurrentFestival)
            .then((data) => {
                dispatch(fetchFestivals())
            })
            .catch(err => {
                console.log("error")
                return
            })
    }
}