import React from "react";
import { Flex } from "../../components/Flex";
import styled from "styled-components";

function UpdateUserProfileModal({ setOpenModal }) {
  const updateModalCloseHandler = () => {
    setOpenModal(false);
  };

  return (
    <StUserProfileModal>
      <button onClick={updateModalCloseHandler}>닫기</button>
    </StUserProfileModal>
  );
}

export default UpdateUserProfileModal;

const StUserProfileModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  height: 800px;
  background-color: white;
  position: fixed;
  z-index: 2;
  top: 8%;
  left: 25%;
`;
