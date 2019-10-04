const db = require("../models");

// Defining methods for the itemsController
module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findById: function(req, res) {
    console.log("USERNAME IN FINDBYID IN=====", req.params.userName)
    db.User
      .find({userName : req.params.userName})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  update: function(req, res) {
    console.log("ITEMS INTO THE CART=====", req.body)
    console.log("ID IN PARAMS IN CART CONTROLLER=====", req.params.id)
    return db.Cart.create(req.body) 
      .then(function(dbCart) {
        return db.User.findOneAndUpdate({ _id: req.params.id }, {cart: dbCart._id}, {new:true}, req.body)
    })
      .then(dbUser => res.json(dbUser))
      .catch(err => {
        console.error('Error creating the cart!', err);
        return res.status(422).json(err)
      });
  },
  
  // create: function(req, res) {
  //   console.log("ID IN PARAMS IN CART CONTROLLER=====", req.params.id)
  //   console.log("ITEMS INTO THE CART=====", req.body)   
  //     db.Cart.create(req.body)
  //   .then(function(dbCart) {
  //     return db.User.findOneAndUpdate({ _id: req.params.id }, { cart: dbCart._id }, { new: true });
  //   })
  //   .then(function(dbUser) {
  //     res.json(dbUser);
  //   })
  //   .catch(function(err) {
  //     res.status(422).json(err);
  //   });
    
  // },


  
  remove: function(req, res) {
    db.user
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
