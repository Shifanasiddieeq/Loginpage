const userSchema = require('../model/userModel');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10; // Use uppercase for constants

// Registration Controller
const registerUser = async (req, res) => {
  try {
    const { email, password, confirmpassword } = req.body;

    // Check if passwords match
    if (password !== confirmpassword) {
      return res.render('user/register', { message: 'Passwords do not match' });
    }

    // Check if the user already exists
    const user = await userSchema.findOne({ email });
    if (user) {
      return res.render('user/register', { message: 'User already exists' });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new userSchema({ email, password: hashedPassword });
    await newUser.save();

    // Redirect to login page after successful registration
    res.redirect('/user/login'); // Redirect instead of render
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.render('user/register', { message: 'An error occurred. Please try again.' });
  }
};

const logout=(req,res)=>{
  req.session.user=null
  res.redirect('/user/login')
}
// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.render('user/login', { message: 'User doesn’t exist' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('user/login', { message: 'Incorrect Password' });
    }

    req.session.user = true; // Set session on successful login

    // On successful login, redirect to home
    res.redirect('/user/home'); // Redirect instead of render
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.render('user/login', { message: 'Something went wrong' });
  }
};

// Render Register Page
const loadRegister = (req, res) => {
  res.render('user/register', { message: null });
};

// Render Login Page
const loadLogin = (req, res) => {
  res.render('user/login', { message: null });
};

// Render User Home
const loadHome = (req, res) => {
  res.render('user/userHome');
};

module.exports = { registerUser, loadRegister, loadLogin, login, loadHome ,logout};
