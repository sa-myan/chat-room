import ChatRoom from "./components/ChatRoom";

// firebase sdk
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// hooks
import { useState } from "react";

// initialize a project
const firebaseApp = initializeApp({
  apiKey: "AIzaSyB2B7BXzD0XXbQS8QHXuF0Fne2H-tmaZrw",
  authDomain: "chatroom-465a2.firebaseapp.com",
  projectId: "chatroom-465a2",
  storageBucket: "chatroom-465a2.appspot.com",
  messagingSenderId: "458111258571",
  appId: "1:458111258571:web:4b7832781136cce37b704e",
});

const auth = getAuth(firebaseApp);

function App() {

  const [user, setUser] = useState(auth.currentUser)

  return (
    <div className="App">
      {user === null ? <SignIn user={user} setUser={setUser} /> : <SignOut user={user} setUser={setUser}/>}
      <button onClick={() => console.log(auth)}>Log auth object</button>
    </div>
  );
}

const SignIn = ({user, setUser}) => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      setUser(auth.currentUser)
    //   // const credential = GoogleAuthProvider.credentialFromResult(result);
    //   // const token = credential.accessToken;
    //   // const user = result.user;
    //   // const info = getAdditionalUserInfo(result);
    })
    // .catch((error) => {
    //   // const errorCode = error.errorCode
    //   // const errorMessage = error.message
    //   // const email = error.customData.email
    //   // const credential = GoogleAuthProvider.credentialFromError(error)
    // });
  };
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

const SignOut = ({user, setUser}) => {
  // signOut is a promise that works like signInWithPopup
  // I did not write any resolving or rejecting logic for simplicity
  return <button onClick={() => signOut(auth).then(()=> setUser(auth.currentUser))}>SignOut</button>;
};

export default App;
