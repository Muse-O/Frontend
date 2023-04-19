import { useState } from "react";
import styled from "styled-components";
import { EXListApplyBox } from "./EXListApplyBox";

export const HeaderWhereSelect = () => {
  const cities = [
    {
      province: "서울특별시",
      regions: [
        "종로구",
        "중구",
        "용산구",
        "성동구",
        "광진구",
        "동대문구",
        "중랑구",
        "성북구",
        "강북구",
        "도봉구",
        "노원구",
        "은평구",
        "서대문구",
        "마포구",
        "양천구",
        "강서구",
        "구로구",
        "금천구",
        "영등포구",
        "동작구",
        "관악구",
        "서초구",
        "강남구",
        "송파구",
        "강동구",
      ],
    },
    {
      province: "부산광역시",
      regions: [
        "중구",
        "서구",
        "동구",
        "영도구",
        "부산진구",
        "동래구",
        "남구",
        "북구",
        "해운대구",
        "사하구",
        "금정구",
        "강서구",
        "연제구",
        "수영구",
        "사상구",
        "기장군",
      ],
    },
    {
      province: "대구광역시",
      regions: [
        "중구",
        "동구",
        "서구",
        "남구",
        "북구",
        "수성구",
        "달서구",
        "달성군",
      ],
    },
    {
      province: "인천광역시",
      regions: [
        "중구",
        "동구",
        "미추홀구",
        "연수구",
        "남동구",
        "부평구",
        "계양구",
        "서구",
        "강화군",
        "옹진군",
      ],
    },
    {
      province: "광주광역시",
      regions: ["동구", "서구", "남구", "북구", "광산구"],
    },
    {
      province: "대전광역시",
      regions: ["동구", "중구", "서구", "유성구", "대덕구"],
    },
    {
      province: "울산광역시",
      regions: ["중구", "남구", "동구", "북구"],
    },
    // 추가적인 광역시나 도를 여기에 추가할 수 있습니다.
  ];
  const [selectRegion, setSelectRegion] = useState(["서울시"]);

  const filterRegion = (e) => {
    const { innerText } = e.target;
    setSelectRegion((pre) => {
      return [...pre, innerText];
    });
  };
  const deleteRegion = (e) => {
    const { name } = e.currentTarget;
    setSelectRegion((pre) => {
      const filteredArray = pre.filter((region) => region !== name);
      return filteredArray;
    });
  };
  return (
    <WhereBox>
      <PositionBox>
        <LocalBox>
          <Local>지역</Local>
          <RegionBOX>
            {cities.map((si) => {
              return <Region onClick={filterRegion}>{si.province}</Region>;
            })}
          </RegionBOX>
        </LocalBox>
        <LocalBox>
          <LocalBox>
            <Local>상세지역</Local>
            <RegionBOX>
              {cities.map((si) => {
                return si.regions.map((region) => {
                  return <Region>{region}</Region>;
                });
              })}
            </RegionBOX>
          </LocalBox>
        </LocalBox>
      </PositionBox>
      <SelectRoginBox>
        {selectRegion.map((item) => {
          return (
            <RegionContainer>
              <RegionTextBox>{item}</RegionTextBox>
              <XBox onClick={deleteRegion} name={item}>
                x
              </XBox>
            </RegionContainer>
          );
        })}
      </SelectRoginBox>
      <EXListApplyBox />
    </WhereBox>
  );
};

export const HeaderCategorySelect = () => {
  return (
    <CartegoryBox>
      <PositionBox>
        <CheckBoxContainer>
          <Checkbox type="checkbox" />
          <p>오프라인</p>
        </CheckBoxContainer>
        <CheckBoxContainer>
          <Checkbox type="checkbox" />
          <p>온라인</p>
        </CheckBoxContainer>
      </PositionBox>
      <CategoryContainer>
        <CategoryBox>
          <CheckBoxContainer>
            <Checkbox type="checkbox" />
            <p>아카이브</p>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <Checkbox type="checkbox" />
            <p>사진</p>
          </CheckBoxContainer>
        </CategoryBox>
        <CategoryBox>
          <CheckBoxContainer>
            <Checkbox type="checkbox" />
            <p>그림</p>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <Checkbox type="checkbox" />
            <p>일러스트</p>
          </CheckBoxContainer>
        </CategoryBox>
        <CategoryBox>
          <CheckBoxContainer>
            <Checkbox type="checkbox" />
            <p>미디어</p>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <Checkbox type="checkbox" />
            <p>공예</p>
          </CheckBoxContainer>
        </CategoryBox>
        <CategoryBox>
          <CheckBoxContainer>
            <Checkbox type="checkbox" />
            <p>설치</p>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <Checkbox type="checkbox" />
            <p>조각</p>
          </CheckBoxContainer>
        </CategoryBox>
      </CategoryContainer>

      <EXListApplyBox />
    </CartegoryBox>
  );
};

export const HeaderTagSelect = () => {
  return <div>진행중</div>;
};

const CategoryBox = styled.div`
  display: flex;
`;
const CategoryContainer = styled.div`
  border-top: 1px solid #cccccc;
  padding: 24px 24px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const CartegoryBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 255px;
`;
const RegionContainer = styled.div`
  display: flex;
  margin: 2px;
  align-items: center;
  background: #242424;
  border-radius: 50px;
  width: 85px;
  height: 33px;
`;

const RegionTextBox = styled.div`
  flex-grow: 3;
  padding-left: 10px;
  color: #fff; /* 텍스트 색상 설정 */
`;

const XBox = styled.button`
  margin-right: 2px;
  flex-grow: 1;
  width: 10px;
  height: 10px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
`;
const SelectRoginBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 24px;
  padding: 16px;
  background-color: #dddddd;
  min-height: 113px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
    background-color: none; /* 스크롤바의 배경색 */
  }
  ::-webkit-scrollbar-thumb {
    background-color: #9c9c9c; /* 스크롤바의 색상 */
    border-radius: 8px; /* 스크롤바의 둥근 모서리 반지름 */
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #555555; /* 스크롤바에 호버(Hover) 시 색상 */
  }
`;
const Region = styled.p`
  height: 25px;
  padding: 8px 0px 8px 16px;
  :hover {
    background-color: #3c3c3c;
    color: white;
  }
`;
const RegionBOX = styled.div`
  border: 1px solid #cccccc;
  height: 220px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
    background-color: none; /* 스크롤바의 배경색 */
  }
  ::-webkit-scrollbar-thumb {
    background-color: #cccccc; /* 스크롤바의 색상 */
    border-radius: 8px; /* 스크롤바의 둥근 모서리 반지름 */
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #555555; /* 스크롤바에 호버(Hover) 시 색상 */
  }
`;

const Local = styled.p`
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 15px;
`;
const LocalBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PositionBox = styled.div`
  display: flex;
  margin: 24px 25px 0px 25px;
`;
const WhereBox = styled.div`
  display: flex;
  width: 500px;
  height: 483px;
  flex-direction: column;
`;

// export const HeaderWhenSelect =()=>{

//   return

// }
