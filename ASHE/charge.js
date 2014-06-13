var API = require("./api");

var Charge = module.exports = function (params) {
  this.params = params;
};

Charge.prototype.charge = function (data, callback) {
  if (this.params != null && typeof this.params !== undefined) {
    for (var key in this.params)
      if (this.params.hasOwnProperty(key))
        data[key] = this.params[key];
  }
  delete data.Charge
  return API.post_request(data, 'charge', callback);
};

Charge.prototype.refund = function (data, callback) {
  if (this.params != null && typeof this.params !== undefined) {
    for (var key in this.params)
      if (this.params.hasOwnProperty(key))
        data[key] = this.params[key];
  }
  delete data.Charge
  return API.post_request(data, 'refund', callback);
};

