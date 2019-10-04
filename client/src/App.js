import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import PersonalizePage from "./pages/PersonalizePage";
import TodaysDeal from "./components/TodaysDeal";
import ItemDetails from "./components/ItemDetails";
// import Themes from "./AnimationPersonalize"
// import Search from "./pages/Search";
import UserPage from "./pages/UserPage";
import API from "./utils/API";
import Navbar from "./components/Navbar";
import UserNavbar from "./components/UserNavbar";
import UserAccSettings from "./components/UserAccSettings"
// import ThemeNavbar from "./components/ThemeNavbar";
import Wrapper from "./components/Wrapper";
import db from "./db.json"
import dataSet from "./db.json"
import deals from "./db.json"
import { Redirect } from "react-router-dom";
// import Themes from "./AnimationPersonalize";
// import {spring} from 'react-spring;'


 require('dotenv').config();
var itemsArray = []
var itemToCart = []
var userArray = []
var memberInfo = ""
var shuffleData = ""
var ShuffledDatas = []  
var redirect = false
console.log(db)
class App extends React.Component {
  state = {
    user:[],
    userArray:[],
    cart: [],
    memberId: "",
    membername: "",
    userName: "",
    currentUser: null,
    theme: -1,
    search:"",    
    Items:[],
    itemDetail:[],
    deals,
   
  }
  todaysDeals = () => {
    this.shuffle()
  }

  removeCar = (id) => {
    console.log(id, "This is ID");
    let carsArray = [...this.state.deals]
    let deals = carsArray.filter(deal => {
      return deal.id !== id;
    });
    this.setState({ deals })
  }

  shuffle = () => {
    let dealsArray = [...this.state.deals];
    let dealsShuffled = [];    
    for (var i = 0;  i < this.state.deals.length; i++) {        
          shuffleData = dealsArray.splice(Math.floor(Math.random()*dealsArray.length));        
          dealsShuffled = [...dealsShuffled, ...shuffleData];
        }   
        ShuffledDatas.push(this.state.deals);
    // Set this.state.deals equal to the new deals array
    this.setState({ deals: dealsShuffled });  
  };

  addItemToCart = (id) => {
    console.log("THIS IS USERARRAY OBJECT IN APP$$$$", userArray);
    itemsArray = [...this.state.Items]
    console.log("THIS IS ITEM ID FROM APP===>", id)
    console.log("THESE ARE CURRENT ITEMS===>", itemsArray)
    for (var i = 0;  i < itemsArray.length; i++) {
       console.log(i, itemsArray[i])      
      if (id !== itemsArray[i].parentItemId) {
            console.log("CONTINUE LOOKING FOR MY ITEM")
        }else{
          console.log("THIS IS THE ITEM I WANT===>",itemsArray[i])
          itemToCart.push([itemsArray[i]])           
          console.log("THIS IS THE ITEM GOING TO DB CART===>", itemToCart)
          this.setState({cart:itemToCart})
          memberInfo = String(this.state.currentUser)
          id = String(userArray[0]._id)
          this.updateCartDB(userArray[0]._id)
          this.displayCart(userArray[0]._id)
        }          
      }    
    }
    displayCart = (id) => {
      console.log("THIS IS THE ITEM IN CART STATE===>", itemToCart, id)
      this.setState({cart:itemToCart})
    }

    itemDetails= (id) => {
      console.log('found ITEM ID', id)      
      var app = this
      console.log(app.state.Items)
      console.log("THIS IS REDIRECTING TO DETAIL PAGE");
      const item = app.state.Items.find((item) => item.id === id);
      console.log('found ITEM', [item])
    // this.setState({showBook: [book], showBookState: true})
        

      let itempage = redirect
      itempage = true;      
        
      if (itempage === true) {
        return <Redirect to='/UserPage' />
      }      
      
    }

