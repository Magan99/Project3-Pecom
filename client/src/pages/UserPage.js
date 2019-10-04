import React, { Component } from "react";
import Container from "../components/Container";
import "./themestyle.css";
import Row from "../components/Row";
import Col from "../components/Col";
import { Listup, ListItemup } from "../components/Listup";
// import UserAccSettings from "../components/UserAccSettings";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import SearchResults from '../components/SearchResults';



var userArray = []
var membername = ""
var userName =""
var usertheme = "";
var divStyle = {};

class UserPage extends Component {
  
  state = {    
    user:[],
    userSettings: [],
    userArray: [],
    userName: this.props.currentUser,
    redirect: false,    
  };



  
  componentWillMount() {
    this.loadUserData();    
  }

  loadUserData = () => {
    this.setState({
      userName: this.props.currentUser
    })
    userName = this.state.userName
    console.log("THIS IS USERNAME", userName)
    const currentAccount = {     
      userName,          
    }
    this.loadAPIgetUser(currentAccount.userName);
  }

  loadAPIgetUser = (id) => {
    const app = this;
    id = userName
    API.getUser({      
      userName: userName,               
    })
    .then(function(res){
      return new Promise(function(resolve, reject){
        app.setState({ user: res.data })
        resolve(true);
      })
    }).then(function(){
      console.log("THIS IS USER OBJECT", app.state.user);
      userArray = [...app.state.user]
      // settingsArray = userArray[0].toLocaleString()
      console.log("USERNAME API ID$$$$", userArray);
      console.log(userArray[0].userName)
      usertheme = userArray[0].userTheme
      membername = userArray[0].memberName
      // contact = userArray[0].contact
      console.log("USER THEME IS ===", usertheme)
      app.userTheme(usertheme);
    })    
    // .then(res => {console.log(res)})
    .catch(err => console.log(err));
  }

  userTheme = (id) => {   
    console.log("mID is : ", usertheme)    
    
    divStyle = {
      color: userArray[0].colorDb,
      textAlign: userArray[0].textalignDb,
      fontSize: userArray[0].divfontsizeDb,
      fontFamily: userArray[0].fontfamilyDb,
    };

    this.props.setTheme(id)    
  }
  addItemToCart = (id) => {
    console.log("THIS IS ITEM ID FROM USERPAGE===>")
  }

  userCart = () => {
    console.log("THIS IS USER CART===>")
    console.log("THIS IS CURRENT USER===>", userArray[0].userName)
    this.loadAPIgetUser(userArray[0].userName)
    console.log(userArray[0].cart)
    // console.log(props.user[0].contact)
  }

  logOutPage = () => {    
    this.setRedirect()
    // localStorage.clear();
    // console.log("cliasdk");
    // return(
    //     <Redirect to="/Signin/"/>
    // )
  }

  setRedirect = () => {    
    this.setState({
      redirect: true,      
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {     
      return <Redirect to='/Logout' />
    }
  }

  
  

  render() {
    console.log('propssss', this.props)
    let itemName = this.props.cart.name
    return (
      <div>
        {this.renderRedirect()}
        <div style={divStyle}><b> Welcome {membername}!</b></div>
        <Container style={{ marginTop: 60 }}>
        <div id="message"></div>

          
          {this.props.Items.length !== 0 && <SearchResults Items={this.props.Items} cart={this.props.cart} addItemToCart={this.props.addItemToCart} itemDetails={this.props.itemDetails}/>}
          
          <div className="gap"></div>            
            <Row>              
              <Col size="md-4">
                <div className="contents-r2-c1">

                  <div className="upage-box">
                    <div className="img-container">
                      <Row>              
                        <Col size="md-12">
                            <div className="inside-upage-box">
                              <div className="img-container">
                                <b>Save For Later</b>
                              </div>                  
                            </div>                          
                        </Col>
                      </Row>
                    </div>
                   
                    <div className="upage-box-content">
                      <Listup className="list-overflow-container-uspage">


                        <ListItemup key={this.props.cart.id}>
                        <img alt={this.props.cart.name} width="80" height="100" className="img-fluid" src={this.props.cart.largeImage == null ? 'https://lmtrain.github.io/lm-images/assets/images/books5.jpg' : this.props.cart.largeImage} />
                        <p><b>Item Name             :</b> {itemName}</p>
                        <b>Price         :</b> ${this.props.cart.salePrice}
                        </ListItemup>


                        
                      </Listup>                      
                    </div>
                                      
                  </div>
                </div>
              </Col>
              <Col size="md-4">
              <div className="contents-r2-c2">

                <div className="upage-box">
                  <div className="img-container">
                  <Row>              
                    <Col size="md-12">
                        <div className="inside-upage-box" onClick={() => this.userCart()}>
                          <div className="img-container">
                            <b>Cart</b>
                          </div>                  
                        </div>                          
                    </Col>
                  </Row>                    
                  </div>

                  <div className="upage-box-content">
                    <Listup className="list-overflow-container-uspage">
                      <ListItemup key={this.props.id}>
                      <img alt={this.props.name} width="80" height="100" className="img-fluid" src={this.props.largeImage == null ? 'https://lmtrain.github.io/lm-images/assets/images/books5.jpg' : this.props.largeImage} />
                      <p><b>Item Name             :</b> {this.props.name}</p>
                      <b>Price         :</b> ${this.props.salePrice}
                      </ListItemup>
                    </Listup>               
                  </div>

                </div>
              </div>
              </Col>
              <Col size="md-4">
              <div className="contents-r2-c3">

                <div className="upage-box">
                  <div className="img-container">
                  <Row>              
                    <Col size="md-12">
                        <div className="inside-upage-box">
                          <div className="img-container">
                            <b>Orders</b>
                          </div>                  
                        </div>                          
                    </Col>
                  </Row>                    
                  </div>
                  <div className="upage-box-content">

                    <Listup className="list-overflow-container-uspage">
                      <ListItemup key={this.props.id}>
                      <img alt={this.props.name} width="80" height="100" className="img-fluid" src={this.props.largeImage == null ? 'https://lmtrain.github.io/lm-images/assets/images/books5.jpg' : this.props.largeImage} />
                      <p><b>Item Name             :</b> {this.props.name}</p>
                      <b>Price         :</b> ${this.props.salePrice}
                      </ListItemup>
                    </Listup>               
                  </div>

                </div>
              </div>
              </Col>                           
            </Row>
            
            {/* <UserAccSettings userArray={this.state.userArray} settingSubmit={this.settingSubmit}/>       */}
          
        </Container>
      </div>
    );
  }
}

export default UserPage;





