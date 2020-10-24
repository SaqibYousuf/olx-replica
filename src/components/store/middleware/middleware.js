import {
  SignIn,
  Post,
  get,
  single,
  send,
  msgGet,
  chatMember,
  userGet,
} from "./../action/userAction";
import firebase from "firebase";
import { useState } from "react";
export function LogIn(phoneNumber, email) {
  return (dispatch) => {

    var provider = new firebase.auth.FacebookAuthProvider();
    let User = "";
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        User = user;
        console.log("logged In");
      })
      .then(() => {
        firebase.database().ref("user").child(User.uid).set({
          name: User.displayName,
          uid: User.uid,
          phoneNumber: User.phoneNumber,
          email: User.email,
          dp: User.photoURL,
        });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    // if (User) {
    // }
  };
}
// export function logInPhone(phoneNumber){
// let ph = phoneNumber
//   return(dispatch) =>{
//     firebase.auth().languageCode = 'it';
// // To apply the default browser preference instead of explicitly setting it.
// // firebase.auth().useDeviceLanguage();
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//       'size': 'invisible',
//       'callback': function(response) {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         onSignInSubmit();
//       }
//     });
//     var phoneNumber = getPhoneNumberFromUserInput(ph);
// var appVerifier = window.recaptchaVerifier;
// firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
//     .then(function (confirmationResult) {
//       // SMS sent. Prompt user to type the code from the message, then sign the
//       // user in with confirmationResult.confirm(code).
//       window.confirmationResult = confirmationResult;
//     }).catch(function (error) {
//       // Error; SMS not sent
//       // ...
//     });

//   }
// }
export function logInGmail() {
  return (dispatch) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    let User = "";
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        User = user;
        // ...
      })
      .then(() => {
        firebase.database().ref("user").child(User.uid).set({
          name: User.displayName,
          uid: User.uid,
          phoneNumber: User.phoneNumber,
          email: User.email,
          dp: User.photoURL,
        });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
}
export function postdata(postObj, key, imagesArr) {
  let path = [];
  return (dispatch) => {
    // console.log(firebase.storage())
    for (let i = 0; i < imagesArr.length; i++) {
      firebase
        .storage()
        .ref()
        .child(key)
        .child(`image${[i]}`)
        .put(imagesArr[i])
        .then(function (snapshot) {
          snapshot.ref.getDownloadURL().then((res) => {
            path.push(res);
            // console.log(res)
          });
        });
    }
    console.log(path);
    setTimeout(() => {
      firebase
        .database()
        .ref("products")
        .child(key)
        .set({
          mainCatogorie: postObj.mainCatogorie,
          subCatogorie: postObj.subCatogorie,
          state: postObj.state,
          city: postObj.city,
          condition: postObj.condition,
          type: postObj.type,
          title: postObj.title,
          descript: postObj.descript,
          price: postObj.price,
          name: postObj.name,
          phoneNumber: postObj.phoneNumber,
          showPhoneNumber: postObj.showPhoneNumber,
          userId: postObj.userId,
          userName: postObj.userName,
          key: postObj.key,
          imageURL: path,
          moment:postObj.moment
        })
        .then(() => {
          dispatch(() => Post(postObj));
        })
        .then(() => {
          console.log("runnn");
        });
    }, 5000);
  };
}
export function getData() {
  return (dispatch) => {
    firebase
      .database()
      .ref("products")
      .on("value", function (data) {
        // console.log(data.val());
        if (data.val()) {
          dispatch(
            get({
              productData: Object.values(data.val()),
              productKey: Object.keys(data.val()),
            })
          );
        } else {
          dispatch(
            get({
              productData: [],
            })
          );
        }
      });
  };
}
export function getSingleData(a) {
  return (dispatch) => {
    console.log(a);
    if (a) {
      dispatch(
        single({
          data: a,
        })
      );
    }
  };
}
export function sendMsg(msgObj, mObj) {
  return (dispatch) => {
    firebase
      .database()
      .ref("Messege")
      .child("msgs")
      .push(msgObj)
      .then(() => {
        dispatch(() => send(msgObj));
      })
      .then(() => {
        firebase
          .database()
          .ref("Messege")
          .child("chatMember")
          .child(mObj.key + "111")
          .set(mObj)
          .then(() => {
            dispatch(() => send(msgObj));
          });
      });
  };
}
export function getMsg() {
  return (dispatch) => {
    firebase
      .database()
      .ref("Messege")
      .child("msgs")
      .on("value", function (data) {
        if (data.val()) {
          dispatch(
            msgGet({
              data: Object.values(data.val()),
            })
          );
        } else {
          dispatch(
            msgGet({
              data: [],
            })
          );
        }
      });
    firebase
      .database()
      .ref("Messege")
      .child("chatMember")
      .on("value", function (data) {
        if (data.val()) {
          dispatch(
            chatMember({
              chatMember: Object.values(data.val()),
            })
          );
        } else {
          dispatch(
            chatMember({
              chatMember: [],
            })
          );
        }
      });
  };
}
export function logOut() {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };
}
export function getUser() {
  return (dispatch) => {
    firebase
      .database()
      .ref("user")
      .on("value", function (data) {
        if (data.val()) {
          dispatch(
            userGet({
              data : Object.values(data.val())
            })
          );
        }else{
          dispatch(
            userGet({
              data : []
            })
          );
        }
      });
  };
}
export function editUser(Obj){
return(dispatch) => {
  firebase.database().ref("user").child(Obj.uid).set(Obj);

} 
}
