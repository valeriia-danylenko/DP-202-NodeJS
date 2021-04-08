import { task6 } from '../src/task6.js';
const assert = chai.assert;

mocha.setup('bdd');

export function test6() {

  describe('Task 6 Tests', () => {

    describe('Negative Test Cases', () => {
      it('Only 1 parameter in function', () => {
        assert.deepEqual(task6(5), {
          status: 'failed',
          reason: 'Function takes two parameters'
        });
      });

      it('Three parameters in function', () => {
        assert.deepEqual(task6(5, 6, 7), {
          status: 'failed',
          reason: 'Function takes two parameters'
        });
      });

      it('Parameter is not a number (a string)', () => {
        assert.deepEqual(task6('5', 1), {
          status: 'failed',
          reason: 'Both parameters must be valid numbers'
        });
      });

      it('Parameter is not a number (Infinity)', () => {
        assert.deepEqual(task6(Infinity, 1), {
          status: 'failed',
          reason: 'Both parameters must be valid numbers'
        });
      });

      it('Parameter is not a number (NaN)', () => {
        assert.deepEqual(task6(NaN, 1), {
          status: 'failed',
          reason: 'Both parameters must be valid numbers'
        });
      });

      it('Parameter is not a number (an array)', () => {
        assert.deepEqual(task6(1, [2]), {
          status: 'failed',
          reason: 'Both parameters must be valid numbers'
        });
      });

      it('Parameter is not a number (an object)', () => {
        assert.deepEqual(task6(1, {
          2: 6
        }), {
          status: 'failed',
          reason: 'Both parameters must be valid numbers'
        });
      });

      it('Parameter is null', () => {
        assert.deepEqual(task6(1, null), {
          status: 'failed',
          reason: 'Both parameters must be valid numbers'
        });
      });

      it('Parameter is not in range (upper bound)', () => {
        assert.deepEqual(task6(1, 1000001), {
          status: 'failed',
          reason: 'Parameters must be in range from 1 to 1000000'
        });
      });

      it('Parameter is not in range (lower bound)', () => {
        assert.deepEqual(task6(0, 20), {
          status: 'failed',
          reason: 'Parameters must be in range from 1 to 1000000'
        });
      });

      it('First parameter is a decimal', () => {
        assert.deepEqual(task6(5.6, 5), {
          status: 'failed',
          reason: 'Length cannot be a decimal'
        });
      });
    });

    describe('Positive Test Cases', () => {
      it('Min square - 25, length - 5 = 5, 6, 7, 8, 9', () => {
        assert.equal(task6(5, 25), '5, 6, 7, 8, 9');
      });
      it('Length - 5, Min square - 24 = 5, 6, 7, 8, 9', () => {
        assert.equal(task6(5, 24), '5, 6, 7, 8, 9');
      });
      it('Length - 2, Min square - 7 = 3, 4', () => {
        assert.equal(task6(2, 7), '3, 4');
      });
      it('Length - 1, Min square - 1000000 = 1000', () => {
        assert.equal(task6(1, 1000000), '1000');
      });
    });

  });
};
