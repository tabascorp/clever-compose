"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var deployData = require('../../static/compose-data.json').serviceProps.deploy;

module.exports = [{
  type: 'checkbox',
  name: 'deploy-options',
  message: 'Select deploy options',
  choices: deployData["default"].concat(deployData.extra),
  when: function when(answer) {
    return answer['service-components'].indexOf('deploy') !== -1;
  }
}].concat(_toConsumableArray(deployData.extra.map(function (item) {
  return {
    type: 'checkbox',
    name: "".concat(item, "-deploy-options"),
    message: "Select options for: ".concat(item),
    choices: deployData["".concat(item)],
    when: function when(answer) {
      return answer['service-components'].indexOf('deploy') !== -1 && answer['deploy-options'].indexOf(item) !== -1;
    }
  };
})));