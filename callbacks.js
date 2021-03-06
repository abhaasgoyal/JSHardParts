// Challenge 1
function addTwo(num) {
  return num + 2;
}

// To check if you've completed it, uncomment these console.logs!
// console.log(addTwo(3));
// console.log(addTwo(10));

// Challenge 2
function addS(word) {
  return word + "s";
}

// uncomment these to check your work
// console.log(addS('pizza'));
// console.log(addS('bagel'));

// Challenge 3
function map(array, callback) {
  // return array.map(callback);

  // Not disturbing the original array
  let mapping = [];
  for (let i = 0; i < array.length; i++) {
    mapping.push(callback(array[i]));
  }
  return mapping;
}

// console.log(map([1, 2, 3], addTwo));

// Challenge 4
function forEach(array, callback) {
  // return array.forEach(callback);
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}

// see for yourself if your forEach works!
// let alphabet = '';
// const letters = ['a', 'b', 'c', 'd'];
// forEach(letters, function(char) {
//   alphabet += char;
// });
// console.log(alphabet);   //prints 'abcd'

// Challenge 5
function mapWith(array, callback) {
  let mapping = [];
  // The callback function which is being passed in the forEach function updates the mapping array which is closed to the     mapWith function
  forEach(array, (value) => mapping.push(callback(value)));
  return mapping;
}

// Challenge 6
function reduce(array, callback, initialValue) {
  let finalValue = initialValue;
  forEach(array, (value) => {
    finalValue = callback(value, finalValue);
  });
  return finalValue;
}

// const nums = [4, 1, 3];
// const add = function(a, b) { return a + b; }
// reduce(nums, add, 0);   //-> 8

// Challenge 7
function intersection(...arrays) {
  const reduceIntersect = (curArr, inputArr) =>
    curArr.filter((value) => inputArr.indexOf(value) !== -1);
  // Rather than inputArr.indexOf(value) !== -1 one can also put inputArr.includes(value)
  let x = reduce(arrays, reduceIntersect, arrays[0]);
  console.log(x);
}

// intersection([5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]);
// should log: [5, 15]

// Challenge 8
function union(...arrays) {
  /* Method 1
  arrays.map((array) => array.sort((a,b) => a-b))
	const reduceUnion = (curArr, inputArr) => {
    let newArr = [];
    let j = 0;
    let i = 0;
			while(i<curArr.length)
        {
          if(curArr[i]<inputArr[j])
            {
            newArr.push(curArr[i])
              i++;
            }
          else if(curArr[i]>inputArr[j])
            {
              newArr.push(inputArr[j])
              j++;
            }
          else
            {
             	newArr.push(curArr[i])
              i++;
              j++;
            }
        }
    while(j<inputArr.length)
      {
        newArr.push(inputArr[j])
      }
    return newArr;
  }
  */
  const reduceUnion = (curArr, inputArr) => {
    // Mixing two arrays of the input array and the new array which has properties of curArr not there 		in inputArr
    return inputArr.concat(curArr.filter((value) => !inputArr.includes(value)));
  };
  return reduce(arrays, reduceUnion, arrays[0]);
}

// console.log(union([5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]));
// should log: [5, 10, 15, 88, 1, 7, 100]

// Challenge 9
function objOfMatches(array1, array2, callback) {
  let newObj = {};
  // Works even with unsorted .. can use indexOf in if condition for index matching but expensive
  // Best to use with simple for loop without for loop
  const forEachFunc = (value) => {
    if (array2.includes(callback(value))) newObj[value] = callback(value);
  };
  forEach(array1, forEachFunc);
  return newObj;
}

// console.log(objOfMatches(['hi', 'howdy', 'bye', 'later', 'hello'], ['HI', 'Howdy', 'BYE', 'LATER', 'hello'], function(str) { return str.toUpperCase(); }));
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }

// Challenge 10
function multiMap(arrVals, arrCallbacks) {
  let newObj = {};
  const forEachNameFunc = (arrName) => {
    let tempArrCallbackProp = [];
    // If I tried to mess with arrName inside that function it would give an error because of scope chain
    const forEachValFunc = (arrCallback) =>
      tempArrCallbackProp.push(arrCallback(arrName));
    forEach(arrCallbacks, forEachValFunc);
    newObj[arrName] = tempArrCallbackProp;
  };
  forEach(arrVals, forEachNameFunc);
  return newObj;
}

