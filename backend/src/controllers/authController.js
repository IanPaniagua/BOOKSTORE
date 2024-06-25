import e from 'express';
import User from '../models/userModel.js';

//Register
export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    //we create an object to create a new user
    const newUser = new User({
      username,
      email,
      password,
    });
    console.log(newUser);
    const userSaved = await newUser.save(); //to save in the db
    res.send(userSaved);
  } catch (error) {
    console.log(error);
  }
};

//Login
export const login = (req, res) => {
  res.send('login');
};
