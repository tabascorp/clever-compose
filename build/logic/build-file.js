"use strict";

var yml = require('js-yaml'),
    compose_data = require('../../static/compose-data.json'),
    serviceProps = compose_data.serviceProps;

var fs = require('fs');

var ph = "";
var quantities = {};

module.exports = function (serviceParams, serviceInfo) {
  var cc = {
    version: serviceInfo['compose-version'],
    services: {}
  };

  if (serviceInfo['additional-components']) {
    serviceInfo['additional-components'].forEach(function (item) {
      cc[item] = new Array(parseInt(serviceInfo["".concat(item, "-quantity")])).fill("".concat(ph, ":"));
    });
  }

  serviceParams.forEach(function (item) {
    cc.services[item['service-name']] = {};
    serviceProps.quant.forEach(function (it) {
      if (item['service-components'].indexOf(it) !== -1) {
        quantities[it] = parseInt(item["".concat(it, "-quantity")]);
      }
    });
    item['service-components'].forEach(function (it) {
      if (quantities[it]) {
        cc.services[item['service-name']][it] = getPropertyList(it);
      } else if (it === 'deploy') {
        // TODO deployment to file
        cc.services[item['service-name']][it] = {};
      } else {
        cc.services[item['service-name']][it] = ph;
      }
    });
  });
  var ymlText = yml.safeDump(cc);
  fs.writeFile('docker-compose.yml', ymlText, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log('The file was saved!');
  });
};

var getPropertyList = function getPropertyList(prop) {
  switch (prop) {
    case 'volumes':
    case 'ports':
      return new Array(quantities[prop]).fill("".concat(ph, ":").concat(ph));

    case 'env':
      return new Array(quantities[prop]).fill("KEY=".concat(ph));

    default:
      return new Array(quantities[prop]).fill(ph);
  }
};