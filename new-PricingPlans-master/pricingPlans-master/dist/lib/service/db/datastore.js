'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = datastore();


function datastore() {
  const mongoDBHost = _config2.default.get('MONGODB_HOST');
  const mongoDBPort = _config2.default.get('MONGODB_PORT');
  var options = {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  };
  // _mongoose2.default.connect(`mongodb://${mongoDBHost}:${mongoDBPort}/sanket`, options, (err, cb) => {
  //   if (err) return console.log(err);
  //   console.log('Pricing plan API connected to Database');
  // });

// implement new code

const mongooseOptions = {
  useNewUrlParser: true, // Use the new URL string parser
  useUnifiedTopology: true, // Use the new Server Discovery and Monitoring engine
};
// MongoDB connection URI      
const mongoURI = 'mongodb+srv://agatsa62:OD9sykKylSNhND6y@cluster0.vnegceg.mongodb.net/sanket?authSource=admin';
// Connect to MongoDB
_mongoose2.default.connect(mongoURI, mongooseOptions)
  .then(() => {
    console.log('MongoDB connected successfully!');
    // ... Your application code ...
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

//


  _mongoose2.default.Promise = _bluebird2.default;
  _mongoose2.default.set('debug', true);
  return {
    addToStore: (() => {
      var _ref = _asyncToGenerator(function* (obj) {
        return new Promise(function (resolve, reject) {
          obj.save(function (err, doc) {
            if (err) {
              reject(err);
            } else {
              resolve(doc);
            }
          });
        });
      });

      function addToStore(_x) {
        return _ref.apply(this, arguments);
      }

      return addToStore;
    })(),
    findAll: (() => {
      var _ref2 = _asyncToGenerator(function* (model) {
        return new Promise(function (resolve, reject) {
          model.find({}, function (err, doc) {
            if (err) {
              reject(err);
            } else {
              resolve(doc);
            }
          });
        });
      });

      function findAll(_x2) {
        return _ref2.apply(this, arguments);
      }

      return findAll;
    })(),
    findAllMaster: (() => {
      var _ref3 = _asyncToGenerator(function* (model) {
        return new Promise(function (resolve, reject) {
          model.find({}, function (err, doc) {
            if (err) {
              reject(err);
            } else {
              resolve(doc);
            }
          });
        });
      });

      function findAllMaster(_x3) {
        return _ref3.apply(this, arguments);
      }

      return findAllMaster;
    })(),
    findOne: (() => {
      var _ref4 = _asyncToGenerator(function* (model, planname) {
        return new Promise(function (resolve, reject) {
          model.findOne({ plantitle: planname }, function (err, doc) {
            if (err) {
              reject(err);
            } else {
              doc ? resolve(doc) : reject('Pricing plan with id: ' + id + ' not found!');
            }
          });
        });
      });

      function findOne(_x4, _x5) {
        return _ref4.apply(this, arguments);
      }

      return findOne;
    })(),
    upsert: (() => {
      var _ref5 = _asyncToGenerator(function* (model, id, data) {
        return new Promise(function (resolve, reject) {
          model.findOneAndUpdate(id, data, { new: true, upsert: true }, function (err, doc) {
            if (err) {
              reject(err);
            } else {
              doc ? resolve(doc) : reject('Pricing plan with id: ' + id + ' not found!');
            }
          });
        });
      });

      function upsert(_x6, _x7, _x8) {
        return _ref5.apply(this, arguments);
      }

      return upsert;
    })()
  };
}