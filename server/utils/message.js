const moment = require('moment');


let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().format('LT')
    };
};

let generateLocationMessage = (from, lon, lat, acc) => {
    return {
        from,
        url: `https://www.google.com/maps/place/${lat}N+${lon}E`,
        createdAt: moment().format('LT')
    };
};

module.exports = {generateMessage, generateLocationMessage};
