import { Build } from '.';
import createComponent from '../default/componentOperations';
import { Quantities } from '../../quantity';
import { Service } from '../../service';

export default function createBuild(service: Service, quantities: Quantities): Build {
  if (service['build-options'].length === 0) return createComponent('build', quantities);

  const buildJson = {};

  service['build-options'].forEach((buildComponent: string) => {
    buildJson[buildComponent] = createComponent(buildComponent, quantities);
  });

  return buildJson;
}
