import React from 'react'
import * as Main from "./css/mainparts";
import { useEditLists } from '../../hooks/main/useEditLists';
import { fifithSliderList } from './mainpageexample/fifithSliderList';
import { Flex } from '../../components/Flex';

function MainFifith() {
   // 서버로 부터 받아 온 배열을 슬라이더의 목적에 따라 가공하는 커스텀 훅
   const [EditList] = useEditLists(fifithSliderList);

  return (
    <Main.CommenLayout height="800" style={{backgroundColor:"lightyellow"}}>
      <Main.ArticleTitle>
        <Main.MainH1 children="아트그램" />
      </Main.ArticleTitle>
      <Main.FifitWrap style={{backgroundColor:"lightcoral"}}>
        <div>아</div>
        <div>아아</div>
      </Main.FifitWrap>
    </Main.CommenLayout>
  )
}

export default MainFifith