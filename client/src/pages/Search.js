import React, { Component } from "react";
// import API from "../utils/API";
// import Container from "../components/Container";
// import UserNavbar from "../components/UserNavbar";
import SearchResults from "../components/SearchResults";
// import ItemDetails from "../components/ItemDetails";
// import { View } from "react-native";

class Search extends Component {
  state = {
    search: this.props.search,
    favMessage:"",
    id: "",      
    items: [],    
    title: "",
    authors: "",
    link: "",
    thumbnail: "",
    description: "",
    publisheddate: "",           
    error: "",
    showItem: [],
    showItemState: true
  };
  
  // addItemToCart = (id) => {
  //   console.log("THIS IS ITEM ID===>")
  // }


  render() {
    console.log('this.state.showItem', this.state.showItem)    

    return (
      <div>
        {/* <Container style={{ marginTop: -25 }}> */}         
         
          {/* <View style={{flex: 1, flexDirection: 'row'}}></View> */}
        {this.props.items && <SearchResults Items={this.props.items} cart={this.props.cart} addItemToCart={this.addItemToCart} itemDetails={this.itemDetails} />}
         
        {/* </Container> */}
      </div>
      
    );
  }
}

export default Search;
