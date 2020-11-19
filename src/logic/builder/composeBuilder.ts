import Compose from '../../models/compose';
import buildServices from './serviceBuilder';
import buildAdditionalComponents from './additionalComponentsBuilder';

export default (services, serviceInfo) => {
  const servicesJson = buildServices(services);
  const addons = buildAdditionalComponents(serviceInfo);

  return new Compose(
    serviceInfo['compose-version'],
    servicesJson,
    addons.networks,
    addons.volumes,
  );
};
