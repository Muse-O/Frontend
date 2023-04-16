import React from 'react'
import * as Main from "./css/mainparts";

function MainThird() {
  return (
    <Main.ThirdLayout
      height="950"
      style={{ backgroundColor: "lightgoldenrodyellow" }}>
      <Main.ArticleTitle>
        <Main.MainH1 children="TOP 10" />
      </Main.ArticleTitle>
      <Main.ThirdWrap gap="23" fw="wrap">
        {Array(10)
          .fill(null)
          .map((el, index) => (
            <Main.ThirdInner key={index}>
              <div className="number">{index + 1}</div>
              <div className="exhibitionimg"></div>
              <div className="innerText">
                <p className="title">대지의 시간 The Time of Earth</p>
                <p className="location">2023.04.14-2023.04.20</p>
              </div>
            </Main.ThirdInner>
          ))}
      </Main.ThirdWrap>
    </Main.ThirdLayout>
  );
}

export default MainThird