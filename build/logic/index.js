"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inquirer = require("inquirer");

var _cleverServices = require("./clever-services");

var questions = require('./questions')["default"];

var _default = function _default() {
  return (0, _inquirer.prompt)(questions).then(function (answers) {
    (0, _cleverServices.selectServiceProps)(answers);
  });
};

exports["default"] = _default;