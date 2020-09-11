// this is just the modified sequelize index file.

'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const endpointsPath = `${__dirname}/endpoints`;
const endpoints = {};
const base = require('express').Router()

fs
  .readdirSync(endpointsPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const endpoint = require(path.join(endpointsPath, file));

    base.use(`/${file.split('.')[0]}`, endpoint)
    endpoints[file.split('.')[0]] = endpoint;
    console.log(file, file.split('.')[0]);
  });


// Object.keys(endpoints).forEach(endpointName => {
//   if (endpoints[endpointName].associate) {
//     endpoints[endpointName].associate(endpoints);
//   }
// });

module.exports = base;