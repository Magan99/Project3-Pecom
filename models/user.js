const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  memberId: { type: String, required: true },
  memberName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: false },
  phone: { type: String, required: false },
  password: { type: String, required: true  },
  cCard: { type: String, required: false },
  userTheme: { type: String, required: false },
  userImage: { type: String, required: false },
  colorDb: { type: String,required: false },
  textalignDb: { type: String, required: false },
  divfontsizeDb: { type: String, required: false },
  pfontsizeDb: { type: String, required: false },
  fontfamilyDb: { type: String, required: false },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart"
  },
  bookExchange: {
    type: Schema.Types.ObjectId,
    ref: "Book"
  },
  orders: {
    type: Schema.Types.ObjectId,
    ref: "Orders"
  },
  savedItems: {
    type: Schema.Types.ObjectId,
    ref: "SavedItems"
  },
  
});

const User = mongoose.model("User", UserSchema);

module.exports = User;