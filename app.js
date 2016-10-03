pry = require('pryjs');
var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var logger = require('morgan');
