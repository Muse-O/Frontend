import * as EXPost from "../css/exhibitionCreateCss/EXFormPostCss";
import plus_white from "../../../assets/imgs/common/plus_white.png";
import NotificationEX from "./NotificationEX";
import { ExOnOffCode } from "../../../shared/EXCodes";
import { SubmitBtn } from "../../../components/Buttons";

export const EXFormPost = ({
  // Detaildata,
  // deleteHandler,
  changeOnOff,
  exhibitionKind,
  postfiles,
  getRootPropsPOST,
  getInputPropsPOST,
  deleteImgPOST,
}) => {
  return (
    <EXPost.PostWrap>
      <EXPost.Post>
        <EXPost.PageTitle>전시 등록</EXPost.PageTitle>
        <EXPost.SelectOnOff>
          <EXPost.Offline
            type="button"
            name="EK0001"
            onClick={changeOnOff}
            exhibitionKind={exhibitionKind}
          >
            {ExOnOffCode.EK0001}
          </EXPost.Offline>
          <EXPost.OnLine
            type="button"
            name="EK0002"
            onClick={changeOnOff}
            exhibitionKind={exhibitionKind}
          >
            {ExOnOffCode.EK0002}
          </EXPost.OnLine>
        </EXPost.SelectOnOff>
        {postfiles.length === 0 ? (
          <EXPost.PostImgArea {...getRootPropsPOST({ className: "dropzone" })}>
            <EXPost.Circle>
              <EXPost.DragIcon src={plus_white} />
            </EXPost.Circle>
            <input {...getInputPropsPOST()} />
          </EXPost.PostImgArea>
        ) : (
          postfiles.map((file, index) => (
            <EXPost.PreviewBox>
              <img key={file.name} src={file.preview} />
              <EXPost.PreviewBoxDelete
                type="button"
                onClick={() => deleteImgPOST(index)}
              >
                삭제
              </EXPost.PreviewBoxDelete>
            </EXPost.PreviewBox>
          ))
        )}
        {/* <EXPost.UpDateButtons>
          {Detaildata ? (
            <>
              <SubmitBtn type={"submit"}>전시수정하기</SubmitBtn>
              <SubmitBtn type={"button"} onClick={deleteHandler}>
                전시삭제하기
              </SubmitBtn>
            </>
          ) : (
            <SubmitBtn type={"submit"}>전시등록하기</SubmitBtn>
          )}
        </EXPost.UpDateButtons> */}
        <NotificationEX
          warning={"주의사항"}
          coment1={`되도록 큰 사이즈의 사진 파일 업로드 부탁드립니다!
`}
          coment2={`작으면 화질이 떨어져요ㅠㅡㅠ`}
        />
      </EXPost.Post>
    </EXPost.PostWrap>
  );
};
