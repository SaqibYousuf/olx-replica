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
import { LogIn } from "./../store/middleware/middleware";
import { Link, BrowserRouter as Router, withRouter } from "react-router-dom";
import Carousel from "react-multi-carousel";
import loginslider1 from "./../../Imgaes/loginslider.webp";
import loginslider2 from "./../../Imgaes/loginslider2.webp";
import loginslider3 from "./../../Imgaes/loginslider3.webp";
import { connect } from "react-redux";

function SecModal(props) {
  return (
    <Modal
      className="nextModal"
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={props.open}
      trigger={<p className="logLink">Login</p>}
    >
      <Modal.Header>
        <div className="modalSec">
          <div className="modalBack">
            <Icon
              onClick={() => [
                props.setLoginButton(true),
                props.setLoginEmail(false),
                props.setNext(false),
              ]}
              name="arrow left"
            />
          </div>
          <div className="modalLogo">
            <img src={logo} />
          </div>
          <div className="ModalClose">
            <Icon name="close" />
          </div>
        </div>
      </Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <div className="phoneNumber">
            {props.loginEmail ? (
              <>
                <h3>Enter Your Email</h3>
                <Input
                  className="phoneInput"
                  // label="+92"
                  placeholder="Email"
                  onChange={(ev) => props.setEmail(ev.target.value)}
                />
              </>
            ) : (
              <>
                <h3>Enter Your Phone</h3>
                <Input
                  className="phoneInput"
                  label="+92"
                  placeholder="Phone Number"
                  onChange={(ev) => {
                    props.setPhoneNUmber(ev.target.value);
                  }}
                />
              </>
            )}
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Content>
        <Modal.Description className="nxtBtn">
          <div>
            <button
              onClick={() => [
                props.setNext(true),
                // props.logInPhone(props.phoneNumber),
              ]}
            >
              NEXT
            </button>
            <p>
              We won't reveal your phone number to anyone else nor use it to
              send you spam
            </p>
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}
const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = { LogIn };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SecModal));
