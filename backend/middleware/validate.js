import Joi from "joi";

// Create User Controller Example
export const createUser = async (req, res) => {
  // Joi validation schema
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // Proceed with creating the user after successful validation
    // ...
  } catch (error) {
    // Error handling code
  }
};

  