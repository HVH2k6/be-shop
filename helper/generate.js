module.exports.generate = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let relust =""
    for (let i = 0; i < length; i++) {
        relust += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return relust
}