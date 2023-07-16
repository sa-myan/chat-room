import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignIn = ({user, setUser, auth}) => {
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
      .catch((error) => {
        // alert("Sign in failed!")
      //   // const errorCode = error.errorCode
      //   // const errorMessage = error.message
      //   // const email = error.customData.email
      //   // const credential = GoogleAuthProvider.credentialFromError(error)
       });
    };
    return <button onClick={signInWithGoogle}>Sign in with Google</button>;
  };

  export default SignIn