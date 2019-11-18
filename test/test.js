const typeCheck = require("../index.js");
const assert = require("assert");

const check1 = {
  a: 12,
  b: {
    d: "23fsfs",
    f: true
  },
  c: [1, {
    s: "sdfsfsdfsdfsdfsdfsd"
  }]
};

const expect1 = {
  a: 0,
  b: {
    d: "",
    f: true
  },
  c: [0, {
    s: ""
  }]
};

const root1 = "root";

const res1 = typeCheck.check(check1, expect1, root1);

assert.strictEqual(res1, "");

const check2 = {
  a: 12,
  b: {
    d: "23fsfs",
    f: true
  },
  c: [1, {
    s: "sdfsfsdfsdfsdfsdfsd"
  }]
};

const expect2 = {
  a: 0,
  b: {
    d: "",
    f: true
  },
  c: [0, {
    s: 0
  }]
};

const root2 = "root";

const res2 = typeCheck.check(check2, expect2, root1);

assert.strictEqual(res2, `${root2}.c[1].s should be Number, not String;`);
