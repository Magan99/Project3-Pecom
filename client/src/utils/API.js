import axios from "axios";

// const BASEURL = process.env.REACT_APP_BASEURL
// const APIKEY = process.env.REACT_APP_APIKEY

export default {
  //Search for an item to buy
  // search: function(query) {
    // return axios.get("https://api.walmartlabs.com/v1/search?&apiKey=vng9pukufs97mcyyjs5ps266&query=" +  query + "&format=json");
    // return axios.get(BASEURL + query + APIKEY);
    // return axios.get('/api/walmart/'+ query);
    // return axios.get(BASEURL + APIKEY + query + "&format=json");
  // },
  
    // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(currentAccount) {
    console.log("FROM CLIENT API getUser ====", currentAccount)
    return axios.get(`/api/users/current/${currentAccount.userName}`);
  },
  // Update the user with the given id
  updateUser: function(id) {
    console.log("FROM CLIENT API updateUser ====", id)
    return axios.put("/api/users", id);
  },
  // Update the user with the given id
  // updateCart: function(id) {
  //   console.log("FROM CLIENT API updateCart -- MEMBER_id ====", id)
  //   console.log(id.memberId)
  //   console.log(id.item)
  //   return axios.put("/api/cart/" + id );
  // },

  updateCart: function(cart) {
    // 
    console.log("FROM CLIENT API updateCart -- MEMBER_id ====", cart)
    console.log(cart.memberId)
    console.log(cart.item)
    const id = cart._id;

    return axios.put(`/api/cart/current/${id}`, cart);
    // server expects: /api/cart/current/someid
    // /api/cat/currentsomeid
  },
  
  deleteUser: function(id) {    
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database.
  saveUser: function(newAccount) {
    console.log("API saveUser ====", newAccount)
    return axios.post("/api/users", newAccount);
  },
  loginUser: function(userAccount) {
    console.log("API loginUser ====", userAccount)
    return axios.post("/api/users/login", userAccount);
  }
};
