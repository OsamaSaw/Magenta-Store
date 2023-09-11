import React, { useState } from "react";
import { useWindowSize } from "components/header/useWindowSize";
import SideMenu from "components/header/SideMenu";
import { listType } from "./subMenuViewer";

interface MenuItemProps {
  menuTitle: string;
  showSubMenu: boolean;
  menuNumber: number;
  currentNumber: number;
  setShowSubMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuNumber: React.Dispatch<React.SetStateAction<number>>;
  menuData: listType[];
}

export const MenuItem = ({
  showSubMenu,
  menuNumber,
  setShowSubMenu,
  setMenuNumber,
  menuTitle,
  currentNumber,
  menuData,
}: MenuItemProps) => {
  const size = useWindowSize();
  return (
    <>
      {size.width > 1024 ? (
        <span
          onMouseOver={() => {
            setShowSubMenu(true);
            setMenuNumber(currentNumber);
          }}
          className="dropList"
        >
          {menuTitle + " "}
          {menuNumber == currentNumber && showSubMenu ? (
            <i className={"icon-down-open"} />
          ) : (
            <i className={"icon-up-open"} />
          )}
        </span>
      ) : (
        <SideMenu data={menuData} menuTitle={menuTitle} />
      )}
    </>
  );
};
