'use strict';
const expect = require('chai').expect;
const { default: next } = require('next');
const ConvertHandler = require('../controllers/convertHandler.js');
const { query } = require('express');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res, next) {
      // let num, unit;
      let initNum, initUnit;
      const queryInput = req.query.input;
      console.log('this is query input >> ' + queryInput)
      initNum = convertHandler.getNum(queryInput);
      initUnit = convertHandler.getUnit(queryInput);

      // Modifing Proccess
      let returnNum, returnUnit, returnString, returnJson;
      let spelledOutUnit = [];
      if (initUnit && initNum) {
        returnUnit = convertHandler.getReturnUnit(initUnit);
        returnNum = convertHandler.getReturnNum(
          initNum,
          initUnit
        );
        spelledOutUnit = convertHandler.getSpellOutUnit(initUnit);
        returnString = convertHandler.getString(
          initNum,
          returnNum,
          spelledOutUnit
        );
        returnJson = convertHandler.getJson(
          initNum,
          returnNum,
          initUnit,
          returnUnit,
          returnString
        );
      } else if (!initUnit && !initNum) {
        returnString = 'invalid number and unit'
        returnJson = "invalid number and unit"
      } else if (!initUnit) {
        returnString = 'invalid unit'
        returnJson = "invalid unit"
      } else if (!initNum) {
        returnString = 'invalid number'
        returnJson = "invalid number"
      }
      //Send JSON
      console.log('this is returnString >> ' + returnString)
      res.send(returnJson)
    })
};
