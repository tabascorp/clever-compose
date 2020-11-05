import { prompt } from 'inquirer'
import { selectServiceProps } from './clever-services'

const questions = require('./questions').default

export default () =>
  prompt(questions).then(answers => {
    selectServiceProps(answers)
  })
