/**
* Inherits functions
* @exports
* @param {Function} baseClass
* @param {Function|null} derivedClass
* @returns {Function} derivedClass
*/
module.exports = function(parent, child) {
    // When no constructor for child class is specified, inherit it from parent.
    if (!child) {
        child = function () { return parent.apply(this, arguments); };
    }

    // Extend the static properties
    Object.keys(parent).forEach(function (name) {
        child[name] = parent[name];
    });

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent` constructor function.
    var Surrogate = function() {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    child.extendPrototype = function(properties) {
        for (var name in properties) {
            child.prototype[name] = properties[name];
        }
    };

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;
    return child;
};