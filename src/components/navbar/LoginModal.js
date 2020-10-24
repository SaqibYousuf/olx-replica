import React, { useState } from "react";
import firebase from "firebase";
import logo from "./../../Imgaes/olx.png";
import "./navbar.scss";
import "semantic-ui-css/semantic.min.css";
import {
  Icon,
  Input,
  Dropdown,
  Menu,
  Button,
  Header,
  Image,
  Modal,
} from "semantic-ui-react";
import { Link, BrowserRouter as Router, withRouter } from "react-router-dom";
import Carousel from "react-multi-carousel";
import loginslider1 from "./../../Imgaes/loginslider.webp";
import loginslider2 from "./../../Imgaes/loginslider2.webp";
import loginslider3 from "./../../Imgaes/loginslider3.webp";
import { connect } from "react-redux";
import { LogIn,logInGmail } from "./../store/middleware/middleware";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function LoginModal(props) {
  return (
    <Modal
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={props.open}
      trigger={<p className="logLink">Login</p>}
    >
      <Modal.Header>
        <Carousel responsive={responsive}>
          <div className="slide slide1">
            <div className="slideImgDiv">
              <img className="slideImg" src={loginslider1} />
            </div>
            <p>Contact and close deals faster</p>
          </div>
          <div className=" slide slide2">
            <div className="slideImgDiv">
              <img className="slideImg" src={loginslider2} />
            </div>
            <p>Save all you favorite item in one place</p>
          </div>
          <div className="slide slide3">
            <div className="slideImgDiv">
              <img className="slideImg" src={loginslider3} />
            </div>
            <p>Help make OLX safer place to buy and sell</p>
          </div>
        </Carousel>
      </Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <div className="loginModalButton">
            <button onClick={() => props.setLoginButton(false)}>
              Continue with phone
            </button>
            <button onClick={()=>props.LogIn()}>Continue with facebook</button>
            <button onClick={()=>props.logInGmail()}>Continue with google</button>
            <button
              onClick={() => [
                props.setLoginButton(false),
                props.setLoginEmail(true),
              ]}
            >
              Continue with email
            </button>
            <p>We won't share your personal details with anyone</p>
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}
const mapStateToProps = (state) => {
  return {
    // user: state.user,
  };
};
const mapDispatchToProps = { LogIn,logInGmail };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginModal));
