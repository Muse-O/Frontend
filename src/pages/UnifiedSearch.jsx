import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Article } from '../shared/GlobalStyled'
import * as US from '../features/unfiedSearch/unfiedSeach'
import { useNavigate } from 'react-router-dom'
import * as Artgramparts from '../features/artgram/css/ArtgramCss'
// import { useUnifiedSearch } from '../hooks/search/useUnifiedSearch'
import { useUnifiedSearch } from '../hooks/search/useUnifiedSearch'
import { useRecoilValue } from 'recoil'
import { searchDataArtState, searchDataExState, searchDataState, searchDataUserState, searchWordState } from '../hooks/search/seartStore'
// import ArtgramBox from '../features/artgram/ArtgramBox'

function UnifiedSearch() {
  const navigate = useNavigate()
  const { isLoading, isError } = useUnifiedSearch();
  const searchDataEx = useRecoilValue(searchDataExState)
  const searchDataArt = useRecoilValue(searchDataArtState)
  const searchDataUser = useRecoilValue(searchDataUserState)
  console.log("searchDataEx", searchDataEx);
  console.log("searchDataArt", searchDataArt);
  console.log("searchDataUser", searchDataUser);

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
          <US.SearchNavOther onClick={()=>navigate('/search/users')} children="유저"/>
        </US.SearchNav>
        <US.H2 children={(<>전시<span>{searchDataEx ? searchDataEx.length : 0}개</span></>)}/>
        <US.SearchBoxEx style={{padding:"23px"}}>
          {searchDataEx && searchDataEx.map(exhibitrion => (<div key={exhibitrion.exhibitionId} style={{backgroundColor:"white"}}>{exhibitrion.exhibitionTitle}</div>))}
        </US.SearchBoxEx>
        <US.H2 children={(<>아트그램<span>{searchDataArt ? searchDataArt.length : 0}개</span></>)}/>
        <Artgramparts.Wrap style={{minHeight:"426px", backgroundColor:"lightcoral", padding:"23px"}}>
          {searchDataArt && searchDataArt.map(artgram => (<div key={artgram.artgramId} style={{backgroundColor:"white"}}>{artgram.artgramTitle}</div>))}
        </Artgramparts.Wrap>
      </US.Layout>  
    </Article>
    </>
  )
}

export default UnifiedSearch