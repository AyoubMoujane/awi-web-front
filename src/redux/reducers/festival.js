const festivalReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_FESTIVALS':
            return { idFestival: 243, estCourant: false }
        case 'CHANGE_CURRENT_FESTIVAL':
            return { ...state, estCourant: !state.estCourant }
        default:
            return state
    }
}
export default festivalReducer