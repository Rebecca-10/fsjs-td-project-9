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

  //new course 
  router.post('/courses', authenticateUser, asyncHandler(async(req, res) => {

    try {
      const course = await Course.create(req.body);
  
      res.status(201);
      res.location(`/courses/${course.id}`).end();
    } catch (error) {
      // If there is a sequelize error 
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
      } else {
        throw error;
      }
    }
    
  }));

  router.get('/courses/:id', asyncHandler(async(req, res) => {

    // Get course, and include the model associations
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "user",
        }
      ]
    })  
  
    res.status(200);
    res.json(course);
  
  }));

  //updating course 

  router.put('/courses/:id', authenticateUser, asyncHandler(async(req, res) => {

    try {
      const course = await Course.findByPk(req.params.id)
  
      await course.update(req.body);
    
      res.status(204).json();
    } catch (error) {
      // If there is a sequelize error 
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
      } else {
        throw error;
      }
    }
  
  }));
  
  // deletes course 
  router.delete('/courses/:id', authenticateUser, asyncHandler(async(req, res) => {
  
    const course = await Course.findByPk(req.params.id)
  
    if (course) {
      await course.destroy();
    
      res.status(204).json();
    } else {
      res.status(404).json({
        message: 'Route Not Found',
      });
    }
  
  }));
  
  module.exports = router;