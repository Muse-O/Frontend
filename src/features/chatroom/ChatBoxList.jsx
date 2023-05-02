import { React, useCallback, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AiOutlinePlus } from "react-icons/ai";
import { cookies } from "../../shared/cookies";
import { useGetChatHistory } from "../../hooks/chatroom/useGetChatHistory";
import { useGetUploadUrl } from "../../hooks/chatroom/useGetUploadUrl";
import axios from "axios";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

function ChatBoxList({ socket, selectChat }) {
  const me = jwtDecode(cookies.get("access_token")).email;
  const [message, setMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState([]);
  const messagesEndRef = useRef(null);
  const [getChatHistory, {response}] = useGetChatHistory(selectChat);

  const [selectedFile, setSelectedFile] = useState(null);
  const [getUploadUrls, { proivdedURL }] = useGetUploadUrl();

  const [fileUploadError, setFileUploadError] = useState(null);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const sendMessage = useCallback(async () => {
    if (!socket) return;

    socket.emit("sendMessage", {
      messageContent: message,
      sendDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    });
    setMessage("");
  }, [socket, message]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      sendMessage();
    }
  };

  // 파일이 선택된 경우 실행.
  const handleUpload = async (event) => {
    setSelectedFile(event.target.files);
  };

  useEffect(() => {
    getChatHistory(selectChat)
    setReceiveMessage([])
  }, [selectChat])

  // 파일이 선택되어 selectedFile 상태가 변경되면 실행.
  // Cloudflare images에 업로드 할 일회용 접근 URL 생성. 파일 갯수 만큼 생성됨.
  useEffect(() => {
    if (!selectedFile) return;
    setFileUploadLoading(true);
    setFileUploadError(null);
    getUploadUrls(selectedFile.length);
  }, [selectedFile])

  // 파일 URL 생성 완료 후 수행
  useEffect(() => {
    if (!proivdedURL) return;
  
    const urls = proivdedURL.data.urlData;
    const selectedFiles = Array.from(selectedFile);
  
    if (urls.length !== selectedFiles.length) {
      return;
    }
  
    const requests = urls.map((url, i) => {
      const formData = new FormData();
      formData.append("file", selectedFiles[i]);
      return axios.post(url.result.uploadURL, formData);
    });
  
    Promise.all(requests)
      .then((responses) => {
        // 업로드 완료
        const uploadedFiles = responses.map((response) => response.data.result.variants[0]);
      })
      .catch((error) => {
        setFileUploadError(error);
      })
      .finally(() => {
        setFileUploadLoading(false);
      });
  }, [proivdedURL, selectedFile]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        setReceiveMessage((prevReceiveMessage) => [
          ...prevReceiveMessage,
          message,
        ]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [receiveMessage]);

  return (
    <>
    
    <AccessChatRoom>
      <MessageBox ref={messagesEndRef}>
        {response && response.map((message, index) =>
          message.sender === me ? (
            <SendMe key={index}>
              <SendMessage>{message.content}</SendMessage>
              <SenderImage src={message.senderImg} />
            </SendMe>
          ) : (
            <SendOther key={index}>
              <SenderImage src={message.senderImg} />
              <SendMessage>{message.content}</SendMessage>
            </SendOther>
          )
        )}
        {receiveMessage.map((message, index) =>
          message.sender === me ? (
            <SendMe key={index}>
              <SendMessage>{message.content}</SendMessage>
              <SenderImage src={message.senderImg} />
            </SendMe>
          ) : (
            <SendOther key={index}>
              <SenderImage src={message.senderImg} />
              <SendMessage>{message.content}</SendMessage>
            </SendOther>
          )
        )}
      </MessageBox>
    </AccessChatRoom>

    <MessageInputBox>
        {/* <FileInputBox>
          <label htmlFor="sendFile">
            <AiOutlinePlus size={24} />
          </label>
          <input
            type="file"
            id="sendFile"
            accept="image/jpg, image/png, image/jpeg"
            onChange={handleUpload}
          />
        </FileInputBox> */}
        <MessageInput
          type="text"
          placeholder="메시지를 입력해주세요..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <MessageInputButton onClick={sendMessage}>전송</MessageInputButton>
      </MessageInputBox>
    </>
  );
}

export default ChatBoxList;

// 따로 레이아웃 컴포넌트 빼야함.

const AccessChatRoom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  gap: 24px;
  width: 100%;
  height: 100%;

  overflow: scroll;
  overflow-x: hidden;
`;

const MessageBox = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  width: 100%;
  flex: 1;

  padding: 0px 12px;
`;

const MessageInputBox = styled.div`
  margin-top: 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  width: 100%;
  height: 50px;
  padding: 0px 16px 0px 24px;

  border: 1px solid #d9d9d9;
  border-radius: 100px;

  order: 1;
`;

const MessageInput = styled.input`
  all: unset;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  background: transparent;

  font-weight: 500;
  font-size: 18px;
  line-height: 14px;
  letter-spacing: 0.04em;

  color: #424242;

  flex: 1;
  height: 100%;

  order: 0;
`;

const MessageInputButton = styled.button`
  all: unset;

  width: 40px;
  height: 100%;

  order: 1;

  font-weight: 500;
  font-size: 18px;
  line-height: 14px;
  letter-spacing: 0.04em;

  background: transparent;

  color: #424242;

  cursor: pointer;

  :hover {
    color: #121212;
  }
`;

const SendOther = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 100%;
`;

const SenderImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100px;

  background: #d7d7d7;
`;

const SendMe = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 100%;
`;

const SendMessage = styled.p`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px;

  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.04em;

  border: 1px solid #e3e3e3;
  border-radius: 8px;
`;

const FileInputBox = styled.div`
  margin: 0 8px 0 8px;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
