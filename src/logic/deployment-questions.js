const deployData = require('../../static/compose-data.json').serviceProps.deploy

module.exports = [
  {
    type: 'checkbox',
    name: 'deploy-options',
    message: 'Select deploy options',
    choices: deployData.default.concat(deployData.extra),
    when: answer => answer['service-components'].indexOf('deploy') !== -1
  },
  ...deployData.extra.map(item => {
    return {
      type: 'checkbox',
      name: `${item}-deploy-options`,
      message: `Select options for: ${item}`,
      choices: deployData[`${item}`],
      when: answer =>
        answer['service-components'].indexOf('deploy') !== -1 &&
        answer['deploy-options'].indexOf(item) !== -1
    }
  })
]
