const expect = require('expect.js');
const { generateMessage, generateLocationMessage } = require("./message");

describe('generateMessage', () => {
    
    it('should generate the correct message object', () => {
        let from = "Test";
        let text = "Test message";

        let message = generateMessage(from, text);

        expect(message).to.have.property('from');
        expect(message).to.have.property('text');
        expect(message).to.have.property('createdAt');
        expect(message.from).to.be(from);
        expect(message.text).to.be(text);
        expect(message.createdAt).to.be.a('number');
    });

    it('should return the correct location', () => {
        let from = 'Test';
        let latitude = 1;
        let longitude = 2;
        let expectedUrl = `https://google.com/maps?q=${latitude},${longitude}`;
        let message = generateLocationMessage(from, latitude, longitude);

        expect(message.from).to.be(from);
        expect(message.url).to.be(expectedUrl);
    })

});