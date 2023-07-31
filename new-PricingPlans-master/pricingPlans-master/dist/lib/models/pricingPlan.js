'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datastore = require('../../lib/service/db/datastore');

var _datastore2 = _interopRequireDefault(_datastore);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = pricingPlanModel();


function pricingPlanModel() {
  const Schema = _mongoose2.default.Schema;
  const PricingPlanSchema = new Schema({
    plantitle: {
      type: String,
      required: true,
      unique: true,
      dropDups: true
    },
    type: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true

    },
    cost: Number,
    ecgCounts: Number,
    ecgReviews: Number,
    creationDate: Date

  });

  return {
    createNew: (() => {
      var _ref = _asyncToGenerator(function* (plan) {
        PricingPlanSchema.pre('save', function (next) {
          this.creationDate = new Date();
          next();
        });
        PricingPlanSchema.set('toJSON', {
          transform: function transform(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
        });
        const pricingModel = _mongoose2.default.model('pricingModel', PricingPlanSchema);
        return yield _datastore2.default.addToStore(new pricingModel(plan));
      });

      function createNew(_x) {
        return _ref.apply(this, arguments);
      }

      return createNew;
    })(),
    getAll: (() => {
      var _ref2 = _asyncToGenerator(function* () {
        const pricingModel = _mongoose2.default.model('pricingModel', PricingPlanSchema);
        return yield _datastore2.default.findAll(pricingModel);
      });

      function getAll() {
        return _ref2.apply(this, arguments);
      }

      return getAll;
    })(),
    getplan: (() => {
      var _ref3 = _asyncToGenerator(function* (planname) {
        const pricingModel = _mongoose2.default.model('pricingModel', PricingPlanSchema);
        return yield _datastore2.default.findOne(pricingModel, planname);
      });

      function getByname(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getByname;
    })(),
    updateByID: (() => {
      var _ref4 = _asyncToGenerator(function* (plan, planname) {
        const pricingModel = _mongoose2.default.model('pricingModel', PricingPlanSchema);
        return yield _datastore2.default.upsert(pricingModel, planname, plan);
      });

      function updateByID(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return updateByID;
    })()
  };
}