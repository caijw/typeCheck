

exports.check = function(toCheck, expected, path = "parameter") {
  let result = ``;
  const toCheckType = Object.prototype.toString.call(toCheck).slice(8, -1);;
  const expectedType = Object.prototype.toString.call(expected).slice(8, -1);;
  if (toCheckType !== expectedType) {
    result = `${path} should be ${expectedType}, not ${toCheckType};`;
    return result;
  }

  console.log(toCheck, expected, path);
  console.log(toCheckType, expectedType);

  switch(expectedType) {
    case "Object":
      const keys = Object.keys(expected);
      for (let i= 0; i < keys.length; ++i) {
        if (toCheck.hasOwnProperty(keys[i])) {
          result = `${result}${exports.check(toCheck[keys[i]], expected[keys[i]], `${path}.${keys[i]}`)}`
        }
      }
      break;
    case "Array":
      if (toCheck.length < expected.length) {
        result = `${path} should hava ${expected.length} elements at least;`;
        return result;
      }
      for (let i = 0; i < expected.length; ++i) {
        result = `${result}${exports.check(toCheck[i], expected[i], `${path}[${i}]`)}`;
      }
      break;
  }
  return result;
};
