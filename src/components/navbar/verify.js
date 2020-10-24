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
import { Link, BrowserRouter as Router } from "react-router-dom";
import Carousel from "react-multi-carousel";
import loginslider1 from "./../../Imgaes/loginslider.webp";
import loginslider2 from "./../../Imgaes/loginslider2.webp";
import loginslider3 from "./../../Imgaes/loginslider3.webp";

function Verify(props) {
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
          <div className="phoneNumber Code">
            {/* {props.loginEmail ? ( */}
            <>
              <h3>Enter code received</h3>
              <p>
                We sent a 4-digit code to{" "}
                {props.phoneNumber ? (
                  <span className="bold">{props.phoneNumber}</span>
                ) : (
                  [
                    props.email ? (
                      <span className="bold">{props.email}</span>
                    ) : null,
                  ]
                )}
              </p>
              <div className="inputCodeDiv">
                <Input className="codeInput" placeholder="-" />
                <Input className="codeInput" placeholder="-" />
                <Input className="codeInput" placeholder="-" />
                <Input className="codeInput" placeholder="-" />
              </div>
            </>
         
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Content>
        <Modal.Description className="nxtBtn resend">
          <div>
            {/* <button onClick={() => setNext(true)}>NEXT</button> */}
            <p>RESEND CODE BY SMS</p>
            <p>RESEND CODE BY CALL</p>
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default Verify;
