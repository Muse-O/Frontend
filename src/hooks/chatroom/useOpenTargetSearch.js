import { useState } from "react";

// useState 훅을 사용하여 modalState 상태값과 setModalState 함수를 생성
export const useOpenTargetModal = () => {
  const [modalState, setModalState] = useState(false);

  // openModalhandle 함수 생성
  const openModalhandle = () => {
    // setModalState 함수를 사용하여 modalState 값을 변경
    setModalState((pre) => !pre);
  };

  // modalState와 openModalhandle 함수를 반환
  return { modalState, openModalhandle };
};
