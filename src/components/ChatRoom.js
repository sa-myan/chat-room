import SignOut from "./SignOut";
import "../styles/ChatRoom.css";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";

const ChatRoom = ({ user, setUser, auth, db }) => {
  async function sendMessage(message) {
    try {
      await addDoc(collection(db, "messages"), {
        sender: user.displayName,
        content: message,
      });
    } catch (e) {
      alert(e);
    }
  }

  async function getMessages(){
    const messages = await getDocs(collection(db, "messages"))
  }
  return (
    <div>
      <div id="user-stuff">
        <p>Hello {user.displayName}</p>
        <SignOut user={user} setUser={setUser} auth={auth} />
      </div>
    </div>
  );
};

export default ChatRoom;
