'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePlan = exports.getAllMaster = exports.getplan = exports.getAll = exports.createMasterPlan = exports.createplan = undefined;

let createplan = exports.createplan = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log("Creating a pricing plan");
    const reqbody = req.swagger.params.pricingplan.value;
    try {
      const deserializeData = yield _planSerializer2.default.deserialize(reqbody);
      const pricingPlanResponse = yield _pricingPlan2.default.createNew(deserializeData[0]);
      const serializedPlanResponse = yield _planSerializer2.default.serialize(pricingPlanResponse);
      res.status(201).send(serializedPlanResponse);
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        res.status(409).json(_errorsList.errorsList.duplicateID);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function createplan(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let createMasterPlan = exports.createMasterPlan = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    console.log("Creating master Pricing plan");
    const reqbody = req.swagger.params.pricingplan.value;
    try {
      const deserializeData = yield _planMasterSerializer2.default.deserialize(reqbody);
      const pricingPlanResponse = yield _pricingPlanMaster2.default.createNew(deserializeData[0]);
      const serializedPlanResponse = yield _planMasterSerializer2.default.serialize(pricingPlanResponse);
      res.status(201).send(serializedPlanResponse);
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        res.status(409).json(_errorsList.errorsList.duplicateID);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function createMasterPlan(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

let getAll = exports.getAll = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    console.log("Getting all pricing plans");
    try {
      const pricingPlanResponse = yield _pricingPlan2.default.getAll();
      const serializedPlanResponse = yield _planSerializer2.default.serialize(pricingPlanResponse);
      res.status(200).json(serializedPlanResponse);
    } catch (err) {
      res.status(err.statusCode).json(err.error);
    }
  });

  return function getAll(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

let getplan = exports.getplan = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    console.log("Getting a plan - " + req.swagger.params.plan.value);
    try {
      const pricingPlanResponse = yield _pricingPlan2.default.getplan(req.swagger.params.plan.value);
      const serializedPlanResponse = yield _planSerializer2.default.serialize(pricingPlanResponse);
      res.status(200).json(serializedPlanResponse);
    } catch (err) {
      res.status(err.statusCode).json(err.error);
    }
  });

  return function getplan(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

let getAllMaster = exports.getAllMaster = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    console.log("Getting all master plan");
    try {
      const pricingPlanResponse = yield _pricingPlanMaster2.default.getAll();
      const serializedPlanResponse = yield _planMasterSerializer2.default.serialize(pricingPlanResponse);
      res.status(200).json(serializedPlanResponse);
    } catch (err) {
      res.status(err.statusCode).json(err.error);
    }
  });

  return function getAllMaster(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})();

let updatePlan = exports.updatePlan = (() => {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    console.log("Updating pricing plan - " + req.swagger.params.plan.value);
    const reqbody = req.swagger.params.pricingplan.value;
    try {
      const deserializeData = yield _planSerializer2.default.deserialize(reqbody);
      const subscriptionUpdateResponse = yield _pricingPlan2.default.updateByID(deserializeData[0], req.swagger.params.plan.value);
      res.status(200).json((yield _planSerializer2.default.serialize(subscriptionUpdateResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield accountSerializer.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function updatePlan(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
})();

var _pricingPlan = require('../../lib/models/pricingPlan');

var _pricingPlan2 = _interopRequireDefault(_pricingPlan);

var _planSerializer = require('../../lib/serializers/planSerializer');

var _planSerializer2 = _interopRequireDefault(_planSerializer);

var _pricingPlanMaster = require('../../lib/models/pricingPlanMaster');

var _pricingPlanMaster2 = _interopRequireDefault(_pricingPlanMaster);

var _planMasterSerializer = require('../../lib/serializers/planMasterSerializer');

var _planMasterSerializer2 = _interopRequireDefault(_planMasterSerializer);

var _errorsList = require('../../lib/errors/errorsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }