const config = require("../config/auth.config");
const db = require("../models");
const { v4: uuidv4 } = require('uuid');
var nodemailer = require('nodemailer');
var bcrypt = require("bcryptjs");
const User = db.user;
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 's0556781304@gmail.com',
      pass: '212116271'
    }
  });
  

// Create and Save a new Note
exports.create = (req, res) => {

  pass = uuidv4();
  // Create 
  const user = new User({
    // userPassword: bcrypt.hashSync(pass, 8),
    userPassword: req.body.userPassword,
    userEmail: req.body.userEmail,
    // role: req.body.role
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });
  var mailOptions = {
    from: 's0556781304@gmail.com',
    to: user.userEmail,
    subject: 'Wellcome to our shop!',
    text: 'Have a fun shopping!!'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent to: ' + info.response);
    }
  });
  
 
};

exports.findAll = (req, res) => {
  
  User.find()
    .then(notes => {
      res.send(notes);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
      });
    });
};

exports.findCond = (req, res) => {
  User.find(req.query)
      .then(orders => {
          res.send(orders);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving Pictures."
          });
      });
};
exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      res.status(200).send({
        id: user._id,
        userName: user.userName,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role.name.toUpperCase(),
        schoolRef: user.schoolRef,
      });
    });
};




// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.userName) {
    return res.status(400).send({
      message: "User content can not be empty"
    });
  }

  // Find note and update it with the request body
  User.findByIdAndUpdate(req.query.id, {
    name: req.body.name,
  }, { new: true })
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      res.send(note);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating User with id " + req.params.id
      });
    });
};

exports.pageinator = (req, res) => {
  Order.find().skip(req.params.page).limit(5).exec().then(note => {
      if (!note) {
          return res.status(404).send({
              message: "user not found with id " + req.params.id
          });
      }
      res.send(note)
  }
  )
}

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.query.id)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      res.send({ message: "User deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete User with id " + req.params.id
      });
    });
};
