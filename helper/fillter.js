module.exports = (query) => {
    const find = {};
    if (query.status) {
        
        find.status = req.query.status;
    }
    return find
}