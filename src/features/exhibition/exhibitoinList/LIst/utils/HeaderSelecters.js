import { useState } from "react";
import { HeaderWhenSelect } from "../HeaderWhenSelect";
import { HeaderWhereSelect } from "../HeaderWhereSelect";
import { HeaderCategorySelect } from "../HeaderCategorySelect";
import { HeaderTagSelect } from "../HeaderTagSelect";
import { useRecoilState } from "recoil";
import { EXSlectFilterStore } from "../../../../../hooks/exhibition/EXStore/EXSelectFilterStore";

export const HeaderSelecters = () => {
  const [selectedStore, setSelectedStore] = useRecoilState(EXSlectFilterStore);
  const selectHandler = (e) => {
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