    updateCartDB = (id) => {
      console.log(id)
      let itemDB = String(itemToCart[0].name)
      let qtyDB = 1
      let unitPriceDB = Number(itemToCart[0].salePrice)
      let linkDB = String(itemToCart[0].productUrl)
      let descriptionDB = String(itemToCart[0].shortDescription)
      let thumbnailDB = String(itemToCart[0].largeImage)
      console.log("THIS IS USER DB ID+++", id)
      API.updateCart({
        _id: id,
        item: itemDB,
        qty:	qtyDB,
        Price: unitPriceDB,
        link: linkDB,
        description: descriptionDB,
        thumbnail: thumbnailDB,
      })
        .then(res => {                  
          if(res.data.error ){
            console.log(res.data.error)
            document.getElementById("message").textContent = res.data.error;
          }else{
            // console.log(res.data.error)
            document.getElementById("message").textContent = " ";
            
          }
        })
        
        .catch(err => console.log(err)); 
    }

    


  updateDBtheme = (mID) => {
    var colorrr = ""
    var testalignnn = ""
    var divfontsizeee = ""
    var pfontsizeee = ""
    var fontfamilyyy = ""
 
    switch(this.state.theme){
      case "theme0":
        colorrr = "White";
        testalignnn = "center";
        divfontsizeee = "38px";
        pfontsizeee = "16px";
        fontfamilyyy = "Calibri";
        break;        
      case "theme1":
          colorrr = "White";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Rockwell";
          break;      
      case "theme2":
          colorrr = "#b87b16";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Broadway";
          break;      
      case "theme3":
          colorrr = "#d86531";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Cooper";
          break;
      case "theme4":
          colorrr = "deepskyblue";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Arial Black";
          break;
      case "theme5":
          colorrr = "White";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Bodoni MT Black";
          break;     
      case "theme6":
          colorrr = "Greenyellow";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Stencil";
          break;        
        case "theme7":
          colorrr = "#a3ce01";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Bernard MT";
          break;      
        case "theme8":
          colorrr = "#eb9ba4";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Magneto";
          break;
        case "theme9":
          colorrr = "Gold";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Rockwell";
          break;      
        case "theme10":
          colorrr = "White";
          testalignnn = "center";
          divfontsizeee = "38px"
          pfontsizeee = "16px";
          fontfamilyyy = "Vivaldi";
          break;
        case "theme11":
          colorrr = "White";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Cambria";
          break;      
        case "theme12":
          colorrr = "Brown";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Broadway";
          break;      
        case "theme13":
          colorrr = "Black";
          testalignnn = "center";
          divfontsizeee = "24px";
          pfontsizeee = "16px";
          fontfamilyyy = "Wide Latin";
          break;
        case "theme14":
          colorrr = "Black";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Script";
          break;
        case "theme15":
          colorrr = "rgb(232,18,36)";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Bodoni MT Black"; 
          break;
        case "theme16":
          colorrr = "Gray";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Bernard MT";
          break;
      default:
          colorrr = "White";
          testalignnn = "center";
          divfontsizeee = "38px";
          pfontsizeee = "16px";
          fontfamilyyy = "Calibri";         
    }
    console.log("colorrr====", colorrr)
    memberInfo = String(this.state.currentUser)
    // memberNName = String(this.state.memberName)
    let memberId = String(this.state.currentUser)
    let memberName = String(this.state.memberName)
    let userName = String(mID)
    let formTheme = String(this.state.theme)
    let formImage = ""
    let formcolorr = String(colorrr)
    let formtestalignn = String(testalignnn)
    let formdivfontsizee =String(divfontsizeee)
    let formpfontsizee = String(pfontsizeee)
    let formfontfamilyy = String(fontfamilyyy)
    console.log("testalignn====", formtestalignn)
    API.updateUser({
      memberId: memberId,
      memberName:memberName,
      userName: userName,     
      userTheme: formTheme,
      userImage: formImage,
      colorDb: formcolorr,
      textalignDb: formtestalignn,      
      divfontsizeDb: formdivfontsizee,
      pfontsizeDb: formpfontsizee,
      fontfamilyDb: formfontfamilyy,               
    })
      .then(res => {
        
        if(res.data.error ){
          console.log(res.data.error)
          document.getElementById("message").textContent = res.data.error;
        }else{
          // console.log("No exisit")
          document.getElementById("message").textContent = " ";
          
        }
      })
      
      .catch(err => console.log(err));  

  }


