var fs = require('fs');
const yml = require('js-yaml');

import { listOfOptions, serviceProps } from "../../static/compose-data.json";

const ph = "~~~~~~~~";
var quantities = {};

export function buildYml (services, serviceInfo) {
  var composeJson = generateComposeJson(services, serviceInfo);

  var composeYml = yml.safeDump(composeJson);

  fs.writeFile("docker-compose.yml", composeYml, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

const generateComposeJson = function (services, serviceInfo) {
  var composeJson = { version: serviceInfo['compose-version'], services: {} };

  if (serviceInfo['additional-components']) {
    serviceInfo['additional-components'].forEach((item) => {
      composeJson[item] = new Array(parseInt(serviceInfo[`${item}-quantity`])).fill(`${ph}:`);
    });
  }

  services.forEach((service) => {
    fillQuantities(service);
    composeJson.services[service['name']] = buildServiceJson(service);
  });

  return composeJson;
};

/**
 * Build json for each service
 */
const buildServiceJson = function (service) {
  var serviceJson = {};

  service['components'].forEach(component => {
    switch (component) {
      case 'deploy':
        serviceJson[component] = buildDeployJson(service);
        break;
      
      case 'build':
        serviceJson[component] = buildBuildJson(service);
        break;
  
      default:
        serviceJson[component] = getComponentValue(component);
    }
  });

  return serviceJson;
};

/**
 * Builds json for `build` component in service if user selected it
 */
const buildBuildJson = function (service) {
  if(service['build-options'].length === 0) return getComponentValue('build');

  var buildJson = {};

  service['build-options'].forEach(buildComponent => {
    buildJson[buildComponent] = getComponentValue(buildComponent);
  });

  return buildJson;
};

/**
 * Builds json for `deploy` component in service if user selected it
 */
const buildDeployJson = function(service) {
  var deployJson = {};
  
  service['deploy-options'].forEach(deployComponent => {
    var deployOptions = service[`${deployComponent}-deploy-options`];

    if (deployOptions !== undefined) {
      deployJson[deployComponent] = {};

      deployOptions.forEach(innerComponent => {
        deployJson[deployComponent][innerComponent] = ph;
      })
    } else {
      deployJson[deployComponent] = ph;
    }
  });

  return deployJson;
}

/**
 * Checks the value type for a component in service and return its value
 */
const getComponentValue = function (propName) {
  if (quantities[propName]) {

    switch (propName) {
      case 'volumes':
      case 'ports':
        return new Array(quantities[propName]).fill(`${ph}:${ph}`);
  
      case 'env':
      case 'args':
        return new Array(quantities[propName]).fill(`KEY=${ph}`);
  
      default:
        return new Array(quantities[propName]).fill(ph);
    }
    
  } else if (listOfOptions[propName] !== undefined) {

    return listOfOptions[propName].join('|');

  } else {

    return ph;

  }
};

/**
 * 1. Clear global `quantities`
 * 2. Determine if any component in service has multiple values
 * 3. If yes: It will add components with number of values to `quantities`
 */
const fillQuantities = function (service) {
  quantities = {};

  serviceProps.quant.forEach((quantComponent) => {
    if (service['components'].indexOf(quantComponent) !== -1) {
      quantities[quantComponent] = parseInt(service[`${quantComponent}-quantity`]);
    }
  });
  serviceProps.build.quant.forEach((buildQuantComponent) => {
    if (service[`${buildQuantComponent}-quantity`] !== undefined) {
      quantities[buildQuantComponent] = parseInt(service[`${buildQuantComponent}-quantity`]);
    }
  })
}