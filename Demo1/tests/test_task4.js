import { task4 } from '../src/task4.js';
const assert = chai.assert;

mocha.setup('bdd');

export function test4() {

  describe('Task 4 Tests', () => {

    describe('Negative Test Cases', () => {
      it('No parameters in function', () => {
        assert.deepEqual(task4(), {
          status: 'failed',
          reason: 'Function takes only 1 parameter'
        });
      });

      it('Two parameters in function', () => {
        assert.deepEqual(task4(6556, 78), {
          status: 'failed',
          reason: 'Function takes only 1 parameter'
        });
      });

      it('Parameter is not a number (Infinity)', () => {
        assert.deepEqual(task4(Infinity), {
          status: 'failed',
          reason: 'Parameter must be a valid number'
        });
      });

      it('Parameter is not a number (NaN)', () => {
        assert.deepEqual(task4(NaN), {
          status: 'failed',
          reason: 'Parameter must be a valid number'
        });
      });

      it('Parameter is not a number (null)', () => {
        assert.deepEqual(task4(null), {
          status: 'failed',
          reason:'Parameter must be a number or a string'
        });
      });

      it('Parameter is not a number (array)', () => {
        assert.deepEqual(task4([2, 5, 5]), {
          status: 'failed',
          reason: 'Parameter must be a number or a string'
        });
      });

      it('Parameter is not a number (object)', () => {
        assert.deepEqual(task4( {min: 5, item: 7} ), {
          status: 'failed',
          reason: 'Parameter must be a number or a string'
        });
      });

      it('Parameter is decimal', () => {
        assert.deepEqual(task4(5665.3), {
          status: 'failed',
          reason: 'Parameter must not be a decimal number'
        });
      });

      it('Parameter\'s length is not in range (lower bound)', () => {
        assert.deepEqual(task4(7), {
          status: 'failed',
          reason: 'Parameter\'s length must be within range (2, 20)'
        });
      });

      it('Parameter\'s length is not in range (lower bound)', () => {
        assert.deepEqual(task4(756789445665443267832), {
          status: 'failed',
          reason: 'Parameter\'s length must be within range (2, 20)'
        });
      });
    });

    describe('Positive Test Cases', () => {
      it('Number 123561. Polindrome 0', () => {
        assert.equal(task4(123561), '0');
      });
      it('Number 4345426472. Polindrome 434]', () => {
        assert.equal(task4(4345426472), '434');
      });
      it('Number 123454321. Polindrome 123454321', () => {
        assert.equal(task4(123454321), '123454321');
      });
      it('Number -12321454125665. Polindrome 2145412', () => {
        assert.equal(task4(-12321454125665), '2145412');
      });
      it('Number -12321454125665. Polindrome 2145412', () => {
        assert.equal(task4('12345678900987654321'), '12345678900987654321');
      });
      it('Parameter is a string', () => {
        assert.equal(task4('56'), '0');
      });
    });

  });
};
