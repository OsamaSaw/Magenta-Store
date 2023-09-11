import React, { useState } from "react";

type LinkType = {
  name: string;
  link: string;
};

type ListType = {
  listOfLinks: LinkType[];
  title: string;
};

type SideMenuProps = {
  data: ListType[];
  menuTitle: string;
};

const SideMenu: React.FC<SideMenuProps> = ({ data, menuTitle }) => {
  const [openSubMenus, setOpenSubMenus] = useState<boolean[]>(
    new Array(data.length).fill(false)
  );

  const toggleSubMenu = (index: number) => {
    const updatedOpenSubMenus = [...openSubMenus];
    updatedOpenSubMenus[index] = !updatedOpenSubMenus[index];
    setOpenSubMenus(updatedOpenSubMenus);
  };

  return (
    <div className="side-menu">
      <p className="menuTitleStyle">{menuTitle}</p>
      {data.map((item, index) => (
        <div key={index} className="menu-item">
          <div
            className={`menu-title ${openSubMenus[index] ? "active" : ""}`}
            onClick={() => toggleSubMenu(index)}
          >
            {item.title}
          </div>
          <div className={`submenu ${openSubMenus[index] ? "open" : "closed"}`}>
            <ul>
              {item.listOfLinks.map((link, subIndex) => (
                <li key={subIndex}>
                  <a href={link.link}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideMenu;
