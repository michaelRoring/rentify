// components/navbar/Dropdown.js
import { useState } from 'react';
import DropdownItem from './DropdownItem';

const Dropdown = ({ label, children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
      >
        {label}
      </button>
      {isOpen && (
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="absolute left-0 w-48 bg-gray-800 text-white rounded-md shadow-lg z-10 flex flex-col"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
