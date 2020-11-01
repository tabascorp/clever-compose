const yml = require('js-yaml'),
  compose_data = require('./compose-data.json'),
  serviceProps = compose_data.serviceProps;
var fs = require('fs');

const ph = ``;
const quantities = {};

module.exports = function(serviceParams, serviceInfo){
  var cc = { version: serviceInfo['compose-version'], services: {}};

  if(serviceInfo['additional-components']) {
    serviceInfo['additional-components'].forEach((item) => {
      cc[item] = new Array(parseInt(serviceInfo[`${item}-quantity`])).fill(`${ph}:`);
    });
  }

  serviceParams.forEach((item) => {
    cc.services[item['service-name']] = {};

    serviceProps.quant.forEach((it) => {
      if (item['service-components'].indexOf(it) !== -1){
        quantities[it] = parseInt(item[`${it}-quantity`]);
      }
    });

    item['service-components'].forEach(it => {
      if(quantities[it]) {
        cc.services[item['service-name']][it] = getPropertyList(it)
      } else if(it === 'deploy') {        
        // TODO deployment to file
        cc.services[item['service-name']][it] = {};
      } else {
        cc.services[item['service-name']][it] = ph;
      }
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