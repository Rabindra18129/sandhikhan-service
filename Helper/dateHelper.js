module.exports = function dateDiff(d) {
    const date = new Date(d);
    const currentDate = Date.now();
    const dayDiff = (currentDate - date) / (24 * 60 * 60 * 1000);
    return dayDiff;
}