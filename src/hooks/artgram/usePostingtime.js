import dayjs from "dayjs";

export const usePostingtime = (allArtgramList) => {
  const dayjsDate = dayjs();
  const currentDate = dayjsDate.format().split("T")[0];
  const currentTime = dayjsDate
    .format()
    .split("T")[1]
    .split(".")[0]
    .split("+")[0];
  const createDate = allArtgramList.createdAt.split("T")[0];
  const createTime = allArtgramList.createdAt.split("T")[1].split(".")[0]; // 2023-04-05
  const gaphour = `${dayjs(`${currentDate} ${currentTime}`).diff(
    dayjs(`${createDate} ${createTime}`),
    "hour"
  )}`;
  let postingTime;
  if (gaphour < 24) {
    postingTime = gaphour + "시간 전";
  } else if (gaphour < 720) {
    postingTime = Math.ceil(gaphour / 24) + "일 전";
  } else if (gaphour < 8736) {
    postingTime = Math.ceil(gaphour / 720) + "개월 전";
  } else if (gaphour <= 8736) {
    postingTime = Math.ceil(gaphour / 8736) + "년 전";
  }
  return [postingTime];
};