// console.log(multiMap(['catfood', 'glue', 'beer'], [function(str) { return str.toUpperCase(); }, function(str) { return str[0].toUpperCase() + str.slice(1).toLowerCase(); }, function(str) { return str + str; }]));
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }

// Challenge 11
function objectFilter(obj, callback) {
  let newObj = {};
  for (const key in obj) {
    if (obj[key] === callback(key)) newObj[key] = obj[key];
  }
  return newObj;
}

// const cities = {
// London: 'LONDON',
// LA: 'Los Angeles',
// Paris: 'PARIS',
// };
// console.log(objectFilter(cities, city => city.toUpperCase())) // Should log { London: 'LONDON', Paris: 'PARIS'}

// Challenge 12

// true and false Instances are closed to forEachFunc so wherever forEachFunc is called even in another function it can still update true and false instances
function majority(array, callback) {
  let trueInstances = 0,
    falseInstances = 0;
  let forEachFunc = (value) => {
    if (callback(value)) trueInstances++;
    else falseInstances++;
  };
  forEach(array, forEachFunc);
  return trueInstances > falseInstances ? true : false;
}

/*** Uncomment these to check your work! ***/
// const isOddz = function(num) { return num % 2 === 1; };
// console.log(majority([1, 2, 3, 4, 5], isOddz)); // should log: true
// console.log(majority([2, 3, 4, 5], isOddz)); // should log: false

// Challenge 13
function prioritize(array, callback) {
  let priorityArr = [];
  let nonpriorityArr = [];
  const forEachFunc = (value) => {
    if (callback(value)) priorityArr.push(value);
    else nonpriorityArr.push(value);
  };

  forEach(array, forEachFunc);
  return priorityArr.concat(nonpriorityArr);
}

// /*** Uncomment these to check your work! ***/
// const startsWithS = function(str) { return str[0] === 's' || str[0] === 'S'; };
// console.log(prioritize(['curb', 'rickandmorty', 'seinfeld', 'sunny', 'friends'], startsWithS)); // should log:
// ['seinfeld', 'sunny', 'curb', 'rickandmorty', 'friends']

// Challenge 14
function countBy(array, callback) {
  let newObj = {};
  const forEachFunc = (value) => {
    if (callback(value) in newObj) newObj[callback(value)] += 1;
    else newObj[callback(value)] = 1;
  };
  forEach(array, forEachFunc);
  return newObj;
}

// /*** Uncomment these to check your work! ***/
// console.log(countBy([1, 2, 3, 4, 5], function(num) {
// if (num % 2 === 0) return 'even';
// else return 'odd';
// })); // should log: { odd: 3, even: 2 }

// Challenge 15
function groupBy(array, callback) {
  let newObj = {};
  forEach(array, (val) => {
    let newKey = callback(val);
    if (newObj[newKey] === undefined) newObj[newKey] = [val];
    else newObj[newKey].push(val);
  });
  return newObj;
}

// /*** Uncomment these to check your work! ***/
// const decimals = [1.3, 2.1, 2.4];
// const floored = function(num) { return Math.floor(num); };
// console.log(groupBy(decimals, floored)); // should log: { 1: [1.3], 2: [2.1, 2.4] }

// Challenge 16
function goodKeys(obj, callback) {
  let goodArr = [];
  for (const key in obj) {
    if (callback(obj[key])) goodArr.push(key);
  }
  return goodArr;
}

// /*** Uncomment these to check your work! ***/
// const sunny = { mac: 'priest', dennis: 'calculating', charlie: 'birdlaw', dee: 'bird', frank: 'warthog' };
// const startsWithBird = function(str) { return str.slice(0, 4).toLowerCase() === 'bird'; };
// console.log(goodKeys(sunny, startsWithBird)); // should log: ['charlie', 'dee']

// Challenge 17
function commutative(func1, func2, value) {
  if (func1(func2(value)) === func2(func1(value))) return true;
  else return false;
}

// /*** Uncomment these to check your work! ***/
// const multBy3 = n => n * 3;
// const divBy4 = n => n / 4;
// const subtract5 = n => n - 5;
// console.log(commutative(multBy3, divBy4, 11)); // should log: true
// console.log(commutative(multBy3, subtract5, 10)); // should log: false
// console.log(commutative(divBy4, subtract5, 48)); // should log: false

