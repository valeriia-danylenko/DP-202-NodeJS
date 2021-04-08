import { test1 } from './test_task1.js';
import { test2 } from './test_task2.js';
import { test3 } from './test_task3.js';
import { test4 } from './test_task4.js';
import { test5 } from './test_task5.js';
import { test6 } from './test_task6.js';
import { test7 } from './test_task7.js';

mocha.setup('bdd');

test1();
test2();
test3();
test4();
test5();
test6();
test7();

//START
mocha.run();
