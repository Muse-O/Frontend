import React from 'react'
import Header from '../components/Header'
import { Article } from '../shared/GlobalStyled'
import * as US from '../features/unfiedSearch/unfiedSeach'
import { useNavigate } from 'react-router-dom'

function UnifiedSearchUser() {
  const navigate = useNavigate()
  return (
    <>
    <Header/>
    <Article>
      <US.Layout>
        <US.H1>유저검색 <span>User search</span></US.H1>
        <US.SearchNav>
          <US.SearchNavOther onClick={()=>navigate('/search')} children="통합"/>
          <US.SearchNavOther onClick={()=>navigate('/search/exhibition')} children="전시"/>
          <US.SearchNavOther onClick={()=>navigate('/search/art')} children="아트그램"/>
          <US.SearchNavSection onClick={()=>navigate('/search/users')} children="유저"/>
        </US.SearchNav>
      </US.Layout>  
    </Article>
    </>
  )
}

export default UnifiedSearchUser