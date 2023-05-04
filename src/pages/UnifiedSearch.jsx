import React from 'react'
// import CSS --------------------------------------------------------------------------------------------/
import { Article } from '../shared/GlobalStyled'
import * as US from '../features/unfiedSearch/unfiedSearch'
import * as Artgramparts from '../features/artgram/css/ArtgramCss'
// import Library-----------------------------------------------------------------------------------------/
import { useNavigate } from 'react-router-dom'
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useEditTime } from '../hooks/main/useEditTime'
import { useUnifiedSearch } from '../hooks/search/useUnifiedSearch'
import { usePostSearchWord } from '../hooks/search/usePoseSearchWord'
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import Header from '../components/Header'
import TopButton from '../components/TopButton'
import ArtgramBox from '../features/artgram/ArtgramBox'
import { useUnifiedSearchValue } from '../hooks/search/useUnifiedSearchValue'


function UnifiedSearch() {
  const navigate = useNavigate()
  const {editTimehandle} = useEditTime()
  const {postSearchWord} = usePostSearchWord()
  const { isLoading, isError } = useUnifiedSearch();
  const {searchWord, searchDataEx, searchDataArt, searchDataUser} = useUnifiedSearchValue()
  const searchDateEx = (detailRoute,type,exhibitionTitle) => {
    navigate(detailRoute)
    postSearchWord({type, title:exhibitionTitle})
  }

  return (
    <>
    <Header/>
    <Article>
      <US.Layout>
        <US.H1>통합검색 <span>Unified search</span></US.H1>
        <US.SearchNav>
          <US.SearchNavSection onClick={()=>navigate('/search')} children="통합"/>
          <US.SearchNavOther onClick={()=>navigate('/search/exhibition')} children="전시"/>
          <US.SearchNavOther onClick={()=>navigate('/search/art')} children="아트그램"/>
          <US.SearchNavOther onClick={()=>navigate('/search/users')} children="회원검색"/>
        </US.SearchNav>
        { isLoading || isError 
        ? (<div>로딩 중... </div>)
        : searchDataEx === undefined || searchDataArt === undefined || searchDataUser === undefined
        ? (
          <>
          <US.H2 children={(<>전시</>)}/>
          <US.SearchBoxNoone children="검색된 결과가 없습니다."/>
          <US.H2 children={(<>아트그램</>)}/>
          <US.SearchBoxNoone children="검색된 결과가 없습니다."/>
          <US.H2 children={(<>회원검색</>)}/>
          <US.SearchBoxNoone children="검색된 결과가 없습니다."/>
          </>
        )
        : (<>
          <US.H2 children={(<>전시<span>{searchDataEx.length === 0 ? null : searchDataEx.length}</span></>)}/>
          {searchDataEx && searchDataEx?.length === 0
            ? <US.SearchBoxNoone children="검색된 결과가 없습니다."/>
            : (<US.SearchBoxEx>
              {searchDataEx?.map(({exhibitionId,detailRouter,postImage,exhibitionTitle,startDate,address,type}) => (
              <US.SearchEx key={exhibitionId} onClick={()=>searchDateEx(detailRouter,type,exhibitionTitle)}>
              <US.SearchBoxExImg src={postImage} alt=''/>
              <US.SearchBoxExTitle children={exhibitionTitle}/>
              <US.SearchBoxExDate children={editTimehandle(startDate)}/>
              <US.SearchBoxExlocation children={address}/>
            </US.SearchEx>))}
            </US.SearchBoxEx>
              )}
          <US.H2 children={(<>아트그램<span>{searchDataArt && searchDataArt?.length === 0 ? null : searchDataArt.length}</span></>)}/>
          {searchDataArt && searchDataArt?.length === 0
            ? <US.SearchBoxNoone children="검색된 결과가 없습니다."/>
            : <Artgramparts.Wrap>
              {searchDataArt.map(artgrams => (<ArtgramBox key={artgrams.artgramId} info={artgrams} searchWord={searchWord} postSearchWords={{type:artgrams.type, title:artgrams.artgramTitle}}/>))}
              </Artgramparts.Wrap>}
          <US.H2 children={(<>회원검색<span>{searchDataUser && searchDataUser?.length === 0 ? null : searchDataUser.length}</span></>)}/>
          {searchDataUser && searchDataUser?.length === 0
            ? <US.SearchBoxNoone children="검색된 결과가 없습니다."/>
            : <US.SearchBoxUse>
                {searchDataUser.map(user=>(
                  <US.SearchUse key={user.profileId} children={<>
                    <img src={user.profileImg} alt='profileImg'/>
                    <div children={user.profileNickname}/>
                  </>}/>
                ))}
              </US.SearchBoxUse>}      
          </>)}
        <TopButton/>
      </US.Layout>  
    </Article>
    </>
  )
}

export default UnifiedSearch
