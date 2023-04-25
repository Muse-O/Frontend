import { atom } from "recoil";

export const searchDataState = atom({
  key: 'searchDataState',
  default: [],
});

export const searchDataExState = selector({
  key: 'searchDataExState',
  get: ({get}) => {
    const filter = get(searchDataState);
    return filter.filter((item) => item.type === "Exhibition");
    }
});

export const searchDataArtState = selector({
  key: 'searchDataArtState',
  get: ({get}) => {
    const filter = get(searchDataState);
    return filter.filter((item) => item.type === "Artgram");
    }
});

export const searchDataUserState = selector({
  key: 'searchDataUserState',
  get: ({get}) => {
    const filter = get(searchDataState);
    return filter.filter((item) => item.type === "User");
    }
});