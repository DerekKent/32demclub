export default function nextMeeting (currentDate = new Date()) {
    var date = new Date(currentDate.getFullYear(), currentDate.getMonth())

    var thursdayCount = 0;

    // Find the 1st Thursday of the month
    while (thursdayCount < 3) {
        if (date.getDay() === 4) {
            break;
        }

        date = new Date(date.getFullYear(), date.getMonth(), (date.getDate() + 1));
    }

    // Don't show dates that have already passed
    if (currentDate > date) {
        return nextMeeting(new Date(date.getFullYear(), date.getMonth()))
    }

    // Ignore July and August during off years
    if (date.getYear() % 2 !== 0 && (date.getMonth() === 6 || date.getMonth() === 7)) {
        return nextMeeting(new Date(currentDate.getFullYear(), 8));
    }

    // Skip 2 weeks to the third Thursday
    return new Date(date.getFullYear(), date.getMonth(), (date.getDate() + 14));
}
