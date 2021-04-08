import { task1 } from '../src/task1.js';
const assert = chai.assert;

mocha.setup('bdd');

export function test1() {

  describe('Task 1 Tests', () => {

    describe('Negative Test Cases', () => {
      it('Only 1 parameter in function', () => {
        assert.deepEqual(task1(5), {
          status: 'failed',
          reason: 'Function takes 3 parameters'
        });
      });

      it('Four parameters in function', () => {
        assert.deepEqual(task1(5, 6, "o", 7 ), {
          status: 'failed',
          reason: 'Function takes 3 parameters'
        });
      });

      it('First two parameter are not numbers (a string)', () => {
        assert.deepEqual(task1('5', 6, 1), {
          status: 'failed',
          reason: 'First two parameters must be valid numbers'
        });
      });

      it('Parameter is not a number (Infinity)', () => {
        assert.deepEqual(task1(Infinity, 4, 'U'), {
          status: 'failed',
          reason: 'First two parameters must be valid numbers'
        });
      });

      it('Parameter is not a number (NaN)', () => {
        assert.deepEqual(task1(NaN, 4, 'P'), {
          status: 'failed',
          reason: 'First two parameters must be valid numbers'
        });
      });

      it('Parameter is not a number (an array)', () => {
        assert.deepEqual(task1([2, 6], 6, "u"), {
          status: 'failed',
          reason: 'First two parameters must be valid numbers'
        });
      });

      it('Parameter is not a number (an object)', () => {
        assert.deepEqual(task1(4, {
          2: 6
        }, "U"), {
          status: 'failed',
          reason: 'First two parameters must be valid numbers'
        });
      });

      it('Parameter is null', () => {
        assert.deepEqual(task1(4, null, "H"), {
          status: 'failed',
          reason: 'First two parameters must be valid numbers'
        });

      });
      it('Parameter is decimal', () => {
        assert.deepEqual(task1(6.4, 10, "H"), {
          status: 'failed',
          reason: 'First two parameters must not be decimals'
        });
      });

      it('Parameter isnot in range (lower bound)', () => {
        assert.deepEqual(task1(1, 10, "H"), {
          status: 'failed',
          reason: 'First two parameters must be in range (2, 256)'
        });
      });

      it('Parameter is not in range (upper bound)', () => {
        assert.deepEqual(task1(3, 257, "U"), {
          status: 'failed',
          reason: 'First two parameters must be in range (2, 256)'
        });
      });

      it('Third parameter is not a string (number)', () => {
        assert.deepEqual(task1(9, 20, 8), {
          status: 'failed',
          reason: 'Third parameter must be in a string'
        });
      });

      it(' Length of Third parameter must not be zero', () => {
        assert.deepEqual(task1(9, 20, ''), {
          status: 'failed',
          reason: 'A length of a third parameter must not be zero'
        });
      });

    });

    describe('Positive Test Cases', () => {
      it('Expect board 6x6 with symbol *', () => {
        assert.equal(task1(6, 6, "*"), '* * * \n * * *\n* * * \n * * *\n* * * \n * * *');
      });
      it('Expect board 3x4 with symbol U', () => {
        assert.equal(task1(3, 4, "Ukraine"), 'U U \n U U\nU U ');
      });
    });

  });
};
