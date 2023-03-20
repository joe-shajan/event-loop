const fs = require("fs");

setImmediate(() => console.log(1));

setTimeout(() => console.log(9), 0);

Promise.resolve().then(() => console.log(2));

process.nextTick(() => console.log(3));

fs.readFile(__filename, () => {
  console.log(4);

  setTimeout(() => console.log(5), 0); // why set time out prints after setimmediate
  setImmediate(() => console.log(6));
  process.nextTick(() => console.log(7));
});

console.log(8);

/*
!     8
!     3
!     2
!     9
!     1
!     4
!     7
!     6
!     5
 */

/*

! stack = [main]

*MICROTASK QUEUES
? nextTick = [3]
? promise = [2]

*Phases
? timers = [9]
? pendingIO = [fn]
? check = [1]

*/

//for fn
/*

*MICROTASK QUEUES
? nextTick = [7]
? promise = []

*Phases
? timers = [5]
? pendingIO = []
? check = [6]

*/
