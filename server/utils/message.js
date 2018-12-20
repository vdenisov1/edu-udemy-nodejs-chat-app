let generateMessage = (from, text) => {
    return {
        from: from,
        text: text,
        createdAt: new Date().getTime()
    };
};

let generateLocationMessage = (from, latitude, longitude) => {
    let url = `https://google.com/maps?q=${latitude},${longitude}`;
    
    return {
        from,
        url,
        createdAt: new Date().getTime()
    };
};

module.exports = { generateMessage, generateLocationMessage };