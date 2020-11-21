import * as firebase from 'firebase';
import 'firebase/auth';


import firebaseConfig from './firebaseConfig';

// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const loginWithEmail = (email, password) => {
  auth.signInWithEmailAndPassword(email, password);

}

export const registerWithEmail = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password).
  then((res) => {
    firebase.database().ref('users/' + res.user.uid).set({
      name: name,
      email: "NYI",
      profile_picture : "https://www.petwellnessaz.com/wp-content/uploads/2020/07/blank-profile-picture-973460_640-300x300-1.png",
      liked: 0
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
  