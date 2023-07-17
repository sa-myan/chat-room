import SignOut from "./SignOut";
import "../styles/ChatRoom.css";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

const ChatRoom = ({ user, setUser, auth, db }) => {
  const messageBoxRef = useRef(null);

  const [messages, setMessages] = useState([]);

  async function sendMessage(e) {
    e.preventDefault();
    const message = messageBoxRef.current.value;
    try {
      await addDoc(collection(db, "messages"), {
        sender: user.displayName,
        content: message,
        time: new Date()
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
      console.log(messageArray);
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
      <button onClick={() => sendMessage(new Date().toLocaleTimeString())}>
        Send Message
      </button>
      <form>
        <input type="text" ref={messageBoxRef} />
        <input type="submit" value={"Submit"} onClick={sendMessage} />
      </form>
      {messages.map((message, index) => {
        return <p key={index}>{message.content}</p>;
      })}
    </div>
  );
};

export default ChatRoom;
