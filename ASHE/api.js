var request = require('request');
var ASHEError = require('./error');

exports.post_request = function(data, method, callback) {
  var mode = data.mode;
  var merchant_id = data.merchant_id;
  var uri;
  var base_url = 'https://www.ashepay.com';

  // arguments validations
  if (['charge', 'refund'].indexOf(method) == -1) {
    callback (new ASHEError.ASHEError("Unknown method.", "0"));
    return;
  }
  if (!data.merchant_id) {
    callback (new ASHEError.ASHEError("Invalid merchant id.", "E402"));
    return;
  }
  if (!data.private_key) {
    callback (new ASHEError.ASHEError("Invalid private key.", "E402"));
    return;
  }
  if (['sandbox', 'production'].indexOf(mode) == -1) {
    callback (new ASHEError.ASHEError("Invalid mode. Please specify either 'production' or 'sandbox'.", "E402"));
    return;
  }
  if (!data.amount) {
    callback (new ASHEError.ASHEError("Invalid amount.", "E401"));
    return;
  }
  if (method == 'charge' && !data.token) {
    callback (new ASHEError.ASHEError("Invalid token.", "E401"));
    return;
  }
  if (method == 'refund' && !data.transaction_id) {
    callback (new ASHEError.ASHEError("Invalid transaction id.", "E401"));
    return;
  }

  //set the uri
  if (method == 'charge') {
    if (mode == 'production')
      uri = base_url + "/api/payment/v1/" + merchant_id + "/";
    else 
      uri = base_url + "/api/sandbox/" + merchant_id + "/";
  }
  else if (method == 'refund') {
    if (mode == 'production')
      uri = base_url + "/api/refund/v1/" + merchant_id + "/";
    else 
      uri = base_url + "/api/sandbox/refund/" + merchant_id + "/";
  }

  var options = {
    uri: uri,
    method: 'POST',
    headers: {"Accept": "application/json"},
    json: data,
    timeout: 10000
  };

  request(options, function(error, response, body) {
    if (error)
      callback (new ASHEError.ASHEError("Could not connect to the server. Please check your internet connection.", "E500"));
    else {
      try {
        json_body = JSON.parse(JSON.stringify(body));
        if (json_body.errors instanceof Array && json_body.errors.length > 0) {
          var error  = json_body.errors[0];
          callback (new ASHEError.ASHEError(error.msg, error.code));
          return;
        }
      } catch(e) {
        callback (new ASHEError.ASHEError("Unable to parse the JSON response from the server.", "E500"));
        return;
      }
      callback(null, json_body);
    }
  });
}
