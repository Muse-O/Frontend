import { useEffect } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  EXCities,
  EXSelectWhereStore,
} from "../../../../hooks/exhibition/EXStore/EXSelectTagsStore";
import { useGetSido } from "../../../../hooks/exhibition/useGetSido";

export const HeaderWheres = () => {
  //리코일 사용
  const [WhereStore, setWhereStore] = useRecoilState(EXSelectWhereStore);
  const Cities = useRecoilValue(EXCities);
  const [sido] = useGetSido();
  //데이터를 불러왔다면 그값을 사용해라
  useEffect(() => {
    if (sido) {
      setWhereStore((pre) => {
        return { ...pre, Cities: sido };
      });
    }
  }, [sido]);
  //지역선택
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
    //선택된 where을 전역스토어에 값을 저장
    setWhereStore((pre) => {
      return {
        ...pre,
        Cities: newCities,
      };
    });
  };
  //상세지역 선택
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
  //시군구를 필터링 된 값을 보여줌
  const filteredCities = Cities?.filter((city) => city.sidoChecked === true)[0];
  //지역 삭제
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

  return [
    Cities,
    filterRegion,
    filteredCities,
    selectDetailRegion,
    WhereStore,
    deleteRegion,
    setWhereStore,
    sido,
  ];
};
