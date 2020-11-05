"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectServiceProps = selectServiceProps;

var _inquirer = require("inquirer");

var _buildFile = _interopRequireDefault(require("./build-file"));

var _composeData = require("../../static/compose-data.json");

var _deploymentQuestions = _interopRequireDefault(require("./deployment-questions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var questions = [{
  type: 'input',
  name: 'service-name',
  message: 'Name your service'
}, {
  type: 'checkbox',
  message: 'Select components for your service',
  name: 'service-components',
  choices: [].concat(_toConsumableArray(_composeData.serviceProps["default"].map(function (item) {
    return {
      name: item
    };
  })), _toConsumableArray(_composeData.serviceProps.quant.map(function (item) {
    return {
      name: item
    };
  }))),
  pageSize: _composeData.serviceProps["default"].length + _composeData.serviceProps.quant.length
}].concat(_toConsumableArray(_composeData.serviceProps.quant.map(function (item) {
  return {
    type: 'input',
    name: "".concat(item, "-quantity"),
    message: "How many of these do you want: ".concat(item),
    validate: function validate(value) {
      if (value <= 0) return 'You need to have at least one';
      return Number.isInteger(parseFloat(value)) || 'Please enter an int number';
    },
    when: function when(answer) {
      return answer['service-components'].indexOf(item) !== -1;
    }
  };
})), _toConsumableArray(_deploymentQuestions["default"]));

function selectServiceProps(params) {
  var quantity = parseInt(params['services-quantity']);
  var count = 1;
  var servicesParams = [];

  var askQuestion = function askQuestion() {
    console.log("\n Set information about ".concat(count, " service"));
    (0, _inquirer.prompt)(questions).then(function (response) {
      servicesParams.push(response);
      count++;

      if (count <= quantity) {
        askQuestion();
      } else {
        (0, _buildFile["default"])(servicesParams, params);
      }
    });
  };

  askQuestion();
}