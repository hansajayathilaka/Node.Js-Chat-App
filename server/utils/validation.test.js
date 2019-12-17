const except = require('expect');

const {isRealString} = require('./isRealString');

describe('is Real String', () => {
    it('should reject non-string values', function () {
        let res = isRealString(65);
        except(res).toBe(false);
    });
    it('should reject string with only spaces', function () {
        let res = isRealString('            ');
        except(res).toBe(false);
    });
    it('should allow string with non-space shars', function () {
        let res = isRealString('     sdf                    ');
        except(res).toBe(true);
    });
});
