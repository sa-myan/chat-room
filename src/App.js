import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/SignIn";

// firebase sdk
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// hooks
import { useEffect, useState } from "react";

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
const db = getFirestore(firebaseApp);
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('6LfV1jEnAAAAACLiHQcnC2By2q9Yu8u_I5lDf_x9'),
  isTokenAutoRefreshEnabled: true
})

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, () => setUser(auth.currentUser));
    return () => {
      unsub();
    };
  });

  return (
    <div className="App">
      {!user ? (
        <SignIn user={user} setUser={setUser} auth={auth} />
      ) : (
        <ChatRoom user={user} setUser={setUser} auth={auth} db={db} />
      )}
    </div>
  );
}

export default App;
