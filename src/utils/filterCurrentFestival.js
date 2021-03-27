export default function filterGetCurrentFestival(festivals) {
    let currentFestival = festivals.filter((festival) => {
        return festival.estCourant
    })
    return currentFestival[0]
}