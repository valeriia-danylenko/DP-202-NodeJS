import { task7 } from '../src/task7.js';
const assert = chai.assert;

mocha.setup('bdd');

export function test7() {

  describe('Task 7 Tests', () => {

    describe('Negative Test Cases', () => {
      it('No parameters in function', () => {
        assert.deepEqual(task7(), {
          status: 'failed',
          reason: 'Function takes one parameter'
        });
      });

      it('Two parameters in function', () => {
        assert.deepEqual(task7({min: 1, max: 5}, 6), {
          status: 'failed',
          reason: 'Function takes one parameter'
        });
      });

      it('Parameter is not an object (string)', () => {
        assert.deepEqual(task7('5'), {
          status: 'failed',
          reason: 'Parameter must be an object'
        });
      });

      it('Parameter is not an object (array)', () => {
        assert.deepEqual(task7([2, 5, 5]), {
          status: 'failed',
          reason: 'Parameter must be an object'
        });
      });

      it('Parameter is not a number (a function)', () => {
        assert.deepEqual(task7( ()=> 'hello' ), {
          status: 'failed',
          reason: 'Parameter must be an object'
        });
      });

      it('Object does not include required keys', () => {
        assert.deepEqual(task7({min: 5, item: 7}), {
          status: 'failed',
      reason: 'Object must have properties (min, max), or (length).'
        });
      });

      it('Object does not include required keys', () => {
        assert.deepEqual(task7({min: NaN, legth: 7}), {
          status: 'failed',
      reason: 'Object must have properties (min, max), or (length).'
        });
      });

      // it('Object does not include required keys', () => {
      //   assert.deepEqual(task7({min: 5, length: Infinity}), {
      //     status: 'failed',
      //   reason: 'Properties (min, max) must be valid numbers in range (1, 1000000)'
      //   });
      // });

      it('Object does not include required keys', () => {
        assert.deepEqual(task7({max: 6, value: 10}), {
          status: 'failed',
        reason: 'Object must have properties (min, max), or (length).'
        });
      });

      it('Object values must be valid numbers', () => {
        assert.deepEqual(task7({max: '6', min: 2}), {
          status: 'failed',
          reason: 'Properties (min, max) must be valid numbers in range (1, 1000000)'
        });
      });

      it('Object values must be valid numbers', () => {
        assert.deepEqual(task7({max: null, min: 2}), {
          status: 'failed',
      reason: 'Properties (min, max) must be valid numbers in range (1, 1000000)'
        });
      });

      it('Max is greater than min', () => {
        assert.deepEqual(task7({max: 5, min: 10}), {
          status: 'failed',
          reason: 'Max value cannot be lower than min value'
        });
      });

      it('Length is a decimal', () => {
        assert.deepEqual(task7({length: 6.6}), {
          status: 'failed',
          reason: 'Length must be a valid number. Cannot be decimal and less than or equal to 0'
        });
      });

      it('Parameter (length) is not in range (lower bound)', () => {
        assert.deepEqual(task7({length: 0, g:6  }), {
          status: 'failed',
          reason: 'Length must be a valid number. Cannot be decimal and less than or equal to 0'
        });
      });

      it('Parameter is not in range (lower bound)', () => {
        assert.deepEqual(task7({min:0, max: 10}), {
          status: 'failed',
          reason: 'Properties (min, max) must be valid numbers in range (1, 1000000)'
        });
      });

      it('Parameter is not in range (upper bound)', () => {
        assert.deepEqual(task7({min:6, max: 1000001}), {
          status: 'failed',
          reason: 'Properties (min, max) must be valid numbers in range (1, 1000000)'
        });
      });

    });

    describe('Positive Test Cases', () => {
      it('min: 2, max: 6, length: 6 = [2,3,5]', () => {
        assert.deepEqual(task7({min: 2, max:5, length:6}), [2,3,5]);
      });
      it('min: 2, length: 6 = [1,1,2,3,5,8]', () => {
        assert.deepEqual(task7({min: 2, length:6}), [1,1,2,3,5,8]);
      });
      it('max: 7, length: 6 = [1,1,2,3,5,8]', () => {
        assert.deepEqual(task7({max:5, length:6}), [1,1,2,3,5,8]);
      });
      it('min: 40, max:90 = [55,89]', () => {
        assert.deepEqual(task7({min:40, max:90}), [55,89]);
      });
    });

  });
};
