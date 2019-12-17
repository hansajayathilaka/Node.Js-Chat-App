let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');


describe('Generate Message', () => {
    it('should generate correct message object', function () {
        let form = "WDJ",
            text = "Some random text",
            message = generateMessage(form, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({form, text});
    });
});

describe('Generate Location Message', () => {
    it('should generate currect location obkect', () => {
        let from = 'Claire',
            lat = 15,
            lon = 56,
            url = `https://www.google.com/maps/place/${lat}N+${lon}E`,
            message = generateLocationMessage(from, lon, lat, 500);

        // expect(message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});
