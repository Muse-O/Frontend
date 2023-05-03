import styled from "styled-components";
import { ExhibitioninfoP } from "../css/ReviewsDetail";

export const ContentsImgs = ({ info }) => {
  return (
    <>
      {info.ExhibitionImgs.length !== 0 && (
        <>
          <ExhibitioninfoP>작품 사진</ExhibitioninfoP>
          <ThumbsContainer>
            {info.ExhibitionImgs?.map((file) => (
              <div>
                <Thumb key={file.imgUrl}>
                  <ThumbInner>
                    <Thumbimg src={file.imgUrl} />
                  </ThumbInner>
                </Thumb>
              </div>
            ))}
          </ThumbsContainer>
        </>
      )}
    </>
  );
};

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2;
  border: 4px solid #eaeaea;
  gap: 8px;
  width: 168px;
  height: 168px;
  box-sizing: border-box;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const Thumbimg = styled.img`
  display: block;
  width: auto;
  height: 100%;
`;

const ThumbsContainer = styled.aside`
  width: 823px;
  display: flex;
  margin-top: 16;
  gap: 13px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #3360ff 0%, #b960ff 100%);
  }
`;
