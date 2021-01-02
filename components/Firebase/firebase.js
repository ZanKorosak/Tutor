import * as firebase from 'firebase';
import 'firebase/auth';


import firebaseConfig from './firebaseConfig';

// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();


export const db = firebase.database();

export const loginWithEmail = (email, password) => {
  auth.signInWithEmailAndPassword(email, password);

}

export const registerWithEmail = (email, password, name) => {
  auth.createUserWithEmailAndPassword(email, password).
  then((res) => {
    firebase.database().ref('users/' + res.user.uid).set({
      id: res.user.uid,
      name: name,
      email: email,
      profile_picture : "https://www.petwellnessaz.com/wp-content/uploads/2020/07/blank-profile-picture-973460_640-300x300-1.png",
      liked: 0,
      subjects: "",
      isTutor:0,
      likedTutors:"",
    })
})
}


export const logout = () => {
  
  console.log(auth.currentUser.uid)
  auth.signOut();
}
export const passwordReset = email => auth.sendPasswordResetEmail(email);

export const loggedIn = () => {
  if (auth.currentUser !== null) {
      return (true)
  }
  else {
    return (false)
  }
}

export const userInfo = () => {
  var ref = db.ref("users/" + auth.currentUser.uid);
  //console.log(ref);
  var user = "NEDELA"

  var snapshot =  ref.orderByChild("id").equalTo(auth.currentUser.uid).on("child_added", function(snapshot) {
    return snapshot
    
    /*
    console.log("INSIDE")
    user = {
      id: snapshot.child("id").val(),
      name: snapshot.child("name").val(),
      email: snapshot.child("email").val(),
      profile_picture : snapshot.child("profile_picture").val(),
      liked: snapshot.child("liked").val(),
      tutor: snapshot.child("tutor").val()
    };
    */
  });
  user = snapshot
  
  return user;

}
  