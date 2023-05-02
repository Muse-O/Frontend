import { useRecoilState, useRecoilValue } from "recoil";
import {
  EXCities,
  EXSelectWhereStore,
} from "../../../hooks/exhibition/EXStore/EXSelectTagsStore";
import { useGetSido } from "../../../hooks/exhibition/useGetSido";
import { useEffect } from "react";
import { EXListApplyBox } from "./EXListApplyBox";
import * as EXWhere from "./css/exhibitionHeaderCss/EXWhereCss";
import { PositionBox } from "./css/exhibitionHeaderCss/EXCategoryCss";
export const HeaderWhereSelect = ({ setSelectedFilter }) => {
  const [WhereStore, setWhereStore] = useRecoilState(EXSelectWhereStore);
  const Cities = useRecoilValue(EXCities);
  const [sido] = useGetSido();

  useEffect(() => {
    if (sido) {
      setWhereStore((pre) => {
        return { ...pre, Cities: sido };
      });
    }
  }, [sido]);

  const filterRegion = (e) => {
    const { innerText } = e.target;
    const newCities = Cities.map((city) => {
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

    setWhereStore((pre) => {
      return {
        ...pre,
        Cities: newCities,
      };
    });
  };
  const selectDetailRegion = (e) => {
    const { innerText } = e.target;
    const newCities = Cities.map((city) => {
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
    setWhereStore((pre) => {
      return {
        ...pre,
        SelectRegion: innerText,
        Cities: newCities,
      };
    });
  };
  const filteredCities = Cities?.filter((city) => city.sidoChecked === true)[0];
  const deleteRegion = (e) => {
    const newCities = Cities.map((city) => {
      return {
        ...city,
        sigungu: city.sigungu.map((sigungu) => {
          return { ...sigungu, sigunguChecked: false };
        }),
      };
    });
    setWhereStore((pre) => {
      return {
        ...pre,
        SelectRegion: "",
        Cities: newCities,
      };
    });
  };
  return (
    <EXWhere.WhereBox>
      <PositionBox>
        <EXWhere.LocalBox>
          <EXWhere.Local>지역</EXWhere.Local>
          <EXWhere.RegionBOX>
            {Cities?.map((si) => {
              return (
                <EXWhere.RegionButton
                  type="button"
                  onClick={filterRegion}
                  checked={si.sidoChecked}
                >
                  <p>{si.sidoname}</p>
                </EXWhere.RegionButton>
              );
            })}
          </EXWhere.RegionBOX>
        </EXWhere.LocalBox>
        <EXWhere.LocalBox>
          <EXWhere.LocalBox>
            <EXWhere.Local>상세지역</EXWhere.Local>
            <EXWhere.RegionBOX>
              {filteredCities?.sigungu.map((city) => (
                <EXWhere.RegionButton
                  type="button"
                  key={city.siGunGuName}
                  onClick={selectDetailRegion}
                  checked={city.sigunguChecked}
                >
                  <p>{city.siGunGuName}</p>
                </EXWhere.RegionButton>
              ))}
            </EXWhere.RegionBOX>
          </EXWhere.LocalBox>
        </EXWhere.LocalBox>
      </PositionBox>
      <EXWhere.SelectRoginBox>
        {WhereStore?.SelectRegion && (
          <EXWhere.TagButton>
            <EXWhere.TagText>{WhereStore.SelectRegion}</EXWhere.TagText>
            <EXWhere.XBox type="button" onClick={deleteRegion}>
              x
            </EXWhere.XBox>
          </EXWhere.TagButton>
        )}
      </EXWhere.SelectRoginBox>
      <EXListApplyBox
        classification={"Where"}
        // SelectRegion={SelectRegion}
        setSelectedFilter={setSelectedFilter}
        setWhereStore={setWhereStore}
        sido={sido}
      />
    </EXWhere.WhereBox>
  );
};
