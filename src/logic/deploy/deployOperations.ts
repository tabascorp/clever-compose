import { placeholder } from '../config/constants';

function createDeployOptions(deployOptions: any) {
  return deployOptions.reduce((acc, innerComponent) => ({
    ...acc,
    [innerComponent]: placeholder,
  }), {});
}

export default function createDeploy(service: Record<string, any>) {
  return service['deploy-options']
    .reduce((acc, deployComponent) => {
      const deployOptions = service[`${deployComponent}-deploy-options`];

      return {
        ...acc,
        [deployComponent]: deployOptions ? createDeployOptions(deployOptions) : placeholder,
      };
    }, {});
}
