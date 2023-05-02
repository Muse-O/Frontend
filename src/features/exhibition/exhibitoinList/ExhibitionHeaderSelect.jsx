import { useEffect, useState } from "react";
import styled from "styled-components";
import { EXListApplyBox } from "./EXListApplyBox";
import { useGetTop10Tags } from "../../../hooks/exhibition/useGetTop10Tags";
import {
  useGetSiGunGu,
  useGetSido,
} from "../../../hooks/exhibition/useGetSido";
import dayjs from "dayjs";
import next_cut_gray from '../../../assets/imgs/common/next_cut_gray.png'
import next_cut_white from '../../../assets/imgs/common/next_cut_white.png'
import refresh from '../../../assets/imgs/refresh.png'
import { useCalender } from "../../../hooks/exhibition/useCalender";

export const HeaderWhenSelect = ({whenVisible,setApplyWhen, setWhenVisible}) => {
  // setApplyWhenFn : 날짜를 클릭하면, 해당 날짜의 정보가 setApplyWhen에 설정되도록 했습니다.  
  const [inputValue, setInputValue] = useState('')
  const [prevArrow, setPrevarrowArrow] =useState(false)
  const [nextArrow, setNextarrowArrow] =useState(false)
  useEffect(()=> {
    if(inputValue) {
      setToday(dayjs(inputValue))
    }
  }, [inputValue])
  const {currentday, today, setToday, calendarLists, days, preMonth, nextMonth, presentMonth} = useCalender(whenVisible, setInputValue)
  const setApplyWhenFn = (date) => {
    setApplyWhen(date.format("YYYY-MM-DD"))
  }
  

  return (
  <>
    <CalendarLayout>
      <CalendarHeader>
        <h1 children={today.format('YYYY.MM')}/>
        <div className="settingbtn">
          <div className="button" 
            onClick={preMonth}  
            onMouseOver={()=>setPrevarrowArrow(pre=>!pre)} 
            onMouseOut={()=>setPrevarrowArrow(pre=>!pre)} 
            children={<img className="prevbtn" src={prevArrow ? next_cut_white : next_cut_gray} alt="화살표"/>}/>
          <div className="currentbtn" onClick={presentMonth} children="현재"/>
          <div className="button" 
            onClick={nextMonth}
            onMouseOver={()=>setNextarrowArrow(pre=>!pre)} 
            onMouseOut={()=>setNextarrowArrow(pre=>!pre)} 
            children={<img className="nextbtn" src={nextArrow ? next_cut_white : next_cut_gray} alt="화살표"/>}/>
        </div>
      </CalendarHeader>
      {/* 달력내용 */}
      <CalendarBody>
        {days.map(day => 
          day === "Sun" 
            ? <DayBox key={day} color="#F65959" children={day}/>
            : day === "Sat"
              ? <DayBox key={day} color="#3360FF" children={day}/>
              : <DayBox key={day} color="#242424" children={day}/>)}

        {calendarLists && calendarLists.map((date, index) => 
          date === null
            ? <DateBox key={index} />
            : date.format("YYYY-MM") != currentday
              ? <DateBox color="black" key={index} onClick={()=>setApplyWhenFn(date)} children={date.format("DD")}/>
              : date.format("YYYY-MM-DD") < today.format("YYYY-MM-DD")
                ? <DateBox color="gray" key={index} onClick={()=>setApplyWhenFn(date)} children={date.format("DD")}/>
                : date.format("YYYY-MM-DD") === today.format("YYYY-MM-DD")
                  ? <TodayBox color="white" key={index} onClick={()=>setApplyWhenFn(date)} children={date.format("DD")}/>
                  : <DateBox key={index} onClick={()=>setApplyWhenFn(date)} children={date.format("DD")}/>)}      
        </CalendarBody>
    </CalendarLayout>    
  {/* 하단 설정 버튼 */}
  <SettingWrap>
    <SettingBox onClick={()=>setApplyWhen("")} children={<>초기화 <img className="refreshbtn" src={refresh} alt="초기화"/></>}/>
    <SettingBox onClick={()=>setWhenVisible(pre=>!pre)} children="취소"/>
    <SettingBox children="적용하기"/>
  </SettingWrap>
  </>
  )
}



