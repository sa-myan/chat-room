import SignOut from "./SignOut";
import "../styles/ChatRoom.css";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const ChatRoom = ({ user, setUser, auth, db }) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);

  async function sendMessage(ee) {
    ee.preventDefault();
    const message = messageText;
    try {
      await addDoc(collection(db, "messages"), {
        senderName: user.displayName,
        senderId: user.uid,
        content: message,
        time: new Date(),
      });
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "messages"), async () => {
      let messageArray = [];
      const querySnapshot = await getDocs(collection(db, "messages"));
      querySnapshot.forEach((doc) => {
        messageArray.push(doc.data());
      });
      setMessages(messageArray);
    });

    return () => {
      unsub();
    };
  }, [db, messages.length]);

  return (
    <div>
      <div id="user-stuff">
        <p>Hello {user.displayName}</p>
        <SignOut user={user} setUser={setUser} auth={auth} />
      </div>
      <form onSubmit={sendMessage}>
        <input type="text" onChange={(e) => setMessageText(e.target.value)} />
        <input type="submit" value={"Submit"} />
      </form>
      {messages.map((message, index) => {
        return <p key={index}>{message.content}</p>;
      })}
    </div>
  );
};

export default ChatRoom;
