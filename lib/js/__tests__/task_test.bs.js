// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var List = require("bs-platform/lib/js/list.js");
var Task = require("../src/Task.bs.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

function timeout(value) {
  return /* Task */[(function (param, res) {
              var timer = setTimeout((function (param) {
                      return Curry._1(res, value);
                    }), value);
              return /* Cancel */Block.__(0, [(function (param) {
                            clearTimeout(timer);
                            return /* () */0;
                          })]);
            })];
}

function notTimeout(value) {
  return /* Task */[(function (param, res) {
              Curry._1(res, value);
              return /* NoCancel */0;
            })];
}

var p = Task.Operators[/* >>| */1](Task.parallel(Pervasives.$at(List.map(timeout, /* :: */[
                  1,
                  /* :: */[
                    2,
                    /* :: */[
                      3,
                      /* :: */[
                        4,
                        /* :: */[
                          5,
                          /* :: */[
                            6,
                            /* :: */[
                              7,
                              /* :: */[
                                8,
                                /* :: */[
                                  9,
                                  /* [] */0
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]), $$Array.to_list($$Array.map(notTimeout, $$Array.mapi((function (index, param) {
                            return index + 10 | 0;
                          }), Caml_array.caml_make_vect(10000, 1)))))), (function (param) {
        return List.fold_left((function (a, b) {
                      return a + b | 0;
                    }), 0, param);
      }));

function makeTask(i) {
  if (i >= 100000) {
    return Task.pure(/* Done */Block.__(1, [i + 1 | 0]));
  } else if (i < 0) {
    return Task.reject("i must be positive");
  } else {
    return Task.pure(/* Next */Block.__(0, [i + 1 | 0]));
  }
}

var t = Task.Operators[/* >>> */4](Task.Operators[/* >>=! */2](Task.Operators[/* >>= */0](Task.Operators[/* >>|! */3](Task.Operators[/* >>= */0](Task.Operators[/* >>| */1](Task.Operators[/* >>= */0](p, (function (param) {
                                return Task.chainRec(makeTask, param);
                              })), (function (m) {
                            return m + 10 | 0;
                          })), (function (m) {
                        return Task.pure(m + 100 | 0);
                      })), (function (param) {
                    return 100;
                  })), Task.reject), (function (m) {
            return Task.pure(m + 100 | 0);
          })), (function (param) {
        console.log(param[0]);
        return /* () */0;
      }));

Jest.describe("Testing Task", (function (param) {
        Jest.testAsync("basic run", undefined, (function (cb) {
                var simpleTask = /* Task */[(function (param, res) {
                      Curry._1(res, 10);
                      return /* NoCancel */0;
                    })];
                Task.run(simpleTask, (function (status) {
                        return Curry._1(cb, Jest.Expect[/* toEqual */12](/* Success */Block.__(1, [10]), Jest.Expect[/* expect */0](status)));
                      }));
                return /* () */0;
              }));
        return Jest.testAsync("Cancelation Test", undefined, (function (cb) {
                      var cancel = Task.run(timeout(100), (function (param) {
                              if (param.tag) {
                                return Curry._1(cb, Jest.fail("should not run"));
                              } else {
                                return Curry._1(cb, Jest.fail("should not reject"));
                              }
                            }));
                      Curry._1(cancel, /* () */0);
                      setTimeout((function (param) {
                              return Curry._1(cb, Jest.pass);
                            }), 110);
                      return /* () */0;
                    }));
      }));

exports.timeout = timeout;
exports.notTimeout = notTimeout;
exports.p = p;
exports.makeTask = makeTask;
exports.t = t;
/* p Not a pure module */