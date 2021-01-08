import { defaultTemplatesPath } from './constants';

type InputQuestion = {
  type: string,
  name: string,
  message: string,
  default: string
};

const setTemplatePathQuestion: InputQuestion = {
  type: 'input',
  name: 'templatesPath',
  message: 'Set path for your templates',
  default: defaultTemplatesPath,
};

export default setTemplatePathQuestion;