  saveMemberID = (mID, mName) => {
    memberInfo = mID
    console.log("MID====>", mID)
   
    // memberNName = mName
    this.setState({
      currentUser: mID,
      memberId: mID,
      memberName: mName,
      userName: mID,
    })
    memberInfo = this.state.currentUser
    console.log("CURRENTUSER ===>", this.state.currentUser)
    // memberNName = this.state.memberName
    this.getMemberInfo()
  }

  getMemberInfo = () => {
    switch(this.state.currentUser !== null){
      case true:          
        console.log("MEMBERINFO====", memberInfo)
        console.log("CURRENT USER ID====", this.state.currentUser)
        console.log("CURRENT USER NAME====", this.state.memberName)
        this.getAPIuserData(memberInfo);
        // memberInfo = this.state.currentUser
        break;
      case false:
      console.log("WHAT IS INSIDE", this.state.currentUser)
      console.log("MID====>", memberInfo)
      break;      
      default:
          console.log("FROM DEFAULT MID====>", memberInfo)
        // memberInfo = this.state.currentUser
        // this.getAPIuserData(memberInfo);
        // return memberInfo = "Welcome Guest!"               
    }    
  } 

  getAPIuserData = (id) => {
    const app = this;
    id = this.state.userName
    API.getUser({      
      userName: memberInfo               
    })
    .then(function(res){
      return new Promise(function(resolve, reject){
        app.setState({ user: res.data })
        resolve(true);
      })
    }).then(function(){
      console.log("THIS IS USER OBJECT IN APP", app.state.user);
      // this.setState({ userArray: app.state.user})
      // console.log("APP USERARRAY====>", app.state.userArray)
      userArray = [...app.state.user]
      // settingsArray = userArray[0].toLocaleString()
      // console.log("THIS IS USERARRAY OBJECT IN APP$$$$", userArray);
      // console.log(userArray[0].userName)
      // usertheme = userArray[0].userTheme
      // membername = userArray[0].memberName
      // contact = userArray[0].contact
      // console.log("USER THEME IS ===", usertheme)
      // app.userTheme(usertheme);
    })    
    // .then(res => {console.log(res)})
    .catch(err => console.log(err));
  }


  setSearch = (e) =>{
    this.setState({search:e.target.value});    
  }
  searchForItems = (e) => {
    e.preventDefault();
    var app = this;
    // API.search(app.state.search)
    //   .then(res => app.setState({ Items: res.data.items }))          
    //   .catch(err => console.log(err));
    var results = dataSet.filter(item => {
      return item.name.toLowerCase().indexOf(app.state.search.toLowerCase()) !== -1;
    })
    app.setState({ Items: results});
  } 
  
  settingSubmit = (id) => {
    console.log(id, "THIS SHOULD BE A USERNAME")
    this.updateDBtheme(id);
  }
  passwordReset = () => {
    console.log()
  }

  userSettings =() => {
    console.log()
  }

  setTheme = (i) => {
    this.setState({
      theme: i
    })
  }

