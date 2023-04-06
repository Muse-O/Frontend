import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import styled from "styled-components";
import { apis } from "../api/apis";
import { useGetExhibition } from "../hooks/exhibition/useGetExhibition";
import { useNavigate } from "react-router-dom";

//TODO 1.초반에 받아오는 값설정 필요. V
//TODO 2.마지막 Element 안보이게 설정 필요.V
//TODO 3.파일랜덤값 나오는거 수정 필요 (서버이슈)V
//TODO 4.리액트 쿼리로 리팩토링 필요.
//TODO 5.LAZY LOAD리팩토링 필요.

function Exhibition() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(10);
  const [load, setLoad] = useState(1);
  const preventRef = useRef(true);
  const obsRef = useRef(null);
  const endRef = useRef(true);
  const [exhibitionData, exhibitionIsLoading] = useGetExhibition();
  const navigator = useNavigate();
  // console.log("exhibitionData", exhibitionData);

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

  //*element를 확인될때 page를 올림
  const obsHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && preventRef.current && endRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };
  //*처음 받아오는값
  const getFirstItem = useCallback(async () => {
    const res = await apis.get("/exhibition");
    endRef.current = res.data.paginationInfo.hasNextPage;
    if (res.data) {
      setList((prev) => [...prev, ...res.data.exhibitionList.rows]);
      preventRef.current = true;
    } else {
      console.log(res);
    }
  }, []);

  const getItem = useCallback(async () => {
    setLoad(true);
    const res = await apis.get(`/exhibition?limit=1&offset=${page}`);
    endRef.current = res.data.paginationInfo.hasNextPage;
    if (res.data) {
      setList((prev) => [...prev, { ...res.data.exhibitionList.rows[0] }]);
      preventRef.current = true;
    } else {
      console.log(res);
    }
    setLoad(false);
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
                  <Div key={item.exhibitionId}>
                    <div>
                      제목{item.exhibitionTitle}아이디{item.exhibitionId}
                      <button
                        onClick={() => {
                          navigator(`/exhibition/detail/${item.exhibitionId}`);
                        }}
                      >
                        상세페이지이동
                      </button>
                    </div>
                  </Div>
                ))}
              </>
            )}
            {/* {load && <div ref={obsRef}>로딩 중</div>} */}
            <div ref={obsRef}>스피너</div>
          </div>
        </div>
      </Article>
    </>
  );
}

export default Exhibition;

const Div = styled.div`
  background-color: #a6d6a6;
  margin: 100px;
  font-size: 40px;
  height: 100px;
`;
