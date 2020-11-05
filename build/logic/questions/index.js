"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _composeData = require("../../../static/compose-data.json");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var questions = [{
  type: 'input',
  name: 'compose-version',
  message: 'Which version of docker-compose you want to use?',
  validate: function validate(value) {
    var choices = _composeData.versions;
    return choices.indexOf(value) !== -1 || 'Please enter valid docker-compose version';
  },
  "default": _composeData.versions[_composeData.versions.length - 1]
}, {
  type: 'input',
  name: 'services-quantity',
  message: 'How many services you want to create?',
  validate: function validate(value) {
    if (value <= 0) return 'You need to have at least one service';
    return Number.isInteger(parseFloat(value)) || 'Please enter an int number';
  },
  "default": 2
}, {
  type: 'checkbox',
  message: 'Select additional components',
  name: 'additional-components',
  choices: _toConsumableArray(_composeData.addons.map(function (item) {
    return {
      name: item
    };
  }))
}].concat(_toConsumableArray(_composeData.addons.map(function (item) {
  return {
    type: 'input',
    name: "".concat(item, "-quantity"),
    message: "How many ".concat(item, " do you want?"),
    validate: function validate(value) {
      if (value <= 0) return 'You need to have at least one';
      return Number.isInteger(parseFloat(value)) || 'Please enter an int number';
    },
    when: function when(answer) {
      return answer['additional-components'].indexOf(item) !== -1;
    }
  };
})));
var _default = questions;
exports["default"] = _default;