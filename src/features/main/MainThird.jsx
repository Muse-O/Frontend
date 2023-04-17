import React from 'react'
import * as Main from "./css/mainparts";

function MainThird() {
  return (
    <Main.ThirdLayout
      height="782"
      style={{ backgroundColor: "lightgoldenrodyellow" }}>
      <Main.ArticleTitle>
        <Main.MainH1 children="TOP 10" style={{fontFamily:"'Montserrat', sans-serif"}}/>
      </Main.ArticleTitle>
      <Main.ThirdWrap gap="23" fw="wrap">
        {Array(10)
          .fill(null)
          .map((el, index) => (
            <Main.ThirdInner key={index}>
              <div className="number"><p>{index + 1}</p></div>
              <div className="exhibitionimg"></div>
              <div className="innerText">
                <p className="titleKo">대지의 시간</p>
                <p className="titleEn">The Time of Earth</p>
                <p className="location">2023.04.14 - 2023.04.20</p>
              </div>
            </Main.ThirdInner>
          ))}
      </Main.ThirdWrap>
    </Main.ThirdLayout>
  );
}

export default MainThird