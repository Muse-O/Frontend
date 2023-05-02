import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";
import next_cut_gray from "../../../assets/imgs/common/next_cut_gray.png";
import next_cut_white from "../../../assets/imgs/common/next_cut_white.png";
import refresh from "../../../assets/imgs/refresh.png";
import { useCalender } from "../../../hooks/exhibition/useCalender";
export const HeaderWhenSelect = ({
  whenVisible,
  setApplyWhen,
  setWhenVisible,
}) => {
  // setApplyWhenFn : 날짜를 클릭하면, 해당 날짜의 정보가 setApplyWhen에 설정되도록 했습니다.
  const [inputValue, setInputValue] = useState("");
  const [prevArrow, setPrevarrowArrow] = useState(false);
  const [nextArrow, setNextarrowArrow] = useState(false);
  useEffect(() => {
    if (inputValue) {
      setToday(dayjs(inputValue));
    }
  }, [inputValue]);

  const {
    currentday,
    today,
    setToday,
    calendarLists,
    days,
    preMonth,
    nextMonth,
    presentMonth,
  } = useCalender(whenVisible, setInputValue);

  const setApplyWhenFn = (date) => {
    // setApplyWhen(date.format("YYYY-MM-DD"));
    alert("준비중 입니다! 불편을 드려 죄송합니다.");
  };

  return (
    <>
      <CalendarLayout>
        <CalendarHeader>
          <h1 children={today.format("YYYY.MM")} />
          <div className="settingbtn">
            <div
              className="button"
              onClick={preMonth}
              onMouseOver={() => setPrevarrowArrow((pre) => !pre)}
              onMouseOut={() => setPrevarrowArrow((pre) => !pre)}
              children={
                <img
                  className="prevbtn"
                  src={prevArrow ? next_cut_white : next_cut_gray}
                  alt="화살표"
                />
              }
            />
            <div
              className="currentbtn"
              onClick={presentMonth}
              children="현재"
            />
            <div
              className="button"
              onClick={nextMonth}
              onMouseOver={() => setNextarrowArrow((pre) => !pre)}
              onMouseOut={() => setNextarrowArrow((pre) => !pre)}
              children={
                <img
                  className="nextbtn"
                  src={nextArrow ? next_cut_white : next_cut_gray}
                  alt="화살표"
                />
              }
            />
          </div>
        </CalendarHeader>
        {/* 달력내용 */}
        <CalendarBody>
          {days.map((day) =>
            day === "Sun" ? (
              <DayBox key={day} color="#F65959" children={day} />
            ) : day === "Sat" ? (
              <DayBox key={day} color="#3360FF" children={day} />
            ) : (
              <DayBox key={day} color="#242424" children={day} />
            )
          )}

          {calendarLists &&
            calendarLists.map((date, index) =>
              date === null ? (
                <DateBox key={index} />
              ) : date.format("YYYY-MM") != currentday ? (
                <DateBox
                  color="black"
                  key={index}
                  onClick={() => setApplyWhenFn(date)}
                  children={date.format("DD")}
                />
              ) : date.format("YYYY-MM-DD") < today.format("YYYY-MM-DD") ? (
                <DateBox
                  color="gray"
                  key={index}
                  onClick={() => setApplyWhenFn(date)}
                  children={date.format("DD")}
                />
              ) : date.format("YYYY-MM-DD") === today.format("YYYY-MM-DD") ? (
                <TodayBox
                  color="white"
                  key={index}
                  onClick={() => setApplyWhenFn(date)}
                  children={date.format("DD")}
                />
              ) : (
                <DateBox
                  key={index}
                  onClick={() => setApplyWhenFn(date)}
                  children={date.format("DD")}
                />
              )
            )}
        </CalendarBody>
      </CalendarLayout>
      {/* 하단 설정 버튼 */}
      <SettingWrap>
        <SettingBox
          onClick={() => setApplyWhen("")}
          children={
            <>
              초기화 <img className="refreshbtn" src={refresh} alt="초기화" />
            </>
          }
        />
        <SettingBox
          onClick={() => setWhenVisible((pre) => !pre)}
          children="취소"
        />
        <SettingBox children="적용하기" />
      </SettingWrap>
    </>
  );
};
const CalendarLayout = styled.div`
  width: 462px;
  min-height: 544px;
  padding: 32px;
`;
const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: 297px 1fr;
  align-items: center;
  h1 {
    color: #171717;
    font-size: 20px;
    font-family: "Montserrat";
  }
  .settingbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    .button {
      width: 24px;
      height: 24px;
      background-color: #eeeeee;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        cursor: pointer;
        background-color: #3c3c3c;
      }
    }
    .currentbtn {
      width: 39px;
      line-height: 22px;
      border-radius: 50px;
      border: 1px solid #5a5a5a;
      text-align: center;
      cursor: pointer;
      padding: 0;
    }
    .prevbtn {
      transform: rotate(-180deg);
      width: 7px;
      display: block;
    }
    .nextbtn {
      width: 7px;
      display: block;
    }
  }
`;

const CalendarBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 45px;
  column-gap: 35px;
  max-width: 398px;
  min-width: 398px;
  max-height: 16px;
  min-height: 16px;
  margin-top: 40px;
  font-family: Montserrat;
  font-size: 13px;
  text-align: center;
`;

const DayBox = styled.div`
  color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
`;

const DateBox = styled.div`
  color: ${(props) => props.color};
  width: 25px;
  line-height: 25px;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
`;

const TodayBox = styled(DateBox)`
  background-color: black;
  border-radius: 50px;
`;

const SettingWrap = styled.div`
  height: 47px;
  padding: 0 24px;
  border: 1px solid #eeeeee;
  display: grid;
  grid-template-columns: 320px 39px 53px;
  gap: 2;
  align-items: center;
`;

const SettingBox = styled.div`
  font-size: 12px;
  line-height: 15px;
  color: #3c3c3c;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  .refreshbtn {
    height: 15px;
    margin-left: 2px;
  }
`;
