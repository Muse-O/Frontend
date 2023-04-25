import React from 'react'
import Header from '../components/Header'
import { Article } from '../shared/GlobalStyled'
import * as US from '../features/unfiedSearch/unfiedSeach'
import { useNavigate } from 'react-router-dom'
import * as Artgramparts from '../features/artgram/css/ArtgramCss'
// import ArtgramBox from '../features/artgram/ArtgramBox'

function UnifiedSearch() {
  const navigate = useNavigate()
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
        <US.H2 children={(<>전시<span>247</span></>)}/>
        <US.SearchBoxEx style={{padding:"23px"}}>
        {Array(8).fill(null).map((el,index) => (<div key={index} style={{backgroundColor:"white"}}>{index} 아이템</div>))}
        </US.SearchBoxEx>
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

export default UnifiedSearch