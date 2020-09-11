import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://frozen-ocean-88365.herokuapp.com'
  });

  module.exports = instance