import { askForServiceData } from './service/serviceOperations';
import { askForComposeData, processComposeData } from './compose/composeOperations';
import saveCompose from './compose/composeIO';

export default function run() {
  askForComposeData()
    .then(askForServiceData)
    .then(processComposeData)
    .then(saveCompose);
}
