import { React, useCallback, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BsPlusSquare } from "react-icons/bs";
import { useOpenTargetModal } from "../../hooks/chatroom/useOpenTargetSearch";
import { postChatRoom } from "../../hooks/chatroom/usePostChatRoom";
import { useGetMyChatRoom } from "../../hooks/chatroom/useGetMyChatRoom";
import { usePostingtime } from "../../hooks/artgram/usePostingtime";
import ChatTargetSearchModal from "../../features/chatroom/ChatTargetModal";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { cookies } from "../../shared/cookies";
import io from "socket.io-client";
import ChatBoxList from "./ChatBoxList";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

function ChatRoomList() {
  const { modalState, openModalhandle } = useOpenTargetModal();
  const [selectUser, setSelectUser] = useState(null);
  const [selectChat, setSelectChat] = useState("");
  const [socket, setSocket] = useState(null);
  const [getMyChatRoom, { response }] = useGetMyChatRoom();

  const [timehandle] = usePostingtime();

  const createChatRoom = useCallback(async () => {
    try {
      await postChatRoom({ receiver: selectUser });
      getMyChatRoom();
    } catch (error) {
      alert(error.response.data.errorMessage);
    }
  }, [selectUser, postChatRoom]);

  useEffect(() => {
    getMyChatRoom();
  }, []);

  useEffect(() => {
    if (selectUser && !modalState) {
      createChatRoom();
    }
  }, [selectUser, modalState, createChatRoom]);

  useEffect(() => {
    if (selectChat) {
      const token = cookies.get("access_token");
      cookies.set("chat_access_token", `Bearer ${token}`);
      const newSocket = io(process.env.REACT_APP_SERVER_URL, {
        withCredentials: true,
        query: { chatRoomId: selectChat },
        transports: ["websocket"],
      });
      newSocket.emit("joinChatRoom");
      if (socket) {
        socket.disconnect();
      }
      setSocket(newSocket);
    }
  }, [selectChat]);

  return (
    <>
      <Layout>
        <Wrap>
          <UserTab>
            <RoomHeader>
              메시지
              <NewRoomButton onClick={() => openModalhandle()}>
                <BsPlusSquare size={34} />
              </NewRoomButton>
            </RoomHeader>
            <RoomList>
              {response && response.data.chatList.map((room, index) => (
                <Room
                  key={index}
                  onClick={() => setSelectChat(room.chatRoomId)}
                >
                  <UserInfo>
                    <UserImage src={room.profileImg} />
                    <DMPreview>
                      <ReceiverName>대화상대</ReceiverName>
                      <ReceiverName>{room.profileNickname}</ReceiverName>
                      {/* <CurrentDM>
                        <Message>{room.messageContent}</Message>
                        <Time>{timehandle(room.currentMessageTime)}</Time>
                      </CurrentDM> */}
                    </DMPreview>
                  </UserInfo>
                </Room>
              ))}
            </RoomList>
          </UserTab>
          <ChatTab>
            <Reciver></Reciver>
            <ChatRoomWrap>
              {Object.keys(selectChat).length === 0 ? (
                <NoSelectChat>
                  <h1>내 메시지</h1>
                  <p>작가 및 다른 사용자에게 메시지를 보내보세요.</p>
                  <button onClick={openModalhandle}>메시지 보내기</button>
                </NoSelectChat>
              ) : (
                <ChatBoxList socket={socket} selectChat={selectChat} />
              )}
            </ChatRoomWrap>
          </ChatTab>
        </Wrap>
      </Layout>
      {modalState && (
        <ChatTargetSearchModal
          modalState={modalState}
          openModalhandle={openModalhandle}
          handleUserSelect={setSelectUser}
        />
      )}
    </>
  );
}

export default ChatRoomList;

// 따로 레이아웃 컴포넌트 빼야함.

const Layout = styled.div`
  padding: 80px 75px;
  height: 100vh;
`;

const Wrap = styled.div`
  box-sizing: border-box;

  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: flex-start;

  background: transparent;
  border: 1px solid rgb(120, 120, 120);
  box-shadow: 0px 0px 4px rgba(215, 215, 215, 0.25);
  border-radius: 8px;

  min-width: 900px;

  flex: 1;
  align-self: stretch;
  flex-grow: 1;
`;

const UserTab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  max-width: 280px;
  width: 100%;
  height: 100%;
`;

const ChatTab = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border-left: 1px solid #3c3c3c;

  height: 100%;
  flex: 1;
`;

// UserTab 컴포넌트
const RoomHeader = styled.div`
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid #3c3c3c;

  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  order: 0;

  width: 100%;
  height: 80px;

  position: relative;
`;

const NewRoomButton = styled.button`
  all: unset;
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
  right: 20px;
  cursor: pointer;
  font-weight: 900;

  :hover {
    color: #4137ff;
  }
`;

const RoomList = styled.ul`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 100%;
  order: 1;
  flex: 1;

  overflow: scroll;
  overflow-x: hidden;
`;

const Room = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;

  cursor: pointer;
  width: 100%;
  height: 90px;

  :hover {
    background: #eeeeee;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  height: 50px;

  flex: 1;
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;

  background: #d9d9d9;
  border-radius: 100%;
  overflow: hidden;
  object-fit: contain;
`;

const DMPreview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 0px 0px 10px;

  height: 50px;
  width: 100%;
  gap: 8px;

  flex: 1;

  font-size: 16px;
`;

const ReceiverName = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;

  font-size: 1em;
`;

const CurrentDM = styled.div`
  display: flex;
  width: 100%;
  font-size: 1em;

  color: #8a8484;
`;

const Message = styled.p`
  display: flex;
  max-width: 142px;
  white-space: nowrap;
  overflow: hidden;

  font-size: 1em;
`;

const Time = styled.p`
  font-size: 1em;
  white-space: nowrap;
  color: #9d9a9a;

  ::before {
    content: "·";
  }
`;

// ChatTab

const Reciver = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 40px;

  width: 100%;
  height: 80px;

  border-bottom: 1px solid #3c3c3c;
`;

const ReceiverUser = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  flex: 1;
`;

const ReciverImage = styled.img`
  width: 32px;
  height: 32px;

  background: #d9d9d9;
  border-radius: 100px;

  order: 0;
`;

const ReciverName = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 8px;

  font-weight: 500;
  font-size: 16px;
  line-height: 17px;

  flex: 1;
  order: 1;
`;

const ChatRoomWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  flex: 1;
  width: 100%;
  height: calc(100% - 80px);
  
  padding: 24px;
`;

const NoSelectChat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex: 1;
  width: 100%;
  gap: 12px;

  h1 {
    font-weight: 400;
    font-size: 24px;
    line-height: 26px;
    letter-spacing: 0.04em;

    color: #1a1a1a;
  }

  p {
    font-weight: 400;
    font-size: 18px;
    line-height: 19px;
    /* identical to box height */

    letter-spacing: 0.04em;

    color: #878787;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;

    background: #252525;
    border-radius: 8px;

    font-weight: 600;
    font-size: 18px;
    line-height: 19px;

    margin-top: 4px;

    letter-spacing: 0.04em;

    color: #ffffff;

    cursor: pointer;

    :hover {
      background: #595959;
    }
  }
`;
