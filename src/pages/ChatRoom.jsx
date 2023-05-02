import {React} from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import ChatRoomList from "../features/chatroom/ChatRoomList";

// 새로운 채팅 모달
// const {modalState, openModalhandle} = useOpenTargetModal();

function ChatRoom() {
  
  return (
    <>
      <Header />
      <Article>
        <ChatRoomList/>
      </Article>
    </>
  );
}

export default ChatRoom;