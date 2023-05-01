import { useEffect, useState } from "react";
import styled from "styled-components";
import { EXListApplyBox } from "./EXListApplyBox";
import { useGetTop10Tags } from "../../../hooks/exhibition/useGetTop10Tags";
import { useGetSido } from "../../../hooks/exhibition/useGetSido";
import { ExCategoryCode, ExOnOffCode } from "../../../shared/EXCodes";
import { useRecoilState, useRecoilValue } from "recoil";
import { EXApplyTagsStore } from "../../../hooks/exhibition/EXStore/EXApplyTagsStore";
import {
  EXCategoryStoreCheckBox,
  EXSelectCategoryStore,
  EXSelectWhereStore,
} from "../../../hooks/exhibition/EXStore/EXSelectTagsStore";
export const HeaderWhereSelect = ({ setSelectedFilter }) => {
  const [whereStore, setWhereStore] = useRecoilState(EXSelectWhereStore);
  console.log("whereSotre", whereStore);
  const [sido] = useGetSido();
  const [cities, setCities] = useState();
  useEffect(() => {
    if (sido) {
      setCities(sido);
      setWhereStore((pre) => {
        return {
          ...pre,
          Cities: sido,
        };
      });
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
        setSelectedFilter={setSelectedFilter}
        sido={sido}
        setCities={setCities}
        setSelectRegion={setSelectRegion}
      />
    </WhereBox>
  );
};

export const HeaderCategorySelect = ({ setSelectedFilter }) => {
  const [categoryStore, setCategoryStore] = useRecoilState(
    EXSelectCategoryStore
  );
  const checkboxes = useRecoilValue(EXCategoryStoreCheckBox);
  const categoryHandler = (e) => {
    const { name, value } = e.target;
    setCategoryStore({
      Category: value,
      Checkbox: Object.keys(categoryStore.Checkbox).reduce((acc, curr) => {
        acc[curr] = curr === name;
        return acc;
      }, {}),
    });
  };

  return (
    <CartegoryBox>
      <PositionBox>
        <CheckBoxContainer>
          <Checkbox type="checkbox" />
          <p>{ExOnOffCode.EK0001}</p>
        </CheckBoxContainer>
        <CheckBoxContainer>
          <Checkbox type="checkbox" />
          <p>{ExOnOffCode.EK0002}</p>
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
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0001}</p>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <Checkbox
              type="checkbox"
              name={"WK0002"}
              value={"WK0002"}
              checked={checkboxes.WK0002}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0002}</p>
          </CheckBoxContainer>
        </CategoryBox>
        <CategoryBox>
          <CheckBoxContainer>
            <Checkbox
              type="checkbox"
              name={"WK0003"}
              value={"WK0003"}
              checked={checkboxes.WK0003}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0003}</p>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <Checkbox
              type="checkbox"
              name={"WK0004"}
              value={"WK0004"}
              checked={checkboxes.WK0004}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0004}</p>
          </CheckBoxContainer>
        </CategoryBox>
        <CategoryBox>
          <CheckBoxContainer>
            <Checkbox
              type="checkbox"
              name={"WK0005"}
              value={"WK0005"}
              checked={checkboxes.WK0005}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0005}</p>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <Checkbox
              type="checkbox"
              name={"WK0006"}
              value={"WK0006"}
              checked={checkboxes.WK0006}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0006}</p>
          </CheckBoxContainer>
        </CategoryBox>
        <CategoryBox>
          <CheckBoxContainer>
            <Checkbox
              type="checkbox"
              name={"WK0007"}
              value={"WK0007"}
              checked={checkboxes.WK0007}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0007}</p>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <Checkbox
              type="checkbox"
              name={"WK0008"}
              value={"WK0008"}
              checked={checkboxes.WK0008}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0008}</p>
          </CheckBoxContainer>
        </CategoryBox>
      </CategoryContainer>
      <EXListApplyBox
        classification={"Category"}
        // category={category}
        // setCategroy={setCategroy}
        setSelectedFilter={setSelectedFilter}
        // setCheckboxes={setCheckboxes}
      />
    </CartegoryBox>
  );
};

export const HeaderTagSelect = ({ setSelectedFilter }) => {
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
        selectTags={selectTags}
        setSelectedFilter={setSelectedFilter}
        setSelectTags={setSelectTags}
        setTop10TagLists={setTop10TagLists}
        top10TagsData={top10TagsData}
      />
    </TagContainer>
  );
};

export const HeaderSearch = () => {
  const [applyTags, setApplyTags] = useRecoilState(EXApplyTagsStore);
  const [Search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  const onSearchHandler = () => {
    setApplyTags((pre) => {
      return {
        ...pre,
        Search: Search,
      };
    });
    setSearch("");
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchHandler();
    }
  };
  return (
    <>
      <FilterInputWrap>
        <FilterSearch
          placeholder={applyTags.Search || "제목 검색"}
          value={Search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
        />
        <FilterButton onClick={onSearchHandler}>검색하기</FilterButton>
      </FilterInputWrap>
    </>
  );
};

const FilterInputWrap = styled.div`
  flex: 1;
  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 4px;
  margin-left: 24px;
  position: relative;
`;

const FilterSearch = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 12px;
  border-radius: 4px;
`;

const FilterButton = styled.button`
  height: 100%;
  background: transparent;
  font-size: 17px;
  font-weight: bold;
  padding: 0 12px;
  position: absolute;
  right: 0;
  :hover {
    cursor: pointer;
  }
`;

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
