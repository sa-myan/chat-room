import SignOut from "./SignOut";
import "../styles/ChatRoom.css"

const ChatRoom = ({ user, setUser, auth }) => {
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
