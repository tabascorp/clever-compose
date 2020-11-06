import { writeFile } from 'fs';
import { safeDump } from 'js-yaml';
import { listOfOptions, serviceProps } from '../../static/compose-data.json';
import Compose from '../models/Compose';

const ph = '~~~~~~~~';
let quantities = {};

/**
 * 1. Clear global `quantities`
 * 2. Determine if any component in service has multiple values
 * 3. If yes: It will add components with number of values to `quantities`
 */
const fillQuantities = (service) => {
  quantities = {};

  serviceProps.quant.forEach((quantComponent) => {
    if (service.components.indexOf(quantComponent) !== -1) {
      quantities[quantComponent] = parseInt(service[`${quantComponent}-quantity`], 10);
    }
  });

  serviceProps.build.quant.forEach((buildQuantComponent) => {
    if (service[`${buildQuantComponent}-quantity`] !== undefined) {
      quantities[buildQuantComponent] = parseInt(service[`${buildQuantComponent}-quantity`], 10);
    }
  });
};

/**
 * Builds json for `deploy` component in service if user selected it
 */
const buildDeployJson = (service) => {
  const deployJson = {};

  service['deploy-options'].forEach((deployComponent: string) => {
    const deployOptions = service[`${deployComponent}-deploy-options`];

    if (deployOptions !== undefined) {
      deployJson[deployComponent] = {};

      deployOptions.forEach((innerComponent) => {
        deployJson[deployComponent][innerComponent] = ph;
      });
    } else {
      deployJson[deployComponent] = ph;
    }
  });

  return deployJson;
};

/**
 * Checks the value type for a component in service and return its value
 */
const getComponentValue = (propName) => {
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
 * Builds json for `build` component in service if user selected it
 */
const buildBuildJson = (service) => {
  if (service['build-options'].length === 0) return getComponentValue('build');

  const buildJson = {};

  service['build-options'].forEach((buildComponent) => {
    buildJson[buildComponent] = getComponentValue(buildComponent);
  });

  return buildJson;
};

/**
 * Build json for each service
 */
const buildServiceJson = (service: any) => {
  const serviceJson = {};

  service.components.forEach((component) => {
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
 * Iterates over each service and returns objects with all services as json
 */
const buildServices = (services) => {
  const servicesJson = {};

  services.forEach((service) => {
    fillQuantities(service);
    servicesJson[service.name] = buildServiceJson(service);
  });

  return servicesJson;
};

/**
 * Returns additional components ('networks','volumes') with values for docker-compose
 */
const buildAdditionalComponents = (serviceInfo: Record<string, any>): Record<string, any> => {
  const addons = {};

  if (serviceInfo.additionalComponents) {
    serviceInfo.additionalComponents
      .forEach((item: string) => { addons[item] = new Array(parseInt(serviceInfo[`${item}-quantity`], 10)).fill(`${ph}:`); });
  }

  return addons;
};

const generateComposeJson = (services, serviceInfo) => {
  const servicesJson = buildServices(services);
  const addons = buildAdditionalComponents(serviceInfo);

  return new Compose(
    serviceInfo['compose-version'],
    servicesJson,
    addons.networks,
    addons.volumes,
  );
};

export default (services:string[], serviceInfo:any): void => {
  const composeJson = generateComposeJson(services, serviceInfo);
  const composeYml = safeDump(composeJson, { skipInvalid: true });
  writeFile('docker-compose.yml', composeYml, (err) => {
    if (err) {
      return console.warn(err);
    }
    return console.log('The file was saved!');
  });
};
