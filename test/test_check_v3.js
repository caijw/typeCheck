const typeCheck = require("../index.js");
const assert = require("assert");

const check1 = 0;

const expect1 = {
  value: {},
  require: true
};

const root1 = "root";

const res1 = typeCheck.check_v3(check1, expect1, root1);

assert.strictEqual(res1, `${root1} should be Object, not Number;`);


const check2 = {
  b: {
    c: 1
  }
};

const expect2 = {
  value: {
    a: {
      value: 0,
      require: true
    },
    b: {
      value: {
        c: {
          value: 0,
          require: true
        },
        require: true
      }
    },
    require: true
  },
  require: true
};

const root2 = "root";

const res2 = typeCheck.check_v3(check2, expect2, root2);

assert.strictEqual(res2, `${root2}.a does not exist;`);

const check3 = {
  b: {
    c: 1
  }
};

const expect3 = {
  value: {
    b: {
      value: {
        c: {
          value: 0,
          require: true
        },
        require: true
      }
    },
    require: true
  },
  require: true
};

const root3 = "root";

const res3 = typeCheck.check_v3(check3, expect3, root3);

assert.strictEqual(res3, ``);

console.log("test ok!");