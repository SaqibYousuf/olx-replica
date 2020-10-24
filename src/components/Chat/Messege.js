import React, { useEffect, useState } from "react";
import "./messege.scss";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import container from "./../../Imgaes/container.webp";
import { Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import {
  getSingleData,
  getData,
  sendMsg,
  getMsg,
  getUser,
} from "./../store/middleware/middleware";
import { connect } from "react-redux";
import emptyChat from "./../../Imgaes/emptyChat.webp";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function Message(props) {
  const classes = useStyles();
  let [user, setUser] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
      } else {
        // No user is signed in.
      }
    });
  }, []);
  let [path, setPath] = useState("");
  let url = "";
  let [b, setB] = useState("");
  useEffect(() => {
    url = props.history.location.pathname;
  }, [path, b]);
  useEffect(() => {
    setPath(url.slice(10));
  }, [url, path, b]);
  let [recieverUser, setRecieverUser] = useState("");
  let [Message, setMessege] = useState("");
  let [key, setKey] = useState(firebase.database().ref("messege").push().key);
  console.log(b);

  let msgObj = {
    msg: Message,
    sender: user.uid,
    reciever: recieverUser.key,
    recieverName: recieverUser.name,
    senderName: user.displayName,
    recieverPhone: recieverUser.phoneNumber,
    productPrice: recieverUser.price,
    key: recieverUser.key,
    chatName: recieverUser.name,
  };
  let mObj = {
    lastmsg: Message,
    sender: user.displayName,
    senderID: user.uid,
    productOwnerID: recieverUser.userId,
    productOwnerName: recieverUser.name,
    productTitle: recieverUser.title,
    key: recieverUser.key,
    productImageURL: recieverUser.imageURL,
  };
  useEffect(() => {
    props.getData();
  }, []);
  useEffect(() => {
    if (props.data.productData) {
      for (let i = 0; i < Object.values(props.data.productData).length; i++) {
        if (props.data.productData[i].key === path) {
          setRecieverUser(props.data.productData[i]);
        }
      }
    }
  }, [props.data, path]);

  useEffect(() => {
    props.getMsg();
    props.getUser();
  }, []);

  return (
    <div className="Message">
      <div className="chatBody">
        <div className="inBox">
          <div className="member">
            <h2>INBOX</h2>
            <h4>All your chats will show up here</h4>
            <div className="recents">
              {props.memberData.chatMember
                ? Object.values(props.memberData.chatMember)
                    .filter(
                      (Obj, i) =>
                        Object.values(props.memberData.chatMember)[i]
                          .senderID === (recieverUser.userUid || user.uid) ||
                        Object.values(props.memberData.chatMember)[i]
                          .productOwnerID === (recieverUser.userUid || user.uid)
                    )
                    .map((b, i) => {
                      return (
                        <div
                          onClick={() => [
                            props.history.push(`/messeges/${b.key}`),
                            setB(b),
                          ]}
                          className="recentChat"
                        >
                          <div className={classes.root}>
                            <Avatar
                              alt={b.productTitle}
                              src={b.productImageURL[0]}
                            />
                          </div>
                          <div className="name">
                            <h5>{b.productTitle}</h5>
                            <p>
                              <b>{b.sender}</b> : {b.lastmsg}
                            </p>
                          </div>
                        </div>
                      );
                      // :null;
                    })
                : null}
            </div>
          </div>
          {path !== "id" ? (
            <div className="Messenges">
              <>
                <div className="productName">
                  <div className="chatName">
                    <div
                      style={{
                        backgroundImage: `url(${
                          recieverUser ? recieverUser.imageURL[0] : null
                        })`,
                        width: "48px",
                        height: "48px",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <div>
                      <h3>{recieverUser ? recieverUser.name : null}</h3>
                    </div>
                  </div>
                  <div className="">
                    <Icon name="flag outline" />
                    <Icon name="phone" />
                    <Icon name="chat" />
                    <Icon name="close" />
                  </div>
                </div>
                <div className="proDes">
                  <p>{recieverUser ? recieverUser.title : null}</p>
                  <p> RS {recieverUser ? recieverUser.price : null}</p>
                </div>
                <div className="body">
                  {props.msgData.data
                    ? Object.values(props.msgData.data)
                        .filter((obj, i) => path === props.msgData.data[i].key)
                        .map((a, i) => {
                          return user.uid === a.sender ? (
                            <div className="msg">
                              <div className="msgSend">
                                <h5>{a.senderName}</h5>
                                <p>{a.msg}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="msg">
                              <div className="msgrec">
                                <h5>{a.senderName}</h5>
                                <p>{a.msg}</p>
                              </div>
                            </div>
                          );
                        })
                    : null}
                </div>
                <div>
                  <form>
                    <label className="uploadFile">
                      <Icon name="attach" />
                      <input className="fileInput" type="file" />
                    </label>
                    <div className="msgInput">
                      <input
                        type="text"
                        onChange={(ev) => {
                          setMessege(ev.target.value);
                        }}
                      />
                    </div>
                    <div className="msgButton">
                      <button
                        onClick={(e) => [
                          e.preventDefault(),
                          props.sendMsg(msgObj, mObj),
                        ]}
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </>
            </div>
          ) : (
            [
              path === "id" ? (
                <div className="Messenges empty">
                  <img src={emptyChat} />
                </div>
              ) : null,
            ]
          )}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    singleData: state.singleData,
    data: state.data,
    msgData: state.msgData,
    memberData: state.memberData,
  };
};
const mapDispatchToProps = { getSingleData, getData, sendMsg, getMsg, getUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Message));
