const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({ 
  item: String,
  price:Number,
  qty: Number,
  link: String,
  description: String,
  thumbnail: String,  
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
