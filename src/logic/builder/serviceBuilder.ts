import buildDeployJson from './deployBuilder';
import getServiceQuantities from './quantitiesBuilder';
import buildBuildJson from './buildBuilder';
import getComponentValue from './componentBuilder';

const buildServiceJson = (service: any, quantities: any) => {
  const serviceJson = {};

  service.components.forEach((component) => {
    switch (component) {
      case 'deploy':
        serviceJson[component] = buildDeployJson(service);
        break;

      case 'build':
        serviceJson[component] = buildBuildJson(service, quantities);
        break;

      default:
        serviceJson[component] = getComponentValue(component, quantities);
    }
  });

  return serviceJson;
};

export default function servicesToJson(services) {
  const servicesJson = {};

  services.forEach((service) => {
    const quantities = getServiceQuantities(service);
    servicesJson[service.name] = buildServiceJson(service, quantities);
  });

  return servicesJson;
}
