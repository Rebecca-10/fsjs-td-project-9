'use strict';

const express = require('express');
const User = require('./models').User;
const Course = require('./models').Course;
const { authenticateUser } = require('./authentication');

//instance of a router
const router = express.Router();

function asyncHandler(cb){
    return async (req, res, next)=>{
      try {
        await cb(req,res, next);
      } catch(err){
        next(err);
      }
    };
  }
//getting a current user that has been checked 
  router.get('/users', authenticateUser, asyncHandler(async (req, res) => {

    const user = req.currentUser;
    res.json(user);
  
  }));

  //new user 
  router.post('/users', asyncHandler(async(req, res) => {

    try {
      await User.create(req.body);
  
      res.status(201).location("/").end();
    } catch (error) {
      // condition for error
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
      } else {
        throw error;
      }
    }
  
  }));

  //return courses
  router.get('/courses', asyncHandler(async(req, res) => {

   
    
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: 'user',
        }
      ]
    })
  
    res.status(200);
    res.json(courses);
  
  }));