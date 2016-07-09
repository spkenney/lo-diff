var lo = require('lodash');

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
function diffPaths(a, b) {
  // get the one-way diff of each combination
  var diffAB = oneWayDiff(a,b);
  var diffBA = oneWayDiff(b,a);

  // unite the two resulting arrays to get the two-way diff
  var result = lo.union(diffAB, diffBA);

  return result;
}


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
function diff(ref, targ) {

  // get key paths of differing values
  var paths = diffPaths(ref,targ);

  // create results
  results = {diff: {}, match: {}};

  // create results.diff
  lo.forEach(paths, function(value, index){
    // for each key path, get the value in each object
    results.diff[value] = {ref: lo.get(ref,value), targ: lo.get(targ,value)};
  });

  // create results.match using values from reference object

  // get all paths within the reference object
  var refKeyPaths = getPaths(ref);

  lo.forEach(refKeyPaths, function(value, index) {
    // for each path within ref, test whether it already exists in diff
    if (!lo.has(results.diff, value)) {
      // if path is not in diff, it's a match
      results.match[value] = lo.get(ref,value);
    }
  });

  return results;
}

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
function oneWayDiff(x, y, k) {
  var pre = '';

  // map iterator to add prefix to each result
  function mapIter(val) {
    return pre + val;
  }
  if (k) {
    // if key is provided, update x & y objects and create prefix
    x = lo.get(x, k);
    y = lo.get(y, k);
    pre = k + ".";
  }

  // reduce x to array of Key Paths
  var result = lo.reduce(x, function(result, value, key) {
    // test whether value is Object
    if (lo.isPlainObject(value)) {
      // if Object, call oneWayDiff recursively to determine deep diff
      // provide current Key such that diff of sub-object is taken
      return result.concat(oneWayDiff(x, y, key));
    } else {
      // if value is not Object, test if y has the key
      if (!lo.has(y, key)) {
        // if y doesn't have this key, then add key to diff
        return result.concat(key);
      } else {
        // if y has key, test equality of values
        if (lo.isEqual(value, y[key])) {
          // if values are equal, don't add key to diff and return
          return result;
        } else {
          // if values aren't equal, add key to diff
          return result.concat(key);
        }
      }
    }
  }, []);

  // add prefix to all results before returning
  return lo.map(result, mapIter);
}


/**
 * Returns a String Array of dot-separated Key values representing the paths
 * to each Value within the provided Object. Optionally, provide a prefix to
 * be appended to the left side of each path.
 *
 * @param {Object} obj Object to generate paths for
 * @param {String} pre String to append to left side of each path
 * @return {String[]} paths String Array of paths for obj
 */
function getPaths(obj, pre) {

  var paths = [];

  // TODO -- Allow for default 'seperator' to be defined and enforce its use
  //    (avoids defining "." like done below)

  // use provide 'pre' or use empty String
  pre = pre || "";

  // itterate over all obj Keys
  lo.forOwn(obj, function(value, key){
    if (lo.isPlainObject(value)) {
      // if Object, call getPaths recursively to determine deep paths
      // provide prefix such that newly discovered paths are treated as subpaths
      paths = lo.concat(paths, getPaths(value, pre + key + "."));
    } else {
      // if not Object, add path to array
      paths = lo.concat(paths, pre + key);
    }
  });

  return paths;
}


/* Sample Output

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

*/

module.exports.getPaths = getPaths;
module.exports.oneWayDiff = oneWayDiff;
module.exports.diffPaths = diffPaths;
module.exports.diff = diff;
