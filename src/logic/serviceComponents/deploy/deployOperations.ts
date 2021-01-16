import { Deploy, DeployOptions } from '.';
import { placeholder } from '../../config/constants';
import { Service } from '../../service';

function createNestedOptions(deployOptions: string[]): DeployOptions {
  return deployOptions.reduce((acc: DeployOptions, innerComponent: string) => ({
    ...acc,
    [innerComponent]: placeholder,
  }), {});
}

export default function createDeploy(service: Service): Deploy {
  if (!service['deploy-options']) return {};

  const deployComponent = {};

  service['deploy-options'].forEach((option) => {
    const nestedOptions = service[`${option}-deploy-options`];

    deployComponent[option] = nestedOptions ? createNestedOptions(nestedOptions) : placeholder;
  });

  return deployComponent;
}
