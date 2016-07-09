# lo-diff

###### Utility leveraging Lodash methods to calculate the deep diff of two objects

Returns an object that contains both the different and matching values of the reference and target objects.

The returned object will contain a 'diff' object whose keys are those that differ between the reference and target object, each key's value will be an object with the keys 'ref' and 'targ', whose values will be the value of the given key in each object.

The object will also contain a 'match' object whose keys and values are those that are the same in the reference and target objects.

## Installation

##### Using npm:
```bash
$ npm install --save lo-diff
```

##### In Node.js:
```js
// Load the just the diff function.
var diff = require('lo-diff').diff;
// Load the full module.
var lodiff = require('lo-diff');
```

##### Test:
```bash
$ npm test
```

## Use

##### Example:
```js
// Load the just the diff function.
var diff = require('lo-diff').diff;

var = objA = { // reference object
  name: 'cart',
  items: {
    apple: 2,
    carrots: 5,
    plums: 4
  }
};

var objB = {    // target object
  name: 'cart', // same name
  items: {      // same object 'items'
    apple: 5,   // same key 'apples', different quantity
    carrots: 5, // same key and quantity
                // missing key 'plums'
    pears: 6    // new key 'pears'
  }
};

// calculate diff
var result = diff(objA, objB);

// result
{
  diff: {
    'items.apple': { ref: 2, targ: 5 },
    'items.plums': { ref: 4, targ: undefined },
    'items.pears': { ref: undefined, targ: 6 }
  },
  match: {
    name: 'cart',
    'items.carrots': 5
  }
}
```

##### Output Format:
```js
var results = {
  diff : {
    key1: {
      ref: val1,
      targ: val2
    },
    key2 : {
      ref: val1,
      targ: val2
    }
  },
  match ; {
    key1: val1,
    key2: val2
  }
};
```

## API

#### diff(ref, targ)
Returns an object containing both the different and matching values of the reference and target objects.
```js
/**
 * Returns an object containing both the different and matching values of the
 * reference and target objects.
 *
 * The object will contain a 'diff' object whose keys are those that differ
 * between the reference and target object, each key's value will be an
 * object with the keys 'ref' and 'targ', whose values will be the value of
 * the given key in each object.
 *
 * The object will also contain a 'match' object whose keys and values are
 * those that are the same in the reference and target objects.
 *
 * @param {Object} ref Reference object in diff
 * @param {Object) targ Target object in diff
 * @return (Object} results Object containing differing and
 *    matching obj values
 */
function diff(ref, targ)
```
#### oneWayDiff(x, y, k)
Determines the one-way difference between two objects and returns a String Array of Key Paths representing the differences.

```js
/**
* Determines the one-way difference between two objects and returns a String
* Array of Key Paths representing the differences.
*
* Key Paths of object x are returned where the value for the same path in
* object y is different than object x or where the key path doesn't exist in
* object y
*
* @param {Object} x Reference object in diff
* @param {Object} y Target object in diff
* @param {String} k Optional String representing a Key. Will be used to
*     access sub-object of x and y for comparison (i.e., x[k] vs. y[k])
* @return {String[]} result String Array of Key Paths
*/
function oneWayDiff(x, y, k)
```
#### diffPaths(a, b)
Determines the difference between two objects and returns a String Array of Key Paths representing the differences.
```js
/**
 * Determines the difference between two objects and returns a String Array
 * of Key Paths representing the differences.
 *
 * Key Paths of object a and b are returned where the value for the same path
 * in each object is different or where the key path doesn't exist in one of
 * the two objects
 *
 * @param {Object} a Reference object in diff
 * @param {Object} b Target object in diff
 * @return {String[]} result String Array of Key Paths
 */
function diffPaths(a, b)
```
#### getPaths(obj, pre)
Returns a String Array of dot-separated Key values representing the paths to each Value within the provided Object. Optionally, provide a prefix to be appended to the left side of each path
```js
/**
 * Returns a String Array of dot-separated Key values representing the paths
 * to each Value within the provided Object. Optionally, provide a prefix to
 * be appended to the left side of each path.
 *
 * @param {Object} obj Object to generate paths for
 * @param {String} pre String to append to left side of each path
 * @return {String[]} paths String Array of paths for obj
 */
function getPaths(obj, pre)
```
