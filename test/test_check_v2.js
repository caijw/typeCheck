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

const res1 = typeCheck.check_v2(check1, expect1, root1);

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

const res2 = typeCheck.check_v2(check2, expect2, root2);

assert.strictEqual(res2, `${root2}.c[1].s should be Number, not String;`);


const check3 = {
  a: 12,
  b: {
    d: "23fsfs",
    f: true
  },
  c: [1, {
    s: "sdfsfsdfsdfsdfsdfsd"
  }]
};

const expect3 = {
  a: 0,
  b: {
    d: "",
    f: true
  },
  c: [0, {
    s: 0
  }, ""]
};

const root3 = "root";

const res3 = typeCheck.check_v2(check3, expect3, root3);

assert.strictEqual(res3, `${root3}.c should hava 3 elements at least;${root3}.c[1].s should be Number, not String;`);

console.log("test ok!");