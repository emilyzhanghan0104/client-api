const Joi = require("joi");

const email = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  })
  .required();

const pin = Joi.string().min(6).max(6).required();

const password = Joi.string().alphanum().min(3).max(30).required();

const emailValidator = (req, res, next) => {
  const schema = Joi.object({ email });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const emailPassPinValidator = (req, res, next) => {
  const schema = Joi.object({ email, pin, password });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

module.exports = {
  emailValidator,
  emailPassPinValidator,
};
