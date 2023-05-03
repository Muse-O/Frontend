import { useState } from "react";
import { HeaderWhenSelect } from "../HeaderWhenSelect";
import { HeaderWhereSelect } from "../HeaderWhereSelect";
import { HeaderCategorySelect } from "../HeaderCategorySelect";
import { HeaderTagSelect } from "../HeaderTagSelect";

export const HeaderSelecters = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const selectHandler = (e) => {
    const { name } = e.target;
    if (selectedFilter === name) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(name);
    }
  };
  const handleClick = (e) => {
    e.stopPropagation();
  };
  const filterItems = [
    {
      name: "when",
      label: "When",
      component: <HeaderWhenSelect setSelectedFilter={setSelectedFilter} />,
    },
    {
      name: "where",
      label: "Where",
      component: <HeaderWhereSelect setSelectedFilter={setSelectedFilter} />,
    },
    {
      name: "category",
      label: "Category",
      component: <HeaderCategorySelect setSelectedFilter={setSelectedFilter} />,
    },
    {
      name: "tag",
      label: "Tag",
      component: <HeaderTagSelect setSelectedFilter={setSelectedFilter} />,
    },
  ];
  return [filterItems, selectedFilter, selectHandler, handleClick];
};
