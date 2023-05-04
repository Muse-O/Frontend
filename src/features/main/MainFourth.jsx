import React, { useEffect, useState } from "react";
// import CSS --------------------------------------------------------------------------------------------/
import * as Main from "./css/mainparts";
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useGetDate } from "../../hooks/main/useGetDate";
import { useNearestExhibition } from "../../hooks/main/useNearestExhibition";
import { useNavigate } from "react-router-dom";
import { useMainFourthImg } from "../../hooks/main/useMainFourthImg";

function MainFourth() {
  const navigate = useNavigate()
  const { getday, getMonth } = useGetDate();
  const { isLoading, isError, data } = useNearestExhibition();
  const { imgState, setImgState } = useMainFourthImg(data)

  return (
    <Main.CommenLayout height="624" media1440="468">
      <Main.ArticleTitle>
        <Main.MainH1 children="예정 전시"/>
        <Main.MainH5 children="더보기 >" onClick={()=>navigate('/exhibition')}/>
      </Main.ArticleTitle>
      <Main.FourthWrap>
        <Main.FourthImg src={imgState} alt="예정전시 이미지" />
        {isLoading || isError 
          ? <div>로딩 중... </div> 
          : data && data.length === 0 
          ? <div style={{marginTop:"66px"}}>데이터가 없습니다...</div>
          : (<Main.FouthInfoWrap>
            {data && data.map(exhibition => (
                <Main.FourthInfo key={exhibition.exhibitionId} onMouseOver={()=>setImgState(exhibition.postImage)} onClick={()=>navigate(exhibition.detailRouter)}>
                  <Main.FouthInfoDate children={<>
                    <p>{getday(exhibition.startDate)}</p>
                    <p>{getMonth(exhibition.startDate)}</p>
                  </>}/>
                  <Main.FouthInfoTitle children={<>
                    <p>{exhibition.exhibitionTitle}</p>
                    <p>{exhibition.exhibitionEngTitle}</p>
                  </>}/>
                  <Main.FouthInfoAddress children={
                    <p>{exhibition.address}</p>
                  }/>
                </Main.FourthInfo>
              ))}
          </Main.FouthInfoWrap>)}
        
      </Main.FourthWrap>
    </Main.CommenLayout>
  );
}

export default MainFourth;