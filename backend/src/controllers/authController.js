import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

    jwt.sign(
      {
        id: userSaved._id,
      },
      'secret123',
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) consonle.log(err);
        res.cookie('token', token);
        res.json({
          message: 'User created successfully',
        });
      },
    );

    // res.send(userSaved);    (we need create all but no return all the info)
    // res.json({
    //   id: userSaved._id,
    //   username: userSaved.email,
    //   email: userSaved.email,
    // }); //(only necesary data for the frontend)
  } catch (error) {
    console.log(error);
  }
};

//Login
export const login = (req, res) => {
  res.send('login');
};
