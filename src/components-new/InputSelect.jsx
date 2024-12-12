import React from 'react';

const InputSelect = ({label, options, defaultOption, ...inputProps}) => {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      {label &&
        <label 
          htmlFor={inputProps.id} 
          className="block text-white"
        >
            {label} {inputProps.required && <span className="text-red-400">*</span>}
        </label>
      }
      <select 
        className="
          px-[16px]
          py-[10px]
          border
          border-[#ffffff20]
          rounded-[6px]
          bg-black
          focus:outline-none
          placeholder:text-[#ffffff70]
          font-inter
        "
        {...inputProps} 
      >
        {defaultOption && <option value="">{defaultOption}</option>}
        {options.map(item =>
          <option key={item.id} value={item.id}>{item.name}</option>
        )}
      </select>
    </div>
  );
}

export default InputSelect;
