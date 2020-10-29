const yml = require('js-yaml');
const serviceProps = require('./serviceProps.json');
var fs = require('fs');

const ph = '@@@@@@';
const quantities = {};

module.exports = function(serviceParams, serviceInfo){
  var cc = { version: serviceInfo.composeVersion, services: {}};

  if (serviceInfo.additionalComponents) {
    if(serviceInfo.additionalComponents.indexOf('Network') !== -1) {
      cc['networks'] = new Array(parseInt(serviceInfo.networkQuantity)).fill(`${ph}:`);
    }
    if(serviceInfo.additionalComponents.indexOf('Volumes') !== -1) {
      cc['volumes'] = new Array(parseInt(serviceInfo.volumesQuantity)).fill(`${ph}:`);
    }
  }

  serviceParams.forEach((item) => {
    cc.services[item.serviceName] = {};

    serviceProps.quant.forEach((it) => {
      if (item.serviceComponents.indexOf(it) !== -1){
        quantities[it] = parseInt(item[`${it}Quantity`]);
      }
    });

    item.serviceComponents.forEach(it => {
      cc.services[item.serviceName][it] = quantities[it] ? getPropertyList(it) : ph;
    });
  });

  var ymlText = yml.safeDump(cc);
  
  fs.writeFile("docker-compose.yml", ymlText, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });
}

const getPropertyList = function(prop) {
  switch(prop) {
    case 'volumes':
    case 'ports':
      return new Array(quantities[prop]).fill(`${ph}:${ph}`);
    
    case 'env':
      return new Array(quantities[prop]).fill(`KEY=${ph}`);

    default:
      return new Array(quantities[prop]).fill(ph);
  }  
}