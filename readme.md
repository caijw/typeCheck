# docs

数据类型校验

用法:

```js
const typeCheck = require("types_checker_23");
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
```

## check 接口

会检测传入的数据和预期的数据是否符合，不符合返回不符合的信息

符合预期会返回一个空字符串

第一个参数是待检测的数据

第二个参数是预期的数据格式，每个key跟待检测数据对应，value是数据类型的值

第三个参数是返回信息的 root
