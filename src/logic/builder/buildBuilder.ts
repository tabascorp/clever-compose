import getComponentValue from './componentBuilder';

export default (service, quantities) => {
  if (service['build-options'].length === 0) return getComponentValue('build', quantities);

  const buildJson = {};

  service['build-options'].forEach((buildComponent) => {
    buildJson[buildComponent] = getComponentValue(buildComponent, quantities);
  });

  return buildJson;
};
