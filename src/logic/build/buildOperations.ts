import createComponent from '../component/componentOperations';

export default function createBuild(service, quantities) {
  if (service['build-options'].length === 0) return createComponent('build', quantities);

  const buildJson = {};

  service['build-options'].forEach((buildComponent) => {
    buildJson[buildComponent] = createComponent(buildComponent, quantities);
  });

  return buildJson;
}
