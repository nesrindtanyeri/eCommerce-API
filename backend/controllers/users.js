// controllers/users.js
import User from "../models/User.js";
import Joi from "joi";

// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check email and password
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Find user in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Password validation
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login.", error });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "An error occurred.", error });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "An error occurred.", error });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists."
      });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password
    });

    // Success response
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: newUser
    });
  } catch (error) {
    console.error("Error creating user:", error);

    // Error response
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the user.",
      error: error.message
    });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  // Joi schema validation
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
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    // Update user
    const { name, email, password } = req.body;
    await user.update({ name, email, password });

    // Success response
    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: user
    });
  } catch (error) {
    console.error("Error updating user:", error);

    // Error response
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the user.",
      error: error.message
    });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    await user.destroy();

    // Success response
    res.status(200).json({
      success: true,
      message: "User deleted successfully."
    });
  } catch (error) {
    console.error("Error deleting user:", error);

    // Error response
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user.",
      error: error.message
    });
  }
};
