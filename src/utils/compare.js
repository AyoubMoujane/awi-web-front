export default function compare(a, b) {
    if (a.nomParticipant < b.nomParticipant) {
        return -1;
    }
    if (a.nomParticipant > b.nomParticipant) {
        return 1;
    }
    return 0;
}
