import { task3 } from '../src/task3.js';
const assert = chai.assert;

mocha.setup('bdd');

export function test3() {

  describe('Task 3 Tests', () => {

    describe('Negative Test Cases', () => {
      it('No parameters in function', () => {
        assert.deepEqual(task3(), {
          status: 'failed',
          reason: 'Function takes only one parameter'
        });
      });

      it('Two parameters in function', () => {
        assert.deepEqual(task3(6556, 78), {
          status: 'failed',
          reason: 'Function takes only one parameter'
        });
      });

      it('Parameter is not an array (number)', () => {
        assert.deepEqual(task3(5), {
          status: 'failed',
          reason: 'Parameter must be an array'
        });
      });

      it('Parameter is not an array (NaN)', () => {
        assert.deepEqual(task3(NaN), {
          status: 'failed',
          reason: 'Parameter must be an array'
        });
      });

      it('Inside of an array there is not an object (list)', () => {
        assert.deepEqual(task3([[1,2,3], {min: 5, item: 7}]), {
          status: 'failed',
          reason: 'Each element of an array must be an object'
        });
      });

      it('Inside of an array there is not an object, (number)', () => {
        assert.deepEqual(task3([5, {min: 5, item: 7}]), {
          status: 'failed',
          reason: 'Each element of an array must be an object'
        });
      });

      it('No verticles key value pair', () => {
        assert.deepEqual(task3([{a:5, b:6, c:7}]), {
          status: 'failed',
          reason: 'Each triangle object must include key verticles'
        });
      });

      it('Verticles value is not valid (more letters)', () => {
        assert.deepEqual(task3([{vertices: 'ABCD', a:5, b:5, c:5}]), {
          status: 'failed',
          reason: 'Vericles must include 3 capital letters'
        });
      });

      it('Verticles value is not valid (fewer letters)', () => {
        assert.deepEqual(task3([{vertices: 'AB', a:5, b:5, c:5}]), {
          status: 'failed',
          reason: 'Vericles must include 3 capital letters'
        });
      });

      it('Verticles value is not valid not capital letters)', () => {
        assert.deepEqual(task3([{vertices: 'abc', a:5, b:5, c:5}]), {
          status: 'failed',
          reason: 'Vericles must include 3 capital letters'
        });
      });


      it('Verticles value is not valid (number)', () => {
        assert.deepEqual(task3([{vertices: 123, a:5, b:5, c:5}]), {
          status: 'failed',
          reason: 'Each triangle object must include key verticles'
        });
      });

      it('Same letters in verticles repeated)', () => {
        assert.deepEqual(task3([{vertices:"ADD", a:5, b:5, c:5}]), {
          status: 'failed',
          reason: 'Verticles must consist on unique letters'
        });
      });

      it('Sides do not correspond to verticles', () => {
        assert.deepEqual(task3([{vertices:"ABC", a:10, e:10, c:20}]), {
          status: 'failed',
          reason: 'Value of sides must correspond to lowercase Verticle name and be a valid number greater than 0'
        });
      });

      it('Sides values are not valid numbers (0)', () => {
        assert.deepEqual(task3([{vertices:"ABC", a:10, b:10, c:0}]), {
          status: 'failed',
          reason: 'Value of sides must correspond to lowercase Verticle name and be a valid number greater than 0'
        });
      });

      it ('Sides values are not valid numbers (NaN)', () => {
        assert.deepEqual(task3([{vertices:"ABC", a:10, b:NaN, c:20}]), {
          status: 'failed',
          reason: 'Value of sides must correspond to lowercase Verticle name and be a valid number greater than 0'
        });
      });

      it('Sides values are not valid numbers (null)', () => {
        assert.deepEqual(task3([{vertices:"ABC", a:10, b:null, c:20}]), {
          status: 'failed',
          reason: 'Value of sides must correspond to lowercase Verticle name and be a valid number greater than 0'
        });
      });

      it('Sides values are not valid number (a string)', () => {
        assert.deepEqual(task3([{vertices:"ABC", a:'abc', b:10, c:20}]), {
          status: 'failed',
          reason: 'Value of sides must correspond to lowercase Verticle name and be a valid number greater than 0'
        });
      });

      it('Sides do not form valid triangle', () => {
        assert.deepEqual(task3([{vertices:"ABC", a:1, b:10, c:20}]), {
          status: 'failed',
          reason: 'Sides must form a valid triagle'
        });
      });

    });

    describe('Positive Test Cases', () => {
      it('Sort Triangles', () => {
        assert.deepEqual(task3([{
          vertices: 'BCD',
          b: 25,
          c: 15,
          d: 30
        }, {
            vertices: 'XYZ',
            x: 40,
            y: 60,
            z: 21,
            t: 10
        }, {
          vertices: 'ABC',
          a: 10,
          b: 20,
          c: 20,
          z: 200
        } ]), [ 'BCD', 'XYZ', 'ABC' ]);
      });
    });

  });
};
