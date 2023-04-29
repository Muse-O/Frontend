import React from 'react'
import * as Headers from '../../shared/GlobalStyled'
import { useSearchRank } from '../../hooks/search/useSearchRank';
import { useRecoilState } from 'recoil';
import { searchWordState } from '../../hooks/search/seartStore';
import { useNavigate } from 'react-router-dom';

function OpenSearchWindow({searchWindow, setSearchWindow}) {
  const {isLoading, isError, data} = useSearchRank(searchWindow)
  const [,setSearchWord] = useRecoilState(searchWordState)
  const navigate = useNavigate();
  console.log(data);
  const searchwordHandle = (keyWord) => {
    setSearchWord(keyWord.replace(/\s/g, ""))
    navigate('/search')
  }
  return (
    <Headers.NavSearchList
      state={searchWindow}
      onClick={()=>setSearchWindow(false)}
      onMouseOver={()=>setSearchWindow(true)}
      onMouseOut={()=>setSearchWindow(false)}>
      
    <Headers.NavSearchListTop10>
      <h2>인기검색어</h2>
      {isLoading ||  isError
        ? <div>로딩 중...</div>
        : data && data.map((lists, index)=> (
          <div className="searchList" key={index} onClick={()=>searchwordHandle(lists.keyWord)}>
            <div className="rank" children={index+1}/>
            <div className="contents" children={lists.keyWord}/>
          </div>
        ))}      
    </Headers.NavSearchListTop10>
    <Headers.NavSearchListRecently>
      <h2>최근검색어</h2>
    </Headers.NavSearchListRecently>
  </Headers.NavSearchList>
  )
}

export default OpenSearchWindow

