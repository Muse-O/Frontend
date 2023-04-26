import React from 'react'
import Header from '../components/Header'
import { Article } from '../shared/GlobalStyled'
import * as US from '../features/unfiedSearch/unfiedSearch'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { searchDataExState } from '../hooks/search/seartStore'
import { useEditTime } from '../hooks/main/useEditTime'

function UnifiedSearchEx() {
  const navigate = useNavigate()
  const {editTimehandle} = useEditTime()
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
          <US.SearchNavOther onClick={()=>navigate('/search/users')} children="회원검색"/>
        </US.SearchNav>
        <US.H2 children={(<>전시<span>{searchDataEx?.length > 0 ? searchDataEx.length : null}</span></>)}/>
        {searchDataEx.length === 0
            ? (<US.SearchBoxNoone>검색된 결과가 없습니다.</US.SearchBoxNoone>)
            : (<US.SearchBoxEx>
              {searchDataEx?.map(({exhibitionId,postImage,exhibitionTitle,startDate}) => (
              <US.SearchEx key={exhibitionId}>
              <US.SearchBoxExImg src={postImage} alt=''/>
              <US.SearchBoxExTitle children={exhibitionTitle}/>
              <US.SearchBoxExDate children={editTimehandle(startDate)}/>
              <US.SearchBoxExlocation children="위치"/>
            </US.SearchEx>))}
            </US.SearchBoxEx>
              )}
      </US.Layout>  
    </Article>
    </>
  )
}

export default UnifiedSearchEx