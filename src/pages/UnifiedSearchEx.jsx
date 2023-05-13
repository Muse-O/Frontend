import React from 'react'
// import CSS --------------------------------------------------------------------------------------------/
import { Article } from '../shared/GlobalStyled'
import * as US from '../features/unfiedSearch/unfiedSearch'
// import Library-----------------------------------------------------------------------------------------/
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useEditTime } from '../hooks/main/useEditTime'
import { searchDataExState } from '../hooks/search/seartStore'
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import Header from '../components/Header'

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
        {searchDataEx === undefined
        ? (
          <>
          <US.H2 children={(<>전시</>)}/>
          <US.SearchBoxNoone children="검색된 결과가 없습니다."/>
          </>
        )
        :(<>
          <US.H2 children={(<>전시<span>{searchDataEx?.length > 0 ? searchDataEx.length : null}</span></>)}/>
        {searchDataEx.length === 0
            ? (<US.SearchBoxNoone>검색된 결과가 없습니다.</US.SearchBoxNoone>)
            : (<US.SearchBoxEx>
              {searchDataEx?.map(({exhibitionId,detailRouter,postImage,exhibitionTitle,startDate,address}) => (
              <US.SearchEx key={exhibitionId} onClick={()=>navigate(detailRouter)}>
              <US.SearchBoxExImg src={postImage} alt=''/>
              <US.SearchBoxExTitle children={exhibitionTitle}/>
              <US.SearchBoxExDate children={editTimehandle(startDate)}/>
              <US.SearchBoxExlocation children={address}/>
            </US.SearchEx>))}
            </US.SearchBoxEx>
              )}
        </>)}
      </US.Layout>  
    </Article>
    </>
  )
}

export default UnifiedSearchEx