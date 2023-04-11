import { useState } from "react";

export const useOpenModal = () => {
  const [modalArtgramId, setModalArtgramId] = useState(null);
  const [modalState, setModalState] = useState(false)
  const openModalhandle = (artgramId) => {
    setModalArtgramId(artgramId)
    setModalState(pre => !pre)
    // 비동기 통신을 여기에, 그래야 해당 댓글만 불러올 수 있으니까 ... 
  }
  return [modalArtgramId, modalState, setModalState, openModalhandle]
}