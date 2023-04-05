import styled from "styled-components";
import { Flex } from "../../components/Flex";
import { Wrap } from "../../shared/GlobalStyled";

const ArtgramWrap = styled(Wrap)`
  width: 1525px;
  min-width:1525px;
`

const H1 = styled.h1`
  font-size: ${props=>props.fs};
  text-align: ${props=>props.ta};
  font-weight:900;
  margin: ${props => props.children === "아트그램" ? "50px 75px 0" : "10px" };
`

const MainFlex = styled(Flex)`
  width:auto;
  min-height:400px;
  margin: 50px 75px 100px;
  /* background-color:yellow; */
`

const UserFlex = styled(Flex)`
  width:364px;
  min-height:40px;
  max-height:40px;
  position:relative;
`

const Artgrambox = styled(Flex)`
  width:364px;
  min-width:364px;
  min-height:436px;
  max-height:436px;
  background-color:rgb(240, 240, 240);
  border-radius: 8px;
`

const Img = styled.img`
  width:100%;
  height:189px;
  max-height:189px;
  overflow:hidden;
  border-radius: 8px 8px 0 0;
`

const posting = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis; 
  margin: 0 10px;
  font-size: 1.5rem;
  line-height:2.5rem;
  vertical-align: bottom;
`;

const Desc = styled(posting)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  height:75px;
  min-height:75px; 
  margin: 0 10px;
  font-size: 1.5rem;
  line-height:2.5rem;
  vertical-align: bottom;
`;

const Nickname = styled.div`
  height:40px;
  min-height:40px; 
  line-height: 40px;
  font-size: 1.8rem;
  margin-left:10px;

  span {
    font-size: 1.8rem;
    color: gray;
  }
`

const ProflieBox = styled(Nickname)`
  width:40px;
  min-width:40px;
  border-radius:50px;
  background-color:rgba(37, 37, 37, 0.8);
  background-image: url(${props => props.url || "null"});
  background-position: center;
  background-size: cover;
`
const likes = styled.div`
  position:absolute;
  right:0;
  height:40px;
  min-height:40px; 
  line-height: 40px;
  font-size: 1.8rem;
  margin-right:10px;

  span {
    font-size: 1.5rem;
    color: tomato;
  }
`

export {
  ArtgramWrap,
  H1,
  MainFlex,
  UserFlex,
  Artgrambox,
  Img,
  posting,
  Desc,
  ProflieBox,
  Nickname,
  likes
}