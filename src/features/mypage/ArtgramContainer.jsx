import React from "react";
import styled from "styled-components";

function ArtgramContainer() {
  return (
    <div>
      <div>
        <div style={{ fontSize: "25px", marginBottom: "10px" }}>
          아트그램 Artgram
        </div>
        <StArtgramBox></StArtgramBox>
      </div>
    </div>
  );
}

export default ArtgramContainer;

const StArtgramBox = styled.div`
  background-color: pink;
  width: 1050px;
  height: 400px;
  display: flex;
  flex-direction: column;
`;
