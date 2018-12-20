const moment = require('moment');

let generateMessage = (from, text) => {
    return {
        from: from,
        text: text,
        createdAt: moment().valueOf()
    };
};

let generateLocationMessage = (from, latitude, longitude) => {
    let url = `https://google.com/maps?q=${latitude},${longitude}`;
    
    return {
        from,
        url,
        createdAt: moment().valueOf()
    };
};

module.exports = { generateMessage, generateLocationMessage };