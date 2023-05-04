import React from "react";
// import CSS --------------------------------------------------------------------------------------------/
import * as Main from "../css/mainparts";
// import Library-----------------------------------------------------------------------------------------/
import { useNavigate } from "react-router-dom";
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useEditTime } from "../../../hooks/main/useEditTime";


const FirstMainSlider = ({personalEx}) => {
  const navigate = useNavigate();
  const { editTimehandle } = useEditTime();
  return (<>
     <Main.FirstMainSliderTitle 
        children={(
          <>
          <div className="titleNum"
            children={personalEx?.index < 9
              ? `0${personalEx?.index}.`
              : `${personalEx?.index}.`}/>
          <div className="title" children={personalEx.exhibitionTitle}/>
        </>
        )}/>
        <Main.FirstMainSliderImg src={personalEx.postImage}/>
        <Main.FirstMainSliderDesc children={personalEx.exhibitionDesc}/>
        <Main.FirstMainSliderBtn onClick={()=>navigate(personalEx.detailRouter)} children="자세히 보러가기"/>
        <Main.FirstMainSliderInfo>
          <Main.FirstMainSliderInfoText children={<>
            <p className="title" children="기간"/>
            <p className="content contentdate" children={
              `${editTimehandle(personalEx.startDate)} - ${editTimehandle(personalEx.endDate)}`}/>
          </>}/>
          <Main.FirstMainSliderInfoText children={<>
            <p className="title" children="위치"/>
            <p className="content" children={personalEx.address}/>
          </>}/>
          <Main.FirstMainSliderInfoText children={<>
            <p className="title" children="작가"/>
            <p className="content" 
                children={personalEx?.author.length === 1 
                    ? personalEx.author.map(author => `${author}`)
                    : personalEx.author.length < 5 
                    ? personalEx.author.map((author, index) => personalEx.author.length === index+1 ? `${author}` : `${author}, ` )
                    : `${personalEx.author[0]}외 ${personalEx.author.length -1}명`
                  }/>
          </>}/>
        </Main.FirstMainSliderInfo> 
  </>)
}
export default FirstMainSlider