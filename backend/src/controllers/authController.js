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

    //res.send(userSaved);                  //(we need create all but no return all the info)
    //(only necesary data for the frontend)
    res.json({
      id: userSaved._id,
      username: userSaved.email,
      email: userSaved.email,
      message: 'User created successfully',
    });
  } catch (error) {
    console.log(error);
  }
};

//Login
export const login = (req, res) => {
  res.send('login');
};
