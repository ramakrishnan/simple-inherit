# simple-inherit

This module provides a simple way to inherit function and extending its prototype properties

# Getting Started

You can install using Node Package Manager (npm):
npm install simple-inherit

# Usage

```js
var inherits = require('simple-inherit');
var Base = function() { };

// Derived class with no constructor.
var Derived = inherits(Base);

// Derived class with its own  constructor.
var Derived = inherits(Base, function() { 

});

```
# Example

Ltes say a base function as below
```js
var inherits = require('simple-inherit');
var Base = function() {
  this.me = "I am from Base";
}
Base.staticProperty = "Base";
Base.prototype = {
  "baseProto" : "Prototype of Base"
};
```
This can be inherited by another function, which will in turn get all the properties of the Base class, like.
* Gets a copy of the Base's prototype.
* Gets a copy of the Base class's static properties.
* Shares the same constructor of the base class, (unless supplied its own)

### Derived class with no constructor
```js
var Derived = inhertis(Base);
var d = new Derived();
d.me                    //  I am from Base
d.baseProto             //  Prototype of Base
Derived.staticProperty  // Base
```

### Derived class with its own constructor
```js
var Derived = inhertis(Base, function() {
  this.him = 'I am from derived class';
});
var d = new Derived();
d.him                   //  I am from derived class
d.baseProto             //  Prototype of Base
Derived.staticProperty  // Base
```

### Use extendPrototype to add more prototype properties.
```js
Derived.extendPrototype({
  "derivedProto": 'I am derived prototype'
});
var d = new Derived();
d.derivedProto            //  I am derived prototype
```
