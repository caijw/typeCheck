
/**
  check_v1({a: 1}, {a: 0}, "root");
  只有 toCheck 有的字段才检查
 */
exports.check = exports.check_v1 = function(toCheck, expected, path = "parameter") {
  let result = ``;
  const toCheckType = Object.prototype.toString.call(toCheck).slice(8, -1);
  const expectedType = Object.prototype.toString.call(expected).slice(8, -1);
  if (toCheckType !== expectedType) {
    result = `${path} should be ${expectedType}, not ${toCheckType};`;
    return result;
  }
  switch(expectedType) {
    case "Object":
      Object.keys(expected).filter((key) => {
        return toCheck.hasOwnProperty(key);
      }).forEach((key) => {
        result = `${result}${exports.check_v1(toCheck[key], expected[key], `${path}.${key}`)}`;
      });
      break;
    case "Array":
      let len = Math.min(toCheck.length, expected.length);
      for (let i = 0; i < len; ++i) {
        result = `${result}${exports.check_v1(toCheck[i], expected[i], `${path}[${i}]`)}`;
      }
      break;
  }
  return result;
};

/**
 * expected 有的字段都必须检查
 */
exports.check_v2 = function(toCheck, expected, path = "parameter") {
  let result = ``;
  const toCheckType = Object.prototype.toString.call(toCheck).slice(8, -1);
  const expectedType = Object.prototype.toString.call(expected).slice(8, -1);
  if (toCheckType !== expectedType) {
    result = `${path} should be ${expectedType}, not ${toCheckType};`;
    return result;
  }
  switch(expectedType) {
    case "Object":
      Object.keys(expected).filter((key) => {
        return expected.hasOwnProperty(key);
      }).forEach((key) => {
        result = `${result}${exports.check_v2(toCheck[key], expected[key], `${path}.${key}`)}`;
      });
      break;
    case "Array":
      if (toCheck.length < expected.length) {
        result = `${result}${path} should hava ${expected.length} elements at least;`;
      }
      let len = Math.min(toCheck.length, expected.length);
      for (let i = 0; i < len; ++i) {
        result = `${result}${exports.check_v2(toCheck[i], expected[i], `${path}[${i}]`)}`;
      }
      break;
  }
  return result;
};


/**
 * 混合模式
 */
exports.check_v3 = function(toCheck, expectedWarp, path = "parameter") {
  let expected = expectedWarp.value;
  // let require = expectedWarp.require;
  let result = ``;
  const toCheckType = Object.prototype.toString.call(toCheck).slice(8, -1);
  const expectedType = Object.prototype.toString.call(expected).slice(8, -1);
  if (toCheckType !== expectedType) {
    result = `${path} should be ${expectedType}, not ${toCheckType};`;
    return result;
  }
  switch(expectedType) {
    case "Object":
      const toCheckKeys = Object.keys(toCheck).filter((key) => {
        return toCheck.hasOwnProperty(key);
      });
      const expectedKeys = Object.keys(expected).filter((key) => {
        return expected.hasOwnProperty(key);
      });
      expectedKeys.forEach((expectedKey) => {
        if (expected[expectedKey].require && toCheckKeys.indexOf(expectedKey) === -1) {
          // 是否是必填字段检查
          result = `${result}${path}.${expectedKey} does not exist;`;
        }
        if (toCheckKeys.indexOf(expectedKey) !== -1) {
          // 如果tocheck存在该字段，才检查
          result = `${result}${exports.check_v3(toCheck[expectedKey], expected[expectedKey], `${path}.${expectedKey}`)}`;
        }
      });
      break;
    case "Array":
      for (let i = 0; i < expected.length; ++i) {
        if (expected[i].require && i >= toCheck.length) {
          // 是否是必填字段检查
          result = `${result}${path}[${i}] does not exist;`;
        }
      }
      for(let i = 0; i < toCheck.length; ++i) {
          // 如果tocheck存在该字段，才检查
          result = `${result}${exports.check_v3(toCheck[i], expected[i], `${path}[${i}]`)}`;
      }
      break;
  }
  return result;
}

