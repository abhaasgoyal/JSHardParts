/****************************************************************
                  WORKING WITH OBJECT LITERALS
****************************************************************/

/*** CHALLENGE 1 of 1 ***/

function makePerson(name, age) {
  // add code here
  return {
    name: name,
    age: age,
  };
}

const vicky = makePerson("Vicky", 24);

// /********* Uncomment these lines to test your work! *********/
// console.log(vicky.name); // -> Logs 'Vicky'
// console.log(vicky.age); // -> Logs 24

/****************************************************************
                       USING OBJECT.CREATE
****************************************************************/

/*** CHALLENGE 1 of 3 ***/

const personStore = {
  // add code here
  greet() {
    console.log("hello");
  },
};

// /********* Uncomment this line to test your work! *********/
// personStore.greet(); // -> Logs 'hello'

/*** CHALLENGE 2 of 3 ***/

function personFromPersonStore(name, age) {
  // add code here
  let newPerson = Object.create(personStore);
  newPerson.name = name;
  newPerson.age = age;
  return newPerson;
}

const sandra = personFromPersonStore("Sandra", 26);

// /********* Uncomment these lines to test your work! *********/
// console.log(sandra.name); // -> Logs 'Sandra'
// console.log(sandra.age); //-> Logs 26
// sandra.greet(); //-> Logs 'hello'

/*** CHALLENGE 3 of 3 ***/

// add code here

personStore.introduce = function () {
  console.log(`Hi, my name is ${this.name}`);
};

// sandra.introduce(); // -> Logs 'Hi, my name is Sandra'
/*
IMPORTANT
// Note that only in the __proto__ property userFunctionStore object is linked and as personStore properties are added 
// Over time the link auto updates with the new properties
*/

/****************************************************************
                    USING THE 'NEW' KEYWORD
****************************************************************/

/*** CHALLENGE 1 of 3 ***/

function PersonConstructor() {
  // add code here
  // without prototype it wont be in the __proto__ of simon
  this.greet = function () {
    console.log("hello");
  };
}

// /********* Uncomment this line to test your work! *********/
// const simon = new PersonConstructor;
// simon.greet(); // -> Logs 'hello'

/*** CHALLENGE 2 of 3 ***/

function personFromConstructor(name, age) {
  // add code here
  let newObj = new PersonConstructor();
  newObj.name = name;
  newObj.age = age;
  return newObj;
}

const mike = personFromConstructor("Mike", 30);

// /********* Uncomment these lines to test your work! *********/
// console.log(mike.name); // -> Logs 'Mike'
// console.log(mike.age); //-> Logs 30
// mike.greet(); //-> Logs 'hello'

/*** CHALLENGE 3 of 3 ***/
// add code here
// Now adding property to the prototype of the parent function which is autolinked to the __proto__ property of the child
PersonConstructor.prototype.introduce = function () {
  console.log(`Hi, my name is ${this.name}`);
};

/* 
IMPORTANT : BELOW STRATEGY WONT WORK 
*/

// PersonConstructor.introduce = function() {
//   console.log(`Hi, my name is ${this.name}`)
// }

// mike.introduce(); // -> Logs 'Hi, my name is Mike'

/****************************************************************
                        USING ES6 CLASSES
****************************************************************/

/*** CHALLENGE 1 of 3 ***/

class PersonClass {
  constructor(name) {
    // add code here
    this.name = name;
  }
  // classes to prototype is like PersonClass.prototype.greet
  // or we can also do in constructor this.greet
  greet = function () {
    console.log("hello");
  };

  // add code here
}

// /********* Uncomment this line to test your work! *********/
const george = new PersonClass("abhaas");
// george.greet(); // -> Logs 'hello'

/*** CHALLENGE 2 of 2 ***/

// add code here
class DeveloperClass extends PersonClass {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
  introduce = function () {
    console.log(`Hello World, my name is ${this.name}`);
  };
}
// /********* Uncomment these lines to test your work! *********/
const thai = new DeveloperClass("Thai", 32);
// console.log(thai.name); // -> Logs 'Thai'
// thai.introduce(); //-> Logs 'Hello World, my name is Thai'

/****************************************************************
                      EXTENSION: SUBCLASSING
****************************************************************/

const userFunctionStore = {
  sayType: function () {
    console.log(`I am a ${this.type}`);
  },
};

function userFactory(name, score) {
  let user = Object.create(userFunctionStore);
  user.type = "User";
  user.name = name;
  user.score = score;
  return user;
}

const adminFunctionStore = Object.create(userFunctionStore);

function adminFactory(name, score) {
  // Put code here
  let newAdminObj = userFactory(name, score);
  newAdminObj = Object.create(adminFunctionStore);
  newAdminObj.type = "Admin";
  return newAdminObj;
}

// Put code here for a method called sharePublicMessage

adminFunctionStore.sharePublicMessage = () => console.log("Welcome users!");

const adminFromFactory = adminFactory("Eva", 5);

/********* Uncomment these lines to test your work! ********/
adminFromFactory.sayType(); // -> Logs "I am a Admin"
adminFromFactory.sharePublicMessage(); // -> Logs "Welcome users!"

/****************************************************************
EXTENSION: MIXINS
****************************************************************/

class Dog {
  constructor() {
    this.legs = 4;
  }
  speak() {
    console.log("Woof!");
  }
}

const robotMixin = {
  skin: "metal",
  speak: function () {
    console.log(`I have ${this.legs} legs and am made of ${this.skin}`);
  },
};

let robotFido = new Dog();
// Below won't work because __proto__ doesn't have the property of legs
// robotFido = Object.create(robotMixin)
Object.assign(robotFido, robotMixin);
// robotMixin speak() overrides robotFido speak()
// /********* Uncomment to test your work! *********/
robotFido.speak(); // -> Logs "I am made of metal"
