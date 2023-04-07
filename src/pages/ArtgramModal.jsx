import styled from 'styled-components';

const ModalBackground = styled.div`
  display: ${props => props.state ? "block" : "none"};
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  /* background-color: ; */
  background-color: rgba(35, 35, 35, 0.7);
  z-index: 10200;
`
const ModalWindow = styled.div`
  display: ${props => props.state ? "block" : "none"};
  width: 600px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFC04C;
  border-radius: 15px;
  z-index: 10200;
`

export {
  ModalBackground,
  ModalWindow
}  