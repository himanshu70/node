const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userModel = require('../model/userModel');

const userRouter = express.Router();

userRouter.use(bodyParser.json());
dishesRoute.route('/signup')
.post()