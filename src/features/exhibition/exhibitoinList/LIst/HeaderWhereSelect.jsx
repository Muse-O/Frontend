import { EXListApplyBox } from "./EXListApplyBox";
import * as EW from "../css/exhibitionHeaderCss/EXWhereCss";
import { PositionBox } from "../css/exhibitionHeaderCss/EXCategoryCss";
import { HeaderWheres } from "./utils/HeaderWheres";
export const HeaderWhereSelect = ({ setSelectedFilter }) => {
  //전역 wherestore값, store 변경하는 함수, 지역 삭제 함수, 불러온sido함수
  const [
    Cities,
    filterRegion,
    filteredCities,
    selectDetailRegion,
    WhereStore,
    deleteRegion,
    setWhereStore,
    sido,
  ] = HeaderWheres();
  return (
    <EW.WhereBox>
      <PositionBox>
        <EW.LocalBox>
          <EW.Local>지역</EW.Local>
          <EW.RegionBOX>
            {Cities?.map((si) => {
              return (
                <EW.RegionButton
                  type="button"
                  onClick={filterRegion}
                  checked={si.sidoChecked}
                >
                  <p>{si.sidoname}</p>
                </EW.RegionButton>
              );
            })}
          </EW.RegionBOX>
        </EW.LocalBox>
        <EW.LocalBox>
          <EW.LocalBox>
            <EW.Local>상세지역</EW.Local>
            <EW.RegionBOX>
              {filteredCities?.sigungu.map((city) => (
                <EW.RegionButton
                  type="button"
                  key={city.siGunGuName}
                  onClick={selectDetailRegion}
                  checked={city.sigunguChecked}
                >
                  <p>{city.siGunGuName}</p>
                </EW.RegionButton>
              ))}
            </EW.RegionBOX>
          </EW.LocalBox>
        </EW.LocalBox>
      </PositionBox>
      <EW.SelectRoginBox>
        {WhereStore?.SelectRegion && (
          <EW.TagButton>
            <EW.TagText>{WhereStore.SelectRegion}</EW.TagText>
            <EW.XBox type="button" onClick={deleteRegion}>
              x
            </EW.XBox>
          </EW.TagButton>
        )}
      </EW.SelectRoginBox>
      <EXListApplyBox
        classification={"Where"}
        setSelectedFilter={setSelectedFilter}
        setWhereStore={setWhereStore}
        sido={sido}
      />
    </EW.WhereBox>
  );
};
