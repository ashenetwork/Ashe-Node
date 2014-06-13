exports.ASHEError = function (message, code) {
    this.message = message || "";
    this.code = code || "0";
};
exports.ASHEError.prototype = new Error();
exports.ASHEError.prototype.constructor = exports.ASHEError;
