### Javascript Advanced Concepts

##### Inheritance and the prototype chain

JavaScript remains prototype-based
When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain.

##### Strict mode

JavaScript's strict mode, introduced in ECMAScript 5, is a way to opt in to a restricted variant of JavaScript, thereby implicitly opting-out of "sloppy mode".
The normal, non-strict mode of JavaScript is sometimes referred to as sloppy mode. This isn't an official designation, but you are likely to come across it if you spend time doing serious JavaScript code.

Eliminates some JavaScript silent errors by changing them to throw errors.
Fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode.
Prohibits some syntax likely to be defined in future versions of ECMAScript.

##### JavaScript typed arrays

JavaScript typed arrays are array-like objects that provide a mechanism for reading and writing raw binary data in memory buffers. As you may already know, Array objects grow and shrink dynamically and can have any JavaScript value. JavaScript engines perform optimizations so that these arrays are fast.

##### Memory Management

##### Concurrency model and the event loop

JavaScript has a concurrency model based on an event loop, which is responsible for executing the code, collecting and processing events, and executing queued sub-tasks. This model is quite different from models in other languages like C and Java.

[The_Javascript_Runtime_Environment_Example](https://media.prod.mdn.mozit.cloud/attachments/2020/02/23/17124/7cbd04169bbb5be13ede088ff0833882/The_Javascript_Runtime_Environment_Example.svg)
Event Loop -
The event loop got its name because of how it's usually implemented, which usually resembles:

while (queue.waitForMessage()) {
queue.processNextMessage()
}
queue.waitForMessage() waits synchronously for a message to arrive (if one is not already available and waiting to be handled).

## collapsible markdown?

<details><summary>CLICK ME</summary>
<p>

#### yes, even hidden code blocks!

```python
print("hello world!")
```

</p>
</details>

## Question 1. What's the difference between `undefined` and `not defined` in JavaScript

### Answer

In JavaScript if you try to use a variable that doesn't exist and has not been declared, then JavaScript will throw an error `var name is not defined` and the script will stop executing thereafter. But If you use `typeof undeclared_variable` then it will return `undefined`.

Before starting further discussion let's understand the difference between declaration and definition.

`var x` is a declaration because you are not defining what value it holds yet, but you are declaring its existence and the need for memory allocation.

```javascript
var x; // declaring x
console.log(x); // output: undefined
```

`var x = 1` is both declaration and definition (also we can say we are doing initialisation), Here declaration and assignment of value happen inline for variable x, In JavaScript every variable declaration and function declaration brings to the top of its current scope in which it's declared then assignment happen in order this term is called `hoisting`.

A variable can be declared but not defined. When we try to access it, It will result `undefined`.

```javascript
var x; // Declaration
typeof x === "undefined"; // Will return true
```

A variable can be neither declared nor defined. When we try to reference such variable then the result will be `not defined`.

```javascript
console.log(y); // Output: ReferenceError: y is not defined
```

### Ref Link:

[http://stackoverflow.com/questions/20822022/javascript-variable-definition-declaration](http://stackoverflow.com/questions/20822022/javascript-variable-definition-declaration)

## Question 2. For which value of `x` the results of the following statements are not the same?

```javascript
//  if( x <= 100 ) {...}
if( !(x > 100) ) {...}
```

### Answer

`NaN <= 100` is `false` and `NaN > 100` is also `false`, so if the
value of `x` is `NaN`, the statements are not the same.

The same holds true for any value of x that being converted to Number, returns NaN, e.g.: `undefined`, `[1,2,5]`, `{a:22}` , etc.

This is why you need to pay attention when you deal with numeric variables. `NaN` can’t be equal, less than or more than any other numeric value, so the only reliable way to check if the value is `NaN`, is to use `isNaN()` function.

## Question 3. What is the drawback of declaring methods directly in JavaScript objects?

### Answer

One of the drawback of declaring methods directly in JavaScript objects is that they are very memory inefficient. When you do that, a new copy of the method is created for each instance of an object. Let's see it on example:

```javascript
var Employee = function (name, company, salary) {
  this.name = name || "";
  this.company = company || "";
  this.salary = salary || 5000;

  // We can create a method like this:
  this.formatSalary = function () {
    return "$ " + this.salary;
  };
};

// we can also create method in Employee's prototype:
Employee.prototype.formatSalary2 = function () {
  return "$ " + this.salary;
};

//creating objects
var emp1 = new Employee("Yuri Garagin", "Company 1", 1000000);
var emp2 = new Employee("Dinesh Gupta", "Company 2", 1039999);
var emp3 = new Employee("Erich Fromm", "Company 3", 1299483);
```

Here each instance variable `emp1`, `emp2`, `emp3` has own copy of `formatSalary` method. However the `formatSalary2` will only be added once to an object `Employee.prototype`.

## Question 4. What is “closure” in javascript? Can you provide an example?

### Answer

A closure is a function defined inside another function (called parent function) and has access to the variable which is declared and defined in parent function scope.

The closure has access to the variable in three scopes:

- Variable declared in his own scope
- Variable declared in parent function scope
- Variable declared in the global namespace

```javascript
var globalVar = "abc";

// Parent self invoking function
(function outerFunction(outerArg) {
  // begin of scope outerFunction
  // Variable declared in outerFunction function scope
  var outerFuncVar = "x";
  // Closure self-invoking function
  (function innerFunction(innerArg) {
    // begin of scope innerFunction
    // variable declared in innerFunction function scope
    var innerFuncVar = "y";
    console.log(
      "outerArg = " +
        outerArg +
        "\n" +
        "outerFuncVar = " +
        outerFuncVar +
        "\n" +
        "innerArg = " +
        innerArg +
        "\n" +
        "innerFuncVar = " +
        innerFuncVar +
        "\n" +
        "globalVar = " +
        globalVar
    );
    // end of scope innerFunction
  })(5); // Pass 5 as parameter
  // end of scope outerFunction
})(7); // Pass 7 as parameter
```

`innerFunction` is closure which is defined inside `outerFunction` and has access to all variable which is declared and defined in outerFunction scope. In addition to this function defined inside the function as closure has access to the variable which is declared in `global namespace`.

Output of above code would be:

```javascript
outerArg = 7;
outerFuncVar = x;
innerArg = 5;
innerFuncVar = y;
globalVar = abc;
```

## Question 5. Write a mul function which will work properly when invoked with following syntax.

```javascript
console.log(mul(2)(3)(4)); // output : 24
console.log(mul(4)(3)(4)); // output : 48
```

### Answer

Below is the code followed by the explanation of how it works:

```javascript
function mul(x) {
  return function (y) {
    // anonymous function
    return function (z) {
      // anonymous function
      return x * y * z;
    };
  };
}
```

Here the `mul` function accepts the first argument and returns the anonymous function which takes the second parameter and returns the anonymous function which takes the third parameter and returns the multiplication of arguments which is being passed in successive

In Javascript function defined inside has access to outer function variable and function is the first class object so it can be returned by the function as well and passed as an argument in another function.

- A function is an instance of the Object type
- A function can have properties and has a link back to its constructor method
- A function can be stored as variable
- A function can be pass as a parameter to another function
- A function can be returned from another function

## Question 6. How to empty an array in JavaScript?

For instance:

```javascript
var arrayList = ["a", "b", "c", "d", "e", "f"];
```

How can we empty the array above?

### Answer

There are a couple of ways by which we can empty an array, So let's discuss all the possible way by which we can empty an array.

#### Method 1

```javascript
arrayList = [];
```

The code above will set the variable `arrayList` to a new empty array. This is recommended if you don't have **references to the original array** `arrayList` anywhere else because It will actually create a new empty array. You should be careful with this way of empty the array, because if you have referenced this array from another variable, then the original reference array will remain unchanged, Only use this way if you have only referenced the array by its original variable `arrayList`.

For instance:

```javascript
var arrayList = ["a", "b", "c", "d", "e", "f"]; // Created array
var anotherArrayList = arrayList; // Referenced arrayList by another variable
arrayList = []; // Empty the array
console.log(anotherArrayList); // Output ['a', 'b', 'c', 'd', 'e', 'f']
```

#### Method 2

```javascript
arrayList.length = 0;
```

The code above will clear the existing array by setting its length to 0. This way of emptying an array will also update all the reference variables that point to the original array.

For instance:

```javascript
var arrayList = ["a", "b", "c", "d", "e", "f"]; // Created array
var anotherArrayList = arrayList; // Referenced arrayList by another variable
arrayList.length = 0; // Empty the array by setting length to 0
console.log(anotherArrayList); // Output []
```

#### Method 3

```javascript
arrayList.splice(0, arrayList.length);
```

Above implementation will also work perfectly. This way of empty the array will also update all the references of the original array.

```javascript
var arrayList = ["a", "b", "c", "d", "e", "f"]; // Created array
var anotherArrayList = arrayList; // Referenced arrayList by another variable
arrayList.splice(0, arrayList.length); // Empty the array by setting length to 0
console.log(anotherArrayList); // Output []
```

#### Method 4

```javascript
while (arrayList.length) {
  arrayList.pop();
}
```

Above implementation can also empty the array. But not recommended to use often.

## Question 7. How to check if an object is an array or not?

### Answer

The best way to find whether an object is instance of a particular class or not using `toString` method from `Object.prototype`

```javascript
var arrayList = [1, 2, 3];
```

One of the best use cases of type checking of an object is when we do method overloading in JavaScript. To understand this, let's say we have a method called `greet` which can take a single string and also a list of strings. To make our `greet` method workable in both situation we need to know what kind of parameter is being passed: is it single value or list of values?

```javascript
function greet(param) {
  if() {
    // here have to check whether param is array or not
  }
  else {
  }
}
```

However, in the above implementation it might not necessary to check the type of the array, we can check for single value string and put array logic code in else block, let see below code for the same.

```javascript
function greet(param) {
  if (typeof param === "string") {
  } else {
    // If param is of type array then this block of code would execute
  }
}
```

Now it's fine we can go with the previous two implementations, but when we have a situation like a parameter can be `single value`, `array`, and `object` type then we will be in trouble.

Coming back to checking the type of an object, As we mentioned that we can use `Object.prototype.toString`

```javascript
if (Object.prototype.toString.call(arrayList) === "[object Array]") {
  console.log("Array!");
}
```

If you are using `jQuery` then you can also used jQuery `isArray` method:

```javascript
if ($.isArray(arrayList)) {
  console.log("Array");
} else {
  console.log("Not an array");
}
```

FYI jQuery uses `Object.prototype.toString.call` internally to check whether an object is an array or not.

In modern browser, you can also use:

```javascript
Array.isArray(arrayList);
```

`Array.isArray` is supported by Chrome 5, Firefox 4.0, IE 9, Opera 10.5 and Safari 5

## Question 8. What will be the output of the following code?

```javascript
var output = (function (x) {
  delete x;
  return x;
})(0);

console.log(output);
```

### Answer

The code above will output `0` as output. `delete` operator is used to delete a property from an object. Here `x` is not an object it's **local variable**. `delete` operator doesn't affect local variables.

## Question 9. What will be the output of the following code?

```javascript
var x = 1;
var output = (function () {
  delete x;
  return x;
})();

console.log(output);
```

### Answer

The code above will output `1` as output. `delete` operator is used to delete a property from an object. Here `x` is not an object it's **global variable** of type `number`.

## Question 10. What will be the output of the following code?

```javascript
var x = { foo: 1 };
var output = (function () {
  delete x.foo;
  return x.foo;
})();

console.log(output);
```

### Answer

The code above will output `undefined` as output. `delete` operator is used to delete a property from an object. Here `x` is an object which has foo as a property and from a self-invoking function, we are deleting the `foo` property of object `x` and after deletion, we are trying to reference deleted property `foo` which result `undefined`.

## Question 11. What will be the output of the following code?

```javascript
var Employee = {
  company: "xyz",
};
var emp1 = Object.create(Employee);
delete emp1.company;
console.log(emp1.company);
```

### Answer

The code above will output `xyz` as output. Here `emp1` object got company as **prototype** property. delete operator doesn't delete prototype property.

`emp1` object doesn't have **company** as its own property. you can test it `console.log(emp1.hasOwnProperty('company')); //output : false` However, we can delete company property directly from `Employee` object using `delete Employee.company` or we can also delete from `emp1` object using `__proto__` property `delete emp1.__proto__.company`.

## Question 12. What is `undefined x 1` in JavaScript

```javascript
var trees = ["redwood", "bay", "cedar", "oak", "maple"];
delete trees[3];
```

### Answer

- When you run the code above and do `console.log(trees);` in chrome developer console then you will get `["redwood", "bay", "cedar", undefined × 1, "maple"]`.
- In the recent versions of Chrome you will see the word `empty` of `undefined x 1`.
- When you run the same code in Firefox browser console then you will get `["redwood", "bay", "cedar", undefined, "maple"]`

Clearly we can see that Chrome has its own way of displaying uninitialized index in arrays. However when you check `trees[3] === undefined` in any browser you will get similar output as `true`.

**Note:** Please remember that you need not check for the uninitialized index of the array in `trees[3] === 'undefined × 1'` it will give an error because `'undefined × 1'` this is just way of displaying an uninitialized index of an array in chrome.

## Question 13. What will be the output of the following code?

```javascript
var trees = ["xyz", "xxxx", "test", "ryan", "apple"];
delete trees[3];
console.log(trees.length);
```

### Answer

The code above will output `5` as output. When we used `delete` operator for deleting an array element then, the array length is not affected by this. This holds even if you deleted all elements of an array using `delete` operator.

So when delete operator removes an array element that deleted element is no longer present in the array. In place of value at deleted index `undefined x 1` in **chrome** and `undefined` is placed at the index. If you do `console.log(trees)` output `["xyz", "xxxx", "test", undefined × 1, "apple"]` in Chrome and in Firefox `["xyz", "xxxx", "test", undefined, "apple"]`.

## Question 14. What will be the output of the following code?

```javascript
var bar = true;
console.log(bar + 0);
console.log(bar + "xyz");
console.log(bar + true);
console.log(bar + false);
```

### Answer

The code above will output `1, "truexyz", 2, 1` as output. Here's a general guideline for the plus operator:

- Number + Number -> Addition
- Boolean + Number -> Addition
- Boolean + Boolean -> Addition
- Number + String -> Concatenation
- String + Boolean -> Concatenation
- String + String -> Concatenation

## Question 15. What will be the output of the following code?

```javascript
var z = 1,
  y = (z = typeof y);
console.log(y);
```

### Answer

The code above will print string `"undefined"` as output. According to associativity rule operator with the same precedence are processed based on their associativity property of operator. Here associativity of the assignment operator is `Right to Left` so first `typeof y` will evaluate first which is string `"undefined"` and assigned to `z` and then `y` would be assigned the value of z. The overall sequence will look like that:

```javascript
var z;
z = 1;
var y;
z = typeof y;
y = z;
```

## Question 16. What will be the output of the following code?

```javascript
// NFE (Named Function Expression)
var foo = function bar() {
  return 12;
};
typeof bar();
```

### Answer

The output will be `Reference Error`. To fix the bug we can try to rewrite the code a little bit:

**Sample 1**

```javascript
var bar = function () {
  return 12;
};
typeof bar();
```

or

**Sample 2**

```javascript
function bar() {
  return 12;
}
typeof bar();
```

The function definition can have only one reference variable as a function name, In **sample 1** `bar` is reference variable which is pointing to `anonymous function` and in **sample 2** we have function statement and `bar` is the function name.

```javascript
var foo = function bar() {
  // foo is visible here
  // bar is visible here
  console.log(typeof bar()); // Works here :)
};
// foo is visible here
// bar is undefined here
```

## Question 17a. What is the difference between declaring a function in the formats listed below?

```javascript
var foo = function () {
  // Some code
};
```

```javascript
function bar() {
  // Some code
}
```

### Answer

The main difference is that function `foo` is defined at `run-time` and is called a function expression, whereas function `bar` is defined at `parse time` and is called a function statement. To understand it better, let's take a look at the code below :

```javascript
// Run-Time function declaration
foo(); // Call foo function here, It will give an error
var foo = function () {
  console.log("Hi I am inside Foo");
};
```

```javascript
// Parse-Time function declaration
bar(); // Call bar function here, It will not give an Error
function bar() {
  console.log("Hi I am inside Foo");
}
```

## Question 17b. What is the output of the following?

```javascript
bar();
(function abc() {
  console.log("something");
})();
function bar() {
  console.log("bar got called");
}
```

### Answer

The output will be :

```
bar got called
something
```

Since the function is called first and defined during parse time the JS engine will try to find any possible parse time definitions and start the execution loop which will mean function is called first even if the definition is post another function.

## Question 18. In which case the function definition is not hoisted in JavaScript?

### Answer

Let's take the following **function expression**

```javascript
var foo = function foo() {
  return 12;
};
```

In JavaScript `var`-declared variables and functions are `hoisted`. Let's take function `hoisting` first. Basically, the JavaScript interpreter looks ahead to find all the variable declaration and hoists them to the top of the function where it's declared. For example:

```javascript
foo(); // Here foo is still undefined
var foo = function foo() {
  return 12;
};
```

The code above behind the scene look something like this:

```javascript
var foo = undefined;
foo(); // Here foo is undefined
foo = function foo() {
  // Some code stuff
};
```

```javascript
var foo = undefined;
foo = function foo() {
  // Some code stuff
};
foo(); // Now foo is defined here
```

## Question 19. What will be the output of the following code?

```javascript
var salary = "1000$";

(function () {
  console.log("Original salary was " + salary);

  var salary = "5000$";

  console.log("My New Salary " + salary);
})();
```

### Answer

The code above will output: `undefined, 5000$` because of hoisting. In the code presented above, you might be expecting `salary` to retain it values from outer scope until the point that `salary` was re-declared in the inner scope. But due to `hoisting` salary value was `undefined` instead. To understand it better have a look of the following code, here `salary` variable is hoisted and declared at the top in function scope. When we print its value using `console.log` the result is `undefined`. Afterwards the variable is redeclared and the new value `"5000$"` is assigned to it.

```javascript
var salary = "1000$";

(function () {
  var salary = undefined;
  console.log("Original salary was " + salary);

  salary = "5000$";

  console.log("My New Salary " + salary);
})();
```

## Question 20. What’s the difference between `typeof` and `instanceof`?

### Answer

`typeof` is an operator that returns a string with the type of whatever you pass.

The `typeof` operator checks if a value belongs to one of the seven basic types: `number`, `string`, `boolean`, `object`, `function`, `undefined` or `Symbol`.

`typeof(null)` will return `object`.

`instanceof` is much more intelligent: it works on the level of prototypes. In particular, it tests to see if the right operand appears anywhere in the prototype chain of the left. `instanceof` doesn’t work with primitive types. It `instanceof` operator checks the current object and returns true if the object is of the specified type, for example:

```javascript
var dog = new Animal();
dog instanceof Animal; // Output : true
```

Here `dog instanceof Animal` is true since `dog` inherits from `Animal.prototype`

```javascript
var name = new String("xyz");
name instanceof String; // Output : true
```

Ref Link: [http://stackoverflow.com/questions/2449254/what-is-the-instanceof-operator-in-javascript](http://stackoverflow.com/questions/2449254/what-is-the-instanceof-operator-in-javascript)

## Question 21. Calculate the length of the associative array

```javascript
var counterArray = {
  A: 3,
  B: 4,
};
counterArray["C"] = 1;
```

### Answer

First of all, in case of JavaScript an associative array is the same as an object. Secondly, even though is no built-in function or property available to calculate the length/size an object, we can write such function ourselves.

#### Method 1

`Object` has `keys` method which can we used to calculate the length of object.

```javascript
Object.keys(counterArray).length; // Output 3
```

#### Method 2

We can also calculate the length of object by iterating through the object and by doing a count of own property of object. This way we will ignoge the properties that came from the object's prototype chain:

```javascript
function getLength(object) {
  var count = 0;
  for (key in object) {
    // hasOwnProperty method check own property of object
    if (object.hasOwnProperty(key)) count++;
  }
  return count;
}
```

#### Method 3

All modern browsers (including IE9+) support the [`getOwnPropertyNames`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames) method, so we can calculate the length using the following code:

```javascript
Object.getOwnPropertyNames(counterArray).length; // Output 3
```

#### Method 4

[Underscore](https://underscorejs.org/#size) and [lodash](https://lodash.com/docs/4.17.10#size) libraries have the method `size` dedicated to calculate the object length. We don't recommend to include one of these libraries just to use the `size` method, but if it's already used in your project - why not?

```javascript
_.size({one: 1, two: 2, three: 3});
=> 3
```

## Question 22. Difference between `Function`, `Method` and `Constructor` calls in JavaScript.

If your are familiar with Object-oriented programming, More likely familiar to thinking of functions, methods, and class constructors as three separate things. But In JavaScript, these are just three different usage patterns of one single construct.

functions : The simplest usages of function call:

```javascript
function helloWorld(name) {
  return "hello world, " + name;
}

helloWorld("JS Geeks"); // "hello world JS Geeks"
```

Methods in JavaScript are nothing more than object properties that are functions.

```javascript
var obj = {
  helloWorld: function () {
    return "hello world, " + this.name;
  },
  name: "John Carter",
};
obj.helloWorld(); // // "hello world John Carter"
```

Notice how `helloWorld` refer to `this` properties of obj. Here it's clear or you might have already understood that `this` gets bound to `obj`. But the interesting point that we can copy a reference to the same function `helloWorld` in another object and get a difference answer. Let see:

```javascript
var obj2 = {
  helloWorld: obj.helloWorld,
  name: "John Doe",
};
obj2.helloWorld(); // "hello world John Doe"
```

You might be wonder what exactly happens in a method call here. Here we call the expression itself determine the binding of this `this`, The expression `obj2.helloWorld()` looks up the `helloWorld` property of obj and calls it with receiver object `obj2`.

The third use of functions is as constructors. Like function and method, `constructors` are defined with function.

```javascript
function Employee(name, age) {
  this.name = name;
  this.age = age;
}

var emp1 = new Employee("John Doe", 28);
emp1.name; // "John Doe"
emp1.age; // 28
```

Unlike function calls and method calls, a constructor call `new Employee('John Doe', 28)` creates a brand new object and passes it as the value of `this`, and implicitly returns the new object as its result.

The primary role of the constructor function is to initialize the object.

## Question 23. What would be the output of the following code?

```javascript
function User(name) {
  this.name = name || "JsGeeks";
}

var person = (new User("xyz")["location"] = "USA");
console.log(person);
```

### Answer

The output of above code would be `"USA"`. Here `new User("xyz")` creates a brand new object and created property `location` on that and `USA` has been assigned to object property location and that has been referenced by the person.

Let say `new User("xyz")` created a object called `foo`. The value `"USA"` will be assigned to `foo["location"]`, but according to [ECMAScript Specification](http://www.ecma-international.org/ecma-262/6.0/#sec-assignment-operators-runtime-semantics-evaluation) , pt 12.14.4 the assignment will itself return the rightmost value: in our case it's `"USA"`.
Then it will be assigned to person.

To better understand what's going on here, try to execute this code in console, line by line:

```javascript
function User(name) {
  this.name = name || "JsGeeks";
}

var person;
var foo = new User("xyz");
foo["location"] = "USA";
// the console will show you that the result of this is "USA"
```

## Question 24. What are Service Workers and when can you use them?

### Answer

It’s a technology that allows your web application to use cached resources first, and provide default experience offline, before getting more data from the network later. This principle is commonly known as Offline First.

Service Workers actively use promises. A Service Worker has to be installed,activated and then it can react on fetch, push and sync events.

As of 2017, Service Workers are not supported in IE and Safari.

## Question 25. What is the difference between a method and a function in javascript?

In JS, that difference is quite subtle. A function is a piece of code that is called by name and function itself not associated with any object and not defined inside any object. It can be passed data to operate on (i.e. parameter) and can optionally return data (the return value).

```javascript
// Function statement
function myFunc() {
  // Do some stuff;
}

// Calling the function
myFunc();
```

Here myFunc() function call is not associated with object hence not invoked through any object.

A function can take a form of immediately invoked function expression (IIFE):

```javascript
// Anonymous Self-invoking Function
(function () {
  // Do some stuff;
})();
```

Finally there are also arrow functions:

```javascript
const myFunc = (arg) => {
  console.log("hello", arg);
};
```

A method is a piece of code that is called by its name and that is associated with the object. Methods are functions. When you call a method like this `obj1.myMethod()`, the reference to `obj1` gets assigned (bound) to `this` variable. In other words, the value of `this` will be `obj1` inside `myMethod`.

Here are some examples of methods:

##### Example 1

```javascript
var obj1 = {
  attribute: "xyz",
  myMethod: function () {
    // Method
    console.log(this.attribute);
  },
};

// Call the method
obj1.myMethod();
```

Here `obj1` is an object and `myMethod` is a method which is associated with `obj1`.

##### Example 2

In ES6 we have classes. There the methods will look like this:

```javascript
class MyAwesomeClass {
  myMethod() {
    console.log("hi there");
  }
}

const obj1 = new MyAwesomeClass();
obj1.myMethod();
```

Understand: the method is not some kind of special type of a function, and it's not about how you declare a function. It's the way we **call** a function. Look at that:

```javascript
var obj1 = {
  prop1: "buddy",
};
var myFunc = function () {
  console.log("Hi there", this);
};
// let's call myFunc as a function:
myFunc(); // will output "Hi there undefined" or "Hi there Window"

obj1.myMethod = myFunc;
//now we're calling myFunc as a method of obj1, so this will point to obj1
obj1.myMethod(); // will print "Hi there" following with obj1.
```

## Question 26. What is IIFE (Immediately Invoked Function Expression) and how it can be useful?

### Answer

#### Definition

IIFE a function that runs as soon as it's defined. Usually it's anonymous (doesn't have a function name), but it also can be named. Here's an example of IIFE:

```javascript
(function () {
  console.log("Hi, I'm IIFE!");
})();
// outputs "Hi, I'm IIFE!"
```

#### Explanation

So, here's how it works. Remember the difference between function statements (`function a () {}`) and function expressions (`var a = function() {}`)? So, IIFE is a function expression. To make it an expression we surround our function declaration into the parens. We do it to explicitly tell the parser that it's an expression, not a statement (JS doesn't allow statements in parens).

After the function you can see the two `()` braces, this is how we run the function we just declared.

That's it. The rest is details.

- The function inside IIFE doesn't have to be anonymous. This one will work perfectly fine and will help to detect your function in a stacktrace during debugging:
  ```javascript
  (function myIIFEFunc() {
    console.log("Hi, I'm IIFE!");
  })();
  // outputs "Hi, I'm IIFE!"
  ```
- It can take some parameters:
  ```javascript
  (function myIIFEFunc(param1) {
    console.log("Hi, I'm IIFE, " + param1);
  })("Yuri");
  // outputs "Hi, I'm IIFE, Yuri!"
  ```
  Here there value `"Yuri"` is passed to the `param1` of the function.
- It can return a value:
  ```javascript
  var result = (function myIIFEFunc(param1) {
    console.log("Hi, I'm IIFE, " + param1);
    return 1;
  })("Yuri");
  // outputs "Hi, I'm IIFE, Yuri!"
  // result variable will contain 1
  ```
- You don't have to surround the function declaration into parens, although it's the most common way to define IIFE. Instead you can use any of the following forms:

  - `~function(){console.log("hi I'm IIFE")}()`
  - `!function(){console.log("hi I'm IIFE")}()`
  - `+function(){console.log("hi I'm IIFE")}()`
  - `-function(){console.log("hi I'm IIFE")}()`
  - `(function(){console.log("hi I'm IIFE")}());`
  - `var i = function(){console.log("hi I'm IIFE")}();`
  - `true && function(){ console.log("hi I'm IIFE") }();`
  - `0, function(){ console.log("hi I'm IIFE") }();`
  - `new function(){ console.log("hi I'm IIFE") }`
  - `new function(){ console.log("hi I'm IIFE") }()`

  Please don't use all these forms to impress colleagues, but be prepared that you can encounter them in someone's code.

#### Applications and usefulness

Variables and functions that you declare inside an IIFE are not visible to the outside world, so you can:

- Use the IIFE for isolating parts of the code to hide details of implementation.
- Specify the input interface of your code by passing commonly used global objects (window, document, jQuery, etc.) IIFE’s parameters, and then reference these global objects within the IIFE via a local scope.
- Use it in closures, when you use closures in loops.
- IIFE is the basis of in the module pattern in ES5
  code, it helps to prevent polluting the global scope and provide the module interface to the outside.

## Question 27. Describe Singleton Pattern In JavaScript

### Answer

The singleton pattern is an often used JavaScript design pattern. It provides a way to wrap the code into a logical unit that can be accessed through a single variable. The Singleton design pattern is used when only one instance of an object is needed throughout the lifetime of an application. In JavaScript, Singleton pattern have many uses, they can be used for NameSpacing, which reduce the number of global variables in your page (prevent from polluting global space), organizing the code in a consistent manner, which increase the readability and maintainability of your pages.

There are two important points in the traditional definition of Singleton pattern:

- There should be only one instance allowed for a class and
- We should allow global point of access to that single instance

Let me define singleton pattern in JavaScript context:

> It is an object that is used to create namespace and group together a related set of methods and attributes (encapsulation) and if we allow to initiate then it can be initiated only once.

In JavaScript, we can create singleton though object literal. However, there is some another way but that I will cover in next post.

A singleton object consists of two parts: The object itself, containing the members (Both methods and attributes) within it, and global variable used to access it. The variable is global so that object can be accessed anywhere in the page, this is a key feature of the singleton pattern.

**JavaScript: A Singleton as a Namespace**

As I have already stated above that singleton can be used to declare Namespace in JavaScript. NameSpacing is a large part of responsible programming in JavaScript. Because everything can be overwritten, and it is very easy to wipe out variable by mistake or a function, or even a class without even knowing it. A common example which happens frequently when you are working with another team member parallel,

```javascript
function findUserName(id) {}

/* Later in the page another programmer
added code */
var findUserName = $("#user_list");

/* You are trying to call :( */
console.log(findUserName());
```

One of the best ways to prevent accidentally overwriting variable is to namespace your code within a singleton object.

```javascript
/*  Using Namespace */

var MyNameSpace = {
  findUserName: function (id) {},
  // Other methods and attribute go here as well
};

/* Later in the page another programmer
added code */
var findUserName = $("#user_list");

/* You are trying to call and you make this time workable */
console.log(MyNameSpace.findUserName());
```

### Singleton Design Pattern Implementation

```javascript
/* Lazy Instantiation skeleton for a singleton pattern */

var MyNameSpace = {};
MyNameSpace.Singleton = (function () {
  // Private attribute that holds the single instance
  var singletonInstance;

  // All of the normal code goes here
  function constructor() {
    // Private members
    var privateVar1 = "Nishant";
    var privateVar2 = [1, 2, 3, 4, 5];

    function privateMethod1() {
      // code stuff
    }

    function privateMethod1() {
      // code stuff
    }

    return {
      attribute1: "Nishant",
      publicMethod: function () {
        alert("Nishant"); // some code logic
      },
    };
  }

  return {
    // public method (Global access point to Singleton object)
    getInstance: function () {
      //instance already exist then return
      if (!singletonInstance) {
        singletonInstance = constructor();
      }
      return singletonInstance;
    },
  };
})();

// getting access of publicMethod
console.log(MyNamespace.Singleton.getInstance().publicMethod());
```

The singleton implemented above is easy to understand. The singleton class maintains a static reference to the lone singleton instance and return that reference from the static getInstance() method.

## Question 28. What are the ways of creating objects in JavaScript ?

### Answer

#### Method 1: Function based

This method is useful if we want to create several similar objects. In the code sample below, we wrote the function `Employee` and used it as a constructor by calling it with the `new` operator.

```javascript
function Employee(fName, lName, age, salary) {
  this.firstName = fName;
  this.lastName = lName;
  this.age = age;
  this.salary = salary;
}

// Creating multiple object which have similar property but diff value assigned to object property.
var employee1 = new Employee("John", "Moto", 24, "5000$");
var employee2 = new Employee("Ryan", "Jor", 26, "3000$");
var employee3 = new Employee("Andre", "Salt", 26, "4000$");
```

#### Method 2: Object Literal

Object Literal is best way to create an object and this is used frequently. Below is code sample for create employee object which contains property as well as method.

```javascript
var employee = {
  name: "Nishant",
  salary: 245678,
  getName: function () {
    return this.name;
  },
};
```

The code sample below is Nested Object Literal, Here address is an object inside employee object.

```javascript
var employee = {
	name : 'Nishant',
	salary : 245678,
	address : {
		addressLine1 : 'BITS Pilani',
		addressLine2 : 'Vidya Vihar'.
		phoneNumber: {
		  workPhone: 7098889765,
		  homePhone: 1234567898
		}
	}
}
```

#### Method 3: From `Object` using `new` keyword

In the code below, a sample object has been created using `Object`'s constructor function.

```javascript
var employee = new Object(); // Created employee object using new keywords and Object()
employee.name = "Nishant";
employee.getName = function () {
  return this.name;
};
```

#### Method 4:\*\* Using `Object.create`

`Object.create(obj)` will create a new object and set the `obj` as its prototype. It’s a modern way to create objects that inherit properties from other objects. `Object.create` function doesn’t run the constructor. You can use `Object.create(null)` when you don’t want your object to inherit the properties of `Object`.

## Question 29. Write a function called deepClone which takes an object and creates a object copy of it.

```javascript
var newObject = deepClone(obj);
```

Solution:

```javascript
function deepClone(object) {
  var newObject = {};
  for (var key in object) {
    if (typeof object[key] === "object" && object[key] !== null) {
      newObject[key] = deepClone(object[key]);
    } else {
      newObject[key] = object[key];
    }
  }
  return newObject;
}
```

**Explanation:** We have been asked to do deep copy of object so What's basically it's mean ??. Let's understand in this way you have been given an object `personalDetail` this object contains some property which again a type of object here as you can see `address` is an object and `phoneNumber` in side an `address` is also an object. In simple term `personalDetail` is nested object(object inside object). So Here deep copy means we have to copy all the property of `personalDetail` object including nested object.

```javascript
var personalDetail = {
  name: "Nishant",
  address: {
    location: "xyz",
    zip: "123456",
    phoneNumber: {
      homePhone: 8797912345,
      workPhone: 1234509876,
    },
  },
};
```

So when we do deep clone then we should copy every property (including the nested object).

## Question 30. Best way to detect `undefined` object property in JavaScript.

> Suppose we have given an object `person`

```javascript
var person = {
  name: "Nishant",
  age: 24,
};
```

Here the `person` object has a `name` and `age` property. Now we are trying to access the **salary** property which we haven't declared on the person object so while accessing it will return undefined. So how we will ensure whether property is undefined or not before performing some operation over it?

**Explanation:**

We can use `typeof` operator to check undefined

```javascript
if (typeof someProperty === "undefined") {
  console.log("something is undefined here");
}
```

Now we are trying to access salary property of person object.

```javascript
if (typeof person.salary === "undefined") {
  console.log("salary is undefined here because we haven't declared");
}
```

## Question 31. Write a function called `Clone` which takes an object and creates a object copy of it but not copy deep property of object.

```javascript
var objectLit = { foo: "Bar" };
var cloneObj = Clone(obj); // Clone is the function which you have to write
console.log(cloneObj === Clone(objectLit)); // this should return false
console.log(cloneObj == Clone(objectLit)); // this should return true
```

**solution:**

```javascript
function Clone(object) {
  var newObject = {};
  for (var key in object) {
    newObject[key] = object[key];
  }
  return newObject;
}
```

## Question 32. What are promises and how they are useful?

We use promises for handling asynchronous interactions in a sequential manner. They are especially useful when we need to do an async operation and THEN do another async operation based on the results of the first one. For example, if you want to request the list of all flights and then for each flight you want to request some details about it. The promise represents the future value. It has an internal state (`pending`, `fulfilled` and `rejected`) and works like a state machine.

A promise object has `then` method, where you can specify what to do when the promise is fulfilled or rejected.

You can chain `then()` blocks, thus avoiding the callback hell. You can handle errors in the `catch()` block. After a promise is set to fulfilled or rejected state, it becomes immutable.

Also mention that you know about more sophisticated concepts:

- `async/await` which makes the code appear even more linear
- RxJS observables can be viewed as the recyclable promises

Be sure that you can implement the promise, read [one of the articles on a topic](https://opensourceconnections.com/blog/2014/02/16/a-simple-promise-implementation-in-about-20-lines-of-javascript/), and learn the source code of the [simplest promise implementation](https://gist.github.com/softwaredoug/9044640).

## Question 33. How to check whether a key exist in a JavaScript object or not.

Let say we have `person` object with property **name** and **age**

```javascript
var person = {
  name: "Nishant",
  age: 24,
};
```

Now we want to check whether `name` property exist in `person` object or not ?

In JavaScript object can have own property, in above example name and age is own property of person object. Object also have some of inherited property of base object like toString is inherited property of person object.

So how we will check whether property is own property or inherited property.

Method 1: We can use `in` operator on objet to check own property or inherited property.

```javascript
console.log("name" in person); // checking own property print true
console.log("salary" in person); // checking undefined property print false
```

`in` operator also look into inherited property if it doesn't find property defined as own property. For instance If I check existence of toString property as we know that we haven't declared this property on person object so `in` operator look into there base property.

Here

```javascript
console.log("toString" in person); // Will print true
```

If we want to test property of object instance not inherited properties then we will use `hasOwnProperty` method of object instance.

```javascript
console.log(person.hasOwnProperty("toString")); // print false
console.log(person.hasOwnProperty("name")); // print true
console.log(person.hasOwnProperty("salary")); // print false
```

## Question 34. What is NaN, why do we need it, and when can it break the page?

`NaN` stands for “not a number.” and it can break your table of numbers when it has an arithmetic operation that is not allowed. Here are some examples of how you can get `NaN`:

```javascript
Math.sqrt(-5);
Math.log(-1);
parseFloat(
  "foo"
); /* this is common: you get JSON from the server, convert some strings from JSON to a number and end up with NaN in your UI. */
```

`NaN` is not equal to any number, it’s not less or more than any number, also it's not equal to itself:

```javascript
NaN !== NaN;
NaN < 2; // false
NaN > 2; // false
NaN === 2; // false
```

To check if the current value of the variable is NaN, you have to use the `isNaN` function. This is why we can often see NaN in the webpages: it requires special check which a lot of developers forget to do.

Further reading: [great blogpost on ariya.io](https://ariya.io/2014/05/the-curious-case-of-javascript-nan)

## Question 35. Fix the bug using ES5 only

```javascript
var arr = [10, 32, 65, 2];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log("The index of this number is: " + i);
  }, 3000);
}
```

For ES6, you can just replace `var i` with `let i`.

For ES5, you need to create a function scope like here:

```javascript
var arr = [10, 32, 65, 2];
for (var i = 0; i < arr.length; i++) {
  setTimeout(
    (function (j) {
      return function () {
        console.log("The index of this number is: " + j);
      };
    })(i),
    3000
  );
}
```

This can also achieve by forEach (allows you to keep that variable within the forEach’s scope)

```javascript
var arr = [10, 32, 65, 2];
arr.forEach(function (i) {
  setTimeout(function () {
    console.log("The index of this number is: " + i);
  }, 3000);
});
```

## Question 36. How to check if the value of a variable in an array?

We always encounter in such situation where we need to know whether value is type of array or not.

For instance : the code below perform some operation based value type

```javascript
function(value){
	if("value is an array"){
		// Then perform some operation
	}else{
		// otherwise
	}
}
```

Let's discuss some way to detect an array in JavaScript.

**Method 1:**

Juriy Zaytsev (Also known as kangax) proposed an elegant solution to this.

```javascript
function isArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
}
```

This approach is most popular way to detecting a value of type array in JavaScript and recommended to use. This approach relies on the fact that, native toString() method on a given value produce a standard string in all browser.

**Method 2:**

Duck typing test for array type detection

```javascript
// Duck typing arrays
function isArray(value) {
  return typeof value.sort === "function";
}
```

As we can see above isArray method will return true if value object have `sort` method of type `function`. Now assume you have created a object with sort method

```javascript
var bar = {
  sort: function () {
    // Some code
  },
};
```

Now when you check `isArray(bar)` then it will return true because bar object has sort method, But the fact is bar is not an array.

So this method is not a best way to detect an array as you can see it's not handle the case when some object has sort method.

**Method 3:**

ECMAScript 5 has introduced **Array.isArray()** method to detect an array type value. The sole purpose of this method is accurately detecting whether a value is an array or not.

In many JavaScript libraries you may see the code below for detecting an value of type array.

```javascript
function(value){
   // ECMAScript 5 feature
	if(typeof Array.isArray === 'function'){
		return Array.isArray(value);
	}else{
	   return Object.prototype.toString.call(value) === '[object Array]';
	}
}
```

**Method 4:**

You can query the constructor name:

```javascript
function isArray(value) {
  return value.constructor.name === "Array";
}
```

**Method 5:**

You check if a given value is an `instanceof Array`:

```javascript
function isArray(value) {
  return value instanceof Array;
}
```

## Question 37. Best way to detect reference values of any type in JavaScript ?

In Javascript Object are called as reference type, Any value other then primitive is definitely a reference type. There are several built-in reference type such as **Object**, **Array**, **Function**, **Date**, **null** and **Error**.

Detecting object using `typeof` operator

```javascript
console.log(typeof {}); // object
console.log(typeof []); // object
console.log(typeof new Array()); // object
console.log(typeof null); // object
console.log(typeof new RegExp()); // object
console.log(typeof new Date()); // object
```

But the downside of using typeof operator to detect an object is that typeof returns `object` for `null` (However this is fact that null is an object in JavaScript).

The best way to detect an object of specific reference type using `instanceof` operator.

> Syntax : **value** instanceof **constructor**

```javascript
//Detecting an array
if (value instanceof Array) {
  console.log("value is type of array");
}
```

```javascript
// Employee constructor function
function Employee(name) {
  this.name = name; // Public property
}

var emp1 = new Employee("John");

console.log(emp1 instanceof Employee); // true
```

`instanceof` not only check the constructor which is used to create an object but also check it's prototype chain see below example.

```javascript
console.log(emp1 instanceof Object); // true
```

## Question 38. How does Object.create method works JavaScript?

The ECMAScript 5 **Object.create()** method is the easiest way for one object to inherit from another, without invoking a constructor function.

**For instance:**

```javascript
var employee = {
  name: "Nishant",
  displayName: function () {
    console.log(this.name);
  },
};

var emp1 = Object.create(employee);
console.log(emp1.displayName()); // output "Nishant"
```

In the example above, we create a new object `emp1` that inherits from `employee`. In other words `emp1`'s prototype is set to `employee`. After this emp1 is able to access the same properties and method on employee until new properties or method with the same name are defined.

**For instance:** Defining `displayName()` method on `emp1` will not automatically override the employee `displayName`.

```javascript
emp1.displayName = function () {
  console.log("xyz-Anonymous");
};

employee.displayName(); //Nishant
emp1.displayName(); //xyz-Anonymous
```

In addition to this **`Object.create(`)** method also allows to specify a second argument which is an object containing additional properties and methods to add to the new object.

**For example**

```javascript
var emp1 = Object.create(employee, {
  name: {
    value: "John",
  },
});

emp1.displayName(); // "John"
employee.displayName(); // "Nishant"
```

In the example above, `emp1` is created with it's own value for name, so calling **displayName()** method will display `"John"` instead of `"Nishant"`.

Object created in this manner give you full control over newly created object. You are free to add, remove any properties and method you want.

## Question 39. How to use constructor functions for inheritance in JavaScript?

Let say we have `Person` class which has name, age, salary properties and **incrementSalary()** method.

```javascript
function Person(name, age, salary) {
  this.name = name;
  this.age = age;
  this.salary = salary;
  this.incrementSalary = function (byValue) {
    this.salary = this.salary + byValue;
  };
}
```

Now we wish to create Employee class which contains all the properties of Person class and wanted to add some additional properties into Employee class.

```javascript
function Employee(company) {
  this.company = company;
}

//Prototypal Inheritance
Employee.prototype = new Person("Nishant", 24, 5000);
```

In the example above, **Employee** type inherits from **Person**. It does so by assigning a new instance of `Person` to `Employee` prototype. After that, every instance of `Employee` inherits its properties and methods from `Person`.

```javascript
//Prototypal Inheritance
Employee.prototype = new Person("Nishant", 24, 5000);

var emp1 = new Employee("Google");

console.log(emp1 instanceof Person); // true
console.log(emp1 instanceof Employee); // true
```

Let's understand Constructor inheritance

```javascript
//Defined Person class
function Person(name) {
  this.name = name || "Nishant";
}

var obj = {};

// obj inherit Person class properties and method
Person.call(obj); // constructor inheritance

console.log(obj); // Object {name: "Nishant"}
```

Here we saw calling **Person.call(obj)** define the name properties from `Person` to `obj`.

```javascript
console.log(name in obj); // true
```

Type-based inheritance is best used with developer defined constructor function rather than natively in JavaScript. In addition to this also allows flexibility in how we create similar type of object.

## Question 40. How we can prevent modification of object in JavaScript ?.

ECMAScript 5 introduce several methods to prevent modification of object which lock down object to ensure that no one, accidentally or otherwise, change functionality of Object.

There are three levels of preventing modification:

**1: Prevent extensions :**

No new properties or methods can be added to the object, but one can change the existing properties and method.

For example:

```javascript
var employee = {
  name: "Nishant",
};

// lock the object
Object.preventExtensions(employee);

// Now try to change the employee object property name
employee.name = "John"; // work fine

//Now try to add some new property to the object
employee.age = 24; // fails silently unless it's inside the strict mode
```

**2: Seal :**

It is same as prevent extension, in addition to this also prevent existing properties and methods from being deleted.

To seal an object, we use **Object.seal()** method. you can check whether an object is sealed or not using **Object.isSealed();**

```javascript
var employee = {
  name: "Nishant",
};

// Seal the object
Object.seal(employee);

console.log(Object.isExtensible(employee)); // false
console.log(Object.isSealed(employee)); // true

delete employee.name; // fails silently unless it's in strict mode

// Trying to add new property will give an error
employee.age = 30; // fails silently unless in strict mode
```

when an object is sealed, its existing properties and methods can't be removed. Sealed object are also non-extensible.

**3: Freeze :**

Same as seal, In addition to this prevent existing properties methods from being modified (All properties and methods are read only).

To freeze an object, use Object.freeze() method. We can also determine whether an object is frozen using Object.isFrozen();

```javascript
var employee = {
  name: "Nishant",
};

//Freeze the object
Object.freeze(employee);

// Seal the object
Object.seal(employee);

console.log(Object.isExtensible(employee)); // false
console.log(Object.isSealed(employee)); // true
console.log(Object.isFrozen(employee)); // true

employee.name = "xyz"; // fails silently unless in strict mode
employee.age = 30; // fails silently unless in strict mode
delete employee.name; // fails silently unless it's in strict mode
```

Frozen objects are considered both non-extensible and sealed.

**Recommended:**

If you are decided to prevent modification, sealed, freeze the object then use in strict mode so that you can catch the error.

For example:

```javascript
"use strict";

var employee = {
  name: "Nishant",
};

//Freeze the object
Object.freeze(employee);

// Seal the object
Object.seal(employee);

console.log(Object.isExtensible(employee)); // false
console.log(Object.isSealed(employee)); // true
console.log(Object.isFrozen(employee)); // true

employee.name = "xyz"; // fails silently unless in strict mode
employee.age = 30; // fails silently unless in strict mode
delete employee.name; // fails silently unless it's in strict mode
```

## Question 44. Write a log function which will add prefix `(your message)` to every message you log using console.log ?

For example, If you log `console.log("Some message")` then output should be **(your message) Some message**

Logging error message or some informative message is always required when you dealing with client side JavaScript using console.log method. Some time you want to add some prefix to identify message generated log from your application hence you would like to prefix your app name in every console.log.

A general way to do this keep adding your app name in every console.log message like

```javascript
console.log("your app name" + "some error message");
```

But doing in this way you have to write your app name everytime when you log message using console.

There are some best way we can achieve this

```javascript
function appLog() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift("your app name");
  console.log.apply(console, args);
}

appLog("Some error message");
//output of above console: 'your app name Some error message'
```

## Question 45 . Write a function which will test string as a literal and as an object ?

For example: We can create string using string literal and using String constructor function.

```javascript
// using string literal
var ltrlStr = "Hi I am string literal";
// using String constructor function
var objStr = new String("Hi I am string object");
```

We can use typeof operator to test string literal and instanceof operator to test String object.

```javascript
function isString(str) {
  return typeof str == "string" || str instanceof String;
}

var ltrlStr = "Hi I am string literal";
var objStr = new String("Hi I am string object");
console.log(isString(ltrlStr)); // true
console.log(isString(objStr)); // true
```

## Question 46 . What is typical use case for anonymous function in JavaScript ?

Anonymous functions basically used in following scenario.

1. No name is needed if function is only used in one place, then there is no need to add a name to function.

   Let's take the example of setTimeout function

   ```javascript
   setTimeout(function () {
     alert("Hello");
   }, 1000);
   ```

   Here there is no need of using named function when we are sure that function which will alert `hello` would use only once in application.

2. Anonymous functions are declared inline and inline functions have advantages in the case that they can access variable in the parent scopes.

   Let's take a example of event handler. Notify event of particular type (such as click) for a given object.

   Let say we have HTML element (button) on which we want to add click event and when user do click on button we would like to execute some logic.

   ```html
   <button id="myBtn"></button>
   ```

   Add Event Listener

   ```javascript
   var btn = document.getElementById("myBtn");
   btn.addEventListener("click", function () {
     alert("button clicked");
   });
   ```

   Above example shows used of anonymous function as a callback function in event handler.

3. Passing anonymous function as a parameter to calling function.
   Example:
   `javascript // Function which will execute callback function function processCallback(callback){ if(typeof callback === 'function'){ callback(); } } // Call function and pass anonymous function as callback processCallback(function(){ alert("Hi I am anonymous callback function"); });`
   The best way to make a decision for using anonymous function is to ask the following question:

Will the function which I am going to define, be used anywhere else?

If your answer is yes then go and create named function rather anonymous function.

**Advantage of using anonymous function:**

1. It can reduce a bit of code, particularly in recursive function and in callback function.
2. Avoid needless global namespace pollutions.

## Question 47 . How to set a default parameter value ?

If you are coming from python/c# you might be using default value for function parameter incase value(formal parameter) has not been passed. For instance :

```python
// Define sentEmail function
// configuration : Configuration object
// provider : Email Service provider, Default would be gmail
def sentEmail(configuration, provider = 'Gmail'):
	# Your code logic
```

**In Pre ES6/ES2015**

There are a lot of ways by which you can achieve this in pre ES2015.

Let's understand the code below by which we achieved setting default parameter value.

**Method 1: Setting default parameter value**

```javascript
function sentEmail(configuration, provider) {
  // Set default value if user has not passed value for provider
  provider = typeof provider !== "undefined" ? provider : "Gmail";
  // Your code logic
}
// In this call we are not passing provider parameter value
sentEmail({
  from: "xyz@gmail.com",
  subject: "Test Email",
});
// Here we are passing Yahoo Mail as a provider value
sentEmail(
  {
    from: "xyz@gmail.com",
    subject: "Test Email",
  },
  "Yahoo Mail"
);
```

**Method 2: Setting default parameter value**

```javascript
function sentEmail(configuration, provider) {
  // Set default value if user has not passed value for provider
  provider = provider || "Gmail";
  // Your code logic
}
// In this call we are not passing provider parameter value
sentEmail({
  from: "xyz@gmail.com",
  subject: "Test Email",
});
// Here we are passing Yahoo Mail as a provider value
sentEmail(
  {
    from: "xyz@gmail.com",
    subject: "Test Email",
  },
  "Yahoo Mail"
);
```

**Method 3: Setting default parameter value in ES6**

```javascript
function sendEmail(configuration, provider = "Gmail") {
  // Set default value if user has not passed value for provider

  // Value of provider can be accessed directly
  console.log(`Provider: ${provider}`);
}

// In this call we are not passing provider parameter value
sentEmail({
  from: "xyz@gmail.com",
  subject: "Test Email",
});
// Here we are passing Yahoo Mail as a provider value
sentEmail(
  {
    from: "xyz@gmail.com",
    subject: "Test Email",
  },
  "Yahoo Mail"
);
```

## Question 48. Write code for merge two JavaScript Object dynamically.

Let say you have two objects

```javascript
var person = {
  name: "John",
  age: 24,
};

var address = {
  addressLine1: "Some Location x",
  addressLine2: "Some Location y",
  city: "NewYork",
};
```

Write merge function which will take two object and add all the own property of second object into first object.

```javascript
merge(person, address);

/* Now person should have 5 properties 
name , age , addressLine1 , addressLine2 , city */
```

**Method 1: Using ES6, Object.assign method**

```javascript
const merge = (toObj, fromObj) => Object.assign(toObj, fromObj);
```

**Method 2: Without using built-in function**

```javascript
function merge(toObj, fromObj) {
  // Make sure both of the parameter is an object
  if (typeof toObj === "object" && typeof fromObj === "object") {
    for (var pro in fromObj) {
      // Assign only own properties not inherited properties
      if (fromObj.hasOwnProperty(pro)) {
        // Assign property and value
        toObj[pro] = fromObj[pro];
      }
    }
  } else {
    throw "Merge function can apply only on object";
  }
}
```

## Question 49. What is non-enumerable property in JavaScript and how you can create one?

Object can have properties that don't show up when you iterate through object using for...in loop or using Object.keys() to get an array of property names. This properties is know as non-enumerable properties.

Let say we have following object

```javascript
var person = {
  name: "John",
};
person.salary = "10000$";
person["country"] = "USA";

console.log(Object.keys(person)); // ['name', 'salary', 'country']
```

As we know that person object properties `name`, `salary` ,`country` are enumerable hence it's shown up when we called Object.keys(person).

To create a non-enumerable property we have to use **Object.defineProperty()**. This is a special method for creating non-enumerable property in JavaScript.

```javascript
var person = {
  name: "John",
};
person.salary = "10000$";
person["country"] = "USA";

// Create non-enumerable property
Object.defineProperty(person, "phoneNo", {
  value: "8888888888",
  enumerable: false,
});

Object.keys(person); // ['name', 'salary', 'country']
```

In the example above `phoneNo` property didn't show up because we made it non-enumerable by setting **enumerable:false**

**Bonus**

Now let's try to change value of `phoneNo`

```javascript
person.phoneNo = "7777777777";
```

**Object.defineProperty()** also lets you create read-only properties as we saw above, we are not able to modify phoneNo value of a person object. This is because descriptor has **writable** property, which is `false` by default. Changing non-writable property value will return error in strict mode. In non-strict mode it won't through any error but it won't change the value of phoneNo.

## Question 50. What is Function binding ?

Function binding falls in advance JavaScript category and this is very popular technique to use in conjunction with event handler and callback function to preserve code execution context while passing function as a parameter.

Let's consider the following example:

```javascript
var clickHandler = {
  message: "click event handler",
  handleClick: function (event) {
    console.log(this.message);
  },
};

var btn = document.getElementById("myBtn");
// Add click event to btn
btn.addEventListener("click", clickHandler.handleClick);
```

Here in this example clickHandler object is created which contain message properties and handleClick method.

We have assigned handleClick method to a DOM button, which will be executed in response of click. When the button is clicked, then handleClick method is being called and console message. Here console.log should log the `click event handler` message but it actually log `undefined`.

The problem of displaying `undefined` is because of the execution context of clickHandler.handleClick method is not being saved hence `this` pointing to button `btn` object. We can fix this issue using bind method.

```javascript
var clickHandler = {
  message: "click event handler",
  handleClick: function (event) {
    console.log(this.message);
  },
};

var btn = document.getElementById("myBtn");
// Add click event to btn and bind the clickHandler object
btn.addEventListener("click", clickHandler.handleClick.bind(clickHandler));
```

`bind` method is available to all the function similar to call and apply method which take argument value of `this`.

# Coding Questions

## Passing values by reference vs by value

For a JS developer, it's crucially important to understand which values are passed by reference,
and which ones are passed by value. Remember that objects, including arrays are passed by reference
while strings, booleans and numbers are passed by value.

### 1. What would be the output of following code?

```javascript
var strA = "hi there";
var strB = strA;
strB = "bye there!";
console.log(strA);
```

The output will `'hi there'` because we're dealing with strings here. Strings are
passed by value, that is, copied.

### 2. What would be the output of following code?

```javascript
var objA = { prop1: 42 };
var objB = objA;
objB.prop1 = 90;
console.log(objA);
```

The output will `{prop1: 90}` because we're dealing with objects here. Objects are
passed by reference, that is, `objA` and `objB` point to the same object in memory.

### 3. What would be the output of following code?

```javascript
var objA = { prop1: 42 };
var objB = objA;
objB = {};
console.log(objA);
```

The output will `{prop1: 42}`.

When we assign `objA` to `objB`, the `objB` variable will point
to the same object as the `objB` variable.

However, when we reassign `objB` to an empty object, we simply change where `objB` variable references to.
This doesn't affect where `objA` variable references to.

### 4. What would be the output of following code?

```javascript
var arrA = [0, 1, 2, 3, 4, 5];
var arrB = arrA;
arrB[0] = 42;
console.log(arrA);
```

The output will be `[42,1,2,3,4,5]`.

Arrays are object in JavaScript and they are passed and assigned by reference. This is why
both `arrA` and `arrB` point to the same array `[0,1,2,3,4,5]`. That's why changing the first
element of the `arrB` will also modify `arrA`: it's the same array in the memory.

### 5. What would be the output of following code?

```javascript
var arrA = [0, 1, 2, 3, 4, 5];
var arrB = arrA.slice();
arrB[0] = 42;
console.log(arrA);
```

The output will be `[0,1,2,3,4,5]`.

The `slice` function copies all the elements of the array returning the new array. That's why
`arrA` and `arrB` reference two completely different arrays.

### 5. What would be the output of following code?

```javascript
var arrA = [
  { prop1: "value of array A!!" },
  { someProp: "also value of array A!" },
  3,
  4,
  5,
];
var arrB = arrA;
arrB[0].prop1 = 42;
console.log(arrA);
```

The output will be `[{prop1: 42}, {someProp: "also value of array A!"}, 3,4,5]`.

Arrays are object in JS, so both varaibles arrA and arrB point to the same array. Changing
`arrB[0]` is the same as changing `arrA[0]`

### 6. What would be the output of following code?

```javascript
var arrA = [
  { prop1: "value of array A!!" },
  { someProp: "also value of array A!" },
  3,
  4,
  5,
];
var arrB = arrA.slice();
arrB[0].prop1 = 42;
arrB[3] = 20;
console.log(arrA);
```

The output will be `[{prop1: 42}, {someProp: "also value of array A!"}, 3,4,5]`.

The `slice` function copies all the elements of the array returning the new array. However,
it doesn't do deep copying. Instead it does shallow copying. You can imagine slice implemented like this:

```javascript
function slice(arr) {
  var result = [];
  for (i = 0; i < arr.length; i++) {
    result.push(arr[i]);
  }
  return result;
}
```

Look at the line with `result.push(arr[i])`. If `arr[i]` happens to be a number or string,
it will be passed by value, in other words, copied. If `arr[i]` is an object, it will be passed by reference.

In case of our array `arr[0]` is an object `{prop1: "value of array A!!"}`. Only the reference
to this object will be copied. This effectively means that arrays arrA and arrB share first
two elements.

This is why changing the property of `arrB[0]` in `arrB` will also change the `arrA[0]`.

## Hoisting

### 1. console.log(employeeId);

1.  Some Value
2.  Undefined
3.  Type Error
4.  ReferenceError: employeeId is not defined

Answer: 4) ReferenceError: employeeId is not defined

### 2. What would be the output of following code?

```javascript
console.log(employeeId);
var employeeId = "19000";
```

1.  Some Value
2.  undefined
3.  Type Error
4.  ReferenceError: employeeId is not defined

Answer: 2) undefined

### 3. What would be the output of following code?

```javascript
var employeeId = "1234abe";
(function () {
  console.log(employeeId);
  var employeeId = "122345";
})();
```

1.  '122345'
2.  undefined
3.  Type Error
4.  ReferenceError: employeeId is not defined

Answer: 2) undefined

### 4. What would be the output of following code?

```javascript
var employeeId = "1234abe";
(function () {
  console.log(employeeId);
  var employeeId = "122345";
  (function () {
    var employeeId = "abc1234";
  })();
})();
```

1.  '122345'
2.  undefined
3.  '1234abe'
4.  ReferenceError: employeeId is not defined

Answer: 2) undefined

### 5. What would be the output of following code?

```javascript
(function () {
  console.log(typeof displayFunc);
  var displayFunc = function () {
    console.log("Hi I am inside displayFunc");
  };
})();
```

1.  undefined
2.  function
3.  'Hi I am inside displayFunc'
4.  ReferenceError: displayFunc is not defined

Answer: 1) undefined

### 6. What would be the output of following code?

```javascript
var employeeId = "abc123";
function foo() {
  employeeId = "123bcd";
  return;
}
foo();
console.log(employeeId);
```

1.  undefined
2.  '123bcd'
3.  'abc123'
4.  ReferenceError: employeeId is not defined

Answer: 2) '123bcd'

### 7. What would be the output of following code?

```javascript
var employeeId = "abc123";

function foo() {
  employeeId = "123bcd";
  return;

  function employeeId() {}
}
foo();
console.log(employeeId);
```

1.  undefined
2.  '123bcd'
3.  'abc123'
4.  ReferenceError: employeeId is not defined

Answer: 3) 'abc123'

### 8. What would be the output of following code?

```javascript
var employeeId = "abc123";

function foo() {
  employeeId();
  return;

  function employeeId() {
    console.log(typeof employeeId);
  }
}
foo();
```

1.  undefined
2.  function
3.  string
4.  ReferenceError: employeeId is not defined

Answer: 2) 'function'

