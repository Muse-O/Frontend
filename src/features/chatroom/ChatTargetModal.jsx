import {React, useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { cookies } from "../../shared/cookies";
import { apis } from '../../api/apis';

const ChatTargetSearchModal = ({modalState, openModalhandle, handleUserSelect}) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  
  useEffect(() => {
    // 디바운싱된 API 호출 함수
    const fetchSearchResult = async () => {
      const response = await getUsers(searchTerm);
      setSearchResult(response.searchUser);
    };
    
    // 검색어가 변경될 때마다 500ms 후에 API를 호출하도록 함
    const debounceId = setTimeout(() => {
      fetchSearchResult();
    }, 500);
    
    // cleanup 함수에서 clearTimeout을 호출하여 이전 타이머를 취소
    return () => clearTimeout(debounceId);
  }, [searchTerm]);
  
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const getUsers = useCallback(async (userNickname) => {
    const token = cookies.get("access_token");
    try{
      const res = await apis.get(
        `/chat/search?userNickname=${userNickname}`, {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      )

      if (res.data) {
        return res.data;
      } else {
        setSearchResult([]);
      }
    } catch(err) {
      setSearchResult([]);
    }
  }, []);

  return (
    <>
      <ModalBackground
        state={modalState}
        onClick={(e) => {
          e.stopPropagation();
          openModalhandle();
        }}
      />
      <FindContactWrap>
        <FindContactHeader>
          <h1>새로운 메시지</h1>

          <NewRoomButton onClick={() => openModalhandle()}>
            <IoClose size={38} />
          </NewRoomButton>
        </FindContactHeader>
        <FindContactSearch>
          <SearchHeader>
            <h1>대상 검색</h1>
          </SearchHeader>
          <SearchConetnt>
            <SearchInput
              placeholder="사용자 닉네임 검색..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </SearchConetnt>
        </FindContactSearch>
        <ContactList>
          <ContactHeader>작가/사용자</ContactHeader>
          {searchResult.length > 0 ? (
            <>
              {searchResult.map((user) => (
                <ContactUserBox key={user.profileId}>
                  <ContactUserImg
                    alt="user profile image"
                    src={user.profileImg}
                  />
                  <ContactUserName>{user.profileNickname}</ContactUserName>
                  <ContactSelectBtn
                    onClick={() => {
                      handleUserSelect(user.userEmail);
                      openModalhandle();
                    }}
                  >
                    선택
                  </ContactSelectBtn>
                </ContactUserBox>
              ))}
            </>
          ) : (
            <SearchGuide>검색된 사용자가 없습니다.</SearchGuide>
          )}
        </ContactList>
      </FindContactWrap>
    </>
  );
}

export default ChatTargetSearchModal

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

const FindContactWrap = styled.div`
  position: absolute;
  top: calc(50vh - 320px);
  left: calc(50% - 240px);

  display: flex;
  flex-direction: column;

  width: 480px;
  height: 640px;

  background: #ffffff;
  border-radius: 14px;

  z-index: 10201;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`

const FindContactHeader = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 60px;

  border-bottom: 1px solid #000000;

  order: 1;

  position: relative;

  h1{
    font-weight: 600;
    font-size: 20px;
    color: #1A1A1A;
  }
`

const FindContactSearch = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  height: 100px;

  border-bottom: 1px solid #000000;

  order: 2;
`

const SearchHeader = styled.div`
  padding: 20px 30px 0px;

  width: 100%;
  height: 50px;

  h1 {
    font-weight: 600;
    font-size: 18px;

    color: #1A1A1A;
  }
`

const SearchConetnt = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 50px;
  padding-left: 30px;
`

const SearchInput = styled.input`
  all: unset;

  font-weight: 400;
  font-size: 18px;

  color: #474747;
`

const ContactList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 30px 20px;

  width: 100%;
  overflow: scroll;
  overflow-x: hidden;

  flex: 1;
  gap: 16px;
  order: 3;
`

const ContactHeader = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  color: #1A1A1A;
  margin-bottom: 20px;
`

const ContactUserBox = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;

  width: 100%;
  height: 60px;

  :hover{
    background: #eeeeee;
  }
`

const ContactUserImg = styled.img`
  width: 50px;
  height: 50px;

  border-radius: 100px;
  overflow: hidden;

  object-fit: contain;
  background: #D9D9D9;

  order: 1;
`

const ContactUserName = styled.h1`
  margin-left: 14px;

  display: flex;
  align-items: center;

  flex: 1;
  height: 100%;

  font-weight: 500;
  font-size: 18px;

  color: #000000;

  order: 2;
`

const ContactSelectBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;

  font-weight: 700;
  font-size: 18px;
  line-height: 18px;

  color: #FFFFFF;

  background: #000000;
  border-radius: 4px;

  order: 3;
  cursor: pointer;
`

const NewRoomButton = styled.button`
  all: unset;
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
  right: 20px;
  cursor: pointer;
  font-weight: 900;

  :hover {
    color: #4137ff;
  }
`

const SearchGuide = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  color: #474747;
`