import React from 'react';

const InputSelect = ({label, options, ...inputProps}) => {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      {label &&
        <label 
          htmlFor={inputProps.id} 
          className="block font-semibold text-gray-700"
        >
            {label} {inputProps.required && <span className="text-red-400">*</span>}
        </label>
      }
      <select 
        className="

          px-[20px]
          py-[12px]
          bg-[#FAFBFE]
          border
          focus:border-[#AF90EB]
          focus:outline-none
          rounded-lg
        "
        {...inputProps} 
      >
        {options.map(item =>
          <option key={item.id} value={item.id}>{item.name}</option>
        )}
      </select>
    </div>
  );
}

export default InputSelect;
