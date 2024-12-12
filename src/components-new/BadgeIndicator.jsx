import React from 'react';

const BadgeIndicator = ({children, status}) => {
  return (
    <span className="inline-block px-[12px] py-[4px] text-[12px] border border-[#ffffff20] rounded-[6px]">
      {status ?
        <div className="inline-block w-[8px] h-[8px] rounded-full bg-[#0D7373] mr-[10px]"></div> :
        <div className="inline-block w-[8px] h-[8px] rounded-full bg-[#EA3323] mr-[10px]"></div>
      }
      <span className="font-inter">{children}</span>
    </span>
  );
}

export default BadgeIndicator;