export const HeaderWhereSelect = ({ setApplyWhere, setWhereVisible }) => {
  const [sido] = useGetSido();
  const [cities, setCities] = useState();
  useEffect(() => {
    if (sido) {
      setCities(sido);
    }
  }, [sido]);
  const [selectRegion, setSelectRegion] = useState("");

  const filterRegion = (e) => {
    const { innerText } = e.target;
    const newCities = cities.map((city) => {
      if (city.sidoname === innerText) {
        return {
          ...city,
          sidoChecked: !city.sidoChecked,
        };
      } else {
        return {
          ...city,
          sidoChecked: false,
        };
      }
    });
    setCities(newCities);
  };
  const selectDetailRegion = (e) => {
    const { innerText } = e.target;
    const newCities = cities.map((city) => {
      return {
        ...city,
        sigungu: city.sigungu.map((sigungu) => {
          if (sigungu.siGunGuName === innerText) {
            return {
              ...sigungu,
              sigunguChecked: !sigungu.sigunguChecked,
            };
          } else {
            return {
              ...sigungu,
              sigunguChecked: false,
            };
          }
        }),
      };
    });
    setCities(newCities);
    setSelectRegion(innerText);
  };
  const filteredCities = cities?.filter((city) => city.sidoChecked === true)[0];
  const deleteRegion = (e) => {
    const newCities = cities.map((city) => {
      return {
        ...city,
        sigungu: city.sigungu.map((sigungu) => {
          return { ...sigungu, sigunguChecked: false };
        }),
      };
    });
    setCities(newCities);
    setSelectRegion("");
  };
  return (
    <WhereBox>
      <PositionBox>
        <LocalBox>
          <Local>지역</Local>
          <RegionBOX>
            {cities?.map((si) => {
              return (
                <RegionButton
                  type="button"
                  onClick={filterRegion}
                  checked={si.sidoChecked}
                >
                  <p>{si.sidoname}</p>
                </RegionButton>
              );
            })}
          </RegionBOX>
        </LocalBox>
        <LocalBox>
          <LocalBox>
            <Local>상세지역</Local>
            <RegionBOX>
              {filteredCities?.sigungu.map((city) => (
                <RegionButton
                  type="button"
                  key={city.siGunGuName}
                  onClick={selectDetailRegion}
                  checked={city.sigunguChecked}
                >
                  {city.siGunGuName}
                </RegionButton>
              ))}
            </RegionBOX>
          </LocalBox>
        </LocalBox>
      </PositionBox>
      <SelectRoginBox>
        {selectRegion && (
          <TagButton>
            <TagText>{selectRegion}</TagText>
            <XBox type="button" onClick={deleteRegion}>
              x
            </XBox>
          </TagButton>
        )}
      </SelectRoginBox>
      <EXListApplyBox
        selectRegion={selectRegion}
        setApplyWhere={setApplyWhere}
        setWhereVisible={setWhereVisible}
        sido={sido}
        setCities={setCities}
        setSelectRegion={setSelectRegion}
      />
    </WhereBox>
  );
};

