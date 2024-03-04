const catchAsync = (fn) => async (req, res, next) => {
  Promise.resolve(fn(req, res)).catch((err) => next(err));
};

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
      // console.log(object[key]);
    }
    // console.log(obj, "OBJ..............................")
    return obj;
  }, {});
};

module.exports = { catchAsync, pick };
