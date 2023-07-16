import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/SignIn";

// firebase sdk
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// hooks
import {  useState } from "react";

// initialize a project
const firebaseApp = initializeApp({
  apiKey: "AIzaSyB2B7BXzD0XXbQS8QHXuF0Fne2H-tmaZrw",
  authDomain: "chatroom-465a2.firebaseapp.com",
  projectId: "chatroom-465a2",
  storageBucket: "chatroom-465a2.appspot.com",
  messagingSenderId: "458111258571",
  appId: "1:458111258571:web:4b7832781136cce37b704e",
});


function App() {
  const auth = getAuth(firebaseApp);
  const [user, setUser] = useState();
  auth.onAuthStateChanged(()=> setUser(auth.currentUser))

  return (
    <div className="App">
      {!user ? (
        <SignIn user={user} setUser={setUser} auth={auth} />
      ) : (
        <ChatRoom user={user} setUser={setUser} auth={auth}/>
      )}
      <button onClick={() => console.log(user)}>Log user state</button>
      <button onClick={() => console.log(auth)}>Log auth object</button>
    </div>
  );
}



export default App;
