import Link from 'next/link';
import React from 'react';
import { Icon } from '.';

const SidebarItemMenu = ({label, pathname, active, icon, ...props}) => {
  return (
    <Link 
      href={pathname || '/'}
      className={`
        flex
        gap-[10px]
        items-center
        px-[14px]
        py-[12px]
        border
        rounded-[6px]
        ${active ? 'bg-[#0D7373]  border-[#ffffff20]' : 'border-transparent'}
      `}
    >
      <Icon name={icon} size={20}/>
      <span className="!text-white">{label}</span>
    </Link>
  );
}

export default SidebarItemMenu;