### 9. What would be the output of following code?

```javascript
function foo() {
  employeeId();
  var product = "Car";
  return;

  function employeeId() {
    console.log(product);
  }
}
foo();
```

1.  undefined
2.  Type Error
3.  'Car'
4.  ReferenceError: product is not defined

Answer: 1) undefined

### 10. What would be the output of following code?

```javascript
(function foo() {
  bar();

  function bar() {
    abc();
    console.log(typeof abc);
  }

  function abc() {
    console.log(typeof bar);
  }
})();
```

1.  undefined undefined
2.  Type Error
3.  function function
4.  ReferenceError: bar is not defined

Answer: 3) function function

## Objects

### 1. What would be the output of following code ?

```javascript
(function () {
  "use strict";

  var person = {
    name: "John",
  };
  person.salary = "10000$";
  person["country"] = "USA";

  Object.defineProperty(person, "phoneNo", {
    value: "8888888888",
    enumerable: true,
  });

  console.log(Object.keys(person));
})();
```

1.  Type Error
2.  undefined
3.  ["name", "salary", "country", "phoneNo"]
4.  ["name", "salary", "country"]

Answer: 3) ["name", "salary", "country", "phoneNo"]

### 2. What would be the output of following code ?

```javascript
(function () {
  "use strict";

  var person = {
    name: "John",
  };
  person.salary = "10000$";
  person["country"] = "USA";

  Object.defineProperty(person, "phoneNo", {
    value: "8888888888",
    enumerable: false,
  });

  console.log(Object.keys(person));
})();
```

1.  Type Error
2.  undefined
3.  ["name", "salary", "country", "phoneNo"]
4.  ["name", "salary", "country"]

Answer: 4) ["name", "salary", "country"]

### 3. What would be the output of following code ?

```javascript
(function () {
  var objA = {
    foo: "foo",
    bar: "bar",
  };
  var objB = {
    foo: "foo",
    bar: "bar",
  };
  console.log(objA == objB);
  console.log(objA === objB);
})();
```

1.  false true
2.  false false
3.  true false
4.  true true

Answer: 2) false false

### 4. What would be the output of following code ?

```javascript
(function () {
  var objA = new Object({ foo: "foo" });
  var objB = new Object({ foo: "foo" });
  console.log(objA == objB);
  console.log(objA === objB);
})();
```

1.  false true
2.  false false
3.  true false
4.  true true

Answer: 2) false false

### 5. What would be the output of following code ?

```javascript
(function () {
  var objA = Object.create({
    foo: "foo",
  });
  var objB = Object.create({
    foo: "foo",
  });
  console.log(objA == objB);
  console.log(objA === objB);
})();
```

1.  false true
2.  false false
3.  true false
4.  true true

Answer: 2) false false

### 6. What would be the output of following code ?

```javascript
(function () {
  var objA = Object.create({
    foo: "foo",
  });
  var objB = Object.create(objA);
  console.log(objA == objB);
  console.log(objA === objB);
})();
```

1.  false true
2.  false false
3.  true false
4.  true true

Answer: 2) false false

### 7. What would be the output of following code ?

```javascript
(function () {
  var objA = Object.create({
    foo: "foo",
  });
  var objB = Object.create(objA);
  console.log(objA.toString() == objB.toString());
  console.log(objA.toString() === objB.toString());
})();
```

1.  false true
2.  false false
3.  true false
4.  true true

Answer: 4) true true

### 8. What would be the output of following code ?

```javascript
(function () {
  var objA = Object.create({
    foo: "foo",
  });
  var objB = objA;
  console.log(objA == objB);
  console.log(objA === objB);
  console.log(objA.toString() == objB.toString());
  console.log(objA.toString() === objB.toString());
})();
```

1.  true true true false
2.  true false true true
3.  true true true true
4.  true true false false

Answer: 3) true true true true

### 9. What would be the output of following code ?

```javascript
(function () {
  var objA = Object.create({
    foo: "foo",
  });
  var objB = objA;
  objB.foo = "bar";
  console.log(objA.foo);
  console.log(objB.foo);
})();
```

1.  foo bar
2.  bar bar
3.  foo foo
4.  bar foo

Answer: 2) bar bar

### 10. What would be the output of following code ?

```javascript
(function () {
  var objA = Object.create({
    foo: "foo",
  });
  var objB = objA;
  objB.foo = "bar";

  delete objA.foo;
  console.log(objA.foo);
  console.log(objB.foo);
})();
```

1.  foo bar
2.  bar bar
3.  foo foo
4.  bar foo

Answer: 3) foo foo

### 11. What would be the output of following code ?

```javascript
(function () {
  var objA = {
    foo: "foo",
  };
  var objB = objA;
  objB.foo = "bar";

  delete objA.foo;
  console.log(objA.foo);
  console.log(objB.foo);
})();
```

1.  foo bar
2.  undefined undefined
3.  foo foo
4.  undefined bar

Answer: 2) undefined undefined

## Arrays

### 1. What would be the output of following code?

```javascript
(function () {
  var array = new Array("100");
  console.log(array);
  console.log(array.length);
})();
```

1.  undefined undefined
2.  [undefined × 100] 100
3.  ["100"] 1
4.  ReferenceError: array is not defined

Answer: 3) ["100"] 1

### 2. What would be the output of following code?

```javascript
(function () {
  var array1 = [];
  var array2 = new Array(100);
  var array3 = new Array(["1", 2, "3", 4, 5.6]);
  console.log(array1);
  console.log(array2);
  console.log(array3);
  console.log(array3.length);
})();
```

1.  [][] [Array[5]] 1
2.  [][undefined × 100] Array[5] 1
3.  [][] ['1',2,'3',4,5.6] 5
4.  [][] [Array[5]] 5

Answer: 1) [][] [Array[5]] 1

### 3. What would be the output of following code?

```javascript
(function () {
  var array = new Array("a", "b", "c", "d", "e");
  array[10] = "f";
  delete array[10];
  console.log(array.length);
})();
```

1.  11
2.  5
3.  6
4.  undefined

Answer: 1) 11

### 4. What would be the output of following code?

```javascript
(function () {
  var animal = ["cow", "horse"];
  animal.push("cat");
  animal.push("dog", "rat", "goat");
  console.log(animal.length);
})();
```

1.  4
2.  5
3.  6
4.  undefined

Answer: 3) 6

### 5. What would be the output of following code?

```javascript
(function () {
  var animal = ["cow", "horse"];
  animal.push("cat");
  animal.unshift("dog", "rat", "goat");
  console.log(animal);
})();
```

1.  [ 'dog', 'rat', 'goat', 'cow', 'horse', 'cat' ]
2.  [ 'cow', 'horse', 'cat', 'dog', 'rat', 'goat' ]
3.  Type Error
4.  undefined

Answer: 1) [ 'dog', 'rat', 'goat', 'cow', 'horse', 'cat' ]

### 6. What would be the output of following code?

```javascript
(function () {
  var array = [1, 2, 3, 4, 5];
  console.log(array.indexOf(2));
  console.log([{ name: "John" }, { name: "John" }].indexOf({ name: "John" }));
  console.log([[1], [2], [3], [4]].indexOf([3]));
  console.log("abcdefgh".indexOf("e"));
})();
```

1.  1 -1 -1 4
2.  1 0 -1 4
3.  1 -1 -1 -1
4.  1 undefined -1 4

Answer: 1) 1 -1 -1 4

### 7. What would be the output of following code?

```javascript
(function () {
  var array = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6];
  console.log(array.indexOf(2));
  console.log(array.indexOf(2, 3));
  console.log(array.indexOf(2, 10));
})();
```

1.  1 -1 -1
2.  1 6 -1
3.  1 1 -1
4.  1 undefined undefined

Answer: 2) 1 6 -1

### 8. What would be the output of following code?

```javascript
(function () {
  var numbers = [2, 3, 4, 8, 9, 11, 13, 12, 16];
  var even = numbers.filter(function (element, index) {
    return element % 2 === 0;
  });
  console.log(even);

  var containsDivisibleby3 = numbers.some(function (element, index) {
    return element % 3 === 0;
  });

  console.log(containsDivisibleby3);
})();
```

1.  [ 2, 4, 8, 12, 16 ][ 0, 3, 0, 0, 9, 0, 12]
2.  [ 2, 4, 8, 12, 16 ][ 3, 9, 12]
3.  [ 2, 4, 8, 12, 16 ] true
4.  [ 2, 4, 8, 12, 16 ] false

Answer: 3) [ 2, 4, 8, 12, 16 ] true

### 9. What would be the output of following code?

```javascript
(function () {
  var containers = [2, 0, false, "", "12", true];
  var containers = containers.filter(Boolean);
  console.log(containers);
  var containers = containers.filter(Number);
  console.log(containers);
  var containers = containers.filter(String);
  console.log(containers);
  var containers = containers.filter(Object);
  console.log(containers);
})();
```

1. [ 2, '12', true ][ 2, '12', true ]
   [ 2, '12', true ][ 2, '12', true ]
2. [false, true][ 2 ]
   ['12'][ ]
3. [2,0,false,"", '12', true][2,0,false,"", '12', true]
   [2,0,false,"", '12', true][2,0,false,"", '12', true]
4. [ 2, '12', true ][ 2, '12', true, false ]
   [ 2, '12', true,false ][ 2, '12', true,false]

Answer: 1) [ 2, '12', true ][ 2, '12', true ]
[ 2, '12', true ][ 2, '12', true ]

### 10. What would be the output of following code?

```javascript
(function () {
  var list = ["foo", "bar", "john", "ritz"];
  console.log(list.slice(1));
  console.log(list.slice(1, 3));
  console.log(list.slice());
  console.log(list.slice(2, 2));
  console.log(list);
})();
```

1. [ 'bar', 'john', 'ritz' ][ 'bar', 'john' ]
   [ 'foo', 'bar', 'john', 'ritz' ][]
   [ 'foo', 'bar', 'john', 'ritz' ]
2. [ 'bar', 'john', 'ritz' ][ 'bar', 'john','ritz ]
   [ 'foo', 'bar', 'john', 'ritz' ][]
   [ 'foo', 'bar', 'john', 'ritz' ]
3. [ 'john', 'ritz' ][ 'bar', 'john' ]
   [ 'foo', 'bar', 'john', 'ritz' ][]
   [ 'foo', 'bar', 'john', 'ritz' ]
4. [ 'foo' ][ 'bar', 'john' ]
   [ 'foo', 'bar', 'john', 'ritz' ][]
   [ 'foo', 'bar', 'john', 'ritz' ]

Answer: 1) [ 'bar', 'john', 'ritz' ][ 'bar', 'john' ]
[ 'foo', 'bar', 'john', 'ritz' ][]
[ 'foo', 'bar', 'john', 'ritz' ]

### 11. What would be the output of following code?

```javascript
(function () {
  var list = ["foo", "bar", "john"];
  console.log(list.splice(1));
  console.log(list.splice(1, 2));
  console.log(list);
})();
```

1.  [ 'bar', 'john' ][] [ 'foo' ]
2.  [ 'bar', 'john' ][] [ 'bar', 'john' ]
3.  [ 'bar', 'john' ][ 'bar', 'john' ] [ 'bar', 'john' ]
4.  [ 'bar', 'john' ][] []

Answer: 1. [ 'bar', 'john' ][] [ 'foo' ]

### 12. What would be the output of following code?

```javascript
(function () {
  var arrayNumb = [2, 8, 15, 16, 23, 42];
  arrayNumb.sort();
  console.log(arrayNumb);
})();
```