export const HeaderCategorySelect = ({
  setApplyCategory,
  setCategoryVisible,
}) => {
  const [category, setCategroy] = useState("");
  const categoryHandelr = (e) => {
    const { name, value } = e.target;
    setCategroy(value);
    setCheckboxes((prevState) =>
      Object.keys(prevState).reduce((acc, curr) => {
        acc[curr] = curr === name ? true : false;
        return acc;
      }, {})
    );
  };
  const [checkboxes, setCheckboxes] = useState({
    WK0001: false,
    WK0002: false,
    WK0003: false,
    WK0004: false,
    WK0005: false,
    WK0006: false,
    WK0007: false,
    WK0008: false,
  });
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
            <Checkbox
              type="checkbox"
              name={"WK0001"}
              value={"WK0001"}
              checked={checkboxes.WK0001}
              onClick={categoryHandelr}
            />
            <p>아카이브</p>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <Checkbox
              type="checkbox"
              name={"WK0002"}
              value={"WK0002"}
              checked={checkboxes.WK0002}
              onClick={categoryHandelr}
            />
            <p>사진</p>
          </CheckBoxContainer>
        </CategoryBox>
        <CategoryBox>
          <CheckBoxContainer>
            <Checkbox
              type="checkbox"
              name={"WK0003"}
              value={"WK0003"}
              checked={checkboxes.WK0003}
              onClick={categoryHandelr}
            />
            <p>그림</p>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <Checkbox
              type="checkbox"
              name={"WK0004"}
              value={"WK0004"}
              checked={checkboxes.WK0004}
              onClick={categoryHandelr}
            />
            <p>일러스트</p>
          </CheckBoxContainer>
        </CategoryBox>
        <CategoryBox>
          <CheckBoxContainer>
            <Checkbox
              type="checkbox"
              name={"WK0005"}
              value={"WK0005"}
              checked={checkboxes.WK0005}
              onClick={categoryHandelr}
            />
            <p>미디어</p>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <Checkbox
              type="checkbox"
              name={"WK0006"}
              value={"WK0006"}
              checked={checkboxes.WK0006}
              onClick={categoryHandelr}
            />
            <p>공예</p>
          </CheckBoxContainer>
        </CategoryBox>
        <CategoryBox>
          <CheckBoxContainer>
            <Checkbox
              type="checkbox"
              name={"WK0007"}
              value={"WK0007"}
              checked={checkboxes.WK0007}
              onClick={categoryHandelr}
            />
            <p>설치</p>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <Checkbox
              type="checkbox"
              name={"WK0008"}
              value={"WK0008"}
              checked={checkboxes.WK0008}
              onClick={categoryHandelr}
            />
            <p>조각</p>
          </CheckBoxContainer>
        </CategoryBox>
      </CategoryContainer>
      <EXListApplyBox
        category={category}
        setCategroy={setCategroy}
        setCategoryVisible={setCategoryVisible}
        setCheckboxes={setCheckboxes}
        setApplyCategory={setApplyCategory}
      />
    </CartegoryBox>
  );
};

export const HeaderTagSelect = ({ setApplyHashTag, setTagVisible }) => {
  //top10tag들
  const [top10TagsData] = useGetTop10Tags();
  const [top10TagLists, setTop10TagLists] = useState([]);
  const [selectTags, setSelectTags] = useState([]);
  useEffect(() => {
    if (top10TagsData) {
      const updatedTo10TAGS = top10TagsData.map((tag) => {
        return { tagName: tag.tagName, checked: false };
      });
      setTop10TagLists(updatedTo10TAGS);
    }
  }, [top10TagsData]);

  //이거 where카테고리랑 같이쓰임 나중에 리팩토링시 분리 필요
  const filterTags = (e) => {
    const { innerText } = e.target;

    setSelectTags((pre) => {
      if (pre[0] === innerText) {
        return [];
      } else {
        return [innerText];
      }
    });

    setTop10TagLists((prevTags) =>
      prevTags.map((tag) => {
        if (tag.tagName === innerText) {
          return { ...tag, checked: !tag.checked };
        } else {
          return { ...tag, checked: false };
        }
      })
    );
  };
  const deleteTags = (e) => {
    const name = e.currentTarget.getAttribute("name");
    setSelectTags((pre) => {
      const filteredArray = pre.filter((region) => region !== name);
      return filteredArray;
    });
    setTop10TagLists((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.tagName === name) {
          return { ...tag, checked: false };
        } else {
          return { ...tag };
        }
      });
    });
  };

  return (
    <TagContainer>
      <TagBox>
        <input placeholder="태그 검색" />
        <div>
          <TagRecomendTitle>인기태그 추천</TagRecomendTitle>
        </div>
        <RecomendTagContainer>
          {top10TagLists?.map((tag) => {
            return (
              <RecomendTag
                key={tag.tagName}
                onClick={filterTags}
                checked={tag.checked}
              >
                {tag.tagName}
              </RecomendTag>
            );
          })}
        </RecomendTagContainer>
        <SelectTagContainer>
          {selectTags.map((tag) => {
            return (
              <TagButton>
                <TagText>{tag}</TagText>
                <XBox onClick={deleteTags} name={tag}>
                  x
                </XBox>
              </TagButton>
            );
          })}
        </SelectTagContainer>
      </TagBox>
      <EXListApplyBox
        setApplyHashTag={setApplyHashTag}
        selectTags={selectTags}
        setTagVisible={setTagVisible}
        setSelectTags={setSelectTags}
        setTop10TagLists={setTop10TagLists}
        top10TagsData={top10TagsData}
      />
    </TagContainer>
  );
};

