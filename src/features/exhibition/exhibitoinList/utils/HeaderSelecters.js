import { useRecoilState } from "recoil";
import { EXSlectFilterStore } from "../../../../hooks/exhibition/EXStore/EXSelectFilterStore";
import { HeaderWhenSelect } from "../LIst/HeaderWhenSelect";
import { HeaderWhereSelect } from "../LIst/HeaderWhereSelect";
import { HeaderCategorySelect } from "../LIst/HeaderCategorySelect";
import { HeaderTagSelect } from "../LIst/HeaderTagSelect";

export const HeaderSelecters = () => {
  const [selectedStore, setSelectedStore] = useRecoilState(EXSlectFilterStore);
  const selectHandler = (e) => {
    e.stopPropagation(); //이벤트 버블링 막아줌
    const { name } = e.target;
    if (selectedStore === name) {
      setSelectedStore("");
    } else {
      setSelectedStore(name);
    }
  };
  const handleClick = (e) => {
    e.stopPropagation();
  };
  const filterItems = [
    {
      name: "when",
      label: "When",
      component: <HeaderWhenSelect />,
    },
    {
      name: "where",
      label: "Where",
      component: <HeaderWhereSelect />,
    },
    {
      name: "category",
      label: "Category",
      component: <HeaderCategorySelect />,
    },
    {
      name: "tag",
      label: "Tag",
      component: <HeaderTagSelect />,
    },
  ];
  return [filterItems, selectedStore, selectHandler, handleClick];
};