1.  [2, 8, 15, 16, 23, 42]
2.  [42, 23, 26, 15, 8, 2]
3.  [ 15, 16, 2, 23, 42, 8 ]
4.  [ 2, 8, 15, 16, 23, 42 ]

Answer: 3. [ 15, 16, 2, 23, 42, 8 ]

## Functions

### 1. What would be the output of following code ?

```javascript
function funcA() {
  console.log("funcA ", this);
  (function innerFuncA1() {
    console.log("innerFunc1", this);
    (function innerFunA11() {
      console.log("innerFunA11", this);
    })();
  })();
}

console.log(funcA());
```

1.  funcA Window {...}
    innerFunc1 Window {...}
    innerFunA11 Window {...}
2.  undefined
3.  Type Error
4.  ReferenceError: this is not defined

Answer: 1)

### 2. What would be the output of following code ?

```javascript
var obj = {
  message: "Hello",
  innerMessage: !(function () {
    console.log(this.message);
  })(),
};

console.log(obj.innerMessage);
```

1.  ReferenceError: this.message is not defined
2.  undefined
3.  Type Error
4.  undefined true

Answer: 4) undefined true

### 3. What would be the output of following code ?

```javascript
var obj = {
  message: "Hello",
  innerMessage: function () {
    return this.message;
  },
};

console.log(obj.innerMessage());
```

1.  Hello
2.  undefined
3.  Type Error
4.  ReferenceError: this.message is not defined

Answer: 1) Hello

### 4. What would be the output of following code ?

```javascript
var obj = {
  message: "Hello",
  innerMessage: function () {
    (function () {
      console.log(this.message);
    })();
  },
};
console.log(obj.innerMessage());
```

1.  Type Error
2.  Hello
3.  undefined
4.  ReferenceError: this.message is not defined

Answer: 3) undefined

### 5. What would be the output of following code ?

```javascript
var obj = {
  message: "Hello",
  innerMessage: function () {
    var self = this;
    (function () {
      console.log(self.message);
    })();
  },
};
console.log(obj.innerMessage());
```

1.  Type Error
2.  'Hello'
3.  undefined
4.  ReferenceError: self.message is not defined

Answer: 2) 'Hello'

### 6. What would be the output of following code ?

```javascript
function myFunc() {
  console.log(this.message);
}
myFunc.message = "Hi John";

console.log(myFunc());
```

1.  Type Error
2.  'Hi John'
3.  undefined
4.  ReferenceError: this.message is not defined

Answer: 3) undefined

### 7. What would be the output of following code ?

```javascript
function myFunc() {
  console.log(myFunc.message);
}
myFunc.message = "Hi John";

console.log(myFunc());
```

1.  Type Error
2.  'Hi John'
3.  undefined
4.  ReferenceError: this.message is not defined

Answer: 2) 'Hi John'

### 8. What would be the output of following code ?

```javascript
function myFunc() {
  myFunc.message = "Hi John";
  console.log(myFunc.message);
}
console.log(myFunc());
```

1.  Type Error
2.  'Hi John'
3.  undefined
4.  ReferenceError: this.message is not defined

Answer: 2) 'Hi John'

### 9. What would be the output of following code ?

```javascript
function myFunc(param1, param2) {
  console.log(myFunc.length);
}
console.log(myFunc());
console.log(myFunc("a", "b"));
console.log(myFunc("a", "b", "c", "d"));
```

1.  2 2 2
2.  0 2 4
3.  undefined
4.  ReferenceError

Answer: a) 2 2 2

### 10. What would be the output of following code ?

```javascript
function myFunc() {
  console.log(arguments.length);
}
console.log(myFunc());
console.log(myFunc("a", "b"));
console.log(myFunc("a", "b", "c", "d"));
```

1.  2 2 2
2.  0 2 4
3.  undefined
4.  ReferenceError

Answer: 2) 0 2 4

## Object Oriented

### 1. What would be the output of following code ?

```javascript
function Person(name, age) {
  this.name = name || "John";
  this.age = age || 24;
  this.displayName = function () {
    console.log(this.name);
  };
}

Person.name = "John";
Person.displayName = function () {
  console.log(this.name);
};

var person1 = new Person("John");
person1.displayName();
Person.displayName();
```

1.  John Person
2.  John John
3.  John undefined
4.  John John

Answer: 1) John Person

## Scopes

### 1. What would be the output of following code ?

```javascript
function passWordMngr() {
  var password = "12345678";
  this.userName = "John";
  return {
    pwd: password,
  };
}
// Block End
var userInfo = passWordMngr();
console.log(userInfo.pwd);
console.log(userInfo.userName);
```

1.  12345678 Window
2.  12345678 John
3.  12345678 undefined
4.  undefined undefined

Answer: 3) 12345678 undefined

### 2. What would be the output of following code ?

```javascript
var employeeId = "aq123";
function Employee() {
  this.employeeId = "bq1uy";
}
console.log(Employee.employeeId);
```

1.  Reference Error
2.  aq123
3.  bq1uy
4.  undefined

Answer: 4) undefined

### 3. What would be the output of following code ?

```javascript
var employeeId = "aq123";

function Employee() {
  this.employeeId = "bq1uy";
}
console.log(new Employee().employeeId);
Employee.prototype.employeeId = "kj182";
Employee.prototype.JobId = "1BJKSJ";
console.log(new Employee().JobId);
console.log(new Employee().employeeId);
```

1.  bq1uy 1BJKSJ bq1uy undefined
2.  bq1uy 1BJKSJ bq1uy
3.  bq1uy 1BJKSJ kj182
4.  undefined 1BJKSJ kj182

Answer: 2) bq1uy 1BJKSJ bq1uy

### 4. What would be the output of following code ?

```javascript
var employeeId = "aq123";
(function Employee() {
  try {
    throw "foo123";
  } catch (employeeId) {
    console.log(employeeId);
  }
  console.log(employeeId);
})();
```

1.  foo123 aq123
2.  foo123 foo123
3.  aq123 aq123
4.  foo123 undefined

Answer: 1) foo123 aq123

## Call, Apply, Bind

### 1. What would be the output of following code ?

```javascript
(function () {
  var greet = "Hello World";
  var toGreet = [].filter.call(greet, function (element, index) {
    return index > 5;
  });
  console.log(toGreet);
})();
```

1.  Hello World
2.  undefined
3.  World
4.  [ 'W', 'o', 'r', 'l', 'd' ]

Answer: 4) [ 'W', 'o', 'r', 'l', 'd' ]

### 2. What would be the output of following code ?

```javascript
(function () {
  var fooAccount = {
    name: "John",
    amount: 4000,
    deductAmount: function (amount) {
      this.amount -= amount;
      return "Total amount left in account: " + this.amount;
    },
  };
  var barAccount = {
    name: "John",
    amount: 6000,
  };
  var withdrawAmountBy = function (totalAmount) {
    return fooAccount.deductAmount.bind(barAccount, totalAmount);
  };
  console.log(withdrawAmountBy(400)());
  console.log(withdrawAmountBy(300)());
})();
```

1. Total amount left in account: 5600 Total amount left in account: 5300
2. undefined undefined
3. Total amount left in account: 3600 Total amount left in account: 3300
4. Total amount left in account: 5600 Total amount left in account: 5600

Answer: 1) Total amount left in account: 5600 Total amount left in account: 5300

### 3. What would be the output of following code ?

```javascript
(function () {
  var fooAccount = {
    name: "John",
    amount: 4000,
    deductAmount: function (amount) {
      this.amount -= amount;
      return this.amount;
    },
  };
  var barAccount = {
    name: "John",
    amount: 6000,
  };
  var withdrawAmountBy = function (totalAmount) {
    return fooAccount.deductAmount.apply(barAccount, [totalAmount]);
  };
  console.log(withdrawAmountBy(400));
  console.log(withdrawAmountBy(300));
  console.log(withdrawAmountBy(200));
})();
```

1. 5600 5300 5100
2. 3600 3300 3100
3. 5600 3300 5100
4. undefined undefined undefined

Answer: 1) 5600 5300 5100

### 4. What would be the output of following code ?

```javascript
(function () {
  var fooAccount = {
    name: "John",
    amount: 6000,
    deductAmount: function (amount) {
      this.amount -= amount;
      return this.amount;
    },
  };
  var barAccount = {
    name: "John",
    amount: 4000,
  };
  var withdrawAmountBy = function (totalAmount) {
    return fooAccount.deductAmount.call(barAccount, totalAmount);
  };
  console.log(withdrawAmountBy(400));
  console.log(withdrawAmountBy(300));
  console.log(withdrawAmountBy(200));
})();
```

1. 5600 5300 5100
2. 3600 3300 3100
3. 5600 3300 5100
4. undefined undefined undefined

Answer: 2) 3600 3300 3100

### 5. What would be the output of following code ?

```javascript
(function greetNewCustomer() {
  console.log("Hello " + this.name);
}.bind({
  name: "John",
})());
```

1. Hello John
2. Reference Error
3. Window
4. undefined

Answer: 1) Hello John

### 6. Suggest your question!

## Callback Functions

### 1. What would be the output of following code ?

```javascript
function getDataFromServer(apiUrl) {
  var name = "John";
  return {
    then: function (fn) {
      fn(name);
    },
  };
}

getDataFromServer("www.google.com").then(function (name) {
  console.log(name);
});
```

1. John
2. undefined
3. Reference Error
4. fn is not defined

Answer: 1) John

### 2. What would be the output of following code ?

```javascript
(function () {
  var arrayNumb = [2, 8, 15, 16, 23, 42];
  Array.prototype.sort = function (a, b) {
    return a - b;
  };
  arrayNumb.sort();
  console.log(arrayNumb);
})();

(function () {
  var numberArray = [2, 8, 15, 16, 23, 42];
  numberArray.sort(function (a, b) {
    if (a == b) {
      return 0;
    } else {
      return a < b ? -1 : 1;
    }
  });
  console.log(numberArray);
})();

(function () {
  var numberArray = [2, 8, 15, 16, 23, 42];
  numberArray.sort(function (a, b) {
    return a - b;
  });
  console.log(numberArray);
})();
```

1. [ 2, 8, 15, 16, 23, 42 ][ 2, 8, 15, 16, 23, 42 ]
   [ 2, 8, 15, 16, 23, 42 ]
2. undefined undefined undefined
3. [42, 23, 16, 15, 8, 2][42, 23, 16, 15, 8, 2]
   [42, 23, 16, 15, 8, 2]
4. Reference Error

Answer: 1) [ 2, 8, 15, 16, 23, 42 ][ 2, 8, 15, 16, 23, 42 ]
[ 2, 8, 15, 16, 23, 42 ]

## Return Statement

### 1. What would be the output of following code ?

```javascript
(function () {
  function sayHello() {
    var name = "Hi John";
    return;
    {
      fullName: name;
    }
  }
  console.log(sayHello().fullName);
})();
```

1. Hi John
2. undefined
3. Reference Error
4. Uncaught TypeError: Cannot read property 'fullName' of undefined

Answer: 4) Uncaught TypeError: Cannot read property 'fullName' of undefined

### 2. What would be the output of following code ?

```javascript
function getNumber() {
  return 2, 4, 5;
}

var numb = getNumber();
console.log(numb);
```

1. 5
2. undefined
3. 2
4. (2,4,5)

Answer: 1) 5

### 3. What would be the output of following code ?

```javascript
function getNumber() {
  return;
}

var numb = getNumber();
console.log(numb);
```

1. null
2. undefined
3. ""
4. 0

Answer: 2) undefined

### 4\*\*. What would be the output of following code ?

```javascript
function mul(x) {
  return function (y) {
    return [
      x * y,
      function (z) {
        return x * y + z;
      },
    ];
  };
}

console.log(mul(2)(3)[0]);
console.log(mul(2)(3)[1](4));
```

1. 6, 10
2. undefined undefined
3. Reference Error
4. 10, 6

Answer: 1) 6, 10

### 5\*\*. What would be the output of following code ?

```javascript
function mul(x) {
  return function (y) {
    return {
      result: x * y,
      sum: function (z) {
        return x * y + z;
      },
    };
  };
}
console.log(mul(2)(3).result);
console.log(mul(2)(3).sum(4));
```

1. 6, 10
2. undefined undefined
3. Reference Error
4. 10, 6

Answer: 1) 6, 10

### 6. What would be the output of following code ?

```javascript
function mul(x) {
  return function (y) {
    return function (z) {
      return function (w) {
        return function (p) {
          return x * y * z * w * p;
        };
      };
    };
  };
}
console.log(mul(2)(3)(4)(5)(6));
```

1. 720
2. undefined
3. Reference Error
4. Type Error

Answer: 1) 720

### 7. What would be the output of following code ?

```javascript
function getName1() {
  console.log(this.name);
}

Object.prototype.getName2 = () => {
  console.log(this.name);
};

let personObj = {
  name: "Tony",
  print: getName1,
};

personObj.print();
personObj.getName2();
```

1. undefined undefined
2. Tony undefined
3. undefined Tony
4. Tony Tony

Answer: 2) Tony undefined

Explaination: **getName1()** function works fine because it's being called from **_personObj_**, so it has access to _this.name_ property. But when while calling **getnName2** which is defined under _Object.prototype_ doesn't have any proprty named _this.name_. There should be _name_ property under prototype. Following is the code:

```javascript
function getName1() {
  console.log(this.name);
}

Object.prototype.getName2 = () => {
  console.log(Object.getPrototypeOf(this).name);
};

let personObj = {
  name: "Tony",
  print: getName1,
};

personObj.print();
Object.prototype.name = "Steve";
personObj.getName2();
```

# Interview Algorithm Questions in Javascript() {...}

_A mostly reasonable collection of technical software development interview questions solved in Javascript in ES5 and ES6_

## Table of Contents

