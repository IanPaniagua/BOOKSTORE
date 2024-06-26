import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

//Register
export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    //we create an object to create a new user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    console.log(newUser);
    const userSaved = await newUser.save(); //to save in the db (all the data)

    //create acces token (function imported)
    const token = await createAccessToken({ id: userSaved._id });

    //save the token in a cookie
    res.cookie('token', token);

    //res.send(userSaved); (we need create all but no return all the info)

    //(only necesary data for the frontend in json)
    res.json({
      id: userSaved._id,
      username: userSaved.email,
      email: userSaved.email,
      message: 'User created successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    //create acces token (function imported)
    const token = await createAccessToken({ id: userFound._id });

    //save the token in a cookie
    res.cookie('token', token);
    res.json({
      id: userFound._id,
      username: userFound.email,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
