import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./profile.scss";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { getData, getUser } from "./../store/middleware/middleware";
import Product from "../home/Products";

import { withRouter } from "react-router-dom";
import { Icon } from "semantic-ui-react";
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
function Profile(props) {
  const classes = useStyles();
  let [user,setUser] = useState("")
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
    } else {
      // No user is signed in.
    }
  });
  useEffect(() => {
    props.getData();
    props.getUser();
  }, []);
  let [path, setPath] = useState("");
  let url = "";
  useEffect(() => {
    url = props.history.location.pathname;
  }, []);
  useEffect(() => {
    setPath(url.slice(9));
  }, [url]);
  let [profile, setProfile] = useState([]);
  useEffect(() => {
    if (props.userData.data) {
      for (let i = 0; i < Object.values(props.userData.data).length; i++) {
        if (Object.values(props.userData.data)[i].uid === path) {
          setProfile([Object.values(props.userData.data)[i]]);
        }
      }
    }
  }, [props.userData.data]);


  return (
    <div className="Profile">
      {profile.length
        ? profile.map((b, i) => {
            return (
              <div className="innerProfile">
                <div className="profileDetail">
                  <div className="profilePic">
                    <div className={(classes.root, "image")}>
                      <Avatar
                        alt={b.name}
                        src={b.dp}
                        className={classes.large}
                      />
                    </div>
                  </div>
                  <div className="linkedAcc">
                    <div className="head">
                      <h4>LINKED ACCOUTNS</h4>
                    </div>
                    <div className="list">
                      <p>FACEBOOK</p>
                      <i class="far fa-check-circle"></i>
                    </div>
                    <div className="list">
                      <p>PHONE NUMBER</p>
                      <i class="far fa-check-circle"></i>
                    </div>
                    <div className="list">
                      <p>EMAIL</p>
                      <i class="far fa-check-circle"></i>
                    </div>
                  </div>
                  <div className="Friends">
                    <div className="head">
                      <h4>FRIENDS</h4>
                    </div>
                    <div className="list">
                      <p>FOLLOWERS</p>
                      <span>2</span>
                    </div>
                    <div className="list">
                      <p>FOLLOWING</p>
                      <span>2</span>
                    </div>
                  </div>
                  <div className="memberSince">
                    <p>Member since Jul 2018</p>
                    <h4>Share profile link</h4>
                  </div>
                </div>
                <div className="ads">
                  <div className="profileName">
                    <h2>{b.name}.</h2>
                    {path === user.uid ?
                        <button onClick={()=>props.history.push('/editProfile/info')}>Edit profile</button>
                    :null}
                  </div>
                  <div className="adDiv">
                    <div className="AllProduct">
                      {props.data.productData
                        ? Object.values(props.data.productData).map((a, i) => {
                            return a.userId === path ? (
                              <div
                                className="Product"
                                // key={index}
                                onClick={() => [
                                  props.getSingleData(a),
                                  props.history.push(`/products/view/${a.key}`),
                                ]}
                              >
                                <div
                                  className="productImage"
                                  style={{
                                    backgroundImage: `url(${a.imageURL[0]})`,
                                  }}
                                >
                                  <div className="feature">
                                    <Icon name="heart outline" />
                                    {/* <p>FEATURED</p> */}
                                  </div>
                                </div>
                                <div className="detail">
                                  <h3>RS {a.price}</h3>
                                  <p className="Modal">{a.descript}</p>
                                  <p className="des">{a.des}</p>
                                  <p className="moment">{a.moment}</p>
                                </div>
                              </div>
                            ) : null;
                          })
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    userData: state.userData,
  };
};
const mapDispatchToProps = { getData, getUser };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
