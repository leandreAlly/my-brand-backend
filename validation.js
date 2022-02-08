// VALIDATION
const Joi = require("@hapi/joi");
 

// Register validation

const registerValidation = (data) => {

    const schema = Joi.object({
  
      name: Joi.string().min(6).required(),
  
      email: Joi.string().min(6).required().email(),
  
      password: Joi.string().min(6).required(),
  
    });
  
    return schema.validate(data);
  
  };
const messageValidation = (data) => {

    const schema = Joi.object({
  
      name: Joi.string().min(6).required(),
      email: Joi.string().min(6).required().email(),
      message: Joi.string().min(10).required(),
  
    });
  
    return schema.validate(data);
  
  };

const loginValidation = (data) => {

    const schema = Joi.object({
  
      email: Joi.string().min(6).required().email(),
  
      password: Joi.string().min(6).required(),
  
    });
  
    return schema.validate(data);

  
  };
const articleValidation = (data) => {

    const schema = Joi.object({
  
      title: Joi.string().min(10).required().max(255),
      content: Joi.string().min(10).required(),
      imageUrl: Joi.string().required(),
      userId: Joi.string().required(),
    });
  
    return schema.validate(data);
  
  };

  

  module.exports.registerValidation = registerValidation;
  module.exports.loginValidation = loginValidation;
  module.exports.articleValidation = articleValidation;
  module.exports.messageValidation = messageValidation;