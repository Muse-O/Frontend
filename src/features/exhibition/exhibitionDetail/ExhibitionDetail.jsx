import React from "react";
import { Flex } from "../../../components/Flex";
import { TitleBackGround } from "./Detail/BlakcBg";
import { Post } from "./Detail/Post";
import { Contents } from "./Detail/Contents";
import { GetDetailInfos } from "./utils/GetDetailInfos";

function ExhibitionDetail() {
  const [id, reviewRef, info, isLoading, isError] = GetDetailInfos();
  if (isLoading || isError) {
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
