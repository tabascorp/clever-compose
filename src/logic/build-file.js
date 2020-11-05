import yml from 'js-yaml'
import compose_data from '../../static/compose-data.json'
import fs from 'fs'

const serviceProps = compose_data.serviceProps

const placeHolder = ``
const quantities = {}

const addAdditionalComponents = (serviceInfo, dockerComposeData) => {
  const additionalComponents = serviceInfo['additional-components']

  if (additionalComponents) {
    additionalComponents.forEach(item => {
      dockerComposeData[item] = new Array(
        parseInt(serviceInfo[`${item}-quantity`])
      ).fill(`${placeHolder}:`)
    })
  }

  return dockerComposeData
}

const addServices = (serviceParams, dockerComposeData) => {
  serviceParams.forEach(item => {
    addServicePropQuantities(item)
    dockerComposeData = addServiceData(item, dockerComposeData)
  })

  return dockerComposeData
}

function addServiceData (item, dockerComposeData) {
  item['service-components'].forEach(it => {
    dockerComposeData.services[item['service-name']] = {}
    if (quantities[it]) {
      dockerComposeData.services[item['service-name']][it] = getPropertyList(it)
    } else if (it === 'deploy') {
      // TODO deployment to file
      dockerComposeData.services[item['service-name']][it] = {}
    } else {
      dockerComposeData.services[item['service-name']][it] = placeHolder
    }
  })

  return dockerComposeData
}

function addServicePropQuantities (item) {
  serviceProps.quant.forEach(it => {
    if (item['service-components'].indexOf(it) !== -1) {
      quantities[it] = parseInt(item[`${it}-quantity`])
    }
  })
}

const getPropertyList = function (prop) {
  switch (prop) {
    case 'volumes':
    case 'ports':
      return new Array(quantities[prop]).fill(`${placeHolder}:${placeHolder}`)

    case 'env':
      return new Array(quantities[prop]).fill(`KEY=${placeHolder}`)

    default:
      return new Array(quantities[prop]).fill(placeHolder)
  }
}

function writeToFile (ymlText) {
  fs.writeFile('docker-compose.yml', ymlText, function (err) {
    if (err) {
      return console.log(err)
    }

    console.log('The file was saved!')
  })
}

export default function (serviceParams, serviceInfo) {
  let dockerComposeData = {
    version: serviceInfo['compose-version'],
    services: {}
  }

  dockerComposeData = addAdditionalComponents(serviceInfo, dockerComposeData)
  dockerComposeData = addServices(serviceParams, dockerComposeData)
  writeToFile(yml.safeDump(dockerComposeData))
}
