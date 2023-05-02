import { atom, selector } from "recoil";

export const EXApplyTagsStore = atom({
  key: "EXApplyStateHanlder",
  default: {
    category: "",
    HashTag: "",
    Where: "",
    Search: "",
    //준비중
    When: { startDate: "", endDate: "" },
  },
});
