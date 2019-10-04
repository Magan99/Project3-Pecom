const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedItemsSchema = new Schema({

  item: String,
  price: Number, 
  link: String,
  description: String,
  thumbnail: String,  
});

const SavedItems = mongoose.model("SavedItems", savedItemsSchema);

module.exports = SavedItems;
