import React from "react";
import "./style.css";
import { Link } from "react-router-dom";



function ItemDetails(props) {

  return (
    <div>
      <ul className="list-group search-results">
      {props.Items.map(result => (        
          <li key={result.id} className="list-group-item">
            <img alt={result.name} width="120" height="180" className="img-fluid" src={result.largeImage == null ? 'https://lmtrain.github.io/lm-images/assets/images/books5.jpg' : result.largeImage} />
            <span><a href = "/search/"><button type="submit" className="btn btn-success">Back To Search</button></a></span>         
            <p><b>Item Name             :</b> {result.name}</p>
                    <span><b>Price         :</b> ${result.salePrice} | |</span>
                    <span><b>Rating :</b> {result.customerRating}</span>
            <p><b>Description :</b> {result.description}</p>
            <Link to="/UserPage"><button id={props.currentuser} type="submit" className="btn btn-success">Cancel</button></Link>          
          </li>        
        ))}      
      </ul>                
    </div>    
  );  
}


export default ItemDetails;
