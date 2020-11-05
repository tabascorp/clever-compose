import { prompt } from 'inquirer'
import { composeQuestions, serviceQuestions} from './questions/index'
import { buildYml } from "./build-file";

export default () => {
  prompt(composeQuestions).then(answers => {
    selectServiceProps(answers)
  })
}

const selectServiceProps = function (params) {
  var quantity = parseInt(params['services-quantity'])
  var count = 1
  var servicesParams = []

  const askQuestion = () => {
    console.log(`\n Set information about ${count} service`)
    prompt(serviceQuestions).then(response => {
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