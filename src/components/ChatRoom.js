import SignOut from "./SignOut";


const ChatRoom = ({user, setUser, auth}) => {
    return (
        <SignOut user={user} setUser={setUser} auth={auth} />
    )
}

export default ChatRoom