  getTheme = () => {
    
    switch(this.state.theme){
      case "theme0":
        return "https://lmtrain.github.io/lm-images/assets/images/ls_wf3.jpg"
      case "theme1":
        return "https://lmtrain.github.io/lm-images/assets/images/ls_field-wf5.jpg"
      
      case "theme2":
        
        return "https://lmtrain.github.io/lm-images/assets/images/ls_daylight.jpg"
      
      case "theme3":
        return "https://lmtrain.github.io/lm-images/assets/images/ls_field-cnn.jpg"
      
      case "theme4":
        return "https://lmtrain.github.io/lm-images/assets/images/ls_field.jpg"
     
      case "theme5":
        return "https://lmtrain.github.io/lm-images/assets/images/ls_wf1.jpg"
     
      case "theme6":
        return "https://lmtrain.github.io/lm-images/assets/images/ls_wf2.jpg"
        case "theme7":
          return "https://lmtrain.github.io/lm-images/assets/images/ls_field2.jpg"
        case "theme8":
            return "https://lmtrain.github.io/lm-images/assets/images/ls_hale-azarya.jpg"
        case "theme9":
          return "https://lmtrain.github.io/lm-images/assets/images/marble_blackgold.jpg"
          case "theme10":
            return "https://lmtrain.github.io/lm-images/assets/images/marble_blackwhite.jpg"
          case "theme11":
              return "https://lmtrain.github.io/lm-images/assets/images/marble_bluecledonia.png"
          case "theme12":
            return "https://lmtrain.github.io/lm-images/assets/images/marble_browncircle.jpg"
          case "theme13":
            return "https://lmtrain.github.io/lm-images/assets/images/marble_gold.jpg"
          case "theme14":
              return ""
          case "theme15":
            return "https://lmtrain.github.io/lm-images/assets/images/marble_pinkmarble.jpg"
          case "theme16":
            return "https://lmtrain.github.io/lm-images/assets/images/marble_whitegray.jpg"
      default :
        return "https://lmtrain.github.io/lm-images/assets/images/ls_wf3.jpg"
    }
  }
 
  render(){
    
    return (
      <Router>
        <div>
          {/* <Navbar id="memberinfo"/> */}
          <UserNavbar search={this.state.search} submit={this.searchForItems} setSearch={this.setSearch}/>
          <Navbar settingsSubmit={this.userSettings}/>
          <Wrapper getTheme={this.getTheme}>
            <Route exact path="/" render = { () => <Home getTheme={this.getTheme}/>}/>
            <Route exact path="/home" render = { () => <Home getTheme={this.getTheme}/>}/>
            <Route exact path="/Signin" render = { () => <Signin saveMemberID={this.saveMemberID} getTheme={this.getTheme}/>}/>
            <Route exact path="/Sign out" render = { () => <Home getTheme={this.getTheme}/>}/>
            <Route exact path="/Getstarted" render = { () => <GetStarted saveMemberID={this.saveMemberID} getTheme={this.getTheme}/>}/>
            <Route exact path="/PersonalizePage" render = { () => <PersonalizePage setTheme={this.setTheme} theme={this.state.theme} currentUser={this.state.currentUser} updateDBtheme={this.updateDBtheme} getMemberInfo={this.state.getMemberInfo} id="memberinfo"/>}/>
            <Route exact path="/UserPage" render = { () => <UserPage setTheme={this.setTheme} theme={this.state.theme} saveMemberID={this.saveMemberID} currentUser={this.state.currentUser} getTheme={this.getTheme} cart={this.state.cart} Items={this.state.Items} addItemToCart={this.addItemToCart} itemDetails={this.itemDetails}/>}/>
            {/* <Route exact path="/AnimationPersonalize" render = { () => <Themes />}/> */}
            {/* {this.state.search.length && <Route render = { () => <Search items={this.state.Items} search={this.state.search}/>} />} */}
            <Route exact path="/TodaysDeal" render = { () => <TodaysDeal getTheme={this.getTheme} deals={this.state.deals} handleRemoveClick={() => this.removeDeal(this.state.itemId)} handleShuffleClick={this.shuffle} id={this.state.itemId} key={this.state.itemId}/>}/>
            <Route exact path="/Settings" render = { () => <UserAccSettings setTheme={this.setTheme} user={this.state.user}theme={this.state.theme} currentUser={this.state.currentUser} updateDBtheme={this.updateDBtheme} getMemberInfo={this.state.getMemberInfo} settingSubmit={this.settingSubmit} passwordReset={this.passwordReset}/>}/>
            <Route exact path="/ItemDetails" render = { () => <ItemDetails getTheme={this.getTheme} itemDetails={this.itemDetails} cart={this.state.cart} Items={this.state.Items} theme={this.state.theme} currentUser={this.state.currentUser} />}/>

          </Wrapper>
         
          
        </div>
      </Router>
    );
  }
}

export default App; 
