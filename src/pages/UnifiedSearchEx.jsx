import React from 'react'
import Header from '../components/Header'
import { Article } from '../shared/GlobalStyled'
import * as US from '../features/unfiedSearch/unfiedSeach'
import { useNavigate } from 'react-router-dom'

function UnifiedSearchEx() {
  const navigate = useNavigate()
  return (
    <>
    <Header/>
    <Article>
      <US.Layout>
        <US.H1>전시검색 <span>Exhibition search</span></US.H1>
        <US.SearchNav>
          <US.SearchNavOther onClick={()=>navigate('/search')} children="통합"/>
          <US.SearchNavSection onClick={()=>navigate('/search/exhibition')} children="전시"/>
          <US.SearchNavOther onClick={()=>navigate('/search/art')} children="아트그램"/>
          <US.SearchNavOther onClick={()=>navigate('/search/users')} children="유저"/>
        </US.SearchNav>
        <US.H2 children={(<>전시<span>247</span></>)}/>
        <US.SearchBoxEx style={{padding:"23px"}}>
        {Array(8).fill(null).map((el,index) => (<div key={index} style={{backgroundColor:"white"}}>{index} 아이템</div>))}
        </US.SearchBoxEx>
      </US.Layout>  
    </Article>
    </>
  )
}

export default UnifiedSearchEx