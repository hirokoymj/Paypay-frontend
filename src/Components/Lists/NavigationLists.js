import React from "react";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";

import { ListItemLink } from "Components/Lists/ListItemLink";

export const TechNavItems = ({ setDrawerClosed }) => {
  return (
    <>
      <ListItemLink
        to="/employee"
        text="Employee"
        icon={<LibraryBooksOutlinedIcon />}
        onClick={setDrawerClosed && setDrawerClosed}
      />
      <ListItemLink
        to="/performanceList"
        text="Performance"
        icon={<LibraryBooksOutlinedIcon />}
        onClick={setDrawerClosed && setDrawerClosed}
      />
    </>
  );
};
