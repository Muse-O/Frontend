import React from "react";
// import CSS --------------------------------------------------------------------------------------------/
import * as Main from "./css/mainparts";
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useNavigate } from "react-router-dom";
import { useMostLike } from "../../hooks/main/useMostLike";
import { ThirdInnerDiv } from "./innerDiv/ThirdInnerDiv";

function MainThird() {
  const navigate = useNavigate();
  const { isLoading, isError, data } = useMostLike();

  return (
    <Main.ThirdLayout height="906" media1440="679.5">
      <Main.ArticleTitle>
        <Main.MainH1 children="TOP 10" />
        <Main.MainH5
          children="더보기 >"
          onClick={() => navigate("/exhibition")}
        />
      </Main.ArticleTitle>
      {isLoading || isError ? (
        <div style={{ marginTop: "66px" }}>로딩 중...</div>
      ) : data && data.length === 0 ? (
        <div style={{ marginTop: "66px" }}>데이터가 없습니다...</div>
      ) : (
        <Main.ThirdWrapGrid>
          <div>
            {data &&
              data.row1.map((list1) => (
                <Main.ThirdInner
                  key={list1.exhibitionId}
                  onClick={() => navigate(list1.detailRouter)}
                >
                  <ThirdInnerDiv list={list1} />
                </Main.ThirdInner>
              ))}
          </div>
          <div>
            {data &&
              data.row2.map((list2) => (
                <Main.ThirdInner
                  key={list2.exhibitionId}
                  onClick={() => navigate(list2.detailRouter)}
                >
                  <ThirdInnerDiv list={list2} />
                </Main.ThirdInner>
              ))}
          </div>
        </Main.ThirdWrapGrid>
      )}
    </Main.ThirdLayout>
  );
}

export default MainThird;
