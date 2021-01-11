/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import { placeholder } from '../../config/constants';
import createDeploy from './deployOperations';
import { serviceProps } from '../../../../static/compose-data.json';

const fullDeployAnswers = {
  'deploy-options': [
    ...serviceProps.deploy.default,
    ...serviceProps.deploy.extra,
  ],
  'update_config-deploy-options': serviceProps.deploy.update_config,
  'rollback_config-deploy-options': serviceProps.deploy.rollback_config,
  'restart_policy-deploy-options': serviceProps.deploy.restart_policy,
  'placement-deploy-options': serviceProps.deploy.placement,
};

const expectedDeployComponent = {
  replicas: placeholder,
  mode: placeholder,
  labels: placeholder,
  update_config: {
    parallelism: placeholder,
    delay: placeholder,
    failure_action: placeholder,
    monitor: placeholder,
    max_failure_ratio: placeholder,
    order: placeholder,
  },
  rollback_config: {
    parallelism: placeholder,
    delay: placeholder,
    failure_action: placeholder,
    monitor: placeholder,
    max_failure_ratio: placeholder,
    order: placeholder,
  },
  restart_policy: {
    condition: placeholder,
    delay: placeholder,
    max_attempts: placeholder,
    window: placeholder,
  },
  placement: {
    max_replicas_per_node: placeholder,
    constraints: placeholder,
  },
};

describe('deployOperations', () => {
  describe('createDeploy', () => {
    describe('Should return full object', () => {
      it('when every option is selected', (done) => {
        expect(createDeploy(fullDeployAnswers)).to.deep.equal(expectedDeployComponent);
        done();
      });

      it('when several options are selected', (done) => {
        const optionIndex = fullDeployAnswers['deploy-options'].indexOf('update_config');
        fullDeployAnswers['deploy-options'].splice(optionIndex, 1);
        delete fullDeployAnswers['update_config-deploy-options'];
        delete expectedDeployComponent.update_config;

        expect(createDeploy(fullDeployAnswers)).to.deep.equal(expectedDeployComponent);
        done();
      });
    });

    describe('Should return empty object', () => {
      it('if empty object was passed', (done) => {
        expect(createDeploy({})).to.be.empty;
        done();
      });
    });
  });
});
