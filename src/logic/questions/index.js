import { versions, addons } from '../../../static/compose-data.json'

var questions = [
  {
    type: 'input',
    name: 'compose-version',
    message: 'Which version of docker-compose you want to use?',
    validate: function (value) {
      var choices = versions
      return (
        choices.indexOf(value) !== -1 ||
        'Please enter valid docker-compose version'
      )
    },
    default: versions[versions.length - 1]
  },
  {
    type: 'input',
    name: 'services-quantity',
    message: 'How many services you want to create?',
    validate: function (value) {
      if (value <= 0) return 'You need to have at least one service'
      return Number.isInteger(parseFloat(value)) || 'Please enter an int number'
    },
    default: 2
  },
  {
    type: 'checkbox',
    message: 'Select additional components',
    name: 'additional-components',
    choices: [
      ...addons.map(item => {
        return {
          name: item
        }
      })
    ]
  },
  ...addons.map(item => {
    return {
      type: 'input',
      name: `${item}-quantity`,
      message: `How many ${item} do you want?`,
      validate: function (value) {
        if (value <= 0) return 'You need to have at least one'
        return (
          Number.isInteger(parseFloat(value)) || 'Please enter an int number'
        )
      },
      when: answer => answer['additional-components'].indexOf(item) !== -1
    }
  })
]

export default questions
