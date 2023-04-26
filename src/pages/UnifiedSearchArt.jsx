import React from 'react'
import Header from '../components/Header'
import { Article } from '../shared/GlobalStyled'
import * as US from '../features/unfiedSearch/unfiedSeach'
import { useNavigate } from 'react-router-dom'
import * as Artgramparts from '../features/artgram/css/ArtgramCss'
import { useRecoilValue } from 'recoil'
import { searchDataArtState } from '../hooks/search/seartStore'

function UnifiedSearchArt() {
  const navigate = useNavigate()
  const searchDataArt = useRecoilValue(searchDataArtState)
  return (
    <>
    <Header/>
    <Article>
      <US.Layout>
        <US.H1>아트그램검색 <span>Artgram search</span></US.H1>
        <US.SearchNav>
          <US.SearchNavOther onClick={()=>navigate('/search')} children="통합"/>
          <US.SearchNavOther onClick={()=>navigate('/search/exhibition')} children="전시"/>
          <US.SearchNavSection onClick={()=>navigate('/search/art')} children="아트그램"/>
          <US.SearchNavOther onClick={()=>navigate('/search/users')} children="유저"/>
        </US.SearchNav>
        <US.H2 children={(<>아트그램<span>{searchDataArt?.length > 0 ? searchDataArt.length : null}</span></>)}/>
        <Artgramparts.Wrap style={{minHeight:"426px", backgroundColor:"lightcoral", padding:"23px"}}>
          {searchDataArt && searchDataArt.map(artgram => (<div key={artgram.artgramId} style={{backgroundColor:"white"}}>{artgram.artgramTitle}</div>))}
        </Artgramparts.Wrap>
      </US.Layout>  
    </Article>
    </>
  )
}

export default UnifiedSearchArt