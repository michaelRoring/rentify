import React from 'react';

const Categories = ({data, ...categoryProps}) => {
  return (
    <div className="flex items-center gap-[10px] my-[20px] overflow-x-auto no-scrollbar">
      {data.map(category =>
        <button 
          key={category}
          className="px-[20px] py-[8px] border rounded-full hover:border-blue-500 focus:border-blue-500 whitespace-nowrap"
          onClick={() => categoryProps.handleClick(category)}
        >
          {category}
        </button>
      )}
    </div>
  );
}

export default Categories;
