import styled from "styled-components";

const Layout = styled.div`
  padding: 80px 75px;
  @media (max-width: 1440px) {
    padding: 60px 56.25px;
  }
`

const H1 = styled.h1`
  font-size: 48px;
  font-family: 'S-CoreDream-3Light';

  span {
    font-family: 'Montserrat';
    font-size: 32px;
  }
  @media (max-width: 1440px) {
    font-size: 36px;
    span {
      font-size: 24px;
    }
  }
`
const H2 = styled.h2`
  font-size: 24px;
  font-family: 'S-CoreDream-3Light';
  margin-top: 81px;

  span {
    font-family: 'Montserrat';
    margin-left: 9px;
    font-size: 20px;
  }
  @media (max-width: 1440px) {
    font-size: 18px;
    span {
      font-size: 15px;
    }
  }
`

const SearchNav = styled.div`
  margin-top: 46px;
  display: flex;
  gap: 40px;

  @media (max-width: 1440px) {
    margin-top: 34.5px;
    gap: 30px;
    margin-bottom: 60.75px;
  }
  `

const SearchNavSection = styled.div`
  width: fit-content;
  font-weight: 700;
  font-size: 24px;
  cursor: pointer;
  @media (max-width: 1440px) {
    font-size: 18px;
  }
`
const SearchNavOther = styled(SearchNavSection)`
  color: #7E7E7E;
`

const SearchBoxEx = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 23px;
  margin-top: 42px;
  width: 100%;
  min-height: 356px;
  background-color: aliceblue;

  @media (max-width: 1440px) {
    margin-top: 31.5px;
    gap: 17.25px;
    min-height: 267px;
  }
`;

const SearchBoxArt = styled(SearchBoxEx)`
  min-height: 426px;
  background-color: lightcoral;

  @media (max-width: 1440px) {
    min-height: 319.5px;
  }
`;

  export {
    Layout,
    H1,H2,
    SearchNav,
    SearchNavSection,
    SearchNavOther,
    SearchBoxEx,
    SearchBoxArt
  }