import React from "react";
import { List, ListItem } from "../List";
import "../SearchResults/style.css";

// addItemToCart = (id) => {
//   console.log("THIS IS ITEM ID===>")
// }

function SearchResults(props) {

  // console.log('props', props)
  
  return (
    <div>
      <List>                
        {props.Items.map(result => (
          <ListItem>
                <img alt={result.name} width="120" height="180" className="img-fluid" src={result.largeImage == null ? 'https://lmtrain.github.io/lm-images/assets/images/books5.jpg' : result.largeImage} />
              <div className="content">
                    <p><b>Item Name             :</b> {result.name}</p>
                    <span><b>Price         :</b> ${result.salePrice} | |</span>
                    <span><b>Rating :</b> {result.customerRating}</span>
              </div>
            
            <span><button key={result.itemId} id={result.itemId}type="submit" onClick={() => props.addItemToCart(result.itemId)} className="btn btn-success">Add to cart</button></span><span>  </span>
            <span><button key={result.itemId}id={result.itemId} type="submit" onClick={() => props.itemDetails(result.itemId)} className="btn btn-success">Item Details</button></span><span>  </span>
            <span><button key={result.itemId}id={result.itemId} type="submit" onClick={() => props.saveForLater(result.itemId)} className="btn btn-success">Save For Later</button></span><span>  </span>                             
          </ListItem> 
                    
                  
                    
                  ))}
                  
      </List>         
              
                          
    </div>
    
  );
  
}



export default SearchResults;
