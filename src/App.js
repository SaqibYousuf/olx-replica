import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Productpage from "./components/Products/Product";
import Sell from "./components/sell/sell";
import Post from "./components/sell/post";
import PostForm from "./components/sell/postForm";
import SingleProduct from "./components/SingleProduct/singleProduct";
// import Chatroom from "./components/Chat/Chatroom";
import Message from "./components/Chat/Messege";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/editprofile";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

function App() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user);
    } else {
      // No user is signed in.
    }
  });
  let [mainCatog, setMainCat] = useState("");
  let [subCatog, setSubCat] = useState("");
  let [value, setValue] = useState("");
  // let [productFilter,setProductFilter] = useState("")
  return (
    // <div className="App">
    <Router>
      <Navbar />
      <Route exact path="/" component={() => <Home />} />
      <Route  path="/products/:cat" component={() => <Productpage />} />
      <Route exact path="/post"
        component={() => <Sell setMainCat={setMainCat} setSubCat={setSubCat} />}
      />
       <Route path="/messeges/:key" component={() => <Message />} />
      <Route
       exact path="/post/form"
        component={() => <PostForm mainCatog={mainCatog} subCatog={subCatog} />}
      />
      <Route path="/editProfile/info" component={() => <EditProfile />} />
      <Route path="/profile/:id" component={() => <Profile />} />
      <Route path="/product/view/:id" component={() => <SingleProduct />} />
      <Footer />
    </Router>
    // </div>
  );
}

export default App;
