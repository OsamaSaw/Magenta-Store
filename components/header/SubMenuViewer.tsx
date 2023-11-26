import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
type linksObjectType = { name: string; link: string };
export type listType = { title: string; listOfLinks: linksObjectType[] };
const CustomColumn = ({
  title,
  listOfLinks,
}: {
  title: string;
  listOfLinks: linksObjectType[];
}) => {
  return (
    <div className="customColumnStyle">
      <h3 className="text-white font-medium capitalize">{title}</h3>
      {listOfLinks.map((link, index) => (
        <Link key={link?.link + title + index} href={link?.link}>
          {link?.name}
        </Link>
      ))}
    </div>
  );
};
export const SubMenuViewer = ({
  lists,
  setShowSubMenu,
}: {
  lists: listType[];
  setShowSubMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="subMenuStyle"
      onMouseLeave={() => {
        setShowSubMenu(false);
      }}
    >
      {lists.map((column, index) => (
        <CustomColumn
          key={"CustomColumn" + index}
          listOfLinks={column.listOfLinks}
          title={column.title}
        />
      ))}
    </div>
  );
};