const RecomendTag = styled.div`
  box-sizing: border-box;
  min-width: 67px;
  height: 33px;
  background: ${(props) => (props.checked ? "#242424" : "#ffffff")};
  color: ${(props) => props.checked && "#ffffff"};
  border: 1px solid #5a5a5a;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: #242424;
    color: #ffffff;
  }
  padding: 0px 5px;
  cursor: pointer;
`;
const TagRecomendTitle = styled.p`
  font-size: 12px;
`;
const TagBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 28px 24px 0px 24px;
`;
const RecomendTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 536px;
  min-height: 66px;
  gap: 12px;
  align-content: flex-start;
`;
const SelectTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  background-color: #f7f7f9;
  border: 1px solid #dddddd;
  width: 536px;
  min-height: 149px;
  margin-bottom: 24px;
`;
const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 584px;
`;
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
  cursor: pointer;
`;

const CartegoryBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 255px;
`;
const TagButton = styled.div`
  display: flex;
  margin: 2px;
  padding: 0px 10px;
  align-items: center;
  background: #242424;
  border-radius: 50px;
  min-width: 85px;
  height: 33px;
  gap: 8px;
`;

const TagText = styled.div`
  flex-grow: 3;
  padding-left: 10px;
  color: #fff; /* 텍스트 색상 설정 */
`;

const XBox = styled.div`
  margin-right: 2px;
  flex-grow: 1;
  width: 10px;
  height: 10px;
  color: #fff;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  font-size: 18px;
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
const RegionButton = styled.button`
  height: 25px;
  padding: 8px 0px;
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
  }
  background-color: ${({ checked }) => (checked ? "#3c3c3c" : "transparent")};
  color: ${({ checked }) => (checked ? "white" : "#000000")};
  :hover {
    background-color: #3c3c3c;
    color: white;
  }
`;
const RegionBOX = styled.div`
  border: 1px solid #cccccc;
  height: 220px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  cursor: pointer;
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


// Calender 관련 CSS in JS
const CalendarLayout = styled.div`
  width: 462px;
  min-height: 544px;
  padding: 32px;
`
const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: 297px 1fr;
  align-items: center;
  h1 {
    color: #171717;
    font-size: 20px;
    font-family: 'Montserrat';
  }
  .settingbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    .button {
      width:24px;
      height:24px;
      background-color:#EEEEEE;
      border-radius:50px;
      display:flex;
      justify-content:center;
      align-items:center;
      
      &:hover {
        cursor:pointer;
        background-color: #3C3C3C;
      }
    }
    .currentbtn {
      width:39px;
      line-height:22px;
      border-radius:50px;
      border:1px solid #5A5A5A;
      text-align:center;
      cursor:pointer;
      padding:0;
    }
    .prevbtn {
      transform: rotate(-180deg);
      width:7px;
      display:block;
    }
    .nextbtn {
      width:7px;
      display:block;
    }
  }
`

const CalendarBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap:  45px;
  column-gap: 35px;
  max-width:  398px;
  min-width:  398px;
  max-height:  16px;
  min-height:  16px;
  margin-top: 40px;
  font-family:  Montserrat;
  font-size: 13px;
  text-align: center;
`

const DayBox = styled.div`
  color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;

`

const DateBox = styled.div`
  color: ${props => props.color};
  width: 25px;
  line-height: 25px;
  font-size:  16px;
  &:hover {
    cursor: pointer;
  }
`

const TodayBox = styled(DateBox)`
  background-color:black;
  border-radius:50px;
`

const SettingWrap = styled.div`
  height: 47px;
  padding: 0 24px;
  border: 1px solid #EEEEEE;
  display: grid;
  grid-template-columns:320px 39px 53px;
  gap:2;
  align-items:center;
`

const SettingBox = styled.div`
  font-size: 12px;
  line-height: 15px;
  color: #3C3C3C;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  .refreshbtn {
    height:15px; 
    margin-left:2px;
  }
  
`
