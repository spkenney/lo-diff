var chai = require('chai');
var assert = chai.assert;

var lodiff = require('../lo-diff.js');

var getPaths = lodiff.getPaths;
var oneWayDiff = lodiff.oneWayDiff;
var diffPaths = lodiff.diffPaths;
var diff = lodiff.diff;
 
//----------------//
//   Test Data
//---------------//

var a = {
  prop1: 1,
  prop2: {
    prop3: {prop6: 4},
    prop4: 3,
    prop5: 6,
    prop7: 7
  },
  prop10: {prop11: 11}
};

var b = {
  prop1: 1,
  prop2: {
    prop3: {prop6: 3},
    prop4: 3,
    prop5: 5,
    prop8: 8
  },
  prop9: 9
};

//------------//

describe('diff()', function() {
  it('should do a deep diff', function() {
    var expected = {
      diff: {
        'prop2.prop3.prop6': { ref: 4, targ: 3 },
        'prop2.prop5': { ref: 6, targ: 5 },
        'prop2.prop7': { ref: 7, targ: undefined },
        'prop10.prop11': { ref: 11, targ: undefined },
        'prop2.prop8': { ref: undefined, targ: 8 },
        prop9: { ref: undefined, targ: 9 }
      },
      match: {
        prop1: 1,
        'prop2.prop4': 3
      }
    };
    
    var results = diff(a,b);
    assert.deepEqual(results, expected, 'Did not match expected deep diff results');
  });
});

describe('diffPaths()', function() {
  it('should get paths of different values', function() {
    var expected = [
      'prop2.prop3.prop6',
      'prop2.prop5',
      'prop2.prop7',
      'prop10.prop11',
      'prop2.prop8',
      'prop9'
    ];
    
    var results = diffPaths(a, b);
    assert.deepEqual(results, expected, 'Did not match expected array of paths');
  });
});

describe('getPaths()', function() {
  it('should get paths of the object', function() {
    var expected = [
      'prop1',
      'prop2.prop3.prop6',
      'prop2.prop4',
      'prop2.prop5',
      'prop2.prop7',
      'prop10.prop11'
    ];
    
    var results = getPaths(a);
    assert.deepEqual(results, expected, 'Did not match all paths of object');
  });
});

describe('oneWayDiff()', function() {
  it('should get the paths of the one-way diff of the objects', function() {
    var expected = [
      'prop2.prop3.prop6',
      'prop2.prop5',
      'prop2.prop7',
      'prop10.prop11'
    ];
    
    var results = oneWayDiff(a, b);
    assert.deepEqual(results, expected, 'Did not match expected one-way diff of objects');
  });
});