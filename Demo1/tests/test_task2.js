import { task2 } from '../src/task2.js';
const assert = chai.assert;

mocha.setup('bdd');

export function test2() {

  describe('Task 2 Tests', () => {

    describe('Negative Test Cases', () => {
      it('No parameters in function', () => {
        assert.deepEqual(task2(), {
          status: 'failed',
          reason: 'Function takes two parameters'
        });
      });

      it('Three parameters in function', () => {
        assert.deepEqual(task2(6556, 78, 67), {
          status: 'failed',
          reason: 'Function takes two parameters'
        });
      });

      it('Parameters include not objects (list)', () => {
        assert.deepEqual(task2({c:5, d:10}, [12,3]), {
          status: 'failed',
          reason: 'Each parameter must be an object'
        });
      });

      it('Parameters include not objects (null)', () => {
        assert.deepEqual(task2({c:5, d:10}, null), {
          status: 'failed',
          reason: 'Each parameter must be an object'
        });
      });

      it('Values of the objects must be valid numbers (string)', () => {
        assert.deepEqual(task2({c:"5", d:10}, {a:10, b:8}), {
          status: 'failed',
          reason: 'Values Must be valid numbers'
        });
      });

      it('Values of the objects must be valid numbers (NaN)', () => {
        assert.deepEqual(task2({c:NaN, d:10}, {a:10, b:8}), {
          status: 'failed',
          reason: 'Values Must be valid numbers'
        });
      });

      it('Values of the objects must be valid numbers (null)', () => {
        assert.deepEqual(task2({c:null, d:10}, {a:10, b:8}), {
          status: 'failed',
          reason: 'Values Must be valid numbers'
        });
      });

      it('Values of the objects must be valid numbers (infinity)', () => {
        assert.deepEqual(task2({c:Infinity, d:10}, {a:10, b:8}), {
          status: 'failed',
          reason: 'Values Must be valid numbers'
        });
      });

      it('Values are not in range (lower bound)', () => {
        assert.deepEqual(task2({c:0, d:10}, {a:10, b:8}), {
          status: 'failed',
          reason: 'Value must be in range (1,1000000)'
        });
      });

      it('Values are not in range (upper bound)', () => {
        assert.deepEqual(task2({c:1000001, d:10}, {a:10, b:8}), {
          status: 'failed',
          reason: 'Value must be in range (1,1000000)'
        });
      });

      it('Object keys do not include (a,b) and (c,d)', () => {
        assert.deepEqual(task2({c:4, d:10}, {f:10, b:8}), {
          status: 'failed',
          reason: 'Objects must include keys (a,b) and (c,d)'
        });
      });

      it('Object keys do not include (a,b) and (c,d)', () => {
        assert.deepEqual(task2({c:4, e:10}, {a:10, b:8}), {
          status: 'failed',
          reason: 'Objects must include keys (a,b) and (c,d)'
        });
      });

      it('Inside of an array there is not an object (list)', () => {
        assert.deepEqual(task2({c:4, d:10}, {f:10, b:8}), {
          status: 'failed',
          reason: 'Objects must include keys (a,b) and (c,d)'
        });
      });
  });

    describe('Positive Test Cases', () => {
      it('area 1 > area 2. expected 0', () => {
        assert.equal(task2({a: 60, b:12},{c:18, d:15}), 0);
      });
      it('area 2 > area 1, expect 1', () => {
        assert.equal(task2({a: 10, b:5},{c: 11, d:6}), 'envelope 1');
      });
      it('area 1 == area 2 a < c, expect 0', () => {
        assert.equal(task2({a: 40, b:20},{c: 50, d:16}), 0);
      });
      it('area 1 == area 2 a > c, expect 0', () => {
        assert.equal(task2( {c: 40, d:20}, {a: 50, b:16}), 0);
      });
      it(' 1 == 2 expect 0', () => {
        assert.equal(task2( {a:10, b: 8}, {c:10, d: 8}), 0);
      });
      it(' decimal numbers', () => {
        assert.equal(task2({c:9.9, d: 7.8}, {a:10, b: 8} ), 'envelope 1');
      });
      it('area 1 > area 2, expect 2', () => {
        assert.equal(task2( {a:20, b:40}, {c: 15, d: 30}), 'envelope 2');
      });
      it('area 1 == area 2, a < c, expect 1', () => {
        assert.equal(task2( {a:30, b:15}, {c: 40, d: 20}), 'envelope 1');
      });
      it('area1 == area2, expect 0', () => {
        assert.equal(task2( {a: 40, b:20}, {c: 50, d:16}), 0);
      });
      it(' area1 > area2, c>a, expect 2', () => {
        assert.equal(task2( {a:20, b:11}, {c:21, d:2}), 'envelope 2');
      });
      it('  area2> area1, c<a, expect 1', () => {
        assert.equal(task2( {a:21, b:2}, {c:20, d:11}), 'envelope 1');
      });
      it(' Expect 2', () => {
        assert.equal(task2( {a:20, b:11}, {c:20.2, d:3.5}), 'envelope 2');
      });
    });

  });
}
