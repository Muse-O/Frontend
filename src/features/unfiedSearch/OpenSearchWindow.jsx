import React from 'react'
import * as Headers from '../../shared/GlobalStyled'
import { useSearchRank } from '../../hooks/search/useSearchRank';
import { useRecoilState } from 'recoil';
import { searchWordState } from '../../hooks/search/seartStore';
import { useNavigate } from 'react-router-dom';
import { useSearchRecent } from '../../hooks/search/useSearchRecent';

function OpenSearchWindow({searchWindow, setSearchWindow}) {
  const {isLoading:loadingRank, isError:errorRank, data:rank} = useSearchRank(searchWindow)
  const {isLoading:loadingRecent, isError:errorRecent, data:recent} = useSearchRecent(searchWindow)
  const [,setSearchWord] = useRecoilState(searchWordState)
  const navigate = useNavigate();

  const searchwordRankHandle = (keyWord) => {
    setSearchWord(keyWord.replace(/\s/g, ""))
    navigate('/search')
  }

  const searchwordRecentHandle = (keyWord) => {
    setSearchWord(keyWord.replace(/\s/g, ""))
    navigate('/search')
  }

  return (
    <Headers.NavSearchList
      state={searchWindow}
      onClick={(event)=>{setSearchWindow(false); event.stopPropagation()}}
      onMouseEnter={()=>setSearchWindow(true)}
      onMouseLeave={()=>setSearchWindow(false)}>
      
    <Headers.NavSearchListTop10>
      <h2>인기 게시글</h2>
      {loadingRank || errorRank
        ? <div>로딩 중...</div>
        : rank && rank.map((lists, index)=> (
          <div className="searchList" key={index} onClick={()=>searchwordRankHandle(lists.keyWord)}>
            <div className="rank" children={index+1}/>
            <div className="contents" children={lists.keyWord}/>
          </div>
        ))}      
    </Headers.NavSearchListTop10>
    <Headers.NavSearchListRecently>
      <h2>최근에 본 게시글</h2>
      {loadingRecent
        ? <div>로딩 중...</div>
        : errorRecent
        ? <div>회원만 "최근에 본 게시글"을 지원합니다.</div>
        : recent && recent.map((lists, index)=> (
          <div className='searchList' key={index} children={lists.keyWord} onClick={()=>searchwordRecentHandle(lists.keyWord)}/>))}
    </Headers.NavSearchListRecently>
  </Headers.NavSearchList>
  )
}

export default OpenSearchWindow
