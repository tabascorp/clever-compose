import { prompt } from "inquirer";
import { composeQuestions, serviceQuestions } from './questions'
import { buildYml } from "./build-file"

export default (): Promise<void> => prompt(composeQuestions)
  .then(answers => selectServiceProps(answers))

const selectServiceProps = (params) => {
  const quantity: number = parseInt(params['services-quantity'])
  const servicesParams = []
  let count = 1

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