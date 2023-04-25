import React from 'react'
import Header from '../components/Header'
import { Article } from '../shared/GlobalStyled'
import * as US from '../features/unfiedSearch/unfiedSeach'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { searchDataExState } from '../hooks/search/seartStore'

function UnifiedSearchEx() {
  const navigate = useNavigate()
  const searchDataEx = useRecoilValue(searchDataExState)
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
        <US.H2 children={(<>전시<span>{searchDataEx ? searchDataEx.length : 0}개</span></>)}/>
        <US.SearchBoxEx style={{padding:"23px"}}>
          {searchDataEx && searchDataEx.map(exhibitrion => (<div key={exhibitrion.exhibitionId} style={{backgroundColor:"white"}}>{exhibitrion.exhibitionTitle}</div>))}
        </US.SearchBoxEx>
      </US.Layout>  
    </Article>
    </>
  )
}

export default UnifiedSearchEx