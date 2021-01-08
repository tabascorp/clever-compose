import Compose from '../compose';
import servicesToJson from './serviceBuilder';
import additionalServiceComponentsToJson from './additionalComponentsBuilder';

export default function createCompose(servicesData, serviceInfo) {
  const servicesJson = servicesToJson(servicesData);
  const addons = additionalServiceComponentsToJson(serviceInfo);

  return new Compose(
    serviceInfo['compose-version'],
    servicesJson,
    addons.networks,
    addons.volumes,
  );
}
