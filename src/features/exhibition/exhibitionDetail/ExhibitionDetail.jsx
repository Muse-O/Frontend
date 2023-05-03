import React, { useRef } from "react";
import { useDetailGetExibition } from "../../../hooks/exhibition/useDetailGetExibition";
import { useNavigate, useParams } from "react-router-dom";
import { Flex } from "../../../components/Flex";
import { TitleBackGround } from "./Detail/BlakcBg";
import { Post } from "./Detail/Post";
import { Contents } from "./Detail/Contents";
function ExhibitionDetail() {
  const { id } = useParams();
  const reviewRef = useRef(null);
  const [info, isLoading, isError] = useDetailGetExibition(id);
  if (isLoading) {
    return <div>로딩중</div>;
  }
  return (
    <Flex>
      {info && (
        <>
          <TitleBackGround info={info} />
          <Post info={info} id={id} reviewRef={reviewRef} />
          <Contents info={info} id={id} reviewRef={reviewRef} />
        </>
      )}
    </Flex>
  );
}

export default ExhibitionDetail;
