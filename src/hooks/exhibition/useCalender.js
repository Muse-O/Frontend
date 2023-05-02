import dayjs from "dayjs";
import 'dayjs/locale/ko'
import { useEffect, useState } from "react";
dayjs.locale('ko')

export const useCalender = (whenVisible, setInputValue) => {
  const currentday = dayjs().format("YYYY-MM")
  const [today, setToday] = useState(dayjs())
  const daysInMonth = today.daysInMonth();
  const firstDayOfMonth = dayjs(today).startOf('month').locale('ko'); // 해당 달의 철날에 대한 정보가 감겨있다.
  const emptyDates = new Array(firstDayOfMonth.day()).fill(null);
  const dates = Array.from({length:daysInMonth}, (_, index) =>
  dayjs(firstDayOfMonth).add(index, 'day'));
  const calendarLists = [...emptyDates, ...dates]
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

  useEffect(()=> {
    setToday(dayjs())
  }, [whenVisible])
  
  const preMonth = () => {
    setToday(dayjs(today).subtract(1,"month"))
    setInputValue('')
  }
  const nextMonth = () => {
    setToday(dayjs(today).add(1,"month"))
    setInputValue('')
  }

  const presentMonth = () => {
    setToday(dayjs())
    setInputValue('')
  }

  return {currentday, today, setToday, calendarLists, days, preMonth, nextMonth, presentMonth}
}