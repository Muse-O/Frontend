import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsPen } from "react-icons/bs";

function ArtgramWrite() {
  const navigate = useNavigate();
  return (
    <Artgramwrite
      onClick={() => navigate("/artgram/create")}
      children={
        <p>
          <BsPen />
        </p>
      }
    ></Artgramwrite>
  );
}

export default ArtgramWrite;

const Artgramwrite = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background-color: #fff;
  border: 1px solid #3c3c3c;

  p {
    font-size: 3rem;
  }
`;
