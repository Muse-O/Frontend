import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import styled from "styled-components";
import apis from "../api/apis";

//TODO 1.초반에 받아오는 값설정 필요. V
//TODO 2.마지막 Element 안보이게 설정 필요.V
//TODO 3.리액트 쿼리로 리팩토링 필요.
//TODO 4.LAZY LOAD리팩토링 필요.

function Exhibition() {
  const [list, setList] = useState([]); //Post List
  const [page, setPage] = useState(1); //현재 페이지
  const [load, setLoad] = useState(1); //로딩 스피너
  const preventRef = useRef(true); //옵저버 중복 실행 방지
  const obsRef = useRef(null); //observer Element
  const endRef = useRef(true); //모든 글 로드 확인

  //*컴포넌트가 마운트 될 때  옵저버를 생성하고 언마운트될 경우 옵저버를 해제
  useEffect(() => {
    getFirstItem();
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  //*페이지가 변경될때마다 실행
  useEffect(() => {
    getItem();
  }, [page]);

  //* observer.observe(obsRef.current) 안에 넣은 Element가 화면에 감지됐을 때와 사라졌을 때 obsHanlder() 함수가 실행되고 매개변수로 entries 값을 전달
  const obsHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && preventRef.current && endRef.current) {
      //옵저버 중복 실행 방지
      preventRef.current = false; //옵저버 중복 실행 방지
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  const getFirstItem = useCallback(async () => {
    const res = await apis.get("/exhibition");
    console.log("res", res.data.exhibitionList.rows);
    endRef.current = res.data.paginationInfo.hasNextPage;
    if (res.data) {
      setList((prev) => [...prev, ...res.data.exhibitionList.rows]); //리스트 추가
      preventRef.current = true;
    } else {
      console.log(res); //에러
    }
  }, []);

  const getItem = useCallback(async () => {
    //글 불러오기
    setLoad(true); //로딩 시작
    const res = await apis.get(`/exhibition?limit=1&offset=${page}`);
    endRef.current = res.data.paginationInfo.hasNextPage;
    console.log("건님의 데이터", res.data.paginationInfo.hasNextPage);
    console.log("들어가는 offset", page);

    if (res.data) {
      setList((prev) => [...prev, { ...res.data.exhibitionList.rows[0] }]); //리스트 추가
      preventRef.current = true;
    } else {
      console.log(res); //에러
    }
    setLoad(false); //로딩 종료
  }, [page]);

  return (
    <>
      <Header />
      <Article>
        <div>
          <div>
            {list && (
              <>
                {list.map((item) => (
                  //!아이디 나중에 수정해야함
                  <Div>
                    제목{item.exhibitionTitle}아이디{item.exhibitionId}
                  </Div>
                ))}
              </>
            )}
            {/* {load && <div ref={obsRef}>로딩 중</div>} */}
            <Nonedisplay ref={obsRef}>
              로딩중 스피너 넣으면 좋을꺼 같음
            </Nonedisplay>
          </div>
        </div>
      </Article>
    </>
  );
}

export default Exhibition;

const Div = styled.div`
  background-color: green;
  margin: 100px;
  font-size: 40px;
`;

const Nonedisplay = styled.div`
  /* display: none; */
`;
