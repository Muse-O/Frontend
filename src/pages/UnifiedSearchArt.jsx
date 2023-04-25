import React from 'react'
import Header from '../components/Header'
import { Article } from '../shared/GlobalStyled'
import * as US from '../features/unfiedSearch/unfiedSeach'
import { useNavigate } from 'react-router-dom'
import * as Artgramparts from '../features/artgram/css/ArtgramCss'

function UnifiedSearchArt() {
  const navigate = useNavigate()
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
        <US.H2 children={(<>아트그램<span>247</span></>)}/>
        <Artgramparts.Wrap style={{minHeight:"426px", backgroundColor:"lightcoral", padding:"23px"}}>
            {Array(8).fill(null).map((el,index) => (<div key={index} style={{backgroundColor:"white"}}>{index} 아이템</div>))}
          
           {/* {merged.map(artgrams => 
                <div key={artgrams.artgramId} children={ <ArtgramBox info={artgrams}/>}/>)} */}
           </Artgramparts.Wrap>
      </US.Layout>  
    </Article>
    </>
  )
}

export default UnifiedSearchArt