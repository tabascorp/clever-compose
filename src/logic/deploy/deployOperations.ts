import { Deploy, DeployOptions } from '.';
import { placeholder } from '../config/constants';
import { Service } from '../service';

function createDeployOptions(deployOptions: string[]): DeployOptions {
  return deployOptions.reduce((acc: DeployOptions, innerComponent: string) => ({
    ...acc,
    [innerComponent]: placeholder,
  }), {});
}

export default function createDeploy(service: Service) {
  return service['deploy-options']
    .reduce((acc: Deploy, deployComponent: string) => {
      const deployOptions = service[`${deployComponent}-deploy-options`];

      return {
        ...acc,
        [deployComponent]: deployOptions ? createDeployOptions(deployOptions) : placeholder,
      };
    }, {});
}
