const expect = require('expect.js');
const { generateMessage } = require("./message");

describe('generateMessage', () => {
    
    it('should generate the correct message object', () => {
        let from = "test";
        let text = "testing message";

        let message = generateMessage(from, text);

        expect(message).to.have.property('from');
        expect(message).to.have.property('text');
        expect(message).to.have.property('createdAt');
        expect(message.from).to.be(from);
        expect(message.text).to.be(text);
        expect(message.createdAt).to.be.a('number');
    });

});