import React from "react";
import { Article, Wrap } from "../shared/GlobalStyled";
import Header from "../components/Header";
import { useGetartgram } from "../hooks/artgram/useGetartgram";
import * as Artgramparts from '../features/artgram/Artgramparts'
import { usePostingtime } from "../hooks/artgram/usePostingtime";
import {BsHeartFill} from 'react-icons/bs'

function Artgram() {
  // const [isLoading, isError, allArtgram] = useGetartgram()
  const [isLoading, isError] = useGetartgram()
  const [postingTime] = usePostingtime(allArtgramList)

  if(isLoading || isError) {
    return <div>로딩 중....</div>
  }
  
  return (
    <>
      <Header />
      <Article>
        <Wrap>
          {/* Global - 전체 배경이 될 공간*/}
          <Artgramparts.H1 fs="3rem" type="아트그램" children="아트그램" />
          <Artgramparts.MainFlex ai="center" gap="19" fw="wrap">
            {Array(20)
              .fill()
              .map((el, index) => {
                return (
                  <Artgramparts.Artgrambox key={index} fd="column" gap="15">
                    <Artgramparts.Img src={allArtgramList.imgUrl} />
                    <Artgramparts.H1 fs="2rem" children={allArtgramList.artgramTitle} />
                    <Artgramparts.Desc children={allArtgramList.artgramDesc}/>
                    <Artgramparts.Posting children={`${postingTime} ･ 22개의 댓글`}/>
                    <Artgramparts.UserFlex>
                      <Artgramparts.ProflieBox url=""/>
                      <Artgramparts.Nickname children={(<><span>by</span> {allArtgramList.profileNickname}</>)}/>
                      <Artgramparts.Likes children={(<><span><BsHeartFill/></span> 265명</>)}/>
                    </Artgramparts.UserFlex>
                  </Artgramparts.Artgrambox>
                )
              })}
          </Artgramparts.MainFlex>
        </Wrap>
      </Article>
    </>
  );
}

export default Artgram;

// 실제에서는 리버스가 필요 
const allArtgramList = {
imgUrl: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_25/2899136/190617-puppy-dog-eyes-cs-325p.jpg",
// artgramDesc: "아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ 아울ㅇㄴㅁ ",
artgramDesc: "아울ㅇㄴㅁ  ",
artgramId: "4003f794-1392-4c23-bcc0-6a03225d89dd",
artgramTitle: "이게왜되지",
createdAt: "2023-04-04T00:40:55.000Z", // 2023-04-04  00:40:55 
profileImg: "",
profileNickname: "been",
updatedAt: "2023-04-04T00:44:46.000Z",
userEmail: "bbbb1@naver.com"}
