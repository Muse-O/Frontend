import styled from "styled-components";
import { Flex } from "../../components/Flex";

const H1 = styled.h1`
  font-size: ${props=>props.fs};
  text-align: ${props=>props.ta};
  font-weight:900;
  margin: 50px 75px 0;
`

const MainFlex = styled(Flex)`
  width:auto;
  min-height:400px;
  margin: 50px 75px 0;
  background-color:yellow;
`

const Artgrambox = styled(Flex)`
  width:364px;
  min-height:436px;
  max-height:436px;
  background-color:lightgray;
  border-radius: 8px;
`

export {
  H1,
  MainFlex,
  Artgrambox
}