// This section will mainly deal with the extension challenges for functional exercises .. rest of the exercises are the same parts as of closures and callbacks
// Except russianRoulette challenge 8 which is easy anyway

// Challenge 1
const functionValidator = (funcArr, input, output) => {
  return funcArr.reduce((accumulator, currentFunc) => {
    if (currentFunc(input) === output) accumulator.push(currentFunc);
    return accumulator;
  }, []);
};

// const addFive = num => num + 5;
// const multiplyByTwo = num => num * 2;
// const subtractOne = num => num - 1;
// const fnArr = [addFive, multiplyByTwo, subtractOne];

// console.log(functionValidator(fnArr, 5, 10)) // should log [num => num + 5, num => num * 2]

// Challenge 2
const allClear = (funcArr, value) => {
  return funcArr.reduce((accClear, curFunc) => {
    if (!curFunc(value)) return false;
    else return accClear;
  }, true);
};

// const isOdd = num => num % 2 === 1;
// const isPositive = num => num > 0;
// const multipleOfFive = num => num % 5 === 0;
// const numFnArr = [isOdd, isPositive, multipleOfFive];
// console.log(allClear(numFnArr, 25)) // should log true
// console.log(allClear(numFnArr, -25)) // should log false

// Challenge 3
const numSelectString = (numArr) => {
  return numArr
    .filter((curVal) => curVal % 2 === 1)
    .sort((a, b) => a - b)
    .reduce((acc, currVal, i, src) => {
      if (i === src.length - 1) return `${acc}${currVal}`;
      else return `${acc}${currVal}, `;
    }, "");
};

// const nums = [17, 34, 3, 12]
// console.log(numSelectString(nums)) // should log "3, 17"

// Challenge 4
const movieSelector = (moviesArr) => {
  return moviesArr
    .filter((currObj) => currObj.score > 5)
    .map((currObj) => currObj.title.toUpperCase());
};

// const movies = [ { id: 1, title: "Pan's Labyrinth", score: 9 }, { id: 37, title: "Manos: The Hands of Fate", score: 2 }, { title: "Air Bud", score: 5 }, { title: "Hackers", score: 7 } ]
// console.log(movieSelector(movies)) // should log [ "PAN'S LABYRINTH", "HACKERS" ]

// Challenge 5
// I know it could be better will implement currying in near future
const curriedAddThreeNums = (a) => {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
};

// console.log(curriedAddThreeNums(3)(-1)(1)); // should log 3

// Challenge 6
// const curriedAddTwoNumsToFive = curriedAddThreeNums(5)

// console.log(curriedAddTwoNumsToFive(6)(7)) // should log 18