1. [Array](#array)
1. [Strings](#strings)
1. [Stacks and Queues](#stacks-and-queues)
1. [Recursion](#recursion)
1. [Numbers](#numbers)
1. [Javascript Specific](#javascript)
1. To Be Continued

## Array

<a name="array--product"></a><a name="1.1"></a>

- **[1.1](#array--product) Given an array of integers, find the largest product yielded from three of the integers**

  ```javascript
  var unsortedArray = [-10, 7, 29, 30, 5, -10, -70];

  computeProduct(unsortedArray); // 21000

  function sortIntegers(a, b) {
    return a - b;
  }

  // Greatest product is either (min1 * min2 * max1 || max1 * max2 * max3)
  function computeProduct(unsorted) {
    var sortedArray = unsorted.sort(sortIntegers),
      product1 = 1,
      product2 = 1,
      array_n_element = sortedArray.length - 1;

    // Get the product of three largest integers in sorted array
    for (var x = array_n_element; x > array_n_element - 3; x--) {
      product1 = product1 * sortedArray[x];
    }

    product2 = sortedArray[0] * sortedArray[1] * sortedArray[array_n_element];

    if (product1 > product2) return product1;

    return product2;
  }
  ```

  **View on Codepen:** https://codepen.io/kennymkchan/pen/LxoMvm?editors=0012

<a name="array--consecutive--sum"></a><a name="1.2"></a>

- **[1.2](#array--consecutive--sum) Being told that an unsorted array contains (n - 1) of n consecutive numbers (where the bounds are defined), find the missing number in `O(n)` time**

  ```javascript
  // The output of the function should be 8
  var arrayOfIntegers = [2, 5, 1, 4, 9, 6, 3, 7];
  var upperBound = 9;
  var lowerBound = 1;

  findMissingNumber(arrayOfIntegers, upperBound, lowerBound); // 8

  function findMissingNumber(arrayOfIntegers, upperBound, lowerBound) {
    // Iterate through array to find the sum of the numbers
    var sumOfIntegers = 0;
    for (var i = 0; i < arrayOfIntegers.length; i++) {
      sumOfIntegers += arrayOfIntegers[i];
    }

    // Find theoretical sum of the consecutive numbers using a variation of Gauss Sum.
    // Formula: [(N * (N + 1)) / 2] - [(M * (M - 1)) / 2];
    // N is the upper bound and M is the lower bound

    upperLimitSum = (upperBound * (upperBound + 1)) / 2;
    lowerLimitSum = (lowerBound * (lowerBound - 1)) / 2;

    theoreticalSum = upperLimitSum - lowerLimitSum;

    return theoreticalSum - sumOfIntegers;
  }
  ```

  **View on Codepen:** http://codepen.io/kennymkchan/pen/rjgoXw?editors=0012

<a name="array--unique"></a><a name="1.3"></a>

- **[1.3](#array--unique) Removing duplicates of an array and returning an array of only unique elements**

  ```javascript
  // ES6 Implementation
  var array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

  Array.from(new Set(array)); // [1, 2, 3, 5, 9, 8]

  // ES5 Implementation
  var array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

  uniqueArray(array); // [1, 2, 3, 5, 9, 8]

  function uniqueArray(array) {
    var hashmap = {};
    var unique = [];

    for (var i = 0; i < array.length; i++) {
      // If key returns undefined (unique), it is evaluated as false.
      if (!hashmap.hasOwnProperty(array[i])) {
        hashmap[array[i]] = 1;
        unique.push(array[i]);
      }
    }

    return unique;
  }
  ```

  **View on Codepen:** http://codepen.io/kennymkchan/pen/ZLNwze?editors=0012

<a name="array--largest-difference"></a><a name="1.4"></a>

- **[1.4](#array--largest-difference) Given an array of integers, find the largest difference between two elements such that the element of lesser value must come before the greater element**

  ```javascript
  var array = [7, 8, 4, 9, 9, 15, 3, 1, 10];
  // [7, 8, 4, 9, 9, 15, 3, 1, 10] would return `11` based on the difference between `4` and `15`
  // Notice: It is not `14` from the difference between `15` and `1` because 15 comes before 1.

  findLargestDifference(array);

  function findLargestDifference(array) {
    // If there is only one element, there is no difference
    if (array.length <= 1) return -1;

    // currentMin will keep track of the current lowest
    var currentMin = array[0];
    var currentMaxDifference = 0;

    // We will iterate through the array and keep track of the current max difference
    // If we find a greater max difference, we will set the current max difference to that variable
    // Keep track of the current min as we iterate through the array, since we know the greatest
    // difference is yield from `largest value in future` - `smallest value before it`

    for (var i = 1; i < array.length; i++) {
      if (
        array[i] > currentMin &&
        array[i] - currentMin > currentMaxDifference
      ) {
        currentMaxDifference = array[i] - currentMin;
      } else if (array[i] <= currentMin) {
        currentMin = array[i];
      }
    }

    // If negative or 0, there is no largest difference
    if (currentMaxDifference <= 0) return -1;

    return currentMaxDifference;
  }
  ```

  **View on Codepen:** http://codepen.io/kennymkchan/pen/MJdLWJ?editors=0012

<a name="array--product-other-than-itself"></a><a name="1.5"></a>

- **[1.5](#array--product-other-than-itself) Given an array of integers, return an output array such that output[i] is equal to the product of all the elements in the array other than itself. (Solve this in O(n) without division)**

  ```javascript
  var firstArray = [2, 2, 4, 1];
  var secondArray = [0, 0, 0, 2];
  var thirdArray = [-2, -2, -3, 2];

  productExceptSelf(firstArray); // [8, 8, 4, 16]
  productExceptSelf(secondArray); // [0, 0, 0, 0]
  productExceptSelf(thirdArray); // [12, 12, 8, -12]

  function productExceptSelf(numArray) {
    var product = 1;
    var size = numArray.length;
    var output = [];

    // From first array: [1, 2, 4, 16]
    // The last number in this case is already in the right spot (allows for us)
    // to just multiply by 1 in the next step.
    // This step essentially gets the product to the left of the index at index + 1
    for (var x = 0; x < size; x++) {
      output.push(product);
      product = product * numArray[x];
    }

    // From the back, we multiply the current output element (which represents the product
    // on the left of the index, and multiplies it by the product on the right of the element)
    var product = 1;
    for (var i = size - 1; i > -1; i--) {
      output[i] = output[i] * product;
      product = product * numArray[i];
    }

    return output;
  }
  ```

  **View on Codepen:** http://codepen.io/kennymkchan/pen/OWYdJK?editors=0012

<a name="array--intersection"></a><a name="1.6"></a>

- **[1.6](#array--intersection) Find the intersection of two arrays. An intersection would be the common elements that exists within both arrays. In this case, these elements should be unique!**

  ```javascript
  var firstArray = [2, 2, 4, 1];
  var secondArray = [1, 2, 0, 2];

  intersection(firstArray, secondArray); // [2, 1]

  function intersection(firstArray, secondArray) {
    // The logic here is to create a hashmap with the elements of the firstArray as the keys.
    // After that, you can use the hashmap's O(1) look up time to check if the element exists in the hash
    // If it does exist, add that element to the new array.

    var hashmap = {};
    var intersectionArray = [];

    firstArray.forEach(function (element) {
      hashmap[element] = 1;
    });

    // Since we only want to push unique elements in our case... we can implement a counter to keep track of what we already added
    secondArray.forEach(function (element) {
      if (hashmap[element] === 1) {
        intersectionArray.push(element);
        hashmap[element]++;
      }
    });

    return intersectionArray;

    // Time complexity O(n), Space complexity O(n)
  }
  ```

  **View on Codepen:** http://codepen.io/kennymkchan/pen/vgwbEb?editors=0012

**[⬆ back to top](#table-of-contents)**

## Strings

<a name="string--reverse"></a><a name="2.1"></a>

- **[2.1](#string--reverse) Given a string, reverse each word in the sentence**
  `"Welcome to this Javascript Guide!"` should be become `"emocleW ot siht tpircsavaJ !ediuG"`

  ```javascript
  var string = "Welcome to this Javascript Guide!";

  // Output becomes !ediuG tpircsavaJ siht ot emocleW
  var reverseEntireSentence = reverseBySeparator(string, "");

  // Output becomes emocleW ot siht tpircsavaJ !ediuG
  var reverseEachWord = reverseBySeparator(reverseEntireSentence, " ");

  function reverseBySeparator(string, separator) {
    return string.split(separator).reverse().join(separator);
  }
  ```

  **View on Codepen:** http://codepen.io/kennymkchan/pen/VPOONZ?editors=0012

<a name="string--anagram"></a><a name="2.2"></a>

- **[2.2](#string--anagram) Given two strings, return true if they are anagrams of one another**
  `"Mary" is an anagram of "Army"`

  ```javascript
  var firstWord = "Mary";
  var secondWord = "Army";

  isAnagram(firstWord, secondWord); // true

  function isAnagram(first, second) {
    // For case insensitivity, change both words to lowercase.
    var a = first.toLowerCase();
    var b = second.toLowerCase();

    // Sort the strings, and join the resulting array to a string. Compare the results
    a = a.split("").sort().join("");
    b = b.split("").sort().join("");

    return a === b;
  }
  ```

  **View on Codepen:** http://codepen.io/kennymkchan/pen/NdVVVj?editors=0012

<a name="string--palindrome"></a><a name="2.3"></a>

- **[2.3](#string--palindrome) Check if a given string is a palindrome**
  `"racecar" is a palindrome. "race car" should also be considered a palindrome. Case sensitivity should be taken into account`

  ```javascript
  isPalindrome("racecar"); // true
  isPalindrome("race Car"); // true

  function isPalindrome(word) {
    // Replace all non-letter chars with "" and change to lowercase
    var lettersOnly = word.toLowerCase().replace(/\s/g, "");

    // Compare the string with the reversed version of the string
    return lettersOnly === lettersOnly.split("").reverse().join("");
  }
  ```

  **View on Codepen:** http://codepen.io/kennymkchan/pen/xgNNNB?editors=0012

<a name="string--isIsomorphic"></a><a name="2.3"></a>

- **[2.3](#string--palindrome) Check if a given string is a isomorphic**

  ```
  For two strings to be isomorphic, all occurrences of a character in string A can be replaced with another character
  to get string B. The order of the characters must be preserved. There must be one-to-one mapping for ever char of
  string A to every char of string B.

  `paper` and `title` would return true.
  `egg` and `sad` would return false.
  `dgg` and `add` would return true.
  ```

  ```javascript
  isIsomorphic("egg", "add"); // true
  isIsomorphic("paper", "title"); // true
  isIsomorphic("kick", "side"); // false

  function isIsomorphic(firstString, secondString) {
    // Check if the same lenght. If not, they cannot be isomorphic
    if (firstString.length !== secondString.length) return false;

    var letterMap = {};

    for (var i = 0; i < firstString.length; i++) {
      var letterA = firstString[i],
        letterB = secondString[i];

      // If the letter does not exist, create a map and map it to the value
      // of the second letter
      if (letterMap[letterA] === undefined) {
        // If letterB has already been added to letterMap, then we can say: they are not isomorphic.
        if (secondString.indexOf(letterB) < i) {
          return false;
        } else {
          letterMap[letterA] = letterB;
        }
      } else if (letterMap[letterA] !== letterB) {
        // Eles if letterA already exists in the map, but it does not map to
        // letterB, that means that A is mapping to more than one letter.
        return false;
      }
    }
    // If after iterating through and conditions are satisfied, return true.
    // They are isomorphic
    return true;
  }
  ```

  **View on Codepen:** http://codepen.io/kennymkchan/pen/mRZgaj?editors=0012

**[⬆ back to top](#table-of-contents)**

## Stacks and Queues

<a name="stack-queue--stack-as-queue"></a><a name="3.1"></a>

- **[3.1](#stack-queue--stack-as-queue) Implement enqueue and dequeue using only two stacks**

  ```javascript
  var inputStack = []; // First stack
  var outputStack = []; // Second stack

  // For enqueue, just push the item into the first stack
  function enqueue(stackInput, item) {
    return stackInput.push(item);
  }

  function dequeue(stackInput, stackOutput) {
    // Reverse the stack such that the first element of the output stack is the
    // last element of the input stack. After that, pop the top of the output to
    // get the first element that was ever pushed into the input stack
    if (stackOutput.length <= 0) {
      while (stackInput.length > 0) {
        var elementToOutput = stackInput.pop();
        stackOutput.push(elementToOutput);
      }
    }

    return stackOutput.pop();
  }
  ```

  **View on Codepen:** http://codepen.io/kennymkchan/pen/mRYYZV?editors=0012

<a name="stack-queue--parentheses-balancing"></a><a name="3.2"></a>

- **[3.2](#stack-queue--parentheses-balancing) Create a function that will evaluate if a given expression has balanced parentheses -- Using stacks**
  In this example, we will only consider "{}" as valid parentheses
  `{}{}` would be considered balancing. `{{{}}` is not balanced

  ```javascript
  var expression = "{{}}{}{}";
  var expressionFalse = "{}{{}";

  isBalanced(expression); // true
  isBalanced(expressionFalse); // false
  isBalanced(""); // true

  function isBalanced(expression) {
    var checkString = expression;
    var stack = [];

    // If empty, parentheses are technically balanced
    if (checkString.length <= 0) return true;

    for (var i = 0; i < checkString.length; i++) {
      if (checkString[i] === "{") {
        stack.push(checkString[i]);
      } else if (checkString[i] === "}") {
        // Pop on an empty array is undefined
        if (stack.length > 0) {
          stack.pop();
        } else {
          return false;
        }
      }
    }

    // If the array is not empty, it is not balanced
    if (stack.pop()) return false;
    return true;
  }
  ```

  **View on Codepen:** http://codepen.io/kennymkchan/pen/egaawj?editors=0012

**[⬆ back to top](#table-of-contents)**

## Recursion

<a name="recursion--decimal-to-binary"></a><a name="4.1"></a>

- **[4.1](#recursion--decimal-to-binary) Write a recursive function that returns the binary string of a given decimal number**
  Given `4` as the decimal input, the function should return `100`

  ```javascript
  decimalToBinary(3); // 11
  decimalToBinary(8); // 1000
  decimalToBinary(1000); // 1111101000

  function decimalToBinary(digit) {
    if (digit >= 1) {
      // If digit is not divisible by 2 then recursively return proceeding
      // binary of the digit minus 1, 1 is added for the leftover 1 digit
      if (digit % 2) {
        return decimalToBinary((digit - 1) / 2) + 1;
      } else {
        // Recursively return proceeding binary digits
        return decimalToBinary(digit / 2) + 0;
      }
    } else {
      // Exit condition
      return "";
    }
  }
  ```

  **View on Codepen:** http://codepen.io/kennymkchan/pen/OWYYKb?editors=0012

<a name="recursion--binary-search"></a><a name="4.2"></a>

- **[4.2](#recursion--binary-search) Write a recursive function that performs a binary search**

  ```javascript
  function recursiveBinarySearch(array, value, leftPosition, rightPosition) {
    // Value DNE
    if (leftPosition > rightPosition) return -1;

    var middlePivot = Math.floor((leftPosition + rightPosition) / 2);
    if (array[middlePivot] === value) {
      return middlePivot;
    } else if (array[middlePivot] > value) {
      return recursiveBinarySearch(array, value, leftPosition, middlePivot - 1);
    } else {
      return recursiveBinarySearch(
        array,
        value,
        middlePivot + 1,
        rightPosition
      );
    }
  }
  ```

  **View on Codepen:** http://codepen.io/kennymkchan/pen/ygWWmK?editors=0012

**[⬆ back to top](#table-of-contents)**

## Numbers

<a name="numbers--power-of-two"></a><a name="5.1"></a>

- **[5.1](#numbers--power-of-two) Given an integer, determine if it is a power of 2. If so,
  return that number, else return -1. (0 is not a power of two)**

  ```javascript
  isPowerOfTwo(4); // true
  isPowerOfTwo(64); // true
  isPowerOfTwo(1); // true
  isPowerOfTwo(0); // false
  isPowerOfTwo(-1); // false

  // For the non-zero case:
  function isPowerOfTwo(number) {
    // `&` uses the bitwise n.
    // In the case of number = 4; the expression would be identical to:
    // `return (4 & 3 === 0)`
    // In bitwise, 4 is 100, and 3 is 011. Using &, if two values at the same
    // spot is 1, then result is 1, else 0. In this case, it would return 000,
    // and thus, 4 satisfies are expression.
    // In turn, if the expression is `return (5 & 4 === 0)`, it would be false
    // since it returns 101 & 100 = 100 (NOT === 0)

    return number & (number - 1 === 0);
  }

  // For zero-case:
  function isPowerOfTwoZeroCase(number) {
    return number !== 0 && (number & (number - 1)) === 0;
  }
  ```

  **View on Codepen:** http://codepen.io/kennymkchan/pen/qRGGeG?editors=0012

**[⬆ back to top](#table-of-contents)**

## Javascript

<a name="javascript--hoisting"></a><a name="6.1"></a>

- **[6.1](#javascript--hosting) Explain what is hoisting in Javascript**

  ```
  Hoisting is the concept in which Javascript, by default, moves all declarations to the top
  of the current scope. As such, a variable can be used before it has been declared. Note that
  Javascript only hoists declarations and not initializations
  ```

<a name="javascript--use-strict"></a><a name="6.2"></a>

- **[6.2](#javascript--use-strict) Describe the functionality of the `use strict;` directive**

  ```
  the `use strict` directive defines that the Javascript should be executed in `strict mode`.
  One major benefit that strict mode provides is that it prevents developers from using
  undeclared variables. Older versions of javascript would ignore this directive declaration
  ```

  ```javascript
  // Example of strict mode
  "use strict";

  catchThemAll();
  function catchThemAll() {
    x = 3.14; // Error will be thrown
    return x * x;
  }
  ```

  <a name="javascript--event-bubbling"></a><a name="6.3"></a>

- **[6.3](#javascript--event-bubbling) Explain `event bubbling` and how one may prevent it**

  ```
  Event bubbling is the concept in which an event triggers at the deepest possible element,
  and triggers on parent elements in nesting order. As a result, when clicking on a child element
  one may exhibit the handler of the parent activating.

  One way to prevent event bubbling is using `event.stopPropagation()` or `event.cancelBubble`
  on IE < 9
  ```

  <a name="javascript--strict-operators"></a><a name="6.4"></a>

- **[6.4](#javascript--strict-operators) What is the difference between `==` and `===` in JS?**

  ```
  `===` is known as a strict operator. The key difference between `==` and `===` is that the
  strict operator matches for both value and type, as opposed to just the value.
  ```

  ```javascript
  // Example of comparators
  0 == false; // true
  0 === false; // false

  2 == "2"; // true
  2 === "2"; // false
  ```

<a name="javascript--null-undefined"></a><a name="6.5"></a>

- **[6.5](#javascript--null-undefined) What is the difference between `null` and `undefined`**

  ```
  In Javascript, null is an assignment value, and can be assigned to a variable representing that
  it has no value. Undefined, on the other hand, represents that a variable has been declared but
  there is no value associated with it
  ```

<a name="javascript--difference-inheritance"></a><a name="6.6"></a>

- **[6.6](#javascript--difference-inheritance) How does `prototypal inheritance` differ from `classical inheritance`**

  ```
  In classical inheritance, classes are immutable, may or may not support multiple
  inheritance, and may contain interfaces, final classes, and abstract classes. In contrast,
  prototypes are much more flexible in the sense that they may be mutable or immutable. The object
  may inherit from multiple prototypes, and only contains objects.
  ```

**[⬆ back to top](#table-of-contents)**

# Third Important Part

# Third Important Part

# Third Important Part

1. ### What are the possible ways to create objects in JavaScript?

There are many ways to create objects in javascript as below,

1. **Object constructor:**

The simplest way to create an empty object is using Object constructor. Currently this approach is not recommended.

```javascript
var object = new Object();
```

2.  **Object's create method:**

The create method of Object creates a new object by passing the prototype object as a parameter

```javascript
var object = Object.create(null);
```

3.  **Object literal syntax:**
    The object literal syntax is equivalent to create method when it passes null as parameter

```javascript
var object = {};
```

4.  **Function constructor:**
    Create any function and apply the new operator to create object instances,

```javascript
function Person(name) {
  var object = {};
  object.name = name;
  object.age = 21;
  return object;
}
var object = new Person("Sudheer");
```

5.  **Function constructor with prototype:**
    This is similar to function constructor but it uses prototype for their properties and methods,

```javascript
function Person() {}
Person.prototype.name = "Sudheer";
var object = new Person();
```

This is equivalent to an instance created with an object create method with a function prototype and then call that function with an instance and parameters as arguments.

```javascript
function func {};

new func(x, y, z);

**(OR)**

// Create a new instance using function prototype.
var newInstance = Object.create(func.prototype)

// Call the function
var result = func.call(newInstance, x, y, z),

// If the result is a non-null object then use it otherwise just use the new instance.
console.log(result && typeof result === 'object' ? result : newInstance);
```

6. **ES6 Class syntax:**
   ES6 introduces class feature to create the objects

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

var object = new Person("Sudheer");
```

7. **Singleton pattern:**
   A Singleton is an object which can only be instantiated one time. Repeated calls to its constructor return the same instance and this way one can ensure that they don't accidentally create multiple instances.

```javascript
var object = new (function () {
  this.name = "Sudheer";
})();
```

**[⬆ Back to Top](#table-of-contents)**

2. ### What is prototype chain?

**Prototype chaining** is used to build new types of objects based on existing ones. It is similar to inheritance in a class based language. The prototype on object instance is available through Object.getPrototypeOf(object) or **proto** property whereas prototype on constructors function is available through object.prototype.

**[⬆ Back to Top](#table-of-contents)**

3. ### What is the difference between Call, Apply and Bind?
   The difference between Call, Apply and Bind can be explained with below examples,
   **Call:** The call() method invokes a function with a given `this` value and arguments provided one by one

```javascript
var employee1 = { firstName: "John", lastName: "Rodson" };
var employee2 = { firstName: "Jimmy", lastName: "Baily" };

function invite(greeting1, greeting2) {
  console.log(
    greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
  );
}

invite.call(employee1, "Hello", "How are you?"); // Hello John Rodson, How are you?
invite.call(employee2, "Hello", "How are you?"); // Hello Jimmy Baily, How are you?
```

**Apply:** Invokes the function and allows you to pass in arguments as an array

```javascript
var employee1 = { firstName: "John", lastName: "Rodson" };
var employee2 = { firstName: "Jimmy", lastName: "Baily" };

function invite(greeting1, greeting2) {
  console.log(
    greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
  );
}

invite.apply(employee1, ["Hello", "How are you?"]); // Hello John Rodson, How are you?
invite.apply(employee2, ["Hello", "How are you?"]); // Hello Jimmy Baily, How are you?
```

**bind:** returns a new function, allowing you to pass in an array and any number of arguments

```javascript
var employee1 = { firstName: "John", lastName: "Rodson" };
var employee2 = { firstName: "Jimmy", lastName: "Baily" };

function invite(greeting1, greeting2) {
  console.log(
    greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
  );
}

var inviteEmployee1 = invite.bind(employee1);
var inviteEmployee2 = invite.bind(employee2);
inviteEmployee1("Hello", "How are you?"); // Hello John Rodson, How are you?
inviteEmployee2("Hello", "How are you?"); // Hello Jimmy Baily, How are you?
```

Call and apply are pretty interchangeable. Both execute the current function immediately. You need to decide whether it’s easier to send in an array or a comma separated list of arguments. You can remember by treating Call is for comma (separated list) and Apply is for Array. Whereas Bind creates a new function that will have `this` set to the first parameter passed to bind().

**[⬆ Back to Top](#table-of-contents)**

4. ### What is JSON and its common operations?

**JSON** is a text-based data format following JavaScript object syntax, which was popularized by Douglas Crockford. It is useful when you want to transmit data across a network and it is basically just a text file with an extension of .json, and a MIME type of application/json
Parsing: \*\*Converting a string to a native object

```javascript
JSON.parse(text);
```

Stringification: \*\*converting a native object to a string so it can be transmitted across the network

```javascript
JSON.stringify(object);
```

**[⬆ Back to Top](#table-of-contents)**

5. ### What is the purpose of array slice method?

The **slice()** method returns the selected elements in an array as a new array object. It selects the elements starting at the given start argument, and ends at the given optional end argument without including the last element. If you omit the second argument then it selects till the end. Some of the examples of this method are,

```javascript
let arrayIntegers = [1, 2, 3, 4, 5];
let arrayIntegers1 = arrayIntegers.slice(0, 2); // returns [1,2]
let arrayIntegers2 = arrayIntegers.slice(2, 3); // returns [3]
let arrayIntegers3 = arrayIntegers.slice(4); //returns [5]
```

**Note:** Slice method won't mutate the original array but it returns the subset as new array.

**[⬆ Back to Top](#table-of-contents)**

6. ### What is the purpose of array splice method?

The **splice()** method is used either adds/removes items to/from an array, and then returns the removed item. The first argument specifies the array position for insertion or deletion whereas the option second argument indicates the number of elements to be deleted. Each additional argument is added to the array. Some of the examples of this method are,

```javascript
let arrayIntegersOriginal1 = [1, 2, 3, 4, 5];
let arrayIntegersOriginal2 = [1, 2, 3, 4, 5];
let arrayIntegersOriginal3 = [1, 2, 3, 4, 5];

let arrayIntegers1 = arrayIntegersOriginal1.splice(0, 2); // returns [1, 2]; original array: [3, 4, 5]
let arrayIntegers2 = arrayIntegersOriginal2.splice(3); // returns [4, 5]; original array: [1, 2, 3]
let arrayIntegers3 = arrayIntegersOriginal3.splice(3, 1, "a", "b", "c"); //returns [4]; original array: [1, 2, 3, "a", "b", "c", 5]
```

**Note:** Splice method modifies the original array and returns the deleted array.

**[⬆ Back to Top](#table-of-contents)**

7. ### What is the difference between slice and splice?

Some of the major difference in a tabular form

| Slice                                        | Splice                                          |
| -------------------------------------------- | ----------------------------------------------- |
| Doesn't modify the original array(immutable) | Modifies the original array(mutable)            |
| Returns the subset of original array         | Returns the deleted elements as array           |
| Used to pick the elements from array         | Used to insert or delete elements to/from array |

**[⬆ Back to Top](#table-of-contents)**

8. ### How do you compare Object and Map?

   **Objects** are similar to **Maps** in that both let you set keys to values, retrieve those values, delete keys, and detect whether something is stored at a key. Due to this reason, Objects have been used as Maps historically. But there are important differences that make using a Map preferable in certain cases.

1. The keys of an Object are Strings and Symbols, whereas they can be any value for a Map, including functions, objects, and any primitive.
1. The keys in Map are ordered while keys added to object are not. Thus, when iterating over it, a Map object returns keys in order of insertion.
1. You can get the size of a Map easily with the size property, while the number of properties in an Object must be determined manually.
1. A Map is an iterable and can thus be directly iterated, whereas iterating over an Object requires obtaining its keys in some fashion and iterating over them.
1. An Object has a prototype, so there are default keys in the map that could collide with your keys if you're not careful. As of ES5 this can be bypassed by using map = Object.create(null), but this is seldom done.
1. A Map may perform better in scenarios involving frequent addition and removal of key pairs.

**[⬆ Back to Top](#table-of-contents)**

9. ### What is the difference between == and === operators?
   JavaScript provides both strict(===, !==) and type-converting(==, !=) equality comparison. The strict operators takes type of variable in consideration, while non-strict operators make type correction/conversion based upon values of variables. The strict operators follow the below conditions for different types,
1. Two strings are strictly equal when they have the same sequence of characters, same length, and same characters in corresponding positions.
1. Two numbers are strictly equal when they are numerically equal. i.e, Having the same number value.
   There are two special cases in this,
   1. NaN is not equal to anything, including NaN.
   2. Positive and negative zeros are equal to one another.
1. Two Boolean operands are strictly equal if both are true or both are false.
1. Two objects are strictly equal if they refer to the same Object.
1. Null and Undefined types are not equal with ===, but equal with ==. i.e,
   null===undefined --> false but null==undefined --> true

Some of the example which covers the above cases

```javascript
0 == false   // true
0 === false  // false
1 == "1"     // true
1 === "1"    // false
null == undefined // true
null === undefined // false
'0' == false // true
'0' === false // false
[]==[] or []===[] //false, refer different objects in memory
{}=={} or {}==={} //false, refer different objects in memory
```

**[⬆ Back to Top](#table-of-contents)**

10. ### What are lambda or arrow functions?
    An arrow function is a shorter syntax for a function expression and does not have its own **this, arguments, super, or new.target**. These function are best suited for non-method functions, and they cannot be used as constructors.

**[⬆ Back to Top](#table-of-contents)**

11. ### What is a first class function?
    In Javascript, functions are first class objects. First-class functions means when functions in that language are treated like any other variable. For example, in such a language, a function can be passed as an argument to other functions, can be returned by another function and can be assigned as a value to a variable. For example, in the below example, handler functions assigned to a listener

```javascript
const handler = () => console.log("This is a click handler function");
document.addEventListener("click", handler);
```

**[⬆ Back to Top](#table-of-contents)**

12. ### What is a first order function?
    First-order function is a function that doesn’t accept other function as an argument and doesn’t return a function as its return value.

```javascript
const firstOrder = () => console.log("I am a first order function!");
```

**[⬆ Back to Top](#table-of-contents)**

13. ### What is a higher order function?
    Higher-order function is a function that accepts other function as an argument or returns a function as a return value.

```javascript
const firstOrderFunc = () => console.log("Hello I am a First order function");
const higherOrder = (ReturnFirstOrderFunc) => ReturnFirstOrderFunc();
higherOrder(firstOrderFunc);
```

**[⬆ Back to Top](#table-of-contents)**

14. ### What is a unary function?
    Unary function (i.e. monadic) is a function that accepts exactly one argument. Let us take an example of unary function. It stands for single argument accepted by a function.

```javascript
const unaryFunction = (a) => console.log(a + 10); //Add 10 to the given argument and display the value
```

**[⬆ Back to Top](#table-of-contents)**

15. ### What is currying function?
    Currying is the process of taking a function with multiple arguments and turning it into a sequence of functions each with only a single argument. Currying is named after a mathematician Haskell Curry. By applying currying, a n-ary function turns it into a unary function. Let's take an example of n-ary function and how it turns into a currying function

```javascript
const multiArgFunction = (a, b, c) => a + b + c;
const curryUnaryFunction = (a) => (b) => (c) => a + b + c;
curryUnaryFunction(1); // returns a function: b => c =>  1 + b + c
curryUnaryFunction(1)(2); // returns a function: c => 3 + c
curryUnaryFunction(1)(2)(3); // returns the number 6
```

Curried functions are great to improve code re-usability and functional composition.

**[⬆ Back to Top](#table-of-contents)**

16. ### What is a pure function?

A **Pure function** is a function where the return value is only determined by its arguments without any side effects. i.e, If you call a function with the same arguments 'n' number of times and 'n' number of places in the application then it will always return the same value. Let's take an example to see the difference between pure and impure functions,

```javascript
//Impure
let numberArray = [];
const impureAddNumber = (number) => numberArray.push(number);
//Pure
const pureAddNumber = (number) => (argNumberArray) =>
  argNumberArray.concat([number]);

//Display the results
console.log(impureAddNumber(6)); // returns 6
console.log(numberArray); // returns [6]
console.log(pureAddNumber(7)(numberArray)); // returns [6, 7]
console.log(numberArray); // returns [6]
```

As per above code snippets, Push function is impure itself by altering the array and returning an push number index which is independent of parameter value. Whereas Concat on the other hand takes the array and concatenates it with the other array producing a whole new array without side effects. Also, the return value is a concatenation of previous array.
Remember that Pure functions are important as they simplify unit testing without any side effects and no need for dependency injection. They also avoid tight coupling and makes harder to break your application by not having any side effects. These principles are coming together with **Immutability** concept of ES6 by giving preference to **const** over **let** usage.

**[⬆ Back to Top](#table-of-contents)**

17. ### What is the purpose of let keyword?

The let statement declares a **block scope local variable**. Hence the variables defined with let keyword are limited in scope to the block, statement, or expression on which it is used. Whereas variables declared with the var keyword used to define a variable globally, or locally to an entire function regardless of block scope. Let's take an example to demonstrate the usage,

```javascript
let counter = 30;
if (counter === 30) {
  let counter = 31;
  console.log(counter); // 31
}
console.log(counter); // 30 (because if block variable won't exist here)
```

**[⬆ Back to Top](#table-of-contents)**

18. ### What is the difference between let and var?
    You can list out the differences in a tabular format

| var                                                   | let                         |
| ----------------------------------------------------- | --------------------------- |
| It is been available from the beginning of JavaScript | Introduced as part of ES6   |
| It has function scope                                 | It has block scope          |
| Variables will be hoisted                             | Hoisted but not initialized |

Let's take an example to see the difference,

```javascript
function userDetails(username) {
  if (username) {
    console.log(salary); // undefined(due to hoisting)
    console.log(age); // error: age is not defined
    let age = 30;
    var salary = 10000;
  }
  console.log(salary); //10000 (accessible to due function scope)
  console.log(age); //error: age is not defined(due to block scope)
}
```

**[⬆ Back to Top](#table-of-contents)**

19. ### What is the reason to choose the name let as keyword?
    Let is a mathematical statement that was adopted by early programming languages like Scheme and Basic. It has been borrowed from dozens of other languages that use let already as a traditional keyword as close to var as possible.

**[⬆ Back to Top](#table-of-contents)**

20. ### How do you redeclare variables in switch block without an error?

    If you try to redeclare variables in a `switch block` then it will cause errors because there is only one block. For example, the below code block throws a syntax error as below,

    ```javascript
    let counter = 1;
    switch (x) {
      case 0:
        let name;
        break;

      case 1:
        let name; // SyntaxError for redeclaration.
        break;
    }
    ```

    To avoid this error, you can create a nested block inside a case clause will create a new block scoped lexical environment.

    ```javascript
    let counter = 1;
    switch (x) {
      case 0: {
        let name;
        break;
      }
      case 1: {
        let name; // No SyntaxError for redeclaration.
        break;
      }
    }
    ```

    **[⬆ Back to Top](#table-of-contents)**

21. ### What is Temporal Dead Zone?

    The Temporal Dead Zone is a behavior in JavaScript that occurs when declaring a variable with the let and const keywords, but not with var. In ECMAScript 6, accessing a let or const variable before its declaration (within its scope) causes a ReferenceError. The time span when that happens, between the creation of a variable’s binding and its declaration, is called the temporal dead zone. Let's see this behavior with an example,

    ```javascript
    function somemethod() {
      console.log(counter1); // undefined
      console.log(counter2); // ReferenceError
      var counter1 = 1;
      let counter2 = 2;
    }
    ```

    **[⬆ Back to Top](#table-of-contents)**

22. ### What is IIFE(Immediately Invoked Function Expression)?

    IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined. The signature of it would be as below,

    ```javascript
    (function () {
      // logic here
    })();
    ```

    The primary reason to use an IIFE is to obtain data privacy because any variables declared within the IIFE cannot be accessed by the outside world. i.e, If you try to access variables with IIFE then it throws an error as below,

    ```javascript
    (function () {
      var message = "IIFE";
      console.log(message);
    })();
    console.log(message); //Error: message is not defined
    ```

    **[⬆ Back to Top](#table-of-contents)**

23. ### What is the benefit of using modules?

    There are a lot of benefits to using modules in favour of a sprawling. Some of the benefits are,

    1. Maintainablity
    2. Reusability
    3. Namespacing

    **[⬆ Back to Top](#table-of-contents)**

24. ### What is memoization?

    Memoization is a programming technique which attempts to increase a function’s performance by caching its previously computed results. Each time a memoized function is called, its parameters are used to index the cache. If the data is present, then it can be returned, without executing the entire function. Otherwise the function is executed and then the result is added to the cache.
    Let's take an example of adding function with memoization,

    ```javascript
    const memoizAddition = () => {
      let cache = {};
      return (value) => {
        if (value in cache) {
          console.log("Fetching from cache");
          return cache[value]; // Here, cache.value cannot be used as property name starts with the number which is not valid JavaScript  identifier. Hence, can only be accessed using the square bracket notation.
        } else {
          console.log("Calculating result");
          let result = value + 20;
          cache[value] = result;
          return result;
        }
      };
    };
    // returned function from memoizAddition
    const addition = memoizAddition();
    console.log(addition(20)); //output: 40 calculated
    console.log(addition(20)); //output: 40 cached
    ```

    **[⬆ Back to Top](#table-of-contents)**

25. ### What is Hoisting?

    Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. Remember that JavaScript only hoists declarations, not initialisation.
    Let's take a simple example of variable hoisting,

    ```javascript
    console.log(message); //output : undefined
    var message = "The variable Has been hoisted";
    ```

    The above code looks like as below to the interpreter,

    ```javascript
    var message;
    console.log(message);
    message = "The variable Has been hoisted";
    ```

    **[⬆ Back to Top](#table-of-contents)**

26. ### What are classes in ES6?

    In ES6, Javascript classes are primarily syntactical sugar over JavaScript’s existing prototype-based inheritance.
    For example, the prototype based inheritance written in function expression as below,

    ```javascript
    function Bike(model, color) {
      this.model = model;
      this.color = color;
    }

    Bike.prototype.getDetails = function () {
      return this.model + " bike has" + this.color + " color";
    };
    ```

    Whereas ES6 classes can be defined as an alternative

    ```javascript
    class Bike {
      constructor(color, model) {
        this.color = color;
        this.model = model;
      }

      getDetails() {
        return this.model + " bike has" + this.color + " color";
      }
    }
    ```

    **[⬆ Back to Top](#table-of-contents)**

27. ### What are closures?

    A closure is the combination of a function and the lexical environment within which that function was declared. i.e, It is an inner function that has access to the outer or enclosing function’s variables. The closure has three scope chains

    1. Own scope where variables defined between its curly brackets
    2. Outer function’s variables
    3. Global variables
       Let's take an example of closure concept,

    ```javascript
    function Welcome(name) {
      var greetingInfo = function (message) {
        console.log(message + " " + name);
      };
      return greetingInfo;
    }
    var myFunction = Welcome("John");
    myFunction("Welcome "); //Output: Welcome John
    myFunction("Hello Mr."); //output: Hello Mr.John
    ```

    As per the above code, the inner function(greetingInfo) has access to the variables in the outer function scope(Welcome) even after outer function has returned.

    **[⬆ Back to Top](#table-of-contents)**

28. ### What are modules?

    Modules refers small units of independent, reusable code and also act as foundation of many JavaScript design patterns. Most of the JavaScript modules export an object literal, a function, or a constructor

    **[⬆ Back to Top](#table-of-contents)**

29. ### Why do you need modules?

    Below are the list of benefits using modules in javascript ecosystem

    1. Maintainablity
    2. Reusability
    3. Namespacing

    **[⬆ Back to Top](#table-of-contents)**

30. ### What is scope in javascript?

    Scope is the accessibility of variables, functions, and objects in some particular part of your code during runtime. In other words, scope determines the visibility of variables and other resources in areas of your code.

    **[⬆ Back to Top](#table-of-contents)**

31. ### What is a service worker?

    A Service worker is basically a script (JavaScript file) that runs in background, separate from a web page and provide features that don't need a web page or user interaction. Some of the major features of service workers are Rich offline experiences(offline first web application development), periodic background syncs, push notifications, intercept and handle network requests and programmatically managing a cache of responses.

    **[⬆ Back to Top](#table-of-contents)**

32. ### How do you manipulate DOM using service worker?

    Service worker can't access the DOM directly. But it can communicate with the pages it controls by responding to messages sent via the `postMessage` interface, and those pages can manipulate the DOM.

    **[⬆ Back to Top](#table-of-contents)**

33. ### How do you reuse information across service worker restarts?

    The problem with service worker is that it get terminated when not in use, and restarted when it's next needed, so you cannot rely on global state within a service worker's `onfetch` and `onmessage` handlers. In this case, service workers will have access to IndexedDB API in order to persist and reuse across restarts.

    **[⬆ Back to Top](#table-of-contents)**

34. ### What is IndexedDB?

    IndexedDB is a low-level API for client-side storage of larger amounts of structured data, including files/blobs. This API uses indexes to enable high-performance searches of this data.

    **[⬆ Back to Top](#table-of-contents)**

35. ### What is web storage?

    Web storage is an API that provides a mechanism by which browsers can store key/value pairs locally within the user's browser, in a much more intuitive fashion than using cookies. The web storage provides two mechanisms for storing data on the client.

    1. **Local storage:** It stores data for current origin with no expiration date.
    2. **Session storage:** It stores data for one session and the data is lost when the browser tab is closed.

    **[⬆ Back to Top](#table-of-contents)**

36. ### What is a post message?

    Post message is a method that enables cross-origin communication between Window objects.(i.e, between a page and a pop-up that it spawned, or between a page and an iframe embedded within it). Generally, scripts on different pages are allowed to access each other if and only if the pages follow same-origin policy(i.e, pages share the same protocol, port number, and host).

    **[⬆ Back to Top](#table-of-contents)**

37. ### What is a Cookie?

    A cookie is a piece of data that is stored on your computer to be accessed by your browser. Cookies are saved as key/value pairs.
    For example, you can create a cookie named username as below,

    ```javascript
    document.cookie = "username=John";
    ```

    **[⬆ Back to Top](#table-of-contents)**

38. ### Why do you need a Cookie?

    Cookies are used to remember information about the user profile(such as username). It basically involves two steps,

    1. When a user visits a web page, user profile can be stored in a cookie.
    2. Next time the user visits the page, the cookie remembers user profile.

    **[⬆ Back to Top](#table-of-contents)**

39. ### What are the options in a cookie?

    There are few below options available for a cookie,

    1. By default, the cookie is deleted when the browser is closed but you can change this behavior by setting expiry date (in UTC time).

    ```javascript
    document.cookie = "username=John expires=Sat, 8 Jun 2019 12:00:00 UTC";
    ```

    2. By default, the cookie belongs to a current page. But you can tell the browser what path the cookie belongs to using a path parameter.

    ```javascript
    document.cookie = "username=John path=/services";
    ```

    **[⬆ Back to Top](#table-of-contents)**

40. ### How do you delete a cookie?

    You can delete a cookie by setting the expiry date as a passed date. You don't need to specify a cookie value in this case.
    For example, you can delete a username cookie in the current page as below.

    ```javascript
    document.cookie =
      "username=; expires=Fri, 07 Jun 2019 00:00:00 UTC; path=/;";
    ```

    **Note:** You should define the cookie path option to ensure that you delete the right cookie. Some browsers doesn't allow to delete a cookie unless you specify a path parameter.

    **[⬆ Back to Top](#table-of-contents)**

41. ### What are the differences between cookie, local storage and session storage?

    Below are some of the differences between cookie, local storage and session storage,

    | Feature                           | Cookie                             | Local storage    | Session storage     |
    | --------------------------------- | ---------------------------------- | ---------------- | ------------------- |
    | Accessed on client or server side | Both server-side & client-side     | client-side only | client-side only    |
    | Lifetime                          | As configured using Expires option | until deleted    | until tab is closed |
    | SSL support                       | Supported                          | Not supported    | Not supported       |
    | Maximum data size                 | 4KB                                | 5 MB             | 5MB                 |

    **[⬆ Back to Top](#table-of-contents)**

42. ### What is the main difference between localStorage and sessionStorage?

    LocalStorage is same as SessionStorage but it persists the data even when the browser is closed and reopened(i.e it has no expiration time) whereas in sessionStorage data gets cleared when the page session ends.

    **[⬆ Back to Top](#table-of-contents)**

43. ### How do you access web storage?

    The Window object implements the `WindowLocalStorage` and `WindowSessionStorage` objects which has `localStorage`(window.localStorage) and `sessionStorage`(window.sessionStorage) properties respectively. These properties create an instance of the Storage object, through which data items can be set, retrieved and removed for a specific domain and storage type (session or local).
    For example, you can read and write on local storage objects as below

    ```javascript
    localStorage.setItem("logo", document.getElementById("logo").value);
    localStorage.getItem("logo");
    ```

    **[⬆ Back to Top](#table-of-contents)**

44. ### What are the methods available on session storage?

    The session storage provided methods for reading, writing and clearing the session data

    ```javascript
    // Save data to sessionStorage
    sessionStorage.setItem("key", "value");

    // Get saved data from sessionStorage
    let data = sessionStorage.getItem("key");

    // Remove saved data from sessionStorage
    sessionStorage.removeItem("key");

    // Remove all saved data from sessionStorage
    sessionStorage.clear();
    ```

    **[⬆ Back to Top](#table-of-contents)**

45. ### What is a storage event and its event handler?

    The StorageEvent is an event that fires when a storage area has been changed in the context of another document. Whereas onstorage property is an EventHandler for processing storage events.
    The syntax would be as below

    ```javascript
    window.onstorage = functionRef;
    ```

    Let's take the example usage of onstorage event handler which logs the storage key and it's values

    ```javascript
    window.onstorage = function (e) {
      console.log(
        "The " +
          e.key +
          " key has been changed from " +
          e.oldValue +
          " to " +
          e.newValue +
          "."
      );
    };
    ```

    **[⬆ Back to Top](#table-of-contents)**

46. ### Why do you need web storage?

    Web storage is more secure, and large amounts of data can be stored locally, without affecting website performance. Also, the information is never transferred to the server. Hence this is recommended approach than Cookies.

    **[⬆ Back to Top](#table-of-contents)**

47. ### How do you check web storage browser support?

    You need to check browser support for localStorage and sessionStorage before using web storage,

    ```javascript
    if (typeof Storage !== "undefined") {
      // Code for localStorage/sessionStorage.
    } else {
      // Sorry! No Web Storage support..
    }
    ```

    **[⬆ Back to Top](#table-of-contents)**

48. ### How do you check web workers browser support?

    You need to check browser support for web workers before using it

    ```javascript
    if (typeof Worker !== "undefined") {
      // code for Web worker support.
    } else {
      // Sorry! No Web Worker support..
    }
    ```

    **[⬆ Back to Top](#table-of-contents)**

49. ### Give an example of web worker?

    You need to follow below steps to start using web workers for counting example

    1. Create a Web Worker File: You need to write a script to increment the count value. Let's name it as counter.js

    ```javascript
    let i = 0;

    function timedCount() {
      i = i + 1;
      postMessage(i);
      setTimeout("timedCount()", 500);
    }

    timedCount();
    ```

    Here postMessage() method is used to post a message back to the HTML page

    2. Create a Web Worker Object: You can create a web worker object by checking for browser support. Let's name this file as web_worker_example.js

    ```javascript
    if (typeof w == "undefined") {
      w = new Worker("counter.js");
    }
    ```

    and we can receive messages from web worker

    ```javascript
    w.onmessage = function (event) {
      document.getElementById("message").innerHTML = event.data;
    };
    ```

    3. Terminate a Web Worker:
       Web workers will continue to listen for messages (even after the external script is finished) until it is terminated. You can use terminate() method to terminate listening the messages.

    ```javascript
    w.terminate();
    ```

    4. Reuse the Web Worker: If you set the worker variable to undefined you can reuse the code

    ```javascript
    w = undefined;
    ```

    **[⬆ Back to Top](#table-of-contents)**

50. ### What are the restrictions of web workers on DOM?

    WebWorkers don't have access to below javascript objects since they are defined in an external files

    1. Window object
    2. Document object
    3. Parent object

    **[⬆ Back to Top](#table-of-contents)**

51. ### What is a promise?

    A promise is an object that may produce a single value some time in the future with either a resolved value or a reason that it’s not resolved(for example, network error). It will be in one of the 3 possible states: fulfilled, rejected, or pending.
    The syntax of promise would be as below

    ```javascript
    const promise = new Promise(function (resolve, reject) {
      // promise description
    });
    ```

    **[⬆ Back to Top](#table-of-contents)**

52. ### Why do you need a promise?

    Promises are used to handle asynchronous operations. They provide an alternative approach for callbacks by reducing the callback hell and writing the cleaner code.

    **[⬆ Back to Top](#table-of-contents)**

53. ### What are the three states of promise?

    Promises have three states:

    1. **Pending:** This is an initial state of the Promise before an operation begins
    2. **Fulfilled:** This state indicates that specified operation was completed.
    3. **Rejected:** This state indicates that the operation did not complete. In this case an error value will be thrown.

    **[⬆ Back to Top](#table-of-contents)**

54. ### What is a callback function?

    A callback function is a function passed into another function as an argument. This function is invoked inside the outer function to complete an action.
    Let's take a simple example of how to use callback function

    ```javascript
    function callbackFunction(name) {
      console.log("Hello " + name);
    }

    function outerFunction(callback) {
      let name = prompt("Please enter your name.");
      callback(name);
    }

    outerFunction(callbackFunction);
    ```

    **[⬆ Back to Top](#table-of-contents)**

55. ### Why do we need callbacks?

    The callbacks are needed because javascript is a event driven language. That means instead of waiting for a response javascript will keep executing while listening for other events.
    Let's take an example with first function invoking an API call(simulated by setTimeout) and next function which logs the message.

    ```javascript
    function firstFunction() {
      // Simulate a code delay
      setTimeout(function () {
        console.log("First function called");
      }, 1000);
    }
    function secondFunction() {
      console.log("Second function called");
    }
    firstFunction();
    secondFunction();

    Output;
    // Second function called
    // First function called
    ```

    As observed from the output, javascript didn't wait for the response of first function and remaining code block get executed. So callbacks used in a way to make sure that certain code doesn’t execute until other code finished execution.

    **[⬆ Back to Top](#table-of-contents)**

56. ### What is a callback hell?

    Callback Hell is an anti-pattern with multiple nested callbacks which makes code hard to read and debug when dealing with asynchronous logic. The callback hell looks like below,

    ```javascript
    async1(function(){
        async2(function(){
            async3(function(){
                async4(function(){
                    ....
                });
            });
        });
    });
    ```

    **[⬆ Back to Top](#table-of-contents)**

57. ### What is server-sent events?

    Server-sent events (SSE) is a server push technology enabling a browser to receive automatic updates from a server via HTTP connection without resorting to polling. These are a one way communications channel - events flow from server to client only. This is been used in Facebook/Twitter updates, stock price updates, news feeds etc.

    **[⬆ Back to Top](#table-of-contents)**

58. ### How do you receive server-sent event notifications?

    The EventSource object is used to receive server-sent event notifications. For example, you can receive messages from server as below,

    ```javascript
    if (typeof EventSource !== "undefined") {
      var source = new EventSource("sse_generator.js");
      source.onmessage = function (event) {
        document.getElementById("output").innerHTML += event.data + "<br>";
      };
    }
    ```

    **[⬆ Back to Top](#table-of-contents)**

59. ### How do you check browser support for server-sent events?

    You can perform browser support for server-sent events before using it as below,

    ```javascript
    if (typeof EventSource !== "undefined") {
      // Server-sent events supported. Let's have some code here!
    } else {
      // No server-sent events supported
    }
    ```

    **[⬆ Back to Top](#table-of-contents)**

60. ### What are the events available for server sent events?

    Below are the list of events available for server sent events
    | Event | Description |
    |---- | ---------
    | onopen | It is used when a connection to the server is opened |
    | onmessage | This event is used when a message is received |
    | onerror | It happens when an error occurs|

    **[⬆ Back to Top](#table-of-contents)**

61. ### What are the main rules of promise?

    A promise must follow a specific set of rules,

    1. A promise is an object that supplies a standard-compliant `.then()` method
    2. A pending promise may transition into either fulfilled or rejected state
    3. A fulfilled or rejected promise is settled and it must not transition into any other state.
    4. Once a promise is settled, the value must not change.

    **[⬆ Back to Top](#table-of-contents)**

62. ### What is callback in callback?

    You can nest one callback inside in another callback to execute the actions sequentially one by one. This is known as callbacks in callbacks.

    ```javascript
    loadScript("/script1.js", function (script) {
      console.log("first script is loaded");

      loadScript("/script2.js", function (script) {
        console.log("second script is loaded");

        loadScript("/script3.js", function (script) {
          console.log("third script is loaded");
          // after all scripts are loaded
        });
      });
    });
    ```

    **[⬆ Back to Top](#table-of-contents)**

63. ### What is promise chaining?

    The process of executing a sequence of asynchronous tasks one after another using promises is known as Promise chaining. Let's take an example of promise chaining for calculating the final result,

    ```javascript
    new Promise(function (resolve, reject) {
      setTimeout(() => resolve(1), 1000);
    })
      .then(function (result) {
        console.log(result); // 1
        return result * 2;
      })
      .then(function (result) {
        console.log(result); // 2
        return result * 3;
      })
      .then(function (result) {
        console.log(result); // 6
        return result * 4;
      });
    ```

    In the above handlers, the result is passed to the chain of .then() handlers with the below work flow,

    1. The initial promise resolves in 1 second,
    2. After that `.then` handler is called by logging the result(1) and then return a promise with the value of result \* 2.
    3. After that the value passed to the next `.then` handler by logging the result(2) and return a promise with result \* 3.
    4. Finally the value passed to the last `.then` handler by logging the result(6) and return a promise with result \* 4.

    **[⬆ Back to Top](#table-of-contents)**

64. ### What is promise.all?

    Promise.all is a promise that takes an array of promises as an input (an iterable), and it gets resolved when all the promises get resolved or any one of them gets rejected. For example, the syntax of promise.all method is below,

    ```javascript
    Promise.all([Promise1, Promise2, Promise3]) .then(result) => {   console.log(result) }) .catch(error => console.log(`Error in promises ${error}`))
    ```

    **Note:** Remember that the order of the promises(output the result) is maintained as per input order.

    **[⬆ Back to Top](#table-of-contents)**

65. ### What is the purpose of race method in promise?

    Promise.race() method will return the promise instance which is firstly resolved or rejected. Let's take an example of race() method where promise2 is resolved first

    ```javascript
    var promise1 = new Promise(function (resolve, reject) {
      setTimeout(resolve, 500, "one");
    });
    var promise2 = new Promise(function (resolve, reject) {
      setTimeout(resolve, 100, "two");
    });

    Promise.race([promise1, promise2]).then(function (value) {
      console.log(value); // "two" // Both promises will resolve, but promise2 is faster
    });
    ```

    **[⬆ Back to Top](#table-of-contents)**

66. ### What is a strict mode in javascript?

    Strict Mode is a new feature in ECMAScript 5 that allows you to place a program, or a function, in a “strict” operating context. This way it prevents certain actions from being taken and throws more exceptions. The literal expression `"use strict";` instructs the browser to use the javascript code in the Strict mode.

    **[⬆ Back to Top](#table-of-contents)**

67. ### Why do you need strict mode?

    Strict mode is useful to write "secure" JavaScript by notifying "bad syntax" into real errors. For example, it eliminates accidentally creating a global variable by throwing an error and also throws an error for assignment to a non-writable property, a getter-only property, a non-existing property, a non-existing variable, or a non-existing object.

    **[⬆ Back to Top](#table-of-contents)**

68. ### How do you declare strict mode?

    The strict mode is declared by adding "use strict"; to the beginning of a script or a function.
    If declare at the beginning of a script, it has global scope.

    ```javascript
    "use strict";
    x = 3.14; // This will cause an error because x is not declared
    ```

    and if you declare inside a function, it has local scope

    ```javascript
    x = 3.14; // This will not cause an error.
    myFunction();

    function myFunction() {
      "use strict";
      y = 3.14; // This will cause an error
    }
    ```

    **[⬆ Back to Top](#table-of-contents)**

69. ### What is the purpose of double exclamation?

    The double exclamation or negation(!!) ensures the resulting type is a boolean. If it was falsey (e.g. 0, null, undefined, etc.), it will be false, otherwise, true.
    For example, you can test IE version using this expression as below,

    ```javascript
    let isIE8 = false;
    isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
    console.log(isIE8); // returns true or false
    ```

    If you don't use this expression then it returns the original value.

    ```javascript
    console.log(navigator.userAgent.match(/MSIE 8.0/)); // returns either an Array or null
    ```

    **Note:** The expression !! is not an operator, but it is just twice of ! operator.

    **[⬆ Back to Top](#table-of-contents)**

70. ### What is the purpose of delete operator?

    The delete keyword is used to delete the property as well as its value.

    ```javascript
    var user = { name: "John", age: 20 };
    delete user.age;

    console.log(user); // {name: "John"}
    ```

    **[⬆ Back to Top](#table-of-contents)**

71. ### What is typeof operator?

    You can use the JavaScript typeof operator to find the type of a JavaScript variable. It returns the type of a variable or an expression.

    ```javascript
    typeof "John Abraham"; // Returns "string"
    typeof (1 + 2); // Returns "number"
    ```

    **[⬆ Back to Top](#table-of-contents)**

72. ### What is undefined property?

    The undefined property indicates that a variable has not been assigned a value, or not declared at all. The type of undefined value is undefined too.

    ```javascript
    var user; // Value is undefined, type is undefined
    console.log(typeof user); //undefined
    ```

    Any variable can be emptied by setting the value to undefined.

    ```javascript
    user = undefined;
    ```

    **[⬆ Back to Top](#table-of-contents)**

73. ### What is null value?

    The value null represents the intentional absence of any object value. It is one of JavaScript's primitive values. The type of null value is object.
    You can empty the variable by setting the value to null.

    ```javascript
    var user = null;
    console.log(typeof user); //object
    ```

    **[⬆ Back to Top](#table-of-contents)**

74. ### What is the difference between null and undefined?

    Below are the main differences between null and undefined,

    | Null                                                                                            | Undefined                                                                                               |
    | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
    | It is an assignment value which indicates that variable points to no object.                    | It is not an assignment value where a variable has been declared but has not yet been assigned a value. |
    | Type of null is object                                                                          | Type of undefined is undefined                                                                          |
    | The null value is a primitive value that represents the null, empty, or non-existent reference. | The undefined value is a primitive value used when a variable has not been assigned a value.            |
    | Indicates the absence of a value for a variable                                                 | Indicates absence of variable itself                                                                    |
    | Converted to zero (0) while performing primitive operations                                     | Converted to NaN while performing primitive operations                                                  |

    **[⬆ Back to Top](#table-of-contents)**

75. ### What is eval?

    The eval() function evaluates JavaScript code represented as a string. The string can be a JavaScript expression, variable, statement, or sequence of statements.

    ```javascript
    console.log(eval("1 + 2")); //  3
    ```

    **[⬆ Back to Top](#table-of-contents)**

76. ### What is the difference between window and document?

    Below are the main differences between window and document,

    | Window                                                                        | Document                                                                                      |
    | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
    | It is the root level element in any web page                                  | It is the direct child of the window object. This is also known as Document Object Model(DOM) |
    | By default window object is available implicitly in the page                  | You can access it via window.document or document.                                            |
    | It has methods like alert(), confirm() and properties like document, location | It provides methods like getElementById, getElementByTagName, createElement etc               |

    **[⬆ Back to Top](#table-of-contents)**

77. ### How do you access history in javascript?

    The window.history object contains the browsers history. You can load previous and next URLs in the history using back() and next() methods.

    ```javascript
    function goBack() {
      window.history.back();
    }
    function goForward() {
      window.history.forward();
    }
    ```

    **Note:** You can also access history without window prefix.

    **[⬆ Back to Top](#table-of-contents)**

78. ### What are the javascript data types?

    Below are the list of javascript data types available

    1. Number
    2. String
    3. Boolean
    4. Object
    5. Undefined

    **[⬆ Back to Top](#table-of-contents)**

79. ### What is isNaN?

    The isNaN() function is used to determine whether a value is an illegal number (Not-a-Number) or not. i.e, This function returns true if the value equates to NaN. Otherwise it returns false.

    ```javascript
    isNaN("Hello"); //true
    isNaN("100"); //false
    ```

    **[⬆ Back to Top](#table-of-contents)**

80. ### What are the differences between undeclared and undefined variables?

    Below are the major differences between undeclared and undefined variables,

    | undeclared                                                                                  | undefined                                                                              |
    | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
    | These variables do not exist in a program and are not declared                              | These variables declared in the program but have not assigned any value                |
    | If you try to read the value of an undeclared variable, then a runtime error is encountered | If you try to read the value of an undefined variable, an undefined value is returned. |

    **[⬆ Back to Top](#table-of-contents)**

81. ### What are global variables?

    Global variables are those that are available throughout the length of the code without any scope. The var keyword is used to declare a local variable but if you omit it then it will become global variable

    ```javascript
    msg = "Hello"; // var is missing, it becomes global variable
    ```

    **[⬆ Back to Top](#table-of-contents)**

82. ### What are the problems with global variables?

    The problem with global variables is the conflict of variable names of local and global scope. It is also difficult to debug and test the code that relies on global variables.

    **[⬆ Back to Top](#table-of-contents)**

83. ### What is NaN property?

    The NaN property is a global property that represents "Not-a-Number" value. i.e, It indicates that a value is not a legal number. It is very rare to use NaN in a program but it can be used as return value for few cases

    ```javascript
    Math.sqrt(-1);
    parseInt("Hello");
    ```

    **[⬆ Back to Top](#table-of-contents)**

84. ### What is the purpose of isFinite function?

    The isFinite() function is used to determine whether a number is a finite, legal number. It returns false if the value is +infinity, -infinity, or NaN (Not-a-Number), otherwise it returns true.

    ```javascript
    isFinite(Infinity); // false
    isFinite(NaN); // false
    isFinite(-Infinity); // false

    isFinite(100); // true
    ```

    **[⬆ Back to Top](#table-of-contents)**

85. ### What is an event flow?

    Event flow is the order in which event is received on the web page. When you click an element that is nested in various other elements, before your click actually reaches its destination, or target element, it must trigger the click event each of its parent elements first, starting at the top with the global window object.
    There are two ways of event flow

    1. Top to Bottom(Event Capturing)
    2. Bottom to Top (Event Bubbling)

    **[⬆ Back to Top](#table-of-contents)**

86. ### What is event bubbling?

    Event bubbling is a type of event propagation where the event first triggers on the innermost target element, and then successively triggers on the ancestors (parents) of the target element in the same nesting hierarchy till it reaches the outermost DOM element.

    **[⬆ Back to Top](#table-of-contents)**

87. ### What is event capturing?

    Event capturing is a type of event propagation where the event is first captured by the outermost element, and then successively triggers on the descendants (children) of the target element in the same nesting hierarchy till it reaches the innermost DOM element.

    **[⬆ Back to Top](#table-of-contents)**

88. ### How do you submit a form using JavaScript?

    You can submit a form using JavaScript use document.form[0].submit(). All the form input's information is submitted using onsubmit event handler

    ```javascript
    function submit() {
      document.form[0].submit();
    }
    ```

    **[⬆ Back to Top](#table-of-contents)**

89. ### How do you find operating system details?

    The window.navigator object contains information about the visitor's browser os details. Some of the OS properties are avaialble under platform property,

    ```javascript
    console.log(navigator.platform);
    ```

    **[⬆ Back to Top](#table-of-contents)**

90. ### What is the difference between document load and DOMContentLoaded events?

    The `DOMContentLoaded` event is fired when the initial HTML document has been completely loaded and parsed, without waiting for assets(stylesheets, images, and subframes) to finish loading. Whereas The load event is fired when the whole page has loaded, including all dependent resources(stylesheets, images).

    **[⬆ Back to Top](#table-of-contents)**

91. ### What is the difference between native, host and user objects?

    `Native objects` are objects that are part of the JavaScript language defined by the ECMAScript specification. For example, String, Math, RegExp, Object, Function etc core objects defined in the ECMAScript spec.
    `Host objects` are objects provided by the browser or runtime environment (Node). For example, window, XmlHttpRequest, DOM nodes etc considered as host objects.
    `User objects` are objects defined in the javascript code. For example, User object created for profile information.

    **[⬆ Back to Top](#table-of-contents)**

92. ### What are the tools or techniques used for debugging JavaScript code?

    You can use below tools or techniques for debugging javascript

    1. Chrome Devtools
    2. debugger statement
    3. Good old console.log statement

    **[⬆ Back to Top](#table-of-contents)**

93. ### What are the pros and cons of promises over callbacks?

    Below are the list of pros and cons of promises over callbacks,
    **Pros:**

    1. It avoids callback hell which is unreadable
    2. Easy to write sequential asynchronous code with .then()
    3. Easy to write parallel asynchronous code with Promise.all()
    4. Solves some of the common problems of callbacks(call the callback too late, too early, many times and swallow errors/exceptions)

    **Cons:**

    1. It makes little complex code
    2. You need to load a polyfill if ES6 is not supported

    **[⬆ Back to Top](#table-of-contents)**

94. ### What is the difference between an attribute and a property?

    Attributes are defined on the HTML markup whereas properties are defined on the DOM. For example, the below HTML element has 2 attributes type and value,

    ```javascript
    <input type="text" value="Name:">
    ```

    You can retrieve the attribute value as below,

    ```javascript
    const input = document.querySelector("input");
    console.log(input.getAttribute("value")); // Good morning
    console.log(input.value); // Good morning
    ```

    And after you change the value of the text field to "Good evening", it becomes like

    ```javascript
    console.log(input.getAttribute("value")); // Good morning
    console.log(input.value); // Good evening
    ```

    **[⬆ Back to Top](#table-of-contents)**

95. ### What is same-origin policy?

    The same-origin policy is a policy that prevents JavaScript from making requests across domain boundaries. An origin is defined as a combination of URI scheme, hostname, and port number. If you enable this policy then it prevents a malicious script on one page from obtaining access to sensitive data on another web page using Document Object Model(DOM).

    **[⬆ Back to Top](#table-of-contents)**

96. ### What is the purpose of void 0?

    Void(0) is used to prevent the page from refreshing. This will be helpful to eliminate the unwanted side-effect, because it will return the undefined primitive value. It is commonly used for HTML document that uses href="JavaScript:Void(0);" within an <a> element. i.e, when you click a link, the browser loads a new page or refreshes the same page. But this behavior will be prevented using this expression.
    For example, the below link notify the message without reloading the page

    ```javascript
    <a href="JavaScript:void(0);" onclick="alert('Well done!')">
      Click Me!
    </a>
    ```

    **[⬆ Back to Top](#table-of-contents)**

97. ### Is JavaScript a compiled or interpreted language?

    JavaScript is an interpreted language, not a compiled language. An interpreter in the browser reads over the JavaScript code, interprets each line, and runs it. Nowadays modern browsers use a technology known as Just-In-Time (JIT) compilation, which compiles JavaScript to executable bytecode just as it is about to run.

    **[⬆ Back to Top](#table-of-contents)**

98. ### Is JavaScript a case-sensitive language?

    Yes, JavaScript is a case sensitive language. The language keywords, variables, function & object names, and any other identifiers must always be typed with a consistent capitalization of letters.

    **[⬆ Back to Top](#table-of-contents)**

99. ### Is there any relation between Java and JavaScript?

    No, they are entirely two different programming languages and has nothing to do with each other. But both of them are Object Oriented Programming languages and like many other languages, they follow similar syntax for basic features(if, else, for, switch, break, continue etc).

    **[⬆ Back to Top](#table-of-contents)**

100.  ### What are events?

      Events are "things" that happen to HTML elements. When JavaScript is used in HTML pages, JavaScript can `react` on these events. Some of the examples of HTML events are,

      1.  Web page has finished loading
      2.  Input field was changed
      3.  Button was clicked

      Let's describe the behavior of click event for button element,

      ```javascript
      <!doctype html>
      <html>
       <head>
         <script>
           function greeting() {
             alert('Hello! Good morning');
           }
         </script>
       </head>
       <body>
         <button type="button" onclick="greeting()">Click me</button>
       </body>
      </html>
      ```

      **[⬆ Back to Top](#table-of-contents)**

101.  ### Who created javascript?

      JavaScript was created by Brendan Eich in 1995 during his time at Netscape Communications. Initially it was developed under the name `Mocha`, but later the language was officially called `LiveScript` when it first shipped in beta releases of Netscape.

      **[⬆ Back to Top](#table-of-contents)**

102.  ### What is the use of preventDefault method?

      The preventDefault() method cancels the event if it is cancelable, meaning that the default action or behaviour that belongs to the event will not occur. For example, prevent form submission when clicking on submit button and prevent opening the page URL when clicking on hyper link are some common usecases.

      ```javascript
      document
        .getElementById("link")
        .addEventListener("click", function (event) {
          event.preventDefault();
        });
      ```

      **Note:** Remember that not all events are cancelable.

      **[⬆ Back to Top](#table-of-contents)**

103.  ### What is the use of stopPropagation method?

      The stopPropagation method is used to stop the event from bubbling up the event chain. For example, the below nested divs with stopPropagation method prevents default event propagation when clicking on nested div(Div1)

      ```javascript
      <p>Click DIV1 Element</p>
      <div onclick="secondFunc()">DIV 2
        <div onclick="firstFunc(event)">DIV 1</div>
      </div>

      <script>
      function firstFunc(event) {
        alert("DIV 1");
        event.stopPropagation();
      }

      function secondFunc() {
        alert("DIV 2");
      }
      </script>
      ```

      **[⬆ Back to Top](#table-of-contents)**

104.  ### What are the steps involved in return false usage?

      The return false statement in event handlers performs the below steps,

      1.  First it stops the browser's default action or behaviour.
      2.  It prevents the event from propagating the DOM
      3.  Stops callback execution and returns immediately when called.

      **[⬆ Back to Top](#table-of-contents)**

105.  ### What is BOM?

      The Browser Object Model (BOM) allows JavaScript to "talk to" the browser. It consists of the objects navigator, history, screen, location and document which are children of window. The Browser Object Model is not standardized and can change based on different browsers.

      **[⬆ Back to Top](#table-of-contents)**

106.  ### What is the use of setTimeout?

      The setTimeout() method is used to call a function or evaluates an expression after a specified number of milliseconds. For example, let's log a message after 2 seconds using setTimeout method,

      ```javascript
      setTimeout(function () {
        console.log("Good morning");
      }, 2000);
      ```

      **[⬆ Back to Top](#table-of-contents)**

107.  ### What is the use of setInterval?

      The setInterval() method is used to call a function or evaluates an expression at specified intervals (in milliseconds). For example, let's log a message after 2 seconds using setInterval method,

      ```javascript
      setInterval(function () {
        console.log("Good morning");
      }, 2000);
      ```

      **[⬆ Back to Top](#table-of-contents)**

108.  ### Why is JavaScript treated as Single threaded?

      JavaScript is a single-threaded language. Because the language specification does not allow the programmer to write code so that the interpreter can run parts of it in parallel in multiple threads or processes. Whereas languages like java, go, C++ can make multi-threaded and multi-process programs.

      **[⬆ Back to Top](#table-of-contents)**

109.  ### What is an event delegation?

      Event delegation is a technique for listening to events where you delegate a parent element as the listener for all of the events that happen inside it.
      For example, if you wanted to detect field changes in inside a specific form, you can use event delegation technique,

      ```javascript
      var form = document.querySelector("#registration-form");

      // Listen for changes to fields inside the form
      form.addEventListener(
        "input",
        function (event) {
          // Log the field that was changed
          console.log(event.target);
        },
        false
      );
      ```

      **[⬆ Back to Top](#table-of-contents)**

110.  ### What is ECMAScript?

      ECMAScript is the scripting language that forms the basis of JavaScript. ECMAScript standardized by the ECMA International standards organization in the ECMA-262 and ECMA-402 specifications. The first edition of ECMAScript was released in 1997.

      **[⬆ Back to Top](#table-of-contents)**

111.  ### What is JSON?

      JSON (JavaScript Object Notation) is a lightweight format that is used for data interchanging. It is based on a subset of JavaScript language in the way objects are built in JavaScript.

      **[⬆ Back to Top](#table-of-contents)**

112.  ### What are the syntax rules of JSON?

      Below are the list of syntax rules of JSON

      1.  The data is in name/value pairs
      2.  The data is separated by commas
      3.  Curly braces hold objects
      4.  Square brackets hold arrays

      **[⬆ Back to Top](#table-of-contents)**

113.  ### What is the purpose JSON stringify?

      When sending data to a web server, the data has to be in a string format. You can achieve this by converting JSON object into a string using stringify() method.

      ```javascript
      var userJSON = { name: "John", age: 31 };
      var userString = JSON.stringify(user);
      console.log(userString); //"{"name":"John","age":31}"
      ```

      **[⬆ Back to Top](#table-of-contents)**

114.  ### How do you parse JSON string?

      When receiving the data from a web server, the data is always in a string format. But you can convert this string value to javascript object using parse() method.

      ```javascript
      var userString = '{"name":"John","age":31}';
      var userJSON = JSON.parse(userString);
      console.log(userJSON); // {name: "John", age: 31}
      ```

      **[⬆ Back to Top](#table-of-contents)**

115.  ### Why do you need JSON?

      When exchanging data between a browser and a server, the data can only be text. Since JSON is text only, it can easily be sent to and from a server, and used as a data format by any programming language.

      **[⬆ Back to Top](#table-of-contents)**

116.  ### What are PWAs?

      Progressive web applications (PWAs) are a type of mobile app delivered through the web, built using common web technologies including HTML, CSS and JavaScript. These PWAs are deployed to servers, accessible through URLs, and indexed by search engines.

      **[⬆ Back to Top](#table-of-contents)**

117.  ### What is the purpose of clearTimeout method?

      The clearTimeout() function is used in javascript to clear the timeout which has been set by setTimeout()function before that. i.e, The return value of setTimeout() function is stored in a variable and it’s passed into the clearTimeout() function to clear the timer.
      For example, the below setTimeout method is used to display the message after 3 seconds. This timeout can be cleared by clearTimeout() method.

      ```javascript
      <script>
      var msg;
      function greeting() {
         alert('Good morning');
      }
      function start() {
        msg =setTimeout(greeting, 3000);

      }

      function stop() {
          clearTimeout(msg);
      }
      </script>
      ```

      **[⬆ Back to Top](#table-of-contents)**

118.  ### What is the purpose of clearInterval method?

      The clearInterval() function is used in javascript to clear the interval which has been set by setInterval() function. i.e, The return value returned by setInterval() function is stored in a variable and it’s passed into the clearInterval() function to clear the interval.
      For example, the below setInterval method is used to display the message for every 3 seconds. This interval can be cleared by clearInterval() method.

      ```javascript
      <script>
      var msg;
      function greeting() {
         alert('Good morning');
      }
      function start() {
        msg = setInterval(greeting, 3000);

      }

      function stop() {
          clearInterval(msg);
      }
      </script>
      ```

      **[⬆ Back to Top](#table-of-contents)**

119.  ### How do you redirect new page in javascript?

      In vanilla javascript, you can redirect to a new page using `location` property of window object. The syntax would be as follows,

      ```javascript
      function redirect() {
        window.location.href = "newPage.html";
      }
      ```

      **[⬆ Back to Top](#table-of-contents)**

120.  ### How do you check whether a string contains a substring?

      There are 3 possible ways to check whether a string contains a substring or not,

      1.  **Using includes:** ES6 provided `String.prototype.includes` method to test a string contains a substring

      ```javascript
      var mainString = "hello",
        subString = "hell";
      mainString.includes(subString);
      ```

      2.  **Using indexOf:** In an ES5 or older environments, you can use `String.prototype.indexOf` which returns the index of a substring. If the index value is not equal to -1 then it means the substring exist in the main string.

      ```javascript
      var mainString = "hello",
        subString = "hell";
      mainString.indexOf(subString) !== -1;
      ```

      3.  **Using RegEx:** The advanced solution is using Regular expression's test method(`RegExp.test`), which allows for testing for against regular expressions

      ```javascript
      var mainString = "hello",
        regex = "/hell/";
      regex.test(mainString);
      ```

      **[⬆ Back to Top](#table-of-contents)**

121.  ### How do you validate an email in javascript?

      You can validate an email in javascript using regular expressions. It is recommended to do validations on the server side instead client side. Because the javascript can be disabled on the client side.

      ```javascript
      function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
      ```

      **[⬆ Back to Top](#table-of-contents)**

      The above regular expression regular accepts unicode characters.

122.  ### How do you get the current url with javascript?

      You can use `window.location.href` expression to get the current url path and you can use the same expression for updating the URL too. You can also use `document.URL` for read-only purpose but this solution has issues in FF.

      ```javascript
      console.log("location.href", window.location.href); // Returns full URL
      ```

      **[⬆ Back to Top](#table-of-contents)**

123.  ### What are the various url properties of location object?

      The below `Location` object properties can be used to access URL components of the page,

      1.  href - The entire URL
      2.  protocol - The protocol of the URL
      3.  host - The hostname and port of the URL
      4.  hostname - The hostname of the URL
      5.  port - The port number in the URL
      6.  pathname - The path name of the URL
      7.  search - The query portion of the URL
      8.  hash - The anchor portion of the URL

      **[⬆ Back to Top](#table-of-contents)**

124.  ### How do get query string values in javascript?

      You can use URLSearchParams to get query string values in javascript. Let's see an example to get the client code value from URL query string,

      ```javascript
      const urlParams = new URLSearchParams(window.location.search);
      const clientCode = urlParams.get("clientCode");
      ```

      **[⬆ Back to Top](#table-of-contents)**

125.  ### How do you check if a key exists in an object?

      You can check whether a key exists in an object or not using two approaches,

      1.  ** Using in operator:** You can use the in operator whether a key exists in an object or not

      ```javascript
      "key" in obj;
      ```

      and If you want to check if a key doesn't exist, remember to use parenthesis,

      ```javascript
      !("key" in obj);
      ```

      2.  ** Using hasOwnProperty method:** You can use `hasOwnProperty` to particularly test for properties of the object instance (and not inherited properties)

      ```javascript
      obj.hasOwnProperty("key"); // true
      ```

      **[⬆ Back to Top](#table-of-contents)**

126.  ### How do you loop through or enumerate javascript object?

      You can use the `for-in` loop to loop through javascript object. You can also make sure that the key you get is an actual property of an object, and doesn't come from the prototype using `hasOwnProperty` method.

      ```javascript
      var object = {
        k1: "value1",
        k2: "value2",
        k3: "value3",
      };

      for (var key in object) {
        if (object.hasOwnProperty(key)) {
          console.log(key + " -> " + object[key]); // k1 -> value1 ...
        }
      }
      ```

      **[⬆ Back to Top](#table-of-contents)**

127.  ### How do you test for an empty object?

      There are different solutions based on ECMAScript versions

      1.  **Using Object entries(ECMA 7+):** You can use object entries length along with constructor type.

      ```javascript
      Object.entries(obj).length === 0 && obj.constructor === Object; // Since date object length is 0, you need to check constructor check as well
      ```

      2.  **Using Object keys(ECMA 5+):** You can use object keys length along with constructor type.

      ```javascript
      Object.keys(obj).length === 0 && obj.constructor === Object; // Since date object length is 0, you need to check constructor check as well
      ```

      3.  **Using for-in with hasOwnProperty(Pre-ECMA 5):** You can use for-in loop along with hasOwnProperty.

      ```javascript
      function isEmpty(obj) {
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            return false;
          }
        }

        return JSON.stringify(obj) === JSON.stringify({});
      }
      ```

      **[⬆ Back to Top](#table-of-contents)**

128.  ### What is an arguments object?

      The arguments object is an Array-like object accessible inside functions that contains the values of the arguments passed to that function. For example, let's see how to use arguments object inside sum function,

      ```javascript
      function sum() {
        var total = 0;
        for (var i = 0, len = arguments.length; i < len; ++i) {
          total += arguments[i];
        }
        return total;
      }

      sum(1, 2, 3); // returns 6
      ```

      **[⬆ Back to Top](#table-of-contents)**

129.  ### How do you make first letter of the string in an uppercase?

      You can create a function which uses chain of string methods such as charAt, toUpperCase and slice methods to generate a string with first letter in uppercase.

      ```javascript
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      ```

      **[⬆ Back to Top](#table-of-contents)**

130.  ### What are the pros and cons of for loop?

      The for-loop is a commonly used iteration syntax in javascript. It has both pros and cons
      **Pros**

      1.  Works on every environment
      2.  You can use break and continue flow control statements
          **Cons**
      3.  Too verbose
      4.  Imperative
      5.  You might face one-by-off errors

      **[⬆ Back to Top](#table-of-contents)**

131.  ### How do you display the current date in javascript?

      You can use `new Date()` to generate a new Date object containing the current date and time. For example, let's display the current date in mm/dd/yyyy

      ```javascript
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;
      document.write(today);
      ```

      **[⬆ Back to Top](#table-of-contents)**

132.  ### How do you compare two date objects?

      You need to use use date.getTime() method to compare date values instead comparision operators (==, !=, ===, and !== operators)

      ```javascript
      var d1 = new Date();
      var d2 = new Date(d1);
      console.log(d1.getTime() === d2.getTime()); //True
      console.log(d1 === d2); // False
      ```

      **[⬆ Back to Top](#table-of-contents)**

133.  ### How do you check if a string starts with another string?

      You can use ECMAScript 6's `String.prototype.startsWith()` method to check a string starts with another string or not. But it is not yet supported in all browsers. Let's see an example to see this usage,

      ```javascript
      "Good morning".startsWith("Good"); // true
      "Good morning".startsWith("morning"); // false
      ```

      **[⬆ Back to Top](#table-of-contents)**

134.  ### How do you trim a string in javascript?

      JavaScript provided a trim method on string types to trim any whitespaces present at the begining or ending of the string.

      ```javascript
      "  Hello World   ".trim(); //Hello World
      ```

      If your browser(<IE9) doesn't support this method then you can use below polyfill.

      ```javascript
      if (!String.prototype.trim) {
        (function () {
          // Make sure we trim BOM and NBSP
          var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
          String.prototype.trim = function () {
            return this.replace(rtrim, "");
          };
        })();
      }
      ```

      **[⬆ Back to Top](#table-of-contents)**

135.  ### How do you add a key value pair in javascript?

      There are two possible solutions to add new properties to an object. Let's take a simple object to explain these solutions.

      ```javascript
      var object = {
        key1: value1,
        key2: value2,
      };
      ```

      1.  **Using dot notation:** This solution is useful when you know the name of the property

      ```javascript
      object.key3 = "value3";
      ```

      2.  **Using square bracket notation:** This solution is useful when the name of the property is dynamically determined.

      ```javascript
      obj["key3"] = "value3";
      ```

      **[⬆ Back to Top](#table-of-contents)**

136.  ### Is the !-- notation represents a special operator?

      No,that's not a special operator. But it is a combination of 2 standard operators one after the other,

      1.  A logical not (!)
      2.  A prefix decrement (--)

      At first, the value decremented by one and then tested to see if it is equal to zero or not for determining the truthy/falsy value.

      **[⬆ Back to Top](#table-of-contents)**

137.  ### How do you assign default values to variables?

      You can use the logical or operator `||` in an assignment expression to provide a default value. The syntax looks like as below,

      ```javascript
      var a = b || c;
      ```

      As per the above expression, variable 'a 'will get the value of 'c' only if 'b' is falsy (if is null, false, undefined, 0, empty string, or NaN), otherwise 'a' will get the value of 'b'.

      **[⬆ Back to Top](#table-of-contents)**

138.  ### How do you define multiline strings?

      You can define multiline string literals using '\' character followed by line terminator.

      ```javascript
      var str =
        "This is a \
      very lengthy \
      sentence!";
      ```

      But if you have a space after the '\' character, the code will look exactly the same, but it will raise a SyntaxError.

      **[⬆ Back to Top](#table-of-contents)**

139.  ### What is an app shell model?

      An application shell (or app shell) architecture is one way to build a Progressive Web App that reliably and instantly loads on your users' screens, similar to what you see in native applications. It is useful for getting some initial HTML to the screen fast without a network.

      **[⬆ Back to Top](#table-of-contents)**

140.  ### Can we define properties for functions?

      Yes, We can define properties for functions because functions are also objects.

      ```javascript
      fn = function (x) {
        //Function code goes here
      };

      fn.name = "John";

      fn.profile = function (y) {
        //Profile code goes here
      };
      ```

      **[⬆ Back to Top](#table-of-contents)**

141.  ### What is the way to find the number of parameters expected by a function?

      You can use `function.length` syntax to find the number of parameters expected by a function. Let's take an example of `sum` function to calculate the sum of numbers,

      ```javascript
      function sum(num1, num2, num3, num4) {
        return num1 + num2 + num3 + num4;
      }
      sum.length; // 4 is the number of parameters expected.
      ```

      **[⬆ Back to Top](#table-of-contents)**

142.  ### What is a polyfill?

      A polyfill is a piece of JS code used to provide modern functionality on older browsers that do not natively support it. For example, Silverlight plugin polyfill can be used to mimic the functionality of an HTML Canvas element on Microsoft Internet Explorer 7.

      **[⬆ Back to Top](#table-of-contents)**

143.  ### What are break and continue statements?

      The break statement is used to "jumps out" of a loop. i.e, It breaks the loop and continues executing the code after the loop.

      ```javascript
      for (i = 0; i < 10; i++) {
        if (i === 5) {
          break;
        }
        text += "Number: " + i + "<br>";
      }
      ```

      The continue statement is used to "jumps over" one iteration in the loop. i.e, It breaks one iteration (in the loop), if a specified condition occurs, and continues with the next iteration in the loop.

      ```javascript
      for (i = 0; i < 10; i++) {
        if (i === 5) {
          continue;
        }
        text += "Number: " + i + "<br>";
      }
      ```

      **[⬆ Back to Top](#table-of-contents)**

144.  ### What are js labels?

      The label statement allows us to name loops and blocks in JavaScript. We can then use these labels to refer back to the code later. For example, the below code with labels avoids printing the numbers when they are same,

      ```javascript
      var i, j;

      loop1: for (i = 0; i < 3; i++) {
        loop2: for (j = 0; j < 3; j++) {
          if (i === j) {
            continue loop1;
          }
          console.log("i = " + i + ", j = " + j);
        }
      }

      // Output is:
      //   "i = 1, j = 0"
      //   "i = 2, j = 0"
      //   "i = 2, j = 1"
      ```

      **[⬆ Back to Top](#table-of-contents)**

145.  ### What are the benefits of keeping declarations at the top?

      It is recommended to keep all declarations at the top of each script or function. The benefits of doing this are,

      1.  Gives cleaner code
      2.  It provides a single place to look for local variables
      3.  Easy to avoid unwanted global variables
      4.  It reduces the possibility of unwanted re-declarations

      **[⬆ Back to Top](#table-of-contents)**

146.  ### What are the benefits of initializing variables?

      It is recommended to initialize variables because of the below benefits,

      1.  It gives cleaner code
      2.  It provides a single place to initialize variables
      3.  Avoid undefined values in the code

      **[⬆ Back to Top](#table-of-contents)**

147.  ### What are the recommendations to create new object?

      It is recommended to avoid creating new objects using `new Object()`. Instead you can initialize values based on it's type to create the objects.

      1.  Assign {} instead of new Object()
      2.  Assign "" instead of new String()
      3.  Assign 0 instead of new Number()
      4.  Assign false instead of new Boolean()
      5.  Assign [] instead of new Array()
      6.  Assign /()/ instead of new RegExp()
      7.  Assign function (){} instead of new Function()

      You can define them as an example,

      ```javascript
      var v1 = {};
      var v2 = "";
      var v3 = 0;
      var v4 = false;
      var v5 = [];
      var v6 = /()/;
      var v7 = function () {};
      ```

      **[⬆ Back to Top](#table-of-contents)**

148.  ### How do you define JSON arrays?

      JSON arrays are written inside square brackets and array contain javascript objects. For example, the JSON array of users would be as below,

      ```javascript
      "users":[
        {"firstName":"John", "lastName":"Abrahm"},
        {"firstName":"Anna", "lastName":"Smith"},
        {"firstName":"Shane", "lastName":"Warn"}
      ]
      ```

      **[⬆ Back to Top](#table-of-contents)**

149.  ### How do you generate random integers?

      You can use Math.random() with Math.floor() to return random integers. For example, if you want generate random integers between 1 to 10, the multiplication factor should be 10,

      ```javascript
      Math.floor(Math.random() * 10) + 1; // returns a random integer from 1 to 10
      Math.floor(Math.random() * 100) + 1; // returns a random integer from 1 to 100
      ```

      **Note:** Math.random() returns a random number between 0 (inclusive), and 1 (exclusive)

      **[⬆ Back to Top](#table-of-contents)**

150.  ### Can you write a random integers function to print integers with in a range?

      Yes, you can create a proper random function to return a random number between min and max (both included)

      ```javascript
      function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      randomInteger(1, 100); // returns a random integer from 1 to 100
      randomInteger(1, 1000); // returns a random integer from 1 to 1000
      ```

      **[⬆ Back to Top](#table-of-contents)**

151.  ### What is tree shaking?

      Tree shaking is a form of dead code elimination. It means that unused modules will not be included in the bundle during the build process and for that it relies on the static structure of ES2015 module syntax,( i.e. import and export). Initially this has been popularized by the ES2015 module bundler `rollup`.

      **[⬆ Back to Top](#table-of-contents)**

152.  ### What is the need of tree shaking?

      Tree Shaking can significantly reduce the code size in any application. i.e, The less code we send over the wire the more performant the application will be. For example, if we just want to create a “Hello World” Application using SPA frameworks then it will take around few MBs, but by tree shaking it can bring down the size to just few hundred KBs. Tree shaking is been implemented in Rollup and Webpack bundlers.

      **[⬆ Back to Top](#table-of-contents)**

153.  ### Is it recommended to use eval?

      No, it allows arbitrary code to be run which casues a security problem. As we know that the eval() function is used to run text as code. In most of the cases, it should not be necessary to use it.

      **[⬆ Back to Top](#table-of-contents)**

154.  ### What is a Regular Expression?

      A regular expression is a sequence of characters that forms a search pattern. You can use this search pattern for searching data in a text. These can be used to perform all types of text search and text replace operations. Let's see the syntax format now,

      ```javascript
      /pattern/defiimors;
      ```

      For example, the regular expression or search pattern with case-insensitive username would be,

      ```javascript
      /John/i;
      ```

      **[⬆ Back to Top](#table-of-contents)**

155.  ### What are the string methods available in Regular expression?

      Regular Expressions has two string methods: search() and replace().
      The search() method uses an expression to search for a match, and returns the position of the match.

      ```javascript
      var msg = "Hello John";
      var n = msg.search(/John/i); // 6
      ```

      The replace() method is used return a modified string where the pattern is replaced.

      ```javascript
      var msg = "Hello John";
      var n = msg.replace(/John/i, "Buttler"); // Hello Buttler
      ```

      **[⬆ Back to Top](#table-of-contents)**

156.  ### What are modifiers in regular expression?

      Modifiers can be used to perform case-insensitive and global searches. Let's list down some of the modifiers,

      | Modifier | Description                                             |
      | -------- | ------------------------------------------------------- |
      | i        | Perform case-insensitive matching                       |
      | g        | Perform a global match rather than stops at first match |
      | m        | Perform multiline matching                              |


    Let's take an example of global modifier,
    ```javascript
      var text = "Learn JS one by one";
      var pattern = /one/g;
      var result = text.match(pattern); // one,one
    ```

**[⬆ Back to Top](#table-of-contents)**

157. ### What are regular expression patterns?

     Regular Expressions provided group of patterns in order to match characters. Basically they are categorized into 3 types,

     1. **Brackets:** These are used to find a range of characters.
        For example, below are some use cases,
        1. [abc]: Used to find any of the characters between the brackets(a,b,c)
        2. [0-9]: Used to find any of the digits between the brackets
        3. (a|b): Used to find any of the alternatives separated with |
     2. **Metacharacters:** These are characters with a special meaning
        For example, below are some use cases,
        1. \d: Used to find a digit
        2. \s: Used to find a whitespace character
        3. \b: Used to find a match at the beginning or ending of a word
     3. **Quantifiers:** These are useful to define quantities
        For example, below are some use cases,
        1. n+: Used to find matches for any string that contains at least one n
        2. n\*: Used to find matches for any string that contains zero or more occurrences of n
        3. n?: Used to find matches for any string that contains zero or one occurrences of n

     **[⬆ Back to Top](#table-of-contents)**

158. ### What is a RegExp object?

     RegExp object is a regular expression object with predefined properties and methods. Let's see the simple usage of RegExp object,

     ```javascript
     var regexp = new RegExp("\\w+");
     console.log(regexp);
     // expected output: /\w+/
     ```

     **[⬆ Back to Top](#table-of-contents)**

159. ### How do you search a string for a pattern?

     You can use test() method of regular expression in order to search a string for a pattern, and returns true or false depending on the result.

     ```javascript
     var pattern = /you/;
     console.log(pattern.test("How are you?")); //true
     ```

     **[⬆ Back to Top](#table-of-contents)**

160. ### What is the purpose of exec method?

     The purpose of exec method is similar to test method but it executes a search for a match in a specified string and returns a result array, or null instead of returning true/false.

     ```javascript
     var pattern = /you/;
     console.log(pattern.exec("How are you?")); //["you", index: 8, input: "How are you?", groups: undefined]
     ```

     **[⬆ Back to Top](#table-of-contents)**

161. ### How do you change style of a HTML element?

     You can change inline style or classname of a HTML element using javascript

     1. ** Using style property:** You can modify inline style using style property

     ```javascript
     document.getElementById("title").style.fontSize = "30px";
     ```

     2. ** Using ClassName property:** It is easy to modify element class using className property

     ```javascript
     document.getElementById("title").style.className = "custom-title";
     ```

     **[⬆ Back to Top](#table-of-contents)**

162. ### What would be the result of 1+2+'3'?

     The output is going to be `33`. Since `1` and `2` are numeric values, the result of first two digits is going to be a numeric value `3`. The next digit is a string type value because of that the addition of numeric value `3` and string type value `3` is just going to be a concatenation value `33`.

     **[⬆ Back to Top](#table-of-contents)**

163. ### What is a debugger statement?

     The debugger statement invokes any available debugging functionality, such as setting a breakpoint. If no debugging functionality is available, this statement has no effect.
     For example, in the below function a debugger statement has been inserted. So execution is paused at the debugger statement just like a breakpoint in the script source.

     ```javascript
     function getProfile() {
       // code goes here
       debugger;
       // code goes here
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

164. ### What is the purpose of breakpoints in debugging?

     You can set breakpoints in the javascript code once the debugger statement is executed and debugger window pops up. At each breakpoint, javascript will stop executing, and let you examine the JavaScript values. After examining values, you can resume the execution of code using play button.

     **[⬆ Back to Top](#table-of-contents)**

165. ### Can I use reserved words as identifiers?

     No, you cannot use the reserved words as variables, labels, object or function names. Let's see one simple example,

     ```javascript
     var else = "hello"; // Uncaught SyntaxError: Unexpected token else
     ```

     **[⬆ Back to Top](#table-of-contents)**

166. ### How do you detect a mobile browser?

     You can use regex which returns a true or false value depending on whether or not the user is browsing with a mobile.

     ```javascript
     window.mobilecheck = function () {
       var mobileCheck = false;
       (function (a) {
         if (
           /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
             a
           ) ||
           /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
             a.substr(0, 4)
           )
         )
           mobileCheck = true;
       })(navigator.userAgent || navigator.vendor || window.opera);
       return mobileCheck;
     };
     ```

     **[⬆ Back to Top](#table-of-contents)**

167. ### How do you detect a mobile browser without regexp?

     You can detect mobile browser by simply running through a list of devices and checking if the useragent matches anything. This is an alternative solution for RegExp usage,

     ```javascript
     function detectmob() {
       if (
         navigator.userAgent.match(/Android/i) ||
         navigator.userAgent.match(/webOS/i) ||
         navigator.userAgent.match(/iPhone/i) ||
         navigator.userAgent.match(/iPad/i) ||
         navigator.userAgent.match(/iPod/i) ||
         navigator.userAgent.match(/BlackBerry/i) ||
         navigator.userAgent.match(/Windows Phone/i)
       ) {
         return true;
       } else {
         return false;
       }
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

168. ### How do you get the image width and height using JS?

     You can programmatically get the image and check the dimensions(width and height) using Javascript.

     ```javascript
     var img = new Image();
     img.onload = function () {
       console.log(this.width + "x" + this.height);
     };
     img.src = "http://www.google.com/intl/en_ALL/images/logo.gif";
     ```

     **[⬆ Back to Top](#table-of-contents)**

169. ### How do you make synchronous HTTP request?

     Browsers provide an XMLHttpRequest object which can be used to make synchronous HTTP requests from JavaScript

     ```javascript
     function httpGet(theUrl) {
       var xmlHttpReq = new XMLHttpRequest();
       xmlHttpReq.open("GET", theUrl, false); // false for synchronous request
       xmlHttpReq.send(null);
       return xmlHttpReq.responseText;
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

170. ### How do you make asynchronous HTTP request?

     Browsers provide an XMLHttpRequest object which can be used to make asynchronous HTTP requests from JavaScript by passing 3rd parameter as true.

     ```javascript
     function httpGetAsync(theUrl, callback) {
       var xmlHttpReq = new XMLHttpRequest();
       xmlHttpReq.onreadystatechange = function () {
         if (xmlHttpReq.readyState == 4 && xmlHttpReq.status == 200)
           callback(xmlHttpReq.responseText);
       };
       xmlHttp.open("GET", theUrl, true); // true for asynchronous
       xmlHttp.send(null);
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

171. ### How do you convert date to another timezone in javascript?

     You can use toLocaleString() method to convert date in one timezone to another. For example, let's convert current date to British English timezone as below,

     ```javascript
     console.log(event.toLocaleString("en-GB", { timeZone: "UTC" })); //29/06/2019, 09:56:00
     ```

     **[⬆ Back to Top](#table-of-contents)**

172. ### What are the properties used to get size of window?

     You can use innerWidth, innerHeight, clientWidth, clientHeight properties of windows, document element and document body objects to find the size of a window. Let's use them combination of these properties to calculate the size of a window or document,

     ```javascript
     var width =
       window.innerWidth ||
       document.documentElement.clientWidth ||
       document.body.clientWidth;

     var height =
       window.innerHeight ||
       document.documentElement.clientHeight ||
       document.body.clientHeight;
     ```

     **[⬆ Back to Top](#table-of-contents)**

173. ### What is a conditional operator in javascript?

     The conditional (ternary) operator is the only JavaScript operator that takes three operands which acts as a shortcut for if statement.

     ```javascript
     var isAuthenticated = false;
     console.log(
       isAuthenticated ? "Hello, welcome" : "Sorry, you are not authenticated"
     ); //Sorry, you are not authenticated
     ```

     **[⬆ Back to Top](#table-of-contents)**

174. ### Can you apply chaining on conditional operator?

     Yes, you can apply chaining on conditional operator similar to if … else if … else if … else chain. The syntax is going to be as below,

     ```javascript
     function traceValue(someParam) {
       return condition1
         ? value1
         : condition2
         ? value2
         : condition3
         ? value3
         : value4;
     }

     // The above conditional operator is equivalent to:

     function traceValue(someParam) {
       if (condition1) {
         return value1;
       } else if (condition2) {
         return value2;
       } else if (condition3) {
         return value3;
       } else {
         return value4;
       }
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

175. ### What are the ways to execute javascript after page load?

     You can execute javascript after page load in many different ways,

     1. ** window.onload:**

     ```javascript
     window.onload = function ...
     ```

     2. **document.onload:**

     ```javascript
     document.onload = function ...
     ```

     3. ** body onload:**

     ```javascript
     <body onload="script();">
     ```

     **[⬆ Back to Top](#table-of-contents)**

176. ### What is the difference between proto and prototype?

     The `__proto__` object is the actual object that is used in the lookup chain to resolve methods, etc. Whereas `prototype` is the object that is used to build `__proto__` when you create an object with new

     ```javascript
     new Employee().__proto__ === Employee.prototype;
     new Employee().prototype === undefined;
     ```

     **[⬆ Back to Top](#table-of-contents)**

177. ### Give an example where do you really need semicolon?

     It is recommended to use semicolons after every statement in JavaScript. For example, in the below case it throws an error ".. is not a function" at runtime due to missing semicolon.

     ```javascript
     // define a function
     var fn = (function () {
       //...
     })(
       // semicolon missing at this line

       // then execute some code inside a closure
       function () {
         //...
       }
     )();
     ```

     and it will be interpreted as

     ```javascript
     var fn = (function () {
       //...
     })(function () {
       //...
     })();
     ```

     In this case, we are passing second function as an argument to the first function and then trying to call the result of the first function call as a function. Hence, the second function will fail with a "... is not a function" error at runtime.

     **[⬆ Back to Top](#table-of-contents)**

178. ### What is a freeze method?

     The freeze() method is used to freeze an object. Freezing an object does'nt allow adding new properties to an object,prevents from removing and prevents changing the enumerability, configurability, or writability of existing properties. i.e, It returns the passed object and does not create a frozen copy.

     ```javascript
     const obj = {
       prop: 100,
     };

     Object.freeze(obj);
     obj.prop = 200; // Throws an error in strict mode

     console.log(obj.prop); //100
     ```

     **Note:** It causes a TypeError if the argument passed is not an object.

     **[⬆ Back to Top](#table-of-contents)**

179. ### What is the purpose of freeze method?

     Below are the main benefits of using freeze method,

     1. It is used for freezing objects and arrays.
     2. It is used to make an object immutable.

     **[⬆ Back to Top](#table-of-contents)**

180. ### Why do I need to use freeze method?

     In Object-oriented paradigm, an existing API contains certain elements that are not intended to be extended, modified, or re-used outside of their current context. Hence it works as `final` keyword which is used in various languages.

     **[⬆ Back to Top](#table-of-contents)**

181. ### How do you detect a browser language preference?

     You can use navigator object to detect a browser language preference as below,

     ```javascript
     var language =
       (navigator.languages && navigator.languages[0]) || // Chrome / Firefox
       navigator.language || // All browsers
       navigator.userLanguage; // IE <= 10

     console.log(language);
     ```

     **[⬆ Back to Top](#table-of-contents)**

182. ### How to convert string to title case with javascript?

     Title case means that the first letter of each word is capitalized. You can convert a string to title case using the below function,

     ```javascript
     function toTitleCase(str) {
       return str.replace(/\w\S*/g, function (txt) {
         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
       });
     }
     toTitleCase("good morning john"); // Good Morning John
     ```

     **[⬆ Back to Top](#table-of-contents)**

183. ### How do you detect javascript disabled in the page?

     You can use `<noscript>` tag to detect javascript disabled or not. The code block inside `<noscript>` get executed when JavaScript is disabled, and are typically used to display alternative content when the page generated in JavaScript.

     ```javascript
     <script type="javascript">
         // JS related code goes here
     </script>
     <noscript>
         <a href="next_page.html?noJS=true">JavaScript is disabled in the apge. Please click Next Page</a>
     </noscript>
     ```

     **[⬆ Back to Top](#table-of-contents)**

184. ### What are various operators supported by javascript?

     An operator is capable of manipulating(mathematical and logical computations) a certain value or operand. There are various operators supported by JavaScript as below,

     1. **Arithmetic Operators:** Includes + (Addition),– (Subtraction), \* (Multiplication), / (Division), % (Modulus), + + (Increment) and – – (Decrement)
     2. **Comparison Operators:** Includes = =(Equal),!= (Not Equal), ===(Equal with type), > (Greater than),> = (Greater than or Equal to),< (Less than),<= (Less than or Equal to)
     3. **Logical Operators:** Includes &&(Logical AND),||(Logical OR),!(Logical NOT)
     4. **Assignment Operators:** Includes = (Assignment Operator), += (Add and Assignment Operator), – = (Subtract and Assignment Operator), \*= (Multiply and Assignment), /= (Divide and Assignment), %= (Modules and Assignment)
     5. **Ternary Operators:** It includes conditional(: ?) Operator
     6. **typeof Operator:** It uses to find type of variable. The syntax looks like `typeof variable`

     **[⬆ Back to Top](#table-of-contents)**

185. ### What is a rest parameter?

     Rest parameter is an improved way to handle function parameter which allows us to represent an indefinite number of arguments as an array. The syntax would be as below,

     ```javascript
     function f(a, b, ...theArgs) {
       // ...
     }
     ```

     For example, let's take a sum example to calculate on dynamic number of parameters,

     ```javascript
     function total(…args){
     let sum = 0;
     for(let i of args){
     sum+=i;
     }
     return sum;
     }
     console.log(fun(1,2)); //3
     console.log(fun(1,2,3)); //6
     console.log(fun(1,2,3,4)); //13
     console.log(fun(1,2,3,4,5)); //15
     ```

     **Note:** Rest parameter is added in ES2015 or ES6

     **[⬆ Back to Top](#table-of-contents)**

186. ### What happens if you do not use rest parameter as a last argument?

     The rest parameter should be the last argument, as its job is to collect all the remaining arguments into an array. For example, if you define a function like below it doesn’t make any sense and will throw an error.

     ```javascript
     function someFunc(a,…b,c){
     //You code goes here
     return;
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

187. ### What are the bitwise operators available in javascript?

     Below are the list of bit-wise logical operators used in JavaScript

     1. Bit-wise AND ( & )
     2. Bit-Wise OR ( | )
     3. Bit-Wise XOR ( ^ )
     4. Bit-Wise NOT ( ~ )
     5. Left Shift ( << )
     6. Sign Propagating Right Shift ( >> )
     7. Zero fill Right Shift ( >>> )

     **[⬆ Back to Top](#table-of-contents)**

188. ### What is a spread operator?

     Spread operator allows iterables( arrays / objects / strings ) to be expanded into single arguments/elements. Let's take an example to see this behavior,

     ```javascript
     function calculateSum(x, y, z) {
       return x + y + z;
     }

     const numbers = [1, 2, 3];

     console.log(calculateSum(...numbers)); // 6
     ```

     **[⬆ Back to Top](#table-of-contents)**

189. ### How do you determine whether object is frozen or not?

     Object.isFrozen() method is used to determine if an object is frozen or not.An object is frozen if all of the below conditions hold true,

     1. If it is not extensible.
     2. If all of its properties are non-configurable.
     3. If all its data properties are non-writable.
        The usage is going to be as follows,

     ```javascript
     const object = {
       property: "Welcome JS world",
     };
     Object.freeze(object);
     console.log(Object.isFrozen(object));
     ```

     **[⬆ Back to Top](#table-of-contents)**

190. ### How do you determine two values same or not using object?

     The Object.is() method determines whether two values are the same value. For example, the usage with different types of values would be,

     ```javascript
     Object.is("hello", "hello"); // true
     Object.is(window, window); // true
     Object.is([], []); // false
     ```

     Two values are the same if one of the following holds:

     1. both undefined
     2. both null
     3. both true or both false
     4. both strings of the same length with the same characters in the same order
     5. both the same object (means both object have same reference)
     6. both numbers and
        both +0
        both -0
        both NaN
        both non-zero and both not NaN and both have the same value.

     **[⬆ Back to Top](#table-of-contents)**

191. ### What is the purpose of using object is method?

     Some of the applications of Object's `is` method are follows,

     1. It is used for comparison of two strings.
     2. It is used for comparison of two numbers.
     3. It is used for comparing the polarity of two numbers.
     4. It is used for comparison of two objects.

     **[⬆ Back to Top](#table-of-contents)**

192. ### How do you copy properties from one object to other?

     You can use Object.assign() method which is used to copy the values and properties from one or more source objects to a target object. It returns the target object which has properties and values copied from the target object. The syntax would be as below,

     ```javascript
     Object.assign(target, ...sources);
     ```

     Let's take exampple with one source and one target object,

     ```javascript
     const target = { a: 1, b: 2 };
     const source = { b: 3, c: 4 };

     const returnedTarget = Object.assign(target, source);

     console.log(target); // { a: 1, b: 3, c: 4 }

     console.log(returnedTarget); // { a: 1, b: 3, c: 4 }
     ```

     As observed in the above code, there is a common property(`b`) from source to target so it's value is been overwritten.

     **[⬆ Back to Top](#table-of-contents)**

193. ### What are the applications of assign method?

     Below are the some of main applications of Object.assign() method,

     1. It is used for cloning an object.
     2. It is used to merge object with same properties.

     **[⬆ Back to Top](#table-of-contents)**

194. ### What is a proxy object?

     The Proxy object is used to define custom behavior for fundamental operations such as property lookup, assignment, enumeration, function invocation, etc. The syntax would be as follows,

     ```javascript
     var p = new Proxy(target, handler);
     ```

     Let's take an example of proxy object,

     ```javascript
     var handler = {
       get: function (obj, prop) {
         return prop in obj ? obj[prop] : 100;
       },
     };

     var p = new Proxy({}, handler);
     p.a = 10;
     p.b = null;

     console.log(p.a, p.b); // 1, null
     console.log("c" in p, p.c); // false, 100
     ```

     In the above code, it uses `get` handler which define the behavior of the proxy when an operation is performed on it

     **[⬆ Back to Top](#table-of-contents)**

195. ### What is the purpose of seal method?

     The Object.seal() method is used seal an object, by preventing new properties from being added to it and marking all existing properties as non-configurable. But values of present properties can still be changed as long as they are writable. Let's see the below example to understand more about seal() method

     ```javascript
     const object = {
       property: "Welcome JS world",
     };
     Object.seal(object);
     object.property = "Welcome to object world";
     console.log(Object.isSealed(object)); // true
     delete object.property; // You cannot delete when sealed
     console.log(object.property); //Welcome to object world
     ```

     **[⬆ Back to Top](#table-of-contents)**

196. ### What are the applications of seal method?

     Below are the main applications of Object.seal() method,

     1. It is used for sealing objects and arrays.
     2. It is used to make an object immutable.

     **[⬆ Back to Top](#table-of-contents)**

197. ### What are the differences between freeze and seal methods?

     If an object is frozen using the Object.freeze() method then its properties become immutable and no changes can be made in them whereas if an object is sealed using the Object.seal() method then the changes can be made in the existing properties of the object.

     **[⬆ Back to Top](#table-of-contents)**

198. ### How do you determine if an object is sealed or not?

     The Object.isSealed() method is used to determine if an object is sealed or not. An object is sealed if all of the below conditions hold true

     1. If it is not extensible.
     2. If all of its properties are non-configurable.
     3. If it is not removable (but not necessarily non-writable).
        Let's see it in the action

     ```javascript
     const object = {
       property: "Hello, Good morning",
     };

     Object.seal(object); // Using seal() method to seal the object

     console.log(Object.isSealed(object)); // checking whether the object is sealed or not
     ```

     **[⬆ Back to Top](#table-of-contents)**

199. ### How do you get enumerable key and value pairs?

     The Object.entries() method is used to return an array of a given object's own enumerable string-keyed property [key, value] pairs, in the same order as that provided by a for...in loop. Let's see the functionality of object.entries() method in an example,

     ```javascript
     const object = {
       a: "Good morning",
       b: 100,
     };

     for (let [key, value] of Object.entries(object)) {
       console.log(`${key}: ${value}`); // a: 'Good morning'
       // b: 100
     }
     ```

     **Note:** The order is not guaranteed as object defined.

     **[⬆ Back to Top](#table-of-contents)**

200. ### What is the main difference between Object.values and Object.entries method?

     The Object.values() method's behavior is similar to Object.entries() method but it returns an array of values instead [key,value] pairs.

     ```javascript
     const object = {
       a: "Good morning",
       b: 100,
     };

     for (let value of Object.values(object)) {
       console.log(`${value}`); // 'Good morning'
       100;
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

201. ### How can you get the list of keys of any object?

     You can use `Object.keys()` method which is used return an array of a given object's own property names, in the same order as we get with a normal loop. For example, you can get the keys of a user object,

     ```javascript
     const user = {
       name: "John",
       gender: "male",
       age: 40,
     };

     console.log(Object.keys(user)); //['name', 'gender', 'age']
     ```

     **[⬆ Back to Top](#table-of-contents)**

202. ### How do you create an object with prototype?

     The Object.create() method is used to create a new object with the specified prototype object and properties. i.e, It uses existing object as the prototype of the newly created object. It returns a new object with the specified prototype object and properties.

     ```javascript
     const user = {
       name: "John",
       printInfo: function () {
         console.log(`My name is ${this.name}.`);
       },
     };

     const admin = Object.create(user);

     admin.name = "Nick"; // Remember that "name" is a property set on "admin" but not on "user" object

     admin.printInfo(); // My name is Nick
     ```

     **[⬆ Back to Top](#table-of-contents)**

203. ### What is a WeakSet?

     WeakSet is used to store a collection of weakly(weak references) held objects. The syntax would be as follows,

     ```javascript
     new WeakSet([iterable]);
     ```

     Let's see the below example to explain it's behavior,

     ```javascript
     var ws = new WeakSet();
     var user = {};
     ws.add(user);
     ws.has(user); // true
     ws.delete(user); // removes user from the set
     ws.has(user); // false, user has been removed
     ```

     **[⬆ Back to Top](#table-of-contents)**

204. ### What are the differences between WeakSet and Set?

     The main difference is that references to objects in Set are strong while references to objects in WeakSet are weak. i.e, An object in WeakSet can be garbage collected if there is no other reference to it.
     Other differences are,

     1. Sets can store any value Whereas WeakSets can store only collections of objects
     2. WeakSet does not have size property unlike Set
     3. WeakSet does not have methods such as clear, keys, values, entries, forEach.
     4. WeakSet is not iterable.

     **[⬆ Back to Top](#table-of-contents)**

205. ### List down the collection of methods available on WeakSet?

     Below are the list of methods available on WeakSet,

     1. add(value): A new object is appended with the given value to the weakset
     2. delete(value): Deletes the value from the WeakSet collection.
     3. has(value): It returns true if the value is present in the WeakSet Collection, otherwise it returns false.
     4. length(): It returns the length of weakSetObject
        Let's see the functionality of all the above methods in an example,

     ```javascript
     var weakSetObject = new WeakSet();
     var firstObject = {};
     var secondObject = {};
     // add(value)
     weakSetObject.add(firstObject);
     weakSetObject.add(secondObject);
     console.log(weakSetObject.has(firstObject)); //true
     console.log(weakSetObject.length()); //2
     weakSetObject.delete(secondObject);
     ```

     **[⬆ Back to Top](#table-of-contents)**

206. ### What is a WeakMap?

     The WeakMap object is a collection of key/value pairs in which the keys are weakly referenced. In this case, keys must be objects and the values can be arbitrary values. The syntax is looking like as below,

     ```javascript
     new WeakMap([iterable]);
     ```

     Let's see the below example to explain it's behavior,

     ```javascript
     var ws = new WeakMap();
     var user = {};
     ws.set(user);
     ws.has(user); // true
     ws.delete(user); // removes user from the map
     ws.has(user); // false, user has been removed
     ```

     **[⬆ Back to Top](#table-of-contents)**

207. ### What are the differences between WeakMap and Map?

     The main difference is that references to key objects in Map are strong while references to key objects in WeakMap are weak. i.e, A key object in WeakMap can be garbage collected if there is no other reference to it.
     Other differences are,

     1. Maps can store any key type Whereas WeakMaps can store only collections of key objects
     2. WeakMap does not have size property unlike Map
     3. WeakMap does not have methods such as clear, keys, values, entries, forEach.
     4. WeakMap is not iterable.

     **[⬆ Back to Top](#table-of-contents)**

208. ### List down the collection of methods available on WeakMap?

     Below are the list of methods available on WeakMap,

     1. set(key, value): Sets the value for the key in the WeakMap object. Returns the WeakMap object.
     2. delete(key): Removes any value associated to the key.
     3. has(key): Returns a Boolean asserting whether a value has been associated to the key in the WeakMap object or not.
     4. get(key): Returns the value associated to the key, or undefined if there is none.
        Let's see the functionality of all the above methods in an example,

     ```javascript
     var weakMapObject = new WeakMap();
     var firstObject = {};
     var secondObject = {};
     // set(key, value)
     weakMapObject.set(firstObject, "John");
     weakMapObject.set(secondObject, 100);
     console.log(weakMapObject.has(firstObject)); //true
     console.log(weakMapObject.get(firstObject)); // John
     weakMapObject.delete(secondObject);
     ```

     **[⬆ Back to Top](#table-of-contents)**

209. ### What is the purpose of uneval?

     The uneval() is an inbuilt function which is used to create a string representation of the source code of an Object. It is a top-level function and is not associated with any object. Let's see the below example to know more about it's functionality,

     ```javascript
     var a = 1;
     uneval(a); // returns a String containing 1
     uneval(function user() {}); // returns "(function user(){})"
     ```

     **[⬆ Back to Top](#table-of-contents)**

210. ### How do you encode an URL?

     The encodeURI() function is used to encode complete URI which has special characters except (, / ? : @ & = + \$ #) characters.

     ```javascript
     var uri = "https://mozilla.org/?x=шеллы";
     var encoded = encodeURI(uri);
     console.log(encoded); // https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B
     ```

     **[⬆ Back to Top](#table-of-contents)**

211. ### How do you decode an URL?

     The decodeURI() function is used to decode a Uniform Resource Identifier (URI) previously created by encodeURI().

     ```javascript
     var uri = "https://mozilla.org/?x=шеллы";
     var encoded = encodeURI(uri);
     console.log(encoded); // https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B
     try {
       console.log(decodeURI(encoded)); // "https://mozilla.org/?x=шеллы"
     } catch (e) {
       // catches a malformed URI
       console.error(e);
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

212. ### How do you print the contents of web page?

     The window object provided print() method which is used to prints the contents of the current window. It opens Print dialog box which lets you choose between various printing options. Let's see the usage of print method in an example,

     ```html
     <input type="button" value="Print" onclick="window.print()" />
     ```

     **Note:** In most browsers, it will block while the print dialog is open.

     **[⬆ Back to Top](#table-of-contents)**

213. ### What is the difference between uneval and eval?

     The `uneval` function returns the source of a given object; whereas the `eval` function does the opposite, by evaluating that source code in a different memory area. Let's see an example to clarify the difference,

     ```javascript
     var msg = uneval(function greeting() {
       return "Hello, Good morning";
     });
     var greeting = eval(msg);
     greeting(); // returns "Hello, Good morning"
     ```

     **[⬆ Back to Top](#table-of-contents)**

214. ### What is an anonymous function?

     An anonymous function is a function without a name! Anonymous functions are commonly assigned to a variable name or used as a callback function. The syntax would be as below,

     ```javascript
     function (optionalParameters) {
       //do something
     }

     const myFunction = function(){ //Anonymous function assigned to a variable
       //do something
     };

     [1, 2, 3].map(function(element){ //Anonymous function used as a callback function
       //do something
     });
     ```

     Let's see the above anonymous function in an example,

     ```javascript
     var x = function (a, b) {
       return a * b;
     };
     var z = x(5, 10);
     console.log(z); // 50
     ```

     **[⬆ Back to Top](#table-of-contents)**

215. ### What is the precedence order between local and global variables?

     A local variable takes precedence over a global variable with the same name. Let's see this behavior in an example.

     ```javascript
     var msg = "Good morning";
     function greeting() {
       msg = "Good Evening";
       console.log(msg);
     }
     greeting();
     ```

     **[⬆ Back to Top](#table-of-contents)**

216. ### What are javascript accessors?

     ECMAScript 5 introduced javascript object accessors or computed properties through getters and setters. Getters uses `get` keyword whereas Setters uses `set` keyword.

     ```javascript
     var user = {
       firstName: "John",
       lastName : "Abraham",
       language : "en",
       get lang() {
         return this.language;
       }
       set lang(lang) {
       this.language = lang;
       }
     };
     console.log(user.lang); // getter access lang as en
     user.lang = 'fr';
     console.log(user.lang); // setter used to set lang as fr
     ```

     **[⬆ Back to Top](#table-of-contents)**

217. ### How do you define property on Object constructor?

     The Object.defineProperty() static method is used to define a new property directly on an object, or modifies an existing property on an object, and returns the object. Let's see an example to know how to define property,

     ```javascript
     const newObject = {};

     Object.defineProperty(newObject, "newProperty", {
       value: 100,
       writable: false,
     });

     console.log(newObject.newProperty); // 100

     newObject.newProperty = 200; // It throws an error in strict mode due to writable setting
     ```

     **[⬆ Back to Top](#table-of-contents)**

218. ### What is the difference between get and defineProperty?

     Both has similar results until unless you use classes. If you use `get` the property will be defined on the prototype of the object whereas using `Object.defineProperty()` the property will be defined on the instance it is applied to.

     **[⬆ Back to Top](#table-of-contents)**

219. ### What are the advantages of Getters and Setters?

     Below are the list of benefits of Getters and Setters,

     1. They provide simpler syntax
     2. They are used for defining computed properties, or accessors in JS.
     3. Useful to provide equivalence relation between properties and methods
     4. They can provide better data quality
     5. Useful for doing things behind the scenes with the encapsulated logic.

     **[⬆ Back to Top](#table-of-contents)**

220. ### Can I add getters and setters using defineProperty method?

     Yes, You can use `Object.defineProperty()` method to add Getters and Setters. For example, the below counter object uses increment, decrement, add and substract properties,

     ```javascript
     var counterObj = { counter: 0 };

     // Define getters
     Object.defineProperty(obj, "increment", {
       get: function () {
         this.counter++;
       },
     });
     Object.defineProperty(obj, "decrement", {
       get: function () {
         this.counter--;
       },
     });

     // Define setters
     Object.defineProperty(obj, "add", {
       set: function (value) {
         this.counter += value;
       },
     });
     Object.defineProperty(obj, "subtract", {
       set: function (value) {
         this.counter -= value;
       },
     });

     obj.add = 10;
     obj.subtract = 5;
     console.log(obj.increment); //6
     console.log(obj.decrement); //5
     ```

     **[⬆ Back to Top](#table-of-contents)**

221. ### What is the purpose of switch-case?

     The switch case statement in JavaScript is used for decision making purposes. In few cases, using the switch case statement is going to be more convenient than if-else statements. The syntax would be as below,

     ```javascript
     switch (expression)
     {
         case value1:
             statement1;
             break;
         case value2:
             statement2;
             break;
         .
         .
         case valueN:
             statementN;
             break;
         default:
             statementDefault;
     }
     ```

     The above multi-way branch statement provides an easy way to dispatch execution to different parts of code based on the value of the expression.

     **[⬆ Back to Top](#table-of-contents)**

222. ### What are the conventions to be followed for the usage of switch case?

     Below are the list of conventions should be taken care,

     1. The expression can be of type either number or string.
     2. Duplicate values are not allowed for the expression.
     3. The default statement is optional. If the expression passed to switch does not matches with any case value then the statement within default case will be executed.
     4. The break statement is used inside the switch to terminate a statement sequence.
     5. The break statement is optional. But if it omitted, the execution will continue on into the next case.

     **[⬆ Back to Top](#table-of-contents)**

223. ### What are primitive data types?

     A primitive data type is data that has a primitive value (which has no properties or methods). There are 5 types of primitive data types.

     1. string
     2. number
     3. boolean
     4. null
     5. undefined

     **[⬆ Back to Top](#table-of-contents)**

224. ### What are the different ways to access object properties?

     There are 3 possible ways for accessing the property of an object.

     1. **Dot notation:** It uses dot for accessing the properties

     ```javascript
     objectName.property;
     ```

     2. **Square brackets notation:** It uses square brackets for property access

     ```javascript
     objectName["property"];
     ```

     3. **Expression notation:** It uses expression in the square brackets

     ```javascript
     objectName[expression];
     ```

     **[⬆ Back to Top](#table-of-contents)**

225. ### What are the function parameter rules?

     JavaScript functions follow below rules for parameters,

     1. The function definitions do not specify data types for parameters.
     2. Do not perform type checking on the passed arguments.
     3. Do not check the number of arguments received.
        i.e, The below function follows the above rules,

     ```javascript
     function functionName(parameter1, parameter2, parameter3) {
       console.log(parameter1); // 1
     }
     functionName(1);
     ```

     **[⬆ Back to Top](#table-of-contents)**

226. ### What is an error object?

     An error object is a built in error object that provides error information when an error occurs. It has two properties: name and message. For example, the below function logs error details,

     ```javascript
     try {
       greeting("Welcome");
     } catch (err) {
       console.log(err.name + "<br>" + err.message);
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

227. ### When you get a syntax error?

     A SyntaxError is thrown if you try to evaluate code with a syntax error. For example, the below missing quote for the function parameter throws a syntax error

     ```javascript
     try {
       eval("greeting('welcome)"); // Missing ' will produce an error
     } catch (err) {
       console.log(err.name);
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

228. ### What are the different error names from error object?

     There are 6 different types of error names returned from error object,
     | Error Name | Description |
     |---- | ---------
     | EvalError | An error has occurred in the eval() function |
     | RangeError | An error has occurred with a number "out of range" |
     | ReferenceError | An error due to an illegal reference|
     | SyntaxError | An error due to a syntax error|
     | TypeError | An error due to a type error |
     | URIError | An error due to encodeURI() |

     **[⬆ Back to Top](#table-of-contents)**

229. ### What are the various statements in error handling?

     Below are the list of statements used in an error handling,

     1. **try:** This statement is used to test a block of code for errors
     2. **catch:** This statement is used to handle the error
     3. **throw:** This statement is used to create custom errors.
     4. **finally:** This statement is used to execute code after try and catch regardless of the result.

     **[⬆ Back to Top](#table-of-contents)**

230. ### What are the two types of loops in javascript?

     1. **Entry Controlled loops:** In this kind of loop type, the test condition is tested before entering the loop body. For example, For Loop and While Loop comes under this category.
     2. **Exit Controlled Loops:** In this kind of loop typpe, the test condition is tested or evaluated at the end of loop body. i.e, the loop body will execute atleast once irrespective of test condition true or false. For example, do-while loop comes under this category.

     **[⬆ Back to Top](#table-of-contents)**

231. ### What is nodejs?

     Node.js is a server-side platform built on Chrome's JavaScript runtime for easily building fast and scalable network applications. It is an event-based, non-blocking, asynchronous I/O runtime that uses Google's V8 JavaScript engine and libuv library.

     **[⬆ Back to Top](#table-of-contents)**

232. ### What is an Intl object?

     The Intl object is the namespace for the ECMAScript Internationalization API, which provides language sensitive string comparison, number formatting, and date and time formatting. It provides an access to several constructors and language sensitive functions.

     **[⬆ Back to Top](#table-of-contents)**

233. ### How do you perform language specific date and time formatting?

     You can use `Intl.DateTimeFormat` object which is constructor for objects that enable language-sensitive date and time formatting. Let's see this behavior with an example,

     ```javascript
     var date = new Date(Date.UTC(2019, 07, 07, 3, 0, 0));
     console.log(new Intl.DateTimeFormat("en-GB").format(date)); // 07/08/2019
     console.log(new Intl.DateTimeFormat("en-AU").format(date)); // 07/08/2019
     ```

     **[⬆ Back to Top](#table-of-contents)**

234. ### What is an Iterator?

     An iterator is an object which defines a sequence and a return value upon its termination. It implements the Iterator protocol with a next() method which returns an object with two properties: value (the next value in the sequence) and done (which is true if the last value in the sequence has been consumed).

     **[⬆ Back to Top](#table-of-contents)**

235. ### What is an event loop?

     The Event Loop is a queue of callback functions. When an async function executes, the callback function is pushed into the queue. The JavaScript engine doesn't start processing the event loop until async function has finished executing the code.
     **Note:** It allows Node.js to perform non-blocking I/O operations even though JavaScript is single-threaded.

     **[⬆ Back to Top](#table-of-contents)**

236. ### What is call stack?

     Call Stack is a data structure(for javascript interpreter) which keeps track of function calls in the program. It has two major actions,

     1. Whenever you call a function for its execution, you are pushing it to the stack.
     2. Whenever the execution is completed, the function is popped out of the stack.

     **[⬆ Back to Top](#table-of-contents)**

237. ### What is an event queue?

     **[⬆ Back to Top](#table-of-contents)**

238. ### What is a decorator?

     A decorator is an expression that evaluates to a function and that takes the target, name, and decorator descriptor as arguments. Also, it optionally returns a decorator descriptor to install on the target object. Let's define admin decorator for user class at design time,

     ```javascript
     function admin(isAdmin) {
        return function(target) {
            target.isAdmin = isAdmin;
        }
     }

     @admin(true)
     class User() {
     }
     console.log(User.isAdmin); //true

      @admin(false)
      class User() {
      }
      console.log(User.isAdmin); //false
     ```

     **[⬆ Back to Top](#table-of-contents)**

239. ### What are the properties of Intl object?

     Below are the list of properties available on Intl object,

     1. **Collator:** These are the objects that enable language-sensitive string comparison.
     2. **DateTimeFormat:** These are the objects that enable language-sensitive date and time formatting.
     3. **ListFormat:** These are the objects that enable language-sensitive list formatting.
     4. **NumberFormat:** Objects that enable language-sensitive number formatting.
     5. **PluralRules:** Objects that enable plural-sensitive formatting and language-specific rules for plurals.
     6. **RelativeTimeFormat:** Objects that enable language-sensitive relative time formatting.

     **[⬆ Back to Top](#table-of-contents)**

240. ### What is an Unary operator?

     The unary(+) operator is used to convert a variable to a number.If the variable cannot be converted, it will still become a number but with the value NaN. Let's see this behavior in an action.

     ```javascrippt
     var x = "100";
     var y = + x;
     console.log(typeof x, typeof y); // string, number

     var a = "Hello";
     var b = + a;
     console.log(typeof a, typeof b, b); // string, number, NaN
     ```

     **[⬆ Back to Top](#table-of-contents)**

241. ### How do you sort elements in an array?

     The sort() method is used to sort the elements of an array in place and returns the sorted array. The example usage would be as below,

     ```javascript
     var months = ["Aug", "Sep", "Jan", "June"];
     months.sort();
     console.log(months); //  ["Aug", "Jan", "June", "Sep"]
     ```

     **[⬆ Back to Top](#table-of-contents)**

242. ### What is the purpose of compareFunction while sorting arrays?

     The compareFunction is used to define the sort order. If omitted, the array elements are converted to strings, then sorted according to each character's Unicode code point value. Let's take an example to see the usage of compareFunction,

     ```javascript
     let numbers = [1, 2, 5, 3, 4];
     numbers.sort((a, b) => b - a);
     console.log(numbers); // [5, 4, 3, 2, 1]
     ```

     **[⬆ Back to Top](#table-of-contents)**

243. ### How do you reversing an array?

     You can use reverse() method is used reverse the elements in an array. This method is useful to sort an array in descending order. Let's see the usage of reverse() method in an example,

     ```javascript
     let numbers = [1, 2, 5, 3, 4];
     numbers.sort((a, b) => b - a);
     numbers.reverse();
     console.log(numbers); // [1, 2, 3, 4 ,5]
     ```

     **[⬆ Back to Top](#table-of-contents)**

244. ### How do you find min and max value in an array?

     You can use `Math.min` and `Math.max` methods on array variable to find the minimum and maximum elements with in an array. Let's create two functions to find the min and max value with in an array,

     ```javascript
     var marks = [50, 20, 70, 60, 45, 30];
     function findMin(arr) {
       return Math.min.apply(null, arr);
     }
     function findMax(arr) {
       return Math.max.apply(null, arr);
     }

     console.log(findMin(marks));
     console.log(findMax(marks));
     ```

     **[⬆ Back to Top](#table-of-contents)**

245. ### How do you find min and max values without Math functions?

     You can write functions which loops through an array comparing each value with the lowest value or highest value to find the min and max values. Let's create those functions to find min an max values,

     ```javascript
     var marks = [50, 20, 70, 60, 45, 30];
     function findMin(arr) {
       var length = arr.length;
       var min = Infinity;
       while (length--) {
         if (arr[length] < min) {
           min = arr[len];
         }
       }
       return min;
     }

     function findMax(arr) {
       var length = arr.length;
       var max = -Infinity;
       while (len--) {
         if (arr[length] > max) {
           max = arr[length];
         }
       }
       return max;
     }

     console.log(findMin(marks));
     console.log(findMax(marks));
     ```

     **[⬆ Back to Top](#table-of-contents)**

246. ### What is an empty statement and purpose of it?

     The empty statement is a semicolon (;) indicating that no statement will be executed, even if JavaScript syntax requires one. Since there is no action with an empty statement you might think that it's usage is quite less, but the empty statement is occasionally useful when you want to create a loop that has an empty body. For example, you can initialize an array with zero values as below,

     ```javascript
     // Initialize an array a
     for(int i=0; i < a.length; a[i++] = 0) ;
     ```

     **[⬆ Back to Top](#table-of-contents)**

247. ### How do you get meta data of a module?

     You can use `import.meta` object which is a meta-property exposing context-specific meta data to a JavaScript module. It contains information about the current module, such as module's URL. In browser, you might get different meta data than NodeJS.

     ```javascript
     <script type="module" src="welcome-module.js"></script>;
     console.log(import.meta); // { url: "file:///home/user/welcome-module.js" }
     ```

     **[⬆ Back to Top](#table-of-contents)**

248. ### What is a comma operator?

     The comma operator is used to evaluate each of its operands from left to right and returns the value of the last operand. This is totally different from comma usage within arrays, objects, and function arguments and parameters. For example, the usage for numeric expressions would be as below,

     ```javascript
     var x = 1;
     x = (x++, x);

     console.log(x); // 2
     ```

     **[⬆ Back to Top](#table-of-contents)**

249. ### What is the advantage of a comma operator?

     It is normally used to include multiple expressions in a location that requires a single expression. One of the common usage of this comma operator is to supply multiple parameters in a `for` loop. For example, the below for loop uses multiple expressions in a single location using comma operator,

     ```javascript
     for (var a = 0, b =10; a <= 10; a++, b--)
     ```

     You can also use the comma operator in a return statement where it process before returning.

     ```javascript
     function myFunction() {
       var a = 1;
       return (a += 10), a; // 11
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

250. ### What is typescript?
     TypeScript is a typed superset of JavaScript created by Microsoft that adds optional types, classes, async/await, and many other features, and compiles to plain JavaScript. Angular built entirely in TypeScript and used as a primary language.
     You can install it globally as


    ```
    npm install -g typescript
    ```
    Let's see a simple example of TypeScript usage,
    ```typescript
    function greeting(person: string) {
        return "Hello, " + person;
    }

    let user = "Sudheer";

    document.body.innerHTML = greeting(user);
    ```
    The greeting method allows only string type as argument.

**[⬆ Back to Top](#table-of-contents)**

251. ### What are the differences between javascript and typescript?

     Below are the list of differences between javascript and typescript,

     | feature             | typescript                            | javascript                                      |
     | ------------------- | ------------------------------------- | ----------------------------------------------- |
     | Language paradigm   | Object oriented programming language  | Scripting language                              |
     | Typing support      | Supports static typing                | It has dynamic typing                           |
     | Modules             | Supported                             | Not supported                                   |
     | Interface           | It has interfaces concept             | Doesn't support interfaces                      |
     | Optional parameters | Functions support optional parameters | No support of optional parameters for functions |

     **[⬆ Back to Top](#table-of-contents)**

252. ### What are the advantages of typescript over javascript?

     Below are some of the advantages of typescript over javascript,

     1. TypeScript is able to find compile time errors at the development time only and it make sures less runtime errors. Whereas javascript is interpreted language.
     2. TypeScript is is strongly-typed or supports static typing which allows for checking type correctness at compile time. This is not available in javascript.
     3. TypeScript compiler can compile the .ts files into ES3,ES4 and ES5 unlike ES6 features of javascript which may not be supported in some browsers.

     **[⬆ Back to Top](#table-of-contents)**

253. ### What is an object initializer?

     An object initializer is an expression that describes the initialization of an Object. The syntax for this expression is represented as a comma-delimited list of zero or more pairs of property names and associated values of an object, enclosed in curly braces ({}). This is also known as literal notation. It is one of the ways to create an object.

     ```javascript
     var initObject = { a: "John", b: 50, c: {} };

     console.log(initObject.a); // John
     ```

     **[⬆ Back to Top](#table-of-contents)**

254. ### What is a constructor method?

     The constructor method is a special method for creating and initializing an object created within a class. If you do not specify a constructor method, a default constructor is used. The example usage of constructor would be as below,

     ```javascript
     class Employee {
       constructor() {
         this.name = "John";
       }
     }

     var employeeObject = new Employee();

     console.log(employeeObject.name); // John
     ```

     **[⬆ Back to Top](#table-of-contents)**

255. ### What happens if you write constructor more than once in a class?

     The "constructor" in a class is a special method and it should be defined only once in a class. i.e, If you write a constructor method more than once in a class it will throw a `SyntaxError` error.

     ```javascript
     class Employee {
       constructor() {
         this.name = "John";
       }
       constructor() {
         //  Uncaught SyntaxError: A class may only have one constructor
         this.age = 30;
       }
     }

     var employeeObject = new Employee();

     console.log(employeeObject.name);
     ```

     **[⬆ Back to Top](#table-of-contents)**

256. ### How do you call the constructor of a parent class?

     You can use `super` keyword to call the constructor of a parent class. Remember that `super()` must be called before using 'this' reference. Otherwise it will cause a reference error. Let's the usage of it,

     ```javascript
     class Square extends Rectangle {
       constructor(length) {
         super(length, length);
         this.name = "Square";
       }

       get area() {
         return this.width * this.height;
       }

       set area(value) {
         this.area = value;
       }
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

257. ### How do you get the prototype of an object?

     You can use `Object.getPrototypeOf(obj)` method is used to return the prototype of the specified object. i.e. The value of the internal `prototype` property. If there are no inherited properties then `null` value is returned.

     ```javascript
     const newPrototype = {};
     const newObject = Object.create(newPrototype);

     console.log(Object.getPrototypeOf(newObject) === newPrototype); // true
     ```

     **[⬆ Back to Top](#table-of-contents)**

258. ### What happens If I pass string type for getPrototype method?

     In ES5, it will throw a TypeError exception if the obj parameter isn't an object. Whereas in ES2015, the parameter will be coerced to an `Object`.

     ```javascript
     // ES5
     Object.getPrototypeOf("James"); // TypeError: "James" is not an object
     // ES2015
     Object.getPrototypeOf("James"); // String.prototype
     ```

     **[⬆ Back to Top](#table-of-contents)**

259. ### How do you set prototype of one object to another?

     You can use `Object.setPrototypeOf()` method that sets the prototype (i.e., the internal `Prototype` property) of a specified object to another object or null. For example, if you want to set prototype of a square object to rectangle object would be as follows,

     ```javascript
     Object.setPrototypeOf(Square.prototype, Rectangle.prototype);
     Object.setPrototypeOf({}, null);
     ```

     **[⬆ Back to Top](#table-of-contents)**

260. ### How do you check whether an object can be extendable or not?

     The `Object.isExtensible()` method is used to determine if an object is extensible or not. i.e, Whether it can have new properties added to it or not.

     ```javascript
     const newObject = {};
     console.log(Object.isExtensible(newObject)); //true
     ```

     **Note:** By default, all the objects are extendable. i.e, The new properties can added or modified.

     **[⬆ Back to Top](#table-of-contents)**

261. ### How do you prevent an object to extend?

     The `Object.preventExtensions()` method is used to prevent new properties from ever being added to an object. In other words, it prevents future extensions to the object. Let's see the usage of this property,

     ```javascript
     const newObject = {};
     Object.preventExtensions(newObject); // NOT extendable

     try {
       Object.defineProperty(newObject, "newProperty", {
         // Adding new property
         value: 100,
       });
     } catch (e) {
       console.log(e); // TypeError: Cannot define property newProperty, object is not extensible
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

262. ### What are the different ways to make an object non-extensible?

     You can mark an object non-extensible in 3 ways,

     1. Object.preventExtensions
     2. Object.seal
     3. Object.freeze

     ```javascript
     var newObject = {};

     Object.preventExtensions(newObject); // Prevent objects are non-extensible
     Object.isExtensible(newObject); // false

     var sealedObject = Object.seal({}); // Sealed objects are non-extensible
     Object.isExtensible(sealedObject); // false

     var frozenObject = Object.freeze({}); // Frozen objects are non-extensible
     Object.isExtensible(frozenObject); // false
     ```

     **[⬆ Back to Top](#table-of-contents)**

263. ### How do you define multiple properties on an object?

     The `Object.defineProperties()` method is used to define new or modifies existing properties directly on an object and returning the object. Let's define multiple properties on an empty object,

     ```javascript
     const newObject = {};

     Object.defineProperties(newObject, {
       newProperty1: {
         value: "John",
         writable: true,
       },
       newProperty2: {},
     });
     ```

     **[⬆ Back to Top](#table-of-contents)**

264. ### What is MEAN in javascript?

     The MEAN (MongoDB, Express, AngularJS, and Node.js) stack is the most popular open-source JavaScript software tech stack available for building dynamic web apps where you can write both the server-side and client-side halves of the web project entirely in JavaScript.

     **[⬆ Back to Top](#table-of-contents)**

265. ### What Is Obfuscation in javascript?

     Obfuscation is the deliberate act of creating obfuscated javascript code(i.e, source or machine code) that is difficult for humans to understand. It is something similar to encryption, but a machine can understand the code and execute it.
     Let's see the below function before Obfuscation,

     ```javascript
     function greeeting() {
       console.log("Hello, welcome to JS world");
     }
     ```

     And after the code Obfuscation, it would be appeared as below,

     ```javascript
     eval(
       (function (p, a, c, k, e, d) {
         e = function (c) {
           return c;
         };
         if (!"".replace(/^/, String)) {
           while (c--) {
             d[c] = k[c] || c;
           }
           k = [
             function (e) {
               return d[e];
             },
           ];
           e = function () {
             return "\\w+";
           };
           c = 1;
         }
         while (c--) {
           if (k[c]) {
             p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
           }
         }
         return p;
       })(
         "2 1(){0.3('4, 7 6 5 8')}",
         9,
         9,
         "console|greeeting|function|log|Hello|JS|to|welcome|world".split("|"),
         0,
         {}
       )
     );
     ```

     **[⬆ Back to Top](#table-of-contents)**

266. ### Why do you need Obfuscation?

     Below are the few reasons for Obfuscation,

     1. The Code size will be reduced. So data transfers between server and client will be fast.
     2. It hides the business logic from outside world and protects the code from others
     3. Reverse engineering is highly difficult
     4. The download time will be reduced

     **[⬆ Back to Top](#table-of-contents)**

267. ### What is Minification?

     Minification is the process of removing all unnecessary characters(empty spaces are removed) and variables will be renamed without changing it's functionality. It is also a type of obfuscation .

     **[⬆ Back to Top](#table-of-contents)**

268. ### What are the advantages of minification?

     Normally it is recommend to use minification for heavy traffic and intensive requirements of resources. It reduces file sizes with below benefits,

     1. Decreases loading times of a web page
     2. Saves bandwidth usages

     **[⬆ Back to Top](#table-of-contents)**

269. ### What are the differences between Obfuscation and Encryption?

     Below are the main differences between Obfuscation and Encryption,

     | Feature            | Obfuscation                                     | Encryption                                                              |
     | ------------------ | ----------------------------------------------- | ----------------------------------------------------------------------- |
     | Definition         | Changing the form of any data in any other form | Changing the form of information to an unreadable format by using a key |
     | A key to decode    | It can be decoded without any key               | It is required                                                          |
     | Target data format | It will be converted to a complex form          | Converted into an unreadable format                                     |

     **[⬆ Back to Top](#table-of-contents)**

270. ### What are the common tools used for minification?

     There are many online/offline tools to minify the javascript files,

     1. Google's Closure Compiler
     2. UglifyJS2
     3. jsmin
     4. javascript-minifier.com/
     5. prettydiff.com

     **[⬆ Back to Top](#table-of-contents)**

271. ### How do you perform form validation using javascript?

     JavaScript can be used to perform HTML form validation. For example, if form field is empty, the function needs to notify, and return false, to prevent the form being submitted.
     Lets' perform user login in an html form,

     ```html
     <form name="myForm" onsubmit="return validateForm()" method="post">
       User name: <input type="text" name="uname" />
       <input type="submit" value="Submit" />
     </form>
     ```

     And the validation on user login is below,

     ```javascript
     function validateForm() {
       var x = document.forms["myForm"]["uname"].value;
       if (x == "") {
         alert("The username shouldn't be empty");
         return false;
       }
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

272. ### How do you perform form validation without javascript?

     You can perform HTML form validation automatically without using javascript. The validation enabled by applying `required` attribute to prevent form submission when the input is empty.

     ```html
     <form method="post">
       <input type="text" name="uname" required />
       <input type="submit" value="Submit" />
     </form>
     ```

     **Note:** Automatic form validation does not work in Internet Explorer 9 or earlier.

     **[⬆ Back to Top](#table-of-contents)**

273. ### What are the DOM methods available for constraint validation?

     The below DOM methods are available for constraint validation on an invalid input,

     1. checkValidity(): It returns true if an input element contains valid data.
     2. setCustomValidity(): It is used to set the validationMessage property of an input element.
        Let's take an user login form with DOM validations

     ```javascript
     function myFunction() {
       var userName = document.getElementById("uname");
       if (!userName.checkValidity()) {
         document.getElementById("message").innerHTML =
           userName.validationMessage;
       } else {
         document.getElementById("message").innerHTML =
           "Entered a valid username";
       }
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

274. ### What are the available constraint validation DOM properties?

     Below are the list of some of the constraint validation DOM properties available,

     1. validity: It provides list of boolean properties related to the validity of an input element.
     2. validationMessage: It displays the message when the validity is false.
     3. willValidate: It indicates if an input element will be validated or not.

     **[⬆ Back to Top](#table-of-contents)**

275. ### What are the list of validity properties?

     The validity property of an input element provides a set of properties related to the validity of data.

     1. customError: It returns true, if a custom validity message is set.
     2. patternMismatch: It returns true, if an element's value does not match its pattern attribute.
     3. rangeOverflow: It returns true, if an element's value is greater than its max attribute.
     4. rangeUnderflow: It returns true, if an element's value is less than its min attribute.
     5. stepMismatch: It returns true, if an element's value is invalid according to step attribute.
     6. tooLong: It returns true, if an element's value exceeds its maxLength attribute.
     7. typeMismatch: It returns true, if an element's value is invalid according to type attribute.
     8. valueMissing: It returns true, if an element with a required attribute has no value.
     9. valid: It returns true, if an element's value is valid.

     **[⬆ Back to Top](#table-of-contents)**

276. ### Give an example usage of rangeOverflow property?

     If an element's value is greater than its max attribute then rangeOverflow property returns true. For example, the below form submission throws an error if the value is more than 100,

     ```html
     <input id="age" type="number" max="100" />
     <button onclick="myOverflowFunction()">OK</button>
     ```

     ```javascript
     function myOverflowFunction() {
       if (document.getElementById("age").validity.rangeOverflow) {
         alert("The mentioned age is not allowed");
       }
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

277. ### Is enums feature available in javascript?

     No, javascript does not natively support enums. But there are different kind of solutions to simulate them even though they may not provide exact equivalent. For example, you can use freeze or seal on object,

     ```javascript
     var DaysEnum = Object.freeze({"monday":1, "tuesday":2, "wednesday":3, ...})
     ```

     **[⬆ Back to Top](#table-of-contents)**

278. ### What is an enum?

     An enum is a type restricting variables to one value from a predefined set of constants. JavaScript has no enums but typescript provides built-in enum support.

     ```javascript
     enum Color {
     	RED, GREEN, BLUE
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

279. ### How do you list all properties of an object?

     You can use `Object.getOwnPropertyNames()` method which returns an array of all properties found directly in a given object. Let's the usage of it in an example,

     ```javascript
     const newObject = {
       a: 1,
       b: 2,
       c: 3,
     };

     console.log(Object.getOwnPropertyNames(newObject));
     ["a", "b", "c"];
     ```

     **[⬆ Back to Top](#table-of-contents)**

280. ### How do you get property descriptors of an object?

     You can use `Object.getOwnPropertyDescriptors()` method which returns all own property descriptors of a given object. The example usage of this method is below,

     ```javascript
     const newObject = {
       a: 1,
       b: 2,
       c: 3,
     };
     const descriptorsObject = Object.getOwnPropertyDescriptors(newObject);
     console.log(descriptorsObject.a.writable); //true
     console.log(descriptorsObject.a.configurable); //true
     console.log(descriptorsObject.a.enumerable); //true
     console.log(descriptorsObject.a.value); // 1
     ```

     **[⬆ Back to Top](#table-of-contents)**

281. ### What are the attributes provided by a property descriptor?

     A property descriptor is a record which has the following attributes

     1. value: The value associated with the property
     2. writable: Determines whether the value associated with the property can be changed or not
     3. configurable: Returns true if the type of this property descriptor can be changed and if the property can be deleted from the corresponding object.
     4. enumerable: Determines whether the property appears during enumeration of the properties on the corresponding object or not.
     5. set: A function which serves as a setter for the property
     6. get: A function which serves as a getter for the property

     **[⬆ Back to Top](#table-of-contents)**

282. ### How do you extend classes?

     The `extends` keyword is used in class declarations/expressions to create a class which is a child of another class. It can be used to subclass custom classes as well as built-in objects. The syntax would be as below,

     ```javascript
     class ChildClass extends ParentClass { ... }
     ```

     Let's take an example of Square subclass from Polygon parent class,

     ```javascript
     class Square extends Rectangle {
       constructor(length) {
         super(length, length);
         this.name = "Square";
       }

       get area() {
         return this.width * this.height;
       }

       set area(value) {
         this.area = value;
       }
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

283. ### How do I modify the url without reloading the page?

     The `window.localtion.url` property will be helpful to modify the url but it reloads the page. HTML5 introduced the `history.pushState()` and `history.replaceState()` methods, which allow you to add and modify history entries, respectively. For example, you can use pushState as below,

     ```javascript
     window.history.pushState("page2", "Title", "/page2.html");
     ```

     **[⬆ Back to Top](#table-of-contents)**

284. ### How do you check whether an array includes a particular value or not?

     The `Array#includes()` method is used to determine whether an array includes a particular value among its entries by returning either true or false. Let's see an example to find an element(numeric and string) with in array.

     ```javascript
     var numericArray = [1, 2, 3, 4];
     console.log(numericArray.includes(3)); // true

     var stringArray = ["green", "yellow", "blue"];
     console.log(stringArray.includes("blue")); //true
     ```

     **[⬆ Back to Top](#table-of-contents)**

285. ### How do you compare scalar arrays?

     You can use length and every methods of arrays to compare two scalar(compared directly using ===) arrays. The combination of these expressions can give the expected result,

     ```javascript
     const arrayFirst = [1, 2, 3, 4, 5];
     const arraySecond = [1, 2, 3, 4, 5];
     console.log(
       arrayFirst.length === arraySecond.length &&
         arrayFirst.every((value, index) => value === arraySecond[index])
     ); // true
     ```

     If you would like to compare arrays irrespective of order then you should sort them before,

     ```javascript
     const arrayFirst = [2, 3, 1, 4, 5];
     const arraySecond = [1, 2, 3, 4, 5];
     console.log(
       arrayFirst.length === arraySecond.length &&
         arrayFirst.sort().every((value, index) => value === arraySecond[index])
     ); //true
     ```

     **[⬆ Back to Top](#table-of-contents)**

286. ### How to get the value from get parameters?

     The `new URL()` object accepts url string and `searchParams` property of this object can be used to access the get parameters. Remember that you may need to use polyfill or `window.location` to access the URL in older browsers(including IE).

     ```javascript
     let urlString = "http://www.some-domain.com/about.html?x=1&y=2&z=3"; //window.location.href
     let url = new URL(urlString);
     let parameterZ = url.searchParams.get("z");
     console.log(parameterZ); // 3
     ```

     **[⬆ Back to Top](#table-of-contents)**

287. ### How do you print numbers with commas as thousand separators?

     You can use `Number.prototype.toLocaleString()` method which returns a string with a language-sensitive representation such as thousand separator,currency etc of this number.

     ```javascript
     function convertToThousandFormat(x) {
       return x.toLocaleString(); // 12,345.679
     }

     console.log(convertToThousandFormat(12345.6789));
     ```

     **[⬆ Back to Top](#table-of-contents)**

288. ### What is the difference between java and javascript?

     Both are totally unrelated programming languages and no relation between them. Java is statically typed, compiled, runs on its own VM. Whereas Javascript is dynamically typed, interpreted, and runs in a browser and nodejs environments. Let's see the major differences in a tabular format,
     | Feature | Java | JavaScript |
     |---- | ---------
     | Typed | It's a strongly typed language | It's a dynamic typed language |
     | Paradigm | Object oriented programming | Prototype based programming |
     | Scoping | Block scoped | Function-scoped |
     | Concurrency | Thread based | event based |
     | Memory | Uses more memory | Uses less memory. Hence it will be used for web pages |

     **[⬆ Back to Top](#table-of-contents)**

289. ### Is javascript supports namespace?

     JavaScript doesn’t support namespace by default. So if you create any element(function, method, object, variable) then it becomes global and pollute the global namespace. Let's take an example of defining two functions without any namespace,

     ```javascript
     function func1() {
       console.log("This is a first definition");
     }
     function func1() {
       console.log("This is a second definition");
     }
     func1(); // This is a second definition
     ```

     It always calls the second function definition. In this case, namespace will solve the name collision problem.

     **[⬆ Back to Top](#table-of-contents)**

290. ### How do you declare namespace?

     Even though JavaScript lack namespaces, we can use Objects , IIFE to create namespaces.

     1. **Using Object Literal Notation:** Let's wrap variables and function inside Object literal which act as a namespace. After that you can access them using object notation

     ```javascript
     var namespaceOne = {
        function func1() {
            console.log("This is a first definition");
        }
     }
     var namespaceTwo = {
          function func1() {
              console.log("This is a second definition");
          }
      }
     namespaceOne.func1(); // This is a first definition
     namespaceTwo.func1(); // This is a second definition
     ```

     2. **Using IIFE (Immediately invoked function expression):** The outer pair of parenthesis of IIFE creates a local scope for all the code inside of it and makes the anonymous function a function expression. Due to that, you can create same function in two different function expressions to act as namespace.

     ```javascript
     (function () {
       function fun1() {
         console.log("This is a first definition");
       }
       fun1();
     })();

     (function () {
       function fun1() {
         console.log("This is a second definition");
       }
       fun1();
     })();
     ```

     3. **Using a block and a let/const declaration:** In ECMAScript 6, you can simply use a block and a let declaration to restrict the scope of a variable to a block.

     ```javascript
     {
       let myFunction = function fun1() {
         console.log("This is a first definition");
       };
       myFunction();
     }
     //myFunction(): ReferenceError: myFunction is not defined.

     {
       let myFunction = function fun1() {
         console.log("This is a second definition");
       };
       myFunction();
     }
     //myFunction(): ReferenceError: myFunction is not defined.
     ```

     **[⬆ Back to Top](#table-of-contents)**

291. ### How do you invoke javascript code in an iframe from parent page?

     Initially iFrame need to be accessed using either `document.getElementBy` or `window.frames`. After that `contentWindow` property of iFrame gives the access for targetFunction

     ```javascript
     document.getElementById("targetFrame").contentWindow.targetFunction();
     window.frames[0].frameElement.contentWindow.targetFunction(); // Accessing iframe this way may not work in latest versions chrome and firefox
     ```

     **[⬆ Back to Top](#table-of-contents)**

292. ### How do get the timezone offset from date?

     You can use `getTimezoneOffset` method of date object. This method returns the time zone difference, in minutes, from current locale (host system settings) to UTC

     ```javascript
     var offset = new Date().getTimezoneOffset();
     console.log(offset); // -480
     ```

     **[⬆ Back to Top](#table-of-contents)**

293. ### How do you load CSS and JS files dynamically?

     You can create both link and script elements in the DOM and append them as child to head tag. Let's create a function to add script and style resources as below,

     ```javascript
     function loadAssets(filename, filetype) {
       if (filetype == "css") {
         // External CSS file
         var fileReference = document.createElement("link");
         fileReference.setAttribute("rel", "stylesheet");
         fileReference.setAttribute("type", "text/css");
         fileReference.setAttribute("href", filename);
       } else if (filetype == "js") {
         // External JavaScript file
         var fileReference = document.createElement("script");
         fileReference.setAttribute("type", "text/javascript");
         fileReference.setAttribute("src", filename);
       }
       if (typeof fileReference != "undefined")
         document.getElementsByTagName("head")[0].appendChild(fileReference);
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

294. ### What are the different methods to find HTML elements in DOM?

     If you want to access any element in an HTML page, you need to start with accessing the document object. Later you can use any of the below methods to find the HTML element,

     1. document.getElementById(id): It finds an element by Id
     2. document.getElementsByTagName(name): It finds an element by tag name
     3. document.getElementsByClassName(name): It finds an element by class name

     **[⬆ Back to Top](#table-of-contents)**

295. ### What is jQuery?

     jQuery is a popular cross-browser JavaScript library that provides Document Object Model (DOM) traversal, event handling, animations and AJAX interactions by minimizing the discrepancies across browsers. It is widely famous with its philosophy of “Write less, do more”. For example, you can display welcome message on the page load using jQuery as below,

     ```javascript
     $(document).ready(function () {
       // It selects the document and apply the function on page load
       alert("Welcome to jQuery world");
     });
     ```

     **Note:** You can download it from jquery official site or install it from CDNs, like google.

     **[⬆ Back to Top](#table-of-contents)**

296. ### What is V8 JavaScript engine?

     V8 is an open source high-performance JavaScript engine used by the Google Chrome browser, written in C++. It is also being used in the node.js project. It implements ECMAScript and WebAssembly, and runs on Windows 7 or later, macOS 10.12+, and Linux systems that use x64, IA-32, ARM, or MIPS processors.
     **Note:** It can run standalone, or can be embedded into any C++ application.

     **[⬆ Back to Top](#table-of-contents)**

297. ### Why do we call javascript as dynamic language?

     JavaScript is a loosely typed or a dynamic language because variables in JavaScript are not directly associated with any particular value type, and any variable can be assigned/re-assigned with values of all types.

     ```javascript
     let age = 50; // age is a number now
     age = "old"; // age is a string now
     age = true; // age is a boolean
     ```

     **[⬆ Back to Top](#table-of-contents)**

298. ### What is a void operator?

     The `void` operator evaluates the given expression and then returns undefined(i.e, without returning value). The syntax would be as below,

     ```javascript
     void expression;
     void expression;
     ```

     Let's display a message without any redirections or reloads

     ```javascript
     <a href="javascript:void(alert('Welcome to JS world'))">
       Click here to see a message
     </a>
     ```

     **Note:** This operator is often used to obtain the undefined primitive value, using "void(0)".

     **[⬆ Back to Top](#table-of-contents)**

299. ### How to set the cursor to wait?

     The cursor can be set to wait in JavaScript by using the property "cursor". Let's perform this behavior on page load using the below function.

     ```javascript
     function myFunction() {
       window.document.body.style.cursor = "wait";
     }
     ```

     and this function invoked on page load

     ```html
     <body onload="myFunction()"></body>
     ```

     **[⬆ Back to Top](#table-of-contents)**

300. ### How do you create an infinite loop?

     You can create infinite loop using for and while loops without using any expressions. The for loop construct or syntax is better approach in terms of ESLint and code optimizer tools,

     ```javascript
     for (;;) {}
     while (true) {}
     ```

     **[⬆ Back to Top](#table-of-contents)**

301. ### Why do you need to avoid with statement?

     JavaScript's with statement was intended to provide a shorthand for writing recurring accesses to objects. So it can help reduce file size by reducing the need to repeat a lengthy object reference without performance penalty. Let's take an example where it is used to avoid redundancy when accessing an object several times.

     ```javascript
     a.b.c.greeting = "welcome";
     a.b.c.age = 32;
     ```

     Using `with` it turns this into:

     ```javascript
     with (a.b.c) {
       greeting = "welcome";
       age = 32;
     }
     ```

     But this `with` statement creates performance problems since one cannot predict whether argument will refer to a real variable or to a property inside the with argument.

     **[⬆ Back to Top](#table-of-contents)**

302. ### What is the output of below for loops?

     ```javascript
     for (var i = 0; i < 4; i++) {
       // global scope
       setTimeout(() => console.log(i));
     }

     for (let i = 0; i < 4; i++) {
       // block scope
       setTimeout(() => console.log(i));
     }
     ```

     The output of the above for loops is 4 4 4 4 and 0 1 2 3
     **Explanation:** Due to event queue/loop of javascript, the `setTimeout` callback function is called after the loop has been executed. Since the variable i is declared with `var` keyword it became a global variable and the value was equal to 4 using iteration when the time setTimeout function is invoked. Hence, the output of the first loop is `4 4 4 4`. Whereas in the second loop, the variable i is declared as `let` keyword it became a block scoped variable and it holds a new value(0, 1 ,2 3) for each iteration. Hence, the output of the first loop is `0 1 2 3`.

     **[⬆ Back to Top](#table-of-contents)**

303. ### List down some of the features of ES6?

     Below are the list of some new features of ES6,

     1. Support for constants or immutable variables
     2. Block-scope support for variables, constants and functions
     3. Arrow functions
     4. Default parameters
     5. Rest and Spread Parameters
     6. Template Literals
     7. Multi-line Strings
     8. Destructuring Assignment
     9. Enhanced Object Literals
     10. Promises
     11. Classes
     12. Modules

     **[⬆ Back to Top](#table-of-contents)**

304. ### What is ES6?

     ES6 is the sixth edition of the javascript language and it was released on June 2015. It was initially known as ECMAScript 6 (ES6) and later renamed to ECMAScript 2015. Almost all the modern browsers support ES6 but for the old browsers there are many transpilers, like Babel.js etc.

     **[⬆ Back to Top](#table-of-contents)**

305. ### Can I redeclare let and const variables?

     No, you cannot redeclare let and const variables. If you do, it throws below error

     ```bash
     Uncaught SyntaxError: Identifier 'someVariable' has already been declared
     ```

     **Explanation:** The variable declaration with `var` keyword refers to a function scope and the variable is treated as if it were declared at the top of the enclosing scope due to hoisting feature. So all the multiple declarations contributing to the same hoisted variable without any error. Let's take an example of re-declaring variables in the same scope for both var and let/const variables.

     ```javascript
     var name = "John";
     function myFunc() {
       var name = "Nick";
       var name = "Abraham"; // Re-assigned in the same function block
       alert(name); // Abraham
     }
     myFunc();
     alert(name); // John
     ```

     The block-scoped multi-declaration throws syntax error,

     ```javascript
     let name = "John";
     function myFunc() {
       let name = "Nick";
       let name = "Abraham"; // Uncaught SyntaxError: Identifier 'name' has already been declared
       alert(name);
     }

     myFunc();
     alert(name);
     ```

     **[⬆ Back to Top](#table-of-contents)**

306. ### Is const variable makes the value immutable?

     No, the const variable doesn't make the value immutable. But it disallows subsequent assignments(i.e, You can declare with assignment but can't assign another value later)

     ```javascript
     const userList = [];
     userList.push("John"); // Can mutate even though it can't re-assign
     console.log(userList); // ['John']
     ```

     **[⬆ Back to Top](#table-of-contents)**

307. ### What are default parameters?

     In E5, we need to depends on logical OR operator to handle default values of function parameters. Whereas in ES6, Default function parameters feature allows parameters to be initialized with default values if no value or undefined is passed. Let's compare the behavior with an examples,

     ```javascript
     //ES5
     var calculateArea = function (height, width) {
       height = height || 50;
       width = width || 60;

       return width * height;
     };
     console.log(calculateArea()); //300
     ```

     The default parameters makes the initialization more simpler,

     ```javascript
     //ES6
     var calculateArea = function (height = 50, width = 60) {
       return width * height;
     };

     console.log(calculateArea()); //300
     ```

     **[⬆ Back to Top](#table-of-contents)**

308. ### What are template literals?

     Template literals or template strings are string literals allowing embedded expressions. These are enclosed by the back-tick (``) character instead of double or single quotes.
     In E6, this feature enables using dynamic expressions as below,

     ```javascript
     var greeting = `Welcome to JS World, Mr. ${firstName} ${lastName}.`;
     ```

     In ES5, you need break string like below,

     ```javascript
     var greeting = 'Welcome to JS World, Mr. ' + firstName + ' ' + lastName.`
     ```

     **Note:** You can use multi-line strings and string interpolation features with template literals.

     **[⬆ Back to Top](#table-of-contents)**

309. ### How do you write multi-line strings in template literals?

     In ES5, you would have to use newline escape character('\n') and concatenation symbol(+) in order to get multi-line strings.

     ```javascript
     console.log("This is string sentence 1\n" + "This is string sentence 2");
     ```

     Whereas in ES6, You don't need to mention any newline sequence character,

     ```javascript
     console.log(`This is string sentence
     'This is string sentence 2`);
     ```

     **[⬆ Back to Top](#table-of-contents)**

310. ### What are nesting templates?

     The nesting templates is a feature supported with in template literals syntax to allow inner backticks inside a placeholder \${ } within the template. For example, the below nesting template is used to display the icons based on user permissions whereas outer template checks for platform type,

     ```javascript
     const iconStyles = `icon ${
       isMobilePlatform()
         ? ""
         : `icon-${user.isAuthorized ? "submit" : "disabled"}`
     }`;
     ```

     You can write the above usecase without nesting template feature as well. However, nesting template feature is more compact and readable.

     ```javascript
     //Without nesting templates
      const iconStyles = `icon ${ isMobilePlatform() ? '' :
       (user.isAuthorized ? 'icon-submit' : 'icon-disabled'}`;
     ```

     **[⬆ Back to Top](#table-of-contents)**

311. ### What are tagged templates?

     Tagged templates are the advanced form of templates in which tags allow you to parse template literals with a function. The tag function accepts first parameter as array of strings and remaining parameters as expressions. This function can also return manipulated string based on parameters. Let's see the usage of this tagged template behavior of an IT professional skill set in an organization,

     ```javascript
     var user1 = "John";
     var skill1 = "JavaScript";
     var experience1 = 15;

     var user2 = "Kane";
     var skill2 = "JavaScript";
     var experience2 = 5;

     function myInfoTag(strings, userExp, experienceExp, skillExp) {
       var str0 = strings[0]; // "Mr/Ms. "
       var str1 = strings[1]; // " is a/an "
       var str2 = strings[2]; // "in"

       var expertiseStr;
       if (experienceExp > 10) {
         expertiseStr = "expert developer";
       } else if (skillExp > 5 && skillExp <= 10) {
         expertiseStr = "senior developer";
       } else {
         expertiseStr = "junior developer";
       }

       return `${str0}${userExp}${str1}${experienceExp}{str3}`;
     }

     var output1 = myInfoTag`Mr/Ms. ${user1} is a/an ${experience1} in ${skill1}`;
     var output2 = myInfoTag`Mr/Ms. ${user2} is a/an ${experience2} in ${skill2}`;

     console.log(output1); // Mr/Ms. John is a/an expert developer in JavaScript
     console.log(output2); // Mr/Ms. Kane is a/an junior developer in JavaScript
     ```

     **[⬆ Back to Top](#table-of-contents)**

312. ### What are raw strings?

     ES6 provides raw strings feature using `String.raw()` method which is used to get the raw string form of template strings. This feature allows you to access the raw strings as they were entered, without processing escape sequences. For example, the usage would be as below,

     ```javascript
     var calculationString = String.raw`The sum of numbers is \n${
       1 + 2 + 3 + 4
     }!`;
     console.log(calculationString); // The sum of numbers is 10
     ```

     If you don't use raw strings, the newline character sequence will be processed by displaying the output in multiple lines

     ```
      var calculationString = `The sum of numbers is \n${1+2+3+4}!`;
      console.log(calculationString);
      // The sum of numbers is
      // 10
     ```

     Also, the raw property is available on the first argument to the tag function

     ```javascript
     function tag(strings) {
       console.log(strings.raw[0]);
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

313. ### What is destructuring assignment?

     The destructuring assignment is a JavaScript expression that makes it possible to unpack values from arrays or properties from objects into distinct variables.
     Let's get the month values from an array using destructuring assignment

     ```javascript
     var [one, two, three] = ["JAN", "FEB", "MARCH"];

     console.log(one); // "JAN"
     console.log(two); // "FEB"
     console.log(three); // "MARCH"
     ```

     and you can get user properties of an object using destructuring assignment,

     ```javascript
     var { name, age } = { name: "John", age: 32 };

     console.log(name); // John
     console.log(age); // 32
     ```

     **[⬆ Back to Top](#table-of-contents)**

314. ### What are default values in destructuring assignment?

     A variable can be assigned a default value when the value unpacked from the array or object is undefined during destructuring assignment. It helps to avoid setting default values separately for each assignment. Let's take an example for both arrays and object usecases,
     **Arrays destructuring:**

     ```javascript
     var x, y, z;

     [x = 2, y = 4, z = 6] = [10];
     console.log(x); // 10
     console.log(y); // 4
     console.log(z); // 6
     ```

     **Objects destructuring:**

     ```javascript
     var { x = 2, y = 4, z = 6 } = { x: 10 };

     console.log(x); // 10
     console.log(y); // 4
     console.log(z); // 6
     ```

     **[⬆ Back to Top](#table-of-contents)**

315. ### How do you swap variables in destructuring assignment?

     If you don't use destructuring assignment, swapping two values requires a temporary variable. Whereas using destructuring feature, two variables values can be swapped in one destructuring expression. Let's swap two number variables in array destructuring assignment,

     ```javascript
     var x = 10,
       y = 20;

     [x, y] = [y, x];
     console.log(x); // 20
     console.log(y); // 10
     ```

     **[⬆ Back to Top](#table-of-contents)**

316. ### What are enhanced object literals?

     Object literals make it easy to quickly create objects with properties inside the curly braces. For example, it provides shorter syntax for common object property definition as below.

     ```javascript
     //ES6
     var x = 10,
       y = 20;
     obj = { x, y };
     console.log(obj); // {x: 10, y:20}
     //ES5
     var x = 10,
       y = 20;
     obj = { x: x, y: y };
     console.log(obj); // {x: 10, y:20}
     ```

     **[⬆ Back to Top](#table-of-contents)**

317. ### What are dynamic imports?

     The dynamic imports using `import()` function syntax allows us to load modules on demand by using promises or the async/await syntax. Currently this features is in stage4 proposal(https://github.com/tc39/proposal-dynamic-import). The main advantage of dynamic imports is reduction of our bundle's sizes, the size/payload response of our requests and overall improvements in the user experience.
     The syntax of dynamic imports would be as below,

     ```javascript
     import("./Module").then((Module) => Module.method());
     ```

     **[⬆ Back to Top](#table-of-contents)**

318. ### What are the use cases for dynamic imports?

     Below are some of the use cases of using dynamic imports over static imports,

     1. Import a module on-demand or conditionally. For example, if you want to load a polyfill on legacy browser

     ```javascript
     if (isLegacyBrowser()) {
         import(···)
         .then(···);
     }
     ```

     2. Compute the module specifier at runtime. For example, you can use it for internationalization.

     ```javascript
     import(`messages_${getLocale()}.js`).then(···);
     ```

     3. Import a module from within a regular script instead a module.

     **[⬆ Back to Top](#table-of-contents)**

319. ### What are typed arrays?

     Typed arrays are array-like objects from ECMAScript 6 API for handling binary data. JavaScript provides 8 Typed array types,

     1. Int8Array: An array of 8-bit signed integers
     2. Int16Array: An array of 16-bit signed integers
     3. Int32Array: An array of 32-bit signed integers
     4. Uint8Array: An array of 8-bit unsigned integers
     5. Uint16Array: An array of 16-bit unsigned integers
     6. Uint32Array: An array of 32-bit unsigned integers
     7. Float32Array: An array of 32-bit floating point numbers
     8. Float64Array: An array of 64-bit floating point numbers

     For example, you can create an array of 8-bit signed integers as below

     ```javascript
     const a = new Int8Array();
     // You can pre-allocate n bytes
     const bytes = 1024;
     const a = new Int8Array(bytes);
     ```

     **[⬆ Back to Top](#table-of-contents)**

320. ### What are the advantages of module loaders?

     The module loaders provides the below features,

     1. Dynamic loading
     2. State isolation
     3. Global namespace isolation
     4. Compilation hooks
     5. Nested virtualization

     **[⬆ Back to Top](#table-of-contents)**

321. ### What is collation?

     Collation is used for sorting a set of strings and searching within a set of strings. It is parameterized by locale and aware of Unicode. Let's take comparision and sorting features,

     1. **Comparison:**

     ```javascript
     var list = ["ä", "a", "z"]; // In German,  "ä" sorts with "a" Whereas in Swedish, "ä" sorts after "z"
     var l10nDE = new Intl.Collator("de");
     var l10nSV = new Intl.Collator("sv");
     console.log(l10nDE.compare("ä", "z") === -1); // true
     console.log(l10nSV.compare("ä", "z") === +1); // true
     ```

     2. **Sorting:**

     ```javascript
     var list = ["ä", "a", "z"]; // In German,  "ä" sorts with "a" Whereas in Swedish, "ä" sorts after "z"
     var l10nDE = new Intl.Collator("de");
     var l10nSV = new Intl.Collator("sv");
     console.log(list.sort(l10nDE.compare)); // [ "a", "ä", "z" ]
     console.log(list.sort(l10nSV.compare)); // [ "a", "z", "ä" ]
     ```

     **[⬆ Back to Top](#table-of-contents)**

322. ### What is for...of statement?

     The for...of statement creates a loop iterating over iterable objects or elements such as built-in String, Array, Array-like objects (like arguments or NodeList), TypedArray, Map, Set, and user-defined iterables. The basic usage of for...of statement on arrays would be as below,

     ```javascript
     let arrayIterable = [10, 20, 30, 40, 50];

     for (let value of arrayIterable) {
       value++;
       console.log(value); // 11 21 31 41 51
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

323. ### What is the output of below spread operator array?

     ```javascript
     [..."John Resig"];
     ```

     The output of the array is ['J', 'o', 'h', 'n', '', 'R', 'e', 's', 'i', 'g']
     **Explanation:** The string is an iterable type and the spread operator with in an array maps every character of an iterable to one element. Hence, each character of a string becomes an element within an Array.

     **[⬆ Back to Top](#table-of-contents)**

324. ### Is PostMessage secure?

     Yes, postMessages can be considered very secure as long as the programmer/developer is careful about checking the origin and source of an arriving message. But if you try to send/receive a message without verifying its source will create cross-site scripting attacks.

     **[⬆ Back to Top](#table-of-contents)**

325. ### What are the problems with postmessage target origin as wildcard?

     The second argument of postMessage method specifies which origin is allowed to receive the message. If you use the wildcard “\*” as an argument then any origin is allowed to receive the message. In this case, there is no way for the sender window to know if the target window is at the target origin when sending the message. If the target window has been navigated to another origin, the other origin would receive the data. Hence, this may lead to XSS vulnerabilities.

     ```javascript
     targetWindow.postMessage(message, "*");
     ```

     **[⬆ Back to Top](#table-of-contents)**

326. ### How do you avoid receiving postMessages from attackers?

     Since the listener listens for any message, an attacker can trick the application by sending a message from the attacker’s origin, which gives an impression that the receiver received the message from the actual sender’s window. You can avoid this issue by validating the origin of the message on the receiver's end using “message.origin” attribute. For examples, let's check the sender's origin(http://www.some-sender.com) on receiver side(www.some-receiver.com),

     ```javascript
     //Listener on http://www.some-receiver.com/
     window.addEventListener("message", function(message){
         if(/^http://www\.some-sender\.com$/.test(message.origin)){
              console.log('You recieved the data from valid sender', message.data);
        }
     });
     ```

     **[⬆ Back to Top](#table-of-contents)**

327. ### Can I avoid using postMessages completely?

     You cannot avoid using postMessages completely(or 100%). Even though your application doesn’t use postMessage considering the risks, a lot of third party scripts use postMessage to communicate with the third party service. So your application might be using postMessage without your knowledge.

     **[⬆ Back to Top](#table-of-contents)**

328. ### Is postMessages synchronous?

     The postMessages are synchronous in IE8 browser but they are asynchronous in IE9 and all other modern browsers (i.e, IE9+, Firefox, Chrome, Safari).Due to this asynchronous behaviour, we use a callback mechanism when the postMessage is returned.

     **[⬆ Back to Top](#table-of-contents)**

329. ### What paradigm is Javascript?

     JavaScript is a multi-paradigm language, supporting imperative/procedural programming, Object-Oriented Programming and functional programming. JavaScript supports Object-Oriented Programming with prototypical inheritance.

     **[⬆ Back to Top](#table-of-contents)**

330. ### What is the difference between internal and external javascript?

     **Internal JavaScript:** It is the source code with in the script tag.
     **External JavaScript:** The source code is stored in an external file(stored with .js extension) and referred with in the tag.

     **[⬆ Back to Top](#table-of-contents)**

331. ### Is JavaScript faster than server side script?

     Yes, JavaScript is than server side script. Because JavaScript is a client-side script it does require any web server’s help for its computation or calculation. So JavaScript is always faster than any server-side script like ASP, PHP, etc.

     **[⬆ Back to Top](#table-of-contents)**

332. ### How do you get the status of a checkbox?

     You can apply `checked` property on selected checkbox in the DOM. If the value is `True` means the checkbox is checked otherwise it is unchecked. For example, the below HTML checkbox element can be access using javascript as below,

     ```html
     <input type="checkbox" name="checkboxname" value="Agree" /> Agree the
     conditions<br />
     ```

     ```javascript
     console.log(document.getElementById(‘checkboxname’).checked); // true or false
     ```

     **[⬆ Back to Top](#table-of-contents)**

333. ### What is the purpose of double tilde operator?

     The double tilde operator(~~) is known as double NOT bitwise operator. This operator is going to be a quicker substitute for Math.floor().

     **[⬆ Back to Top](#table-of-contents)**

334. ### How do you convert character to ASCII code?

     You can use `String.prototype.charCodeAt()` method to convert string characters to ASCII numbers. For example, let's find ASCII code for the first letter of 'ABC' string,

     ```javascript
     "ABC".charCodeAt(0); // returns 65
     ```

     Whereas `String.fromCharCode()` method to convert numbers to equal ASCII character.

     ```javascript
     String.fromCharCode(65, 66, 67); // returns 'ABC'
     ```

     **[⬆ Back to Top](#table-of-contents)**

335. ### What is ArrayBuffer?

     An ArrayBuffer object is used to represent a generic, fixed-length raw binary data buffer. You can create it as below,

     ```javascript
     let buffer = new ArrayBuffer(16); // create a buffer of length 16
     alert(buffer.byteLength); // 16
     ```

     To manipulate an ArrayBuffer, we need to use a “view” object.

     ```javascript
     //Create a DataView referring to the buffer
     let view = new DataView(buffer);
     ```

     **[⬆ Back to Top](#table-of-contents)**

336. ### What is the output of below string expression?

     ```javascript
     console.log("Welcome to JS world"[0]);
     ```

     The output of the above expression is "W".
     **Explanation:** The bracket notation with specific index on a string returns the character at a specific location. Hence, it returns character "W" of the string. Since this is not supported in IE7 and below versions, you may need to use .charAt() method to get the desired result.

     **[⬆ Back to Top](#table-of-contents)**

337. ### What is the purpose of Error object?

     The Error constructor creates an error object and the instances of error objects are thrown when runtime errors occur. The Error object can also be used as a base object for user-defined exceptions. The syntax of error object would be as below,

     ```javascript
     new Error([message[, fileName[, lineNumber]]])
     ```

     You can throw user defined exceptions or errors using Error object in try...catch block as below,

     ```javascript
     try {
       if(withdraw > balance)
       throw new Error('Oops! You don't have enough balance');
     } catch (e) {
       console.log(e.name + ': ' + e.message);
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

338. ### What is the purpose of EvalError object?

     The EvalError object indicates an error regarding the global `eval()` function. Even though this exception is not thrown by JavaScript anymore, the EvalError object remains for compatibility. The syntax of this expression would be as below,

     ```javascript
     new EvalError([message[, fileName[, lineNumber]]])
     ```

     You can throw EvalError with in try...catch block as below,

     ```javascript
     try {
       throw new EvalError('Eval function error', 'someFile.js', 100);
     } catch (e) {
       console.log(e.message, e.name, e.fileName);              // "Eval function error", "EvalError", "someFile.js"
     ```

     **[⬆ Back to Top](#table-of-contents)**

339. ### What are the list of cases error thrown from non-strict mode to strict mode?

     When you apply 'use strict'; syntax, some of the below cases will throw a SyntaxError before executing the script

     1. When you use Octal syntax

     ```javascript
     var n = 022;
     ```

     2. Using `with` statement
     3. When you use delete operator on a variable name
     4. Using eval or arguments as variable or function argument name
     5. When you use newly reserved keywords
     6. When you declare a function in a block

     ```javascript
     if (someCondition) {
       function f() {}
     }
     ```

     Hence, the errors from above cases helpful to avoid errors in development/production environments.

     **[⬆ Back to Top](#table-of-contents)**

340. ### Is all objects have prototypes?

     No. All objects have prototypes except for the base object which is created by the user, or an object that is created using the new keyword.

     **[⬆ Back to Top](#table-of-contents)**

341. ### What is the difference between a parameter and an argument?

     Parameter is the variable name of a function definition whereas an argument represent the value given to a function when it is invoked. Let's explain this with a simple function

     ```javascript
     function myFunction(parameter1, parameter2, parameter3) {
       console.log(arguments[0]); // "argument1"
       console.log(arguments[1]); // "argument2"
       console.log(arguments[2]); // "argument3"
     }
     myFunction("argument1", "argument2", "argument3");
     ```

     **[⬆ Back to Top](#table-of-contents)**

342. ### What is the purpose of some method in arrays?

     The some() method is used to test whether at least one element in the array passes the test implemented by the provided function. The method returns a boolean value. Let's take an example to test for any odd elements,

     ```javascript
     var array = [1, 2, 3, 4, 5, 6 ,7, 8, 9, 10];

     var odd = element ==> element % 2 !== 0;

     console.log(array.some(odd)); // true (the odd element exists)
     ```

     **[⬆ Back to Top](#table-of-contents)**

343. ### How do you combine two or more arrays?

     The concat() method is used to join two or more arrays by returning a new array containing all the elements. The syntax would be as below,

     ```javascript
     array1.concat(array2, array3, ..., arrayX)
     ```

     Let's take an example of array's concatenation with veggies and fruits arrays,

     ```javascript
     var veggies = ["Tomato", "Carrot", "Cabbage"];
     var fruits = ["Apple", "Orange", "Pears"];
     var veggiesAndFruits = veggies.concat(fruits);
     console.log(veggiesAndFruits); // Tomato, Carrot, Cabbage, Apple, Orange, Pears
     ```

     **[⬆ Back to Top](#table-of-contents)**

344. ### What is the difference between Shallow and Deep copy?

     There are two ways to copy an object,

     ### Shallow Copy

     Shallow copy is a bit-wise copy of an object. A new object is created that has an exact copy of the values in the original object. If any of the fields of the object are references to other objects, just the reference addresses are copied i.e., only the memory address is copied.

     ### Example

     ```
     var empDetails = {
       name: "John", age: 25, expertise: "Software Developer"
     }
     ```

     to create a duplicate

     ```
     var empDetailsShallowCopy = empDetails    //Shallow copying!
     ```

     if we change some property value in the duplicate one like this:

     ```
     empDetailsShallowCopy.name = "Johnson"
     ```

     The above statement will also change the name of `empDetails`, since we have a shallow copy. That means we're loosing the original data as well.

     ### Deep copy

     A deep copy copies all fields, and makes copies of dynamically allocated memory pointed to by the fields. A deep copy occurs when an object is copied along with the objects to which it refers.

     ### Example

     ```
     var empDetails = {
       name: "John", age: 25, expertise: "Software Developer"
     }
     ```

     Create a deep copy by using the properties from the original object into new variable

     ```
     var empDetailsDeepCopy = {
       name: empDetails.name,
       age: empDetails.age,
       expertise: empDetails.expertise
     }
     ```

     Now if you change `empDetailsDeepCopy.name`, it will only affect `empDetailsDeepCopy` & not `empDetails`

     **[⬆ Back to Top](#table-of-contents)**

345. ### How do you create specific number of copies of a string?
     The `repeat()` method is used to construct and returns a new string which contains the specified number of copies of the string on which it was called, concatenated together. Remember that this method has been added to the ECMAScript 2015 specification.
     Let's take an example of Hello string to repeat it 4 times,
     ```javascript
     "Hello".repeat(4); // 'HelloHelloHelloHello'
     ```
346. ### How do you return all matching strings against a regular expression?

     The `matchAll()` method can be used to return an iterator of all results matching a string against a regular expression. For example, the below example returns an array of matching string results against a regular expression,

     ```javascript
     let regexp = /Hello(\d?))/g;
     let greeting = "Hello1Hello2Hello3";

     let greetingList = [...greeting.matchAll(regexp)];

     console.log(greetingList[0]); //Hello1
     console.log(greetingList[1]); //Hello2
     console.log(greetingList[2]); //Hello3
     ```

     **[⬆ Back to Top](#table-of-contents)**

347. ### How do you trim a string at the beginning or ending?

     The `trim` method of string prototype is used to trim on both sides of a string. But if you want to trim especially at the beginning or ending of the string then you can use `trimStart/trimLeft` and `trimEnd/trimRight` methods. Let's see an example of these methods on a greeting message,

     ```javascript
     var greeting = "   Hello, Goodmorning!   ";

     console.log(greeting); // "   Hello, Goodmorning!   "
     console.log(greeting.trimStart()); // "Hello, Goodmorning!   "
     console.log(greeting.trimLeft()); // "Hello, Goodmorning!   "

     console.log(greeting.trimEnd()); // "   Hello, Goodmorning!"
     console.log(greeting.trimRight()); // "   Hello, Goodmorning!"
     ```

     **[⬆ Back to Top](#table-of-contents)**

348. ### What is the output of below console statement with unary operator?

     Let's take console statement with unary operator as given below,

     ```javascript
     console.log(+"Hello");
     ```

     The output of the above console log statement returns NaN. Because the element is prefixed by the unary operator and the JavaScript interpreter will try to convert that element into a number type. Since the conversion fails, the value of the statement results in NaN value.

     **[⬆ Back to Top](#table-of-contents)**

349. ### Does javascript uses mixins?
     **[⬆ Back to Top](#table-of-contents)**
350. ### What is a thunk function?

     A thunk is just a function which delays the evaluation of the value. It doesn’t take any arguments but gives the value whenever you invoke the thunk. i.e, It is used not to execute now but it will be sometime in the future. Let's take a synchronous example,

     ```javascript
     const add = (x, y) => x + y;

     const thunk = () => add(2, 3);

     thunk(); // 5
     ```

     **[⬆ Back to Top](#table-of-contents)**

351. ### What are asynchronous thunks?
     The asynchronous thunks are useful to make network requests. Let's see an example of network requests,
     ```javascript
     function fetchData(fn) {
       fetch("https://jsonplaceholder.typicode.com/todos/1")
         .then((response) => response.json())
         .then((json) => fn(json));
     }
     ```


     const asyncThunk = function (){
        return fetchData(function getData(data){
           console.log(data)
       })
     }

     asyncThunk()
     ```
     The `getData` function won't be called immediately but it will be invoked only when the data is available from API endpoint. The setTimeout function is also used to make our code asynchronous. The best real time example is redux state management library which uses the asynchronous thunks to delay the actions to dispatch.

     **[⬆ Back to Top](#table-of-contents)**

352. ### What is the output of below function calls?

     **Code snippet:**
     const circle = {
     radius: 20,
     diameter() {
     return this.radius _ 2;
     },
     perimeter: () => 2 _ Math.PI \* this.radius
     };

     console.log(circle.diameter());
     console.log(circle.perimeter());

     **Output:**

     The output is 40 and NaN. Remember that diameter is a regular function, whereas the value of perimeter is an arrow function. The this keyword of a regular function(i.e, diameter) refers to surrounding scope which is a class(i.e, Shape object). Whereas this keyword of perimeter function refers the surrounding scope which is window object. Since there is no radius property on window object it returns an undefined value and the multiple of number value returns NaN value.

     **[⬆ Back to Top](#table-of-contents)**

353. ### How to remove all line breaks from a string?

     The easiest approach is using regular expressions to detect and replace newlines in the string. In this case, we use replace function along with string to replace with, which in our case is an empty string.

     ```javascript
     function remove_linebreaks( var message ) {
         return message.replace( /[\r\n]+/gm, "" );
     }
     ```

     In the above expression, g and m are for global and multiline flags.

     **[⬆ Back to Top](#table-of-contents)**

354. ### What is the difference between reflow and repaint?

     A _repaint_ occurs when changes are made which affect the visibility of an element, but not its layout. Examples of this include outline, visibility, or background color. A _reflow_ involves changes that affect the layout of a portion of the page (or the whole page). Resizing the browser window, changing the font, content changing (such as user typing text), using JavaScript methods involving computed styles, adding or removing elements from the DOM, and changing an element's classes are a few of the things that can trigger reflow. Reflow of an element causes the subsequent reflow of all child and ancestor elements as well as any elements following it in the DOM.

     **[⬆ Back to Top](#table-of-contents)**

355. ### What happens with negating an array?
     Negating an array with `!` character will coerce the array into a boolean. Since Arrays are considered to be truthy So negating it will return `false`.
     ```javascript
     console.log(![]); // false
     ```
     **[⬆ Back to Top](#table-of-contents)**
356. ### What happens if we add two arrays?

     If you add two arrays together, it will convert them both to strings and concatenate them. For example, the result of adding arrays would be as below,

     ```javascript
     console.log(["a"] + ["b"]); // "ab"
     console.log([] + []); // ""
     console.log(![] + []); // "false", because ![] returns false.
     ```

     **[⬆ Back to Top](#table-of-contents)**

357. ### What is the output of prepend additive operator on falsy values?

     If you prepend additive(+) operator on falsy values(null, undefined, NaN, false, ""), the falsy value converts to a number value zero. Let's display them on browser console as below,

     ```javascript
     console.log(+null); // 0
     console.log(+undefined); // 0
     console.log(+false); // 0
     console.log(+NaN); // 0
     console.log(+""); // 0
     ```

     **[⬆ Back to Top](#table-of-contents)**

358. ### How do you create self string using special characters?

     The self string can be formed with the combination of `[]()!+` characters. You need to remember the below conventions to achieve this pattern.

     1. Since Arrays are truthful values, negating the arrays will produce false: ![] === false
     2. As per JavaScript coercing rules, the addition of arrays together will toString them: [] + [] === ""
     3. Prepend an array with + operator will convert an array to false, the negation will make it true and finally converting the result will produce value '1': +(!(+[])) === 1

     By applying the above rules, we can derive below conditions

     ```javascript
     (![] + [] === "false" + !+[]) === 1;
     ```

     Now the character pattern would be created as below,

     ```javascript
           s               e               l               f
      ^^^^^^^^^^^^^   ^^^^^^^^^^^^^   ^^^^^^^^^^^^^   ^^^^^^^^^^^^^

      (![] + [])[3] + (![] + [])[4] + (![] + [])[2] + (![] + [])[0]
      ^^^^^^^^^^^^^   ^^^^^^^^^^^^^   ^^^^^^^^^^^^^   ^^^^^^^^^^^^^
     (![] + [])[+!+[]+!+[]+!+[]] +
     (![] + [])[+!+[]+!+[]+!+[]+!+[]] +
     (![] + [])[+!+[]+!+[]] +
     (![] + [])[+[]]
     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     (![]+[])[+!+[]+!+[]+!+[]]+(![]+[])[+!+[]+!+[]+!+[]+!+[]]+(![]+[])[+!+[]+!+[]]+(![]+[])[+[]]
     ```

     **[⬆ Back to Top](#table-of-contents)**

359. ### How do you remove falsy values from an array?

     You can apply filter method on array by passing Boolean as parameter. This way it removes all falsy values(0, undefined, null, false and "") from the array.

     ```javascript
     const myArray = [false, null, 1, 5, undefined];
     myArray.filter(Boolean); // [1, 5] // is same as myArray.filter(x => x);
     ```

     **[⬆ Back to Top](#table-of-contents)**

360. ### How do you get unique values of an array?

     You can get unique values of an array with the combination of `Set` and rest expression/spread(...) syntax.

     ```javascript
     console.log([...new Set([1, 2, 4, 4, 3])]); // [1, 2, 4, 3]
     ```

     **[⬆ Back to Top](#table-of-contents)**

361. ### What is destructuring aliases?

     Sometimes you would like to have destructured variable with a different name than the property name. In that case, you'll use a `: newName` to specify a name for the variable. This process is called destructuring aliases.

     ```javascript
     const obj = { x: 1 };
     // Grabs obj.x as as { otherName }
     const { x: otherName } = obj;
     ```

     **[⬆ Back to Top](#table-of-contents)**

362. ### How do you map the array values without using map method?

     You can map the array values without using `map` method by just using `from` method of Array. Let's map city names from Countries array,

     ```javascrippt
     const countries = [
         { name: 'India', capital: 'Delhi' },
         { name: 'US', capital: 'Washington' },
         { name: 'Russia', capital: 'Moscow' },
         { name: 'Singapore', capital: 'Singapore' },
         { name: 'China', capital: 'Beijing' },
         { name: 'France', capital: 'Paris' },
     ];

     const cityNames = Array.from(countries, ({ capital}) => capital);
     console.log(cityNames); // ['Delhi, 'Washington', 'Moscow', 'Singapore', 'Beijing', 'Paris']
     ```

     **[⬆ Back to Top](#table-of-contents)**

363. ### How do you empty an array?

     You can empty an array quicky by setting the array length to zero.

     ```javascript
     let cities = ["Singapore", "Delhi", "London"];
     cities.length = 0; // cities becomes []
     ```

     **[⬆ Back to Top](#table-of-contents)**

364. ### How do you rounding numbers to certain decimals?

     You can rounding numbers to a certain number of decimals using `toFixed` method from native javascript.

     ```javascript
     let pie = 3.141592653;
     pie = pie.toFixed(3); // 3.142
     ```

     **[⬆ Back to Top](#table-of-contents)**

365. ### What is the easiest way to convert an array to an object?

     You can convert an array to an object with the same data using spread(...) operator.

     ```javascript
     var fruits = ["banana", "apple", "orange", "watermelon"];
     var fruitsObject = { ...fruits };
     console.log(fruitsObject); // {0: "banana", 1: "apple", 2: "orange", 3: "watermelon"}
     ```

     **[⬆ Back to Top](#table-of-contents)**

366. ### How do you create an array with some data?

     You can create an array with some data or an array with the same values using `fill` method.

     ```javascript
     var newArray = new Array(5).fill("0");
     console.log(newArray); // ["0", "0", "0", "0", "0"]
     ```

     **[⬆ Back to Top](#table-of-contents)**

367. ### What are the placeholders from console object?

     Below are the list of placeholders available from console object,

     1. %o — It takes an object,
     2. %s — It takes a string,
     3. %d — It is used for a decimal or integer
        These placeholders can be represented in the console.log as below

     ```javascript
     const user = { name: "John", id: 1, city: "Delhi" };
     console.log(
       "Hello %s, your details %o are available in the object form",
       "John",
       user
     ); // Hello John, your details {name: "John", id: 1, city: "Delhi"} are available in object
     ```

     **[⬆ Back to Top](#table-of-contents)**

368. ### Is it possible to add CSS to console messages?

     Yes, you can apply CSS styles to console messages similar to html text on the web page.

     ```javascript
     console.log(
       "%c The text has blue color, with large font and red background",
       "color: blue; font-size: x-large; background: red"
     );
     ```

     The text will be displayed as below,

     ![Screenshot](images/console-CSS.png)
     **Note:** All CSS styles can be applied to console messages.

     **[⬆ Back to Top](#table-of-contents)**

369. ### What is the purpose of dir method of console object?

     The `console.dir()` is used to display an interactive list of the properties of the specified JavaScript object as JSON.

     ```javascript
     const user = { name: "John", id: 1, city: "Delhi" };
     console.dir(user);
     ```

     The user object displayed in JSON representation
     ![Screenshot](images/console-css.png)

     **[⬆ Back to Top](#table-of-contents)**

370. ### Is it possible to debug HTML elements in console?

     Yes, it is possible to get and debug HTML elements in the console just like inspecting elements.

     ```javascript
     const element = document.getElementsByTagName("body")[0];
     console.log(element);
     ```

     It prints the HTML element in the console
     ![Screenshot](images/console-html.png)

     **[⬆ Back to Top](#table-of-contents)**

371. ### How do you display data in a tabular format using console object?

     The `console.table()` is used to display data in the console in a tabular format to visualize complex arrays or objects.

     ```javascript
     const users = [
       { name: "John", id: 1, city: "Delhi" },
       { name: "Max", id: 2, city: "London" },
       { name: "Rod", id: 3, city: "Paris" },
     ];
     console.table(users);
     ```

     The data visualized in a table format
     ![Screenshot](images/console-table.png)
     **Not:** Remember that `console.table()` is not supported in IE.

     **[⬆ Back to Top](#table-of-contents)**

372. ### How do you verify that an argument is a Number or not?

     The combination of IsNaN and isFinite methods are used to confirm whether an argument is a number or not.

     ```javascript
     function isNumber(n) {
       return !isNaN(parseFloat(n)) && isFinite(n);
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

373. ### How do you create copy to clipboard button?

     You need to select the content(using .select() method) of input element and execute the copy command with execCommand (i.e, execCommand('copy')). You can also execute another system commands like cut and paste.

     ```javascript
     document.querySelector("#copy-button").onclick = function () {
       // Select the content
       document.querySelector("#copy-input").select();
       // Copy to the clipboard
       document.execCommand("copy");
     };
     ```

     **[⬆ Back to Top](#table-of-contents)**

374. ### What is the shortcut to get timestamp?

     You can use `new Date().getTime()` to get the current timestamp. There is an alternative shortcut to get the value.

     ```javascript
     console.log(+new Date());
     console.log(Date.now());
     ```

     **[⬆ Back to Top](#table-of-contents)**

375. ### How do you flattening multi dimensional arrays?

     Flattening bi-dimensional arrays is trivial with Spread operator.

     ```javascript
     const biDimensionalArr = [11, [22, 33], [44, 55], [66, 77], 88, 99];
     const flattenArr = [].concat(...biDimensionalArr); // [11, 22, 33, 44, 55, 66, 77, 88, 99]
     ```

     But you can make it work with multi-dimensional arrays by recursive calls,

     ```javascript
     function flattenMultiArray(arr) {
       const flattened = [].concat(...arr);
       return flattened.some((item) => Array.isArray(item))
         ? flattenMultiArray(flattened)
         : flattened;
     }
     const multiDimensionalArr = [11, [22, 33], [44, [55, 66, [77, [88]], 99]]];
     const flatArr = flattenMultiArray(multiDimensionalArr); // [11, 22, 33, 44, 55, 66, 77, 88, 99]
     ```

     **[⬆ Back to Top](#table-of-contents)**

376. ### What is the easiest multi condition checking?

     You can use `indexOf` to compare input with multiple values instead of checking each value as one condition.

     ```javascript
     // Verbose approach
     if (
       input === "first" ||
       input === 1 ||
       input === "second" ||
       input === 2
     ) {
       someFunction();
     }
     // Shortcut
     if (["first", 1, "second", 2].indexOf(input) !== -1) {
       someFunction();
     }
     ```

     **[⬆ Back to Top](#table-of-contents)**

377. ### How do you capture browser back button?

     The `window.onbeforeunload` method is used to capture browser back button event. This is helpful to warn user about loosing the current data.

     ```javascript
     window.onbeforeunload = function () {
       alert("You work will be lost");
     };
     ```

     **[⬆ Back to Top](#table-of-contents)**

378. ### How do you disable right click in the web page?

     The right click on the page can be disabled by returning false from `oncontextmenu` attribute on body element.

     ```html
     <body oncontextmenu="return false;"></body>
     ```

     **[⬆ Back to Top](#table-of-contents)**

379. ### What are wrapper objects?

     Primitive Values like string,number and boolean don't have properties and methods but they are temporarily converted or coerce to an object(Wrapper object) when you try to perform actions on them. For example, if you apply toUpperCase() method on a primitive string value, it does not throw an error but returns uppercase of the string.

     ```javascript
     let name = "john";

     console.log(name.toUpperCase()); // Behind the scenes treated as console.log(new String(name).toUpperCase());
     ```

     i.e, Every primitive except null and undefined have Wrapper Objects and the list of wrapper objects are are String,Number,Boolean,Symbol and BigInt.
     **[⬆ Back to Top](#table-of-contents)**

380. ### What is AJAX?

     AJAX stands for Asynchronous JavaScript and XML and it is a group of related technologies(HTML, CSS, JavaScript, XMLHttpRequest API etc) used to display data asynchronously. i.e. We can send data to the server and get data from the server without reloading the web page.

     **[⬆ Back to Top](#table-of-contents)**

381. ### What are the different ways to deal with Asynchronous Code?

     Below are the list of different way to deal with Asynchronous code.

     1. Callbacks
     2. Promises
     3. Async/await
     4. Third-party libraries such as async.js,bluebird etc

     **[⬆ Back to Top](#table-of-contents)**

382. ### How to cancel a fetch request?

     Until few days back, One shortcoming of native promises is no direct way to cancel a fetch request. But the new `AbortController` from js specification allows you to use a signal to abort one or multiple fetch calls.
     The basic flow of cancelling a fetch request would be as below,

     1. Create an `AbortController` instance
     2. Get the signal property of an instance and pass the signal as a fetch option for signal
     3. Call the AbortController's abort property to cancel all fetches that use that signal
        For example, let's pass the same signal to multiple fetch calls will cancel all requests with that signal,

     ```js
     const controller = new AbortController();
     const { signal } = controller;

     fetch("http://localhost:8000", { signal })
       .then((response) => {
         console.log(`Request 1 is complete!`);
       })
       .catch((e) => {
         if (e.name === "AbortError") {
           // We know it's been canceled!
         }
       });

     fetch("http://localhost:8000", { signal })
       .then((response) => {
         console.log(`Request 2 is complete!`);
       })
       .catch((e) => {
         if (e.name === "AbortError") {
           // We know it's been canceled!
         }
       });

     // Wait 2 seconds to abort both requests
     setTimeout(() => controller.abort(), 2000);
     ```

     **[⬆ Back to Top](#table-of-contents)**

383. ### What is web speech API?

     **[⬆ Back to Top](#table-of-contents)**

384. ### What is minimum timeout throttling?

     Both browser and NodeJS javascript environments, throttles with a minimum delay that is greater than 0ms. That means even though setting a delay of 0ms will not happen instantaneously.
     **Browsers:** They have minimum delay of 4ms. This throttle occurs when successive calls are triggered due to callback nesting(certain depth) or after a certain number of successive intervals.
     Note: The older browsers has minimum delay of 10ms.
     **Nodejs:** They have minimum delay of 1ms. This throttle happens when delay is larger than 2147483647 or less than 1.
     The best example to explain this timeout throttling behavior is the order of below code snippet.

     ```js
     function runMeFirst() {
       console.log("My script is initialized");
     }
     setTimeout(runMeFirst, 0);
     console.log("Script loaded");
     ```

     and the output would be in

     ```cmd
     Script loaded
     My script is initialized
     ```

     If you don't use `setTimeout`, the order of logs will be in sequential.

     ```js
     function runMeFirst() {
       console.log("My script is initialized");
     }
     runMeFirst();
     console.log("Script loaded");
     ```

     and the output is,

     ```cmd
     My script is initialized
     Script loaded
     ```

     **[⬆ Back to Top](#table-of-contents)**

385. ### How do you implement zero timeout in modern browsers?

     You can't use setTimeout(fn, 0) to execute the code immediately due to minimum delay of greater than 0ms. But you can use window.postMessage() to achieve this behavior.

     **[⬆ Back to Top](#table-of-contents)**

386. ### What are tasks in event loop?

     A task is any javascript code/program which is scheduled to be run by the standard mechanisms such as initially starting to run a program, run an event callback, or an interval or timeout being fired. All these tasks are schedules on task queue.
     Below is the list of use cases to add tasks to the task queue,

     1. When a new javascript program is executed directly from console or running by the <script> element, the task will be added to task queue.
     2. When an event fires, the event callback added to task queue
     3. When a setTimeout or setInterval is reached, the corresponding callback added to task queue

     **[⬆ Back to Top](#table-of-contents)**

387. ### What is microtask?

     Microtask is the javascript code which needs to be executed immediately after the currently executing task/microtask is completed. The main sources of microtasks are Promise.resolve, Promise.reject, MutationObservers, IntersectionObservers etc

     **[⬆ Back to Top](#table-of-contents)**

388. ### What are different event loops?


     **[⬆ Back to Top](#table-of-contents)**

388. ### What is the purpose of queueMicrotask?

     **[⬆ Back to Top](#table-of-contents)**

389. ### How do you use javascript libraries in typescript file?

     It is known that not all JavaScript libraries or frameworks have TypeScript declaration files. But if you still want to use libraries or frameworks in our TypeScript files without getting compilation errors, the only solution is `declare` keyword along with a variable declaration. For example, let's imagine you have a library called `customLibrary` that doesn’t have a TypeScript declaration and have a namespace called `customLibrary` in the global namespace. You can use this library in typescript code as below,

     ```js
     declare var customLibrary;
     ```

     In the runtime, typescript will provide the type to `customLibrary` variable as `any` type. The another alternative without using declare keyword is below

     ```js
     var customLibrary: any;
     ```

     **[⬆ Back to Top](#table-of-contents)**

390. ### What are the differences between promises and observables?

     Some of the major difference in a tabular form

     | Promises                                                           | Observables                                                                              |
     | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
     | Emits only a single value at a time                                | Emits multiple values over a period of time(stream of values ranging from 0 to multiple) |
     | Eager in nature; they are going to be called immediately           | Lazy in nature; they require subscription to be invoked                                  |
     | Promise is always asynchronous even though it resolved immediately | Observable can be either synchronous or asynchronous                                     |
     | Doesn't provide any operators                                      | Provides operators such as map, forEach, filter, reduce, retry, and retryWhen etc        |
     | Cannot be canceled                                                 | Canceled by using unsubscribe() method                                                   |

     **[⬆ Back to Top](#table-of-contents)**
