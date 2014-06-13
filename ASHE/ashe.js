var Charge = require("./charge");

var ASHE = module.exports = function (params) {
  if (typeof params.mode !== 'undefined') {
    this.mode = params.mode;
  }
  if (typeof params.merchant_id !== 'undefined') {
    this.merchant_id = params.merchant_id;
  }
  if (typeof params.private_key != 'undefined') {
    this.private_key = params.private_key;
  }

  this.Charge = new Charge(this);

  return this;
}
