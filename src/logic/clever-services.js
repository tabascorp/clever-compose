import { prompt } from 'inquirer'
import buildYml from './build-file'
import { serviceProps } from '../../static/compose-data.json'
import deployQuestions from './deployment-questions'

var questions = [
  {
    type: 'input',
    name: 'service-name',
    message: 'Name your service'
  },
  {
    type: 'checkbox',
    message: 'Select components for your service',
    name: 'service-components',
    choices: [
      ...serviceProps.default.map(item => {
        return {
          name: item
        }
      }),
      ...serviceProps.quant.map(item => {
        return {
          name: item
        }
      })
    ],
    pageSize: serviceProps.default.length + serviceProps.quant.length
  },
  ...serviceProps.quant.map(item => {
    return {
      type: 'input',
      name: `${item}-quantity`,
      message: `How many of these do you want: ${item}`,
      validate: function (value) {
        if (value <= 0) return 'You need to have at least one'
        return (
          Number.isInteger(parseFloat(value)) || 'Please enter an int number'
        )
      },
      when: answer => answer['service-components'].indexOf(item) !== -1
    }
  }),
  ...deployQuestions
]

export function selectServiceProps (params) {
  const quantity = parseInt(params['services-quantity'])
  let count = 1
  const servicesParams = []

  const askQuestion = () => {
    console.log(`\n Set information about ${count} service`)
    prompt(questions).then(response => {
      servicesParams.push(response)
      count++

      if (count <= quantity) {
        askQuestion()
      } else {
        buildYml(servicesParams, params)
      }
    })
  }

  askQuestion()
}
