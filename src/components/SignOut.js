import { signOut } from "firebase/auth";

const SignOut = ({ user, setUser, auth }) => {
    // signOut is a promise that works like signInWithPopup
    // I did not write any resolving or rejecting logic for simplicity
    return (
      <button onClick={() => signOut(auth).then(() => setUser(auth.currentUser))}>
        SignOut
      </button>
    );
  };

  export default SignOut