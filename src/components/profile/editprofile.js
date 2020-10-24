import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Input, TextArea, Label } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getData, getUser, editUser } from "./../store/middleware/middleware";

function EditProfile(props) {
  let [user, setUser] = useState("");
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
    } else {
      // No user is signed in.
    }
  });
  useEffect(() => {
    props.getUser();
  }, []);
  let [profile, setProfile] = useState([]);
  useEffect(() => {
    if (props.userData.data) {
      for (let i = 0; i < Object.values(props.userData.data).length; i++) {
        if (Object.values(props.userData.data)[i].uid === user.uid) {
          setProfile(Object.values(props.userData.data)[i]);
        }
      }
    }
  }, [props.userData.data]);

  let [name, setName] = useState("");
  let [about, setAbout] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [email, setEmail] = useState("");

      let updObj={
          dp : user.photoURL,
          email:user.email,
          name:name,
          uid:user.uid,
          about:about,
          Contactemail:email
        }

  return (
    <div className="EditProfile">
      <div className="innerEdit">
        <div className="viewPro">
          <h3>Edit profile</h3>
          <button>View profile</button>
        </div>
        <div className="right">
          <div className="editForm">
            <div className="editHead">
              <h2>Edit profile</h2>
            </div>
            <div className="form">
              <h3>Basic information</h3>
              <div className="basic">
                <div className="inputDiv">
                  <Input
                    placeholder="name"
                    value={user.displayName}
                    onChange={(ev) => setName(ev.target.value)}
                  />
                  <TextArea
                    placeholder="About me (optional)"
                    onChange={(ev) => setAbout(ev.target.value)}
                  />
                </div>
                <div className="impBox">
                  <div className="imp">
                    <div className="impHead">
                      <i class="far fa-lightbulb"></i>{" "}
                      <h4> Why is it important?</h4>
                    </div>
                    <p>
                      OLX is built on trust. Help other people get to know you.
                      Tell them about the things you like. Share your favorite
                      brands, books, movies, shows, music, food. And you will
                      see the results…
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="Contact">
                <h3>Contact information</h3>
                <div className="ContactInput">
                  <Input
                    label={{ basic: true, content: "+92" }}
                    labelPosition="left"
                    placeholder="phoneNumber"
                    value={user.phoneNumber ? user.phoneNumber : phoneNumber}
                    onChange={(ev) => setPhoneNumber(ev.target.value)}
                  />
                </div>
                <div className="ContactInput">
                  <Input placeholder="email" onChange={(ev) => setEmail(ev.target.value)} />
                </div>
              </div>
              <hr />
              <div className="btnDiv">
                <button className="discardBtn">Discard</button>
                <button className="savebtn" onClick={() => [props.editUser(updObj),
                props.history.push(`/profile/${user.uid}`)
                ]}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    userData: state.userData,
  };
};
const mapDispatchToProps = { getData, getUser, editUser };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
