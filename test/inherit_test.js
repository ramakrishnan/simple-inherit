var assert = require('chai').assert;
var inherits = require('../lib/inherit');

describe('Simple Inherit', function() {
    describe('Check for static methods', function () {
        var Base = function () {};
        Base.static_prop = 'base static property';
        var Derived = inherits(Base);
        it ("Should take base's static methods", function() {
            assert.isNotNull(Derived.static_prop);
        });
        it ("Should get a static method extendPrototype", function() {
            assert.isFunction(Derived.extendPrototype);
        });
        it ("Should have a handy method __super__ to call parent's prototype", function() {
            assert.isObject(Derived.__super__);
        });
    });
    describe('Check for constructor', function () {
        context('When NO constructor is provided', function() {
            var Base = function (data) {
                this.me    = 'something';
                this.extra = data;
            };
            var Derived = inherits(Base);
            it ("Should follow the base's constructor", function() {
                var d = new Derived();
                assert.equal(d.me, 'something');
            });
            it ("Can also pass arguments to base's constructor", function() {
                var d = new Derived('from_derived');
                assert.equal(d.extra, 'from_derived');
            })
        });
        context('When A constructor is provided', function() {
            var Base = function (data) {
                this.me    = 'something';
                this.extra = data;
            };
            var Derived = inherits(Base, function(data) {
                this.more = data;
            });
            it ("Should not follow the base's constructor", function() {
                var d = new Derived();
                assert.isUndefined(d.me);
            });
            it ("Can pass arguments to its own constructor", function() {
                var d = new Derived('to_derived');
                assert.equal(d.more, 'to_derived');
            })
        });
        context('For a inheritance chain more than one level', function() {
            var Base = function (data) {
                this.baseMe    = 'something';
                this.extra = data;
            };
            var Level1 = inherits(Base, function () {
                this.him    = 'from_level_one';
            });
            var Derived = inherits(Level1);
            it ("Should follow its immediate parent's constructor", function() {
                var d = new Derived();
                assert.equal(d.him, 'from_level_one');
            });
            it ("Should not follow its grand parent's constructor", function() {
                var d = new Derived();
                assert.isNotNull(d.baseMe);
            });
        })
    });
    describe('Check for prototype extension', function() {
        context('When base class has prototype', function() {
            var Base = function () {};
            Base.prototype = {
                'proto_1' : 'From base proto_1'
            };
            var Derived = inherits(Base);
            it ("Should pass on the prototype properties to derived class", function() {
                var d = new Derived();
                assert.isDefined(d.proto_1);
            });
        });
        context('When base class has no prototype and derived class extends prototype', function() {
            var Base = function () {};
            var Derived = inherits(Base);
            Derived.extendPrototype({
                'd_proto_1' : 'from_derived_class'
            });
            it ("Should access its prototype properties", function() {
                var d = new Derived();
                assert.isDefined(d.d_proto_1);
            });
        });
        context('When both derived and base class has prototype properties', function() {
            var Base = function () {};
            Base.prototype = {
                'proto_1' : 'From base proto_1'
            };
            var Derived = inherits(Base);
            Derived.extendPrototype({
                'd_proto_1' : 'from_derived_class'
            });
            it ("Should access its prototype properties", function() {
                var d = new Derived();
                assert.isDefined(d.d_proto_1);
            });
            it ("Should also access base class prototype properties", function() {
                var d = new Derived();
                assert.isDefined(d.proto_1);
            });
        });
        context('When all function in inheritance chain has prototype properties', function() {
            var Base = function (data) {
                this.baseMe    = 'something';
                this.extra = data;
            };
            Base.prototype = {
                'base_proto_1' : 'I am from base'
            };
            var Level1 = inherits(Base, function () {
                this.him    = 'from_level_one';
            });
            Level1.extendPrototype({
                'level1_proto_1':  'I am from level1'
            });
            var Derived = inherits(Level1);
            Derived.extendPrototype({
                'derviced_proto_1':  'I am from derived'
            });
            context('An instance of the derived class', function () {
                it ("Can access its prototype properties", function() {
                    var d = new Derived();
                    assert.equal(d.derviced_proto_1, 'I am from derived');
                });
                it ("Can also access its immediate parent class prototype properties", function() {
                    var d = new Derived();
                    assert.isDefined(d.level1_proto_1);
                });
                it ("Can access its ancestor's prototype properties", function() {
                   var d = new Derived();
                   assert.equal(d.base_proto_1, 'I am from base');
                });
            });
            it ("The inherited class can access the ancestor's  prototype properties using __super__", function() {
                assert.equal(Derived.__super__.level1_proto_1, 'I am from level1');
            });
        });
    });
});