// Challenge 18
function objFilter(obj, callback) {
  let newObj = {};
  for (const key in obj) {
    if (callback(key) === obj[key]) newObj[key] = obj[key];
  }
  return newObj;
}

// /*** Uncomment these to check your work! ***/
// const startingObj = {};
// startingObj[6] = 3;
// startingObj[2] = 1;
// startingObj[12] = 4;
// const half = n => n / 2;
// console.log(objFilter(startingObj, half)); // should log: { 2: 1, 6: 3 }

// Challenge 19
function rating(arrOfFuncs, value) {
  let trueInstances = 0,
    totalInstances = 0;
  forEach(arrOfFuncs, (func) => {
    if (func(value)) trueInstances++;
    totalInstances++;
  });
  return (trueInstances * 100) / totalInstances;
}

// /*** Uncomment these to check your work! ***/
// const isEven = n => n % 2 === 0;
// const greaterThanFour = n => n > 4;
// const isSquare = n => Math.sqrt(n) % 1 === 0;
// const hasSix = n => n.toString().includes('6');
// const checks = [isEven, greaterThanFour, isSquare, hasSix];
// console.log(rating(checks, 64)); // should log: 100
// console.log(rating(checks, 66)); // should log: 75

// Challenge 20
function pipe(arrOfFuncs, value) {
  let finalValue = value;
  forEach(arrOfFuncs, (func) => {
    finalValue = func(finalValue);
  });
  return finalValue;
}

// /*** Uncomment these to check your work! ***/
// const capitalize = str => str.toUpperCase();
// const addLowerCase = str => str + str.toLowerCase();
// const repeat = str => str + str;
// const capAddlowRepeat = [capitalize, addLowerCase, repeat];
// console.log(pipe(capAddlowRepeat, 'cat')); // should log: 'CATcatCATcat'

// Challenge 21
function highestFunc(objOfFuncs, subject) {
  let maxKey = "";
  let maxValue = Number.NEGATIVE_INFINITY;
  for (const key in objOfFuncs) {
    if (objOfFuncs[key](subject) > maxValue) {
      maxValue = objOfFuncs[key](subject);
      maxKey = key;
    }
  }
  // forEach ( objOfFuncs, (func) => {
  // if(func(subject) > maxValue)
  // max
  // }  )
  return maxKey;
}

// /*** Uncomment these to check your work! ***/
// const groupOfFuncs = {};
// groupOfFuncs.double = n => n * 2;
// groupOfFuncs.addTen = n => n + 10;
// groupOfFuncs.inverse = n => n * -1;
// console.log(highestFunc(groupOfFuncs, 5)); // should log: 'addTen'
// console.log(highestFunc(groupOfFuncs, 11)); // should log: 'double'
// console.log(highestFunc(groupOfFuncs, -20)); // should log: 'inverse'

// Challenge 22
function combineOperations(startVal, arrOfFuncs) {
  let currentVal = startVal;
  forEach(arrOfFuncs, (callback) => {
    currentVal = callback(currentVal);
  });
  return currentVal;
}

function add100(num) {
  return num + 100;
}

function divByFive(num) {
  return num / 5;
}

function multiplyByThree(num) {
  return num * 3;
}

function multiplyFive(num) {
  return num * 5;
}

function addTen(num) {
  return num + 10;
}
// /*** Uncomment these to check your work! ***/
// console.log(combineOperations(0, [add100, divByFive, multiplyByThree])); // Should output 60 -->
// console.log(combineOperations(0, [divByFive, multiplyFive, addTen])); // Should output 10

// Challenge 23
function myFunc(array, callback) {
  let instance = false;
  forEach(array, (value) => {
    if (callback(value)) instance = true;
  });
  return instance;
}

const numbers = [2, 3, 6, 64, 10, 8, 12];
const evens = [2, 4, 6, 8, 10, 12, 64];

function isOdd(num) {
  return num % 2 !== 0;
}

// /*** Uncomment these to check your work! ***/
// console.log(myFunc(numbers, isOdd)); // Output should be 1
// console.log(myFunc(evens, isOdd)); // Output should be -1

// Challenge 24
function myForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}

let sum = 0;

function addToSum(num) {
  sum += num;
}

// /*** Uncomment these to check your work! ***/
// const numz = [1, 2, 3];
// myForEach(numz, addToSum);
// console.log(sum); // Should output 6
