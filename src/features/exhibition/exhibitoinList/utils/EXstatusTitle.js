export const ExSatus = ({ info }) => {
  return (
    <>
      {info.exhibitionStatus === "전시 진행"
        ? "Now On View"
        : info.exhibitionStatus === "전시 예정"
        ? "Coming Soon"
        : info.exhibitionStatus === "전시 종료"
        ? "Exhibition is over"
        : ""}
    </>
  );
};
