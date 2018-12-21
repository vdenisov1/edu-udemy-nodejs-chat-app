const expect = require('expect.js');
const { isRealString } = require("./validation");

describe('isRealString', () => {

    it('should reject non-string values', () => {
        let val = 10;
        expect(isRealString(val)).to.be(false);
    });

    it('should reject strings with only spaces', () => {
        let val = '     ';
        expect(isRealString(val)).to.be(false);
    });

    it('should allow strings with non-space characters', () => {
        let val = 'abc';
        expect(isRealString(val)).to.be(true);
    });
    
});