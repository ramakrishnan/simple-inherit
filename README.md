
[![NPM version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=0.0.4&x2=0)](https://www.npmjs.com/package/simple-inherit)


# simple-inherit

This module provides a simple way to inherit function and extending its prototype properties

# Getting Started

You can install using Node Package Manager (npm):

nipm install simple-inherit

# Features
* Gets a copy of the Base's prototype.
* Gets a copy of the Base class's static properties.
* Shares the same constructor of the base class, (unless supplied its own)
* Extends the derived class's perperty chain using extendPrototype
* Access the immediate parent's prototype chain using `__super__`

# Usage

```js
var inherits = require('simple-inherit');
var Base = function() { };

// Derived class with no constructor.
var Derived = inherits(Base);

// Derived class with its own  constructor.
var Derived = inherits(Base, function() { });

```
# Example

Lets say a Base function as below
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

### Use `extendPrototype` to add more prototype properties.
```js
Derived.extendPrototype({
  "derivedProto": 'I am derived prototype'
});
var d = new Derived();
d.derivedProto            //  I am derived prototype
```

### Use `__super__` to access immediate parent's property chain
```js
Derived.extendPrototype({
  "derivedProto": function() {
    return Derived.__super__.baseProto;
  }
});
var d = new Derived();
d.derivedProto()            //  Prototype of Base
```
