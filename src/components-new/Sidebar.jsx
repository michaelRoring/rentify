import React from 'react';
import BrandLogo from './BrandLogo';
import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
  return (
    <div className="
      fixed
      w-[213px]
      border-r
      border-[#ffffff20]
      backdrop-blur-lg 
      bg-[#ffffff07]
      h-full
      lef-0
      bottom-0
      py-[20px]
      px-[24px]
      flex
      flex-col
      gap-[90px]
      z-10
    ">
      <BrandLogo />
      <SidebarMenu />
    </div>
  );
}

export default Sidebar;
