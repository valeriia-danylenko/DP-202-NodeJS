import { task5 } from '../src/task5.js';
const assert = chai.assert;

mocha.setup('bdd');

export function test5() {

  describe('Task 5 Tests', () => {

    describe('Negative Test Cases', () => {
      it('No parameters in function', () => {
        assert.deepEqual(task5(), {
          status: 'failed',
          reason: 'Function takes only 1 parameter'
        });
      });

      it('Two parameters in function', () => {
        assert.deepEqual(task5({min: 1, max: 5}, {a:6, b:7}), {
          status: 'failed',
          reason: 'Function takes only 1 parameter'
        });
      });

      it('Parameter is not an object (string)', () => {
        assert.deepEqual(task5('5'), {
          status: 'failed',
          reason: 'Parameter must be an object'
        });
      });

      it('Parameter is not an object (array)', () => {
        assert.deepEqual(task5([2, 5, 5]), {
          status: 'failed',
          reason: 'Parameter must be an object'
        });
      });

      it('Parameter is not a number (a function)', () => {
        assert.deepEqual(task5( function () {'hello'} ), {
          status: 'failed',
          reason: 'Parameter must be an object'
        });
      });

      it('Object does not include required keys', () => {
        assert.deepEqual(task5({min: 5, item: 7}), {
          status: 'failed',
          reason: 'Object must include keys min and max the value of which must be valid numbers'
        });
      });

      it('Object values must be valid numbers', () => {
        assert.deepEqual(task5({min: '5', max: 7}), {
          status: 'failed',
          reason: 'Object must include keys min and max the value of which must be valid numbers'
        });
      });

      it('Object values must be valid numbers', () => {
        assert.deepEqual(task5({min: NaN, max: 7}), {
          status: 'failed',
          reason: 'Object must include keys min and max the value of which must be valid numbers'
        });
      });

      it('Object values must be valid numbers', () => {
        assert.deepEqual(task5({min:100, max: Infinity}), {
          status: 'failed',
          reason: 'Object must include keys min and max the value of which must be valid numbers'
        });
      });

      it('Object values must be valid numbers', () => {
        assert.deepEqual(task5({min:100, max: null}), {
          status: 'failed',
          reason: 'Object must include keys min and max the value of which must be valid numbers'
        });
      });

      it('Object values cannot be decimals', () => {
        assert.deepEqual(task5({min: 6.6, max: 10}), {
          status: 'failed',
          reason: 'Values must not be decimals. Values must be in range (0, 999999)'
        });
      });

      it('Object values are not in range (lower bound)', () => {
        assert.deepEqual(task5({min: -1, max: 10}), {
          status: 'failed',
          reason: 'Values must not be decimals. Values must be in range (0, 999999)'
        });
      });

      it('Object values are not in range (upper bound)', () => {
        assert.deepEqual(task5({min: 6, max: 100000000}), {
          status: 'failed',
          reason: 'Values must not be decimals. Values must be in range (0, 999999)'
        });
      });

      it('Object values must be valid numbers', () => {
        assert.deepEqual(task5({max: 90, min: 100}), {
          status: 'failed',
          reason: 'Min value cannot be greater than max'
        });
      });


    });

    describe('Positive Test Cases', () => {

      it('min: 0, max: 8990. Winner - Complex method', () => {
      assert.deepEqual(task5({min: 0, max: 8990}), {
        easyCount: 165,
        complexCount: 614,
        winner: 'Complex'
      });
    });

    it('min: 56456, max: 98990. Winner - Easy method', () => {
      assert.deepEqual(task5({min: 56456, max: 98990}), {
        easyCount: 2750,
        complexCount: 1451,
        winner: 'Easy'
       });
    });

  });
    });
};
