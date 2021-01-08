import { placeholder } from '../config/constants';

function buildDeployOptionsJson(deployOptions: any) {
  return deployOptions.reduce((acc, innerComponent) => ({
    ...acc,
    [innerComponent]: placeholder,
  }), {});
}

export default (service: Record<string, any>) => service['deploy-options']
  .reduce((acc, deployComponent) => {
    const deployOptions = service[`${deployComponent}-deploy-options`];

    return {
      ...acc,
      [deployComponent]: deployOptions ? buildDeployOptionsJson(deployOptions) : placeholder,
    };
  }, {});
