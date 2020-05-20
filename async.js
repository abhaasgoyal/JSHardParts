/* CHALLENGE 1 */

function sayHowdy() {
  console.log("Howdy");
}

function testMe() {
  setTimeout(sayHowdy, 0);
  console.log("Partnah");
}
// After thinking it through, uncomment the following line to check your guess!
// testMe(); // what order should these log out? Howdy or Partnah first?

/* CHALLENGE 2 */

function delayedGreet() {
  // ADD CODE HERE
  setTimeout(function () {
    console.log("welcome");
  }, 3000);
}
// Uncomment the following line to check your work!
// delayedGreet(); // should log (after 3 seconds): welcome

/* CHALLENGE 3 */

function helloGoodbye() {
  // ADD CODE HERE
  console.log("hello");
  setTimeout(function () {
    console.log("good bye");
  }, 3000);
}
// Uncomment the following line to check your work!
// helloGoodbye(); // should log: hello // should also log (after 3 seconds): good bye

/* CHALLENGE 4 */

function brokenRecord() {
  // ADD CODE HERE
  // console.log("hi again");
  // setTimeout( brokenRecord, 1000)
  setInterval(function () {
    console.log("hi again");
  }, 1000);
}
// Uncomment the following line to check your work!
// brokenRecord(); // should log (every second): hi again

/* CHALLENGE 5 */

function limitedRepeat() {
  // ADD CODE HERE
  let myVar = setInterval(function () {
    console.log("hi for now");
  }, 1000);
  setTimeout(function () {
    clearInterval(myVar);
  }, 5000);
}
// Uncomment the following line to check your work!
// limitedRepeat(); // should log (every second, for 5 seconds): hi for now

/* CHALLENGE 6 */

function everyXsecsForYsecs(func, interval, duration) {
  let intervalFunc = setInterval(func, interval * 1000);
  setTimeout(() => clearInterval(intervalFunc), duration * 1000);
  // ADD CODE HERE
}
// Uncomment the following lines to check your work!
// function theEnd() {
//   console.log('This is the end!');
// }
// everyXsecsForYsecs(theEnd, 2, 20); // should invoke theEnd function every 2 seconds, for 20 seconds): This is the end!

/* CHALLENGE 7 */

function delayCounter(target, wait) {
  let counter = 1;
  return function repeater() {
    let intervalFunc = setInterval(function () {
      console.log(counter);
      counter++;
    }, wait);
    setTimeout(() => clearInterval(intervalFunc), wait * target);
    // Can also do via plain setTimeout calling repeater 3 times for loop 3 times
  };
}

// UNCOMMENT THESE TO TEST YOUR WORK!
// const countLogger = delayCounter(3, 1000)
// countLogger();
// After 1 second, log 1
// After 2 seconds, log 2
// After 3 seconds, log 3

/* CHALLENGE 8 */

function promised(val) {
  return new Promise((resolve) =>
    setTimeout(function () {
      resolve(val);
    }, 2000)
  );
}

// UNCOMMENT THESE TO TEST YOUR WORK!
// const createPromise = promised('wait for it...');
// createPromise.then((val) => console.log(val));
// will log "wait for it..." to the console after 2 seconds

/* CHALLENGE 9 */

class SecondClock {
  constructor(cb) {
    // ADD CODE HERE
    this.cb = cb;
    this.curVal = 0;
    this.timer = null;
  }
  start() {
    this.timer = setInterval(() => {
      this.curVal++;
      this.cb(this.curVal);
    }, 1000);
  }
  reset() {
    clearInterval(this.timer);
  }
  // ADD METHODS HERE
}

// UNCOMMENT THESE TO TEST YOUR WORK!
// const clock = new SecondClock((val) => { console.log(val) });
// console.log("Started Clock.");
// clock.start();
// setTimeout(() => {
//     clock.reset();
//     console.log("Stopped Clock after 6 seconds.");
// }, 6000);

/* CHALLENGE 10 */
//IMPLEMENTATION 1
/*
function debounce(callback, interval) {
  // ADD CODE HERE
  let bouncer = 0;
  let isActiveTimer = null;
  return function () {
    if (!bouncer) {
      bouncer = 1;
      isActiveTimer = setTimeout(function () {
        bouncer = 0;
      }, interval);
      return callback();
    } else {
      clearTimeout(isActiveTimer);
      isActiveTimer = setTimeout(function () {
        bouncer = 0;
      }, interval);
    }
  };
}
*/
// IMPLEMENTATION 2 (imo best)

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/* REASON - shorter and works with object functions
function sayHello() {
  console.log("My name is", this.name);
}

const amy = {
  name: "amy",
  speak: debounce(sayHello),
};

amy.speak();
*/
// UNCOMMENT THESE TO TEST YOUR WORK!
function giveHi() {
  return "hi";
}
const giveHiSometimes = debounce(giveHi, 3000);
console.log(giveHiSometimes()); // -> 'hi'
setTimeout(function () {
  console.log(giveHiSometimes());
}, 2000); // -> undefined
setTimeout(function () {
  console.log(giveHiSometimes());
}, 4000); // -> undefined
setTimeout(function () {
  console.log(giveHiSometimes());
}, 8000); // -> 'hi'
