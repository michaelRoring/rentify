import React from "react";
import SidebarItemMenu from "./SidebarItemMenu";
import { useRouter } from "next/router";

const menuData = [
  { label: "Dashboard", pathname: "/", icon: "icon-home" },
  { label: "GPU List", pathname: "/gpu-list", icon: "icon-layers" },
  { label: "Community", pathname: "/community", icon: "icon-community" },
  { label: "My Order", pathname: "/my-order", icon: "icon-shopping-cart" },
  { label: "Profile", pathname: "/profile", icon: "icon-user" },
  { label: "Chat", pathname: "/chatbot", icon: "icon-chat" },
];

const MenuItem = (props) => {
  return (
    <li>
      <SidebarItemMenu {...props} />
    </li>
  );
};

const SidebarMenu = () => {
  const router = useRouter();

  return (
    <ul className="flex flex-col gap-[20px]">
      {menuData.map((item, index) => (
        <MenuItem
          key={index}
          active={item.pathname == router.pathname}
          {...item}
        />
      ))}
    </ul>
  );
};

export default SidebarMenu;
