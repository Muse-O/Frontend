import React from "react";
import { Article, H1, Wrap } from "../shared/GlobalStyled";
import Header from "../components/Header";
import { useGetartgram } from "../hooks/artgram/useGetartgram";
import * as Artgramparts from '../features/artgram/Artgramparts'

function Artgram() {
  const [isLoading, isError, allArtgram] = useGetartgram()

  if(isLoading || isError) {
    return <div>로딩 중....</div>
  }
  
  return (
    <>
      <Header />
      <Article>
        <Wrap> {/* Global - 전체 배경이 될 공간*/}
          <Artgramparts.H1 fs="3rem" children="아트그램" />
          <Artgramparts.MainFlex ai="center" gap="20" fw="wrap">
           {Array(20).fill().map(el => (
            <Artgramparts.Artgrambox>

            </Artgramparts.Artgrambox>
          ))}
          </Artgramparts.MainFlex>
        </Wrap>
      </Article>
      
    </>
  );
}

export default Artgram;

const allArtgramList = {imgUrl: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_25/2899136/190617-puppy-dog-eyes-cs-325p.jpg",
artgramDesc: "아울ㅇㄴㅁ",
artgramId: "4003f794-1392-4c23-bcc0-6a03225d89dd",
artgramTitle: "이게왜되지",
createdAt: "2023-04-04T00:40:55.000Z",
profileImg: "",
profileNickname: "been",
updatedAt: "2023-04-04T00:44:46.000Z",
userEmail: "bbbb1@naver.com"}
