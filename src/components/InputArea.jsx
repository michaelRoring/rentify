import React from 'react';

const InputArea = ({label, ...inputProps}) => {
  return (
    <div className="flex flex-col gap-[10px]">
      {label &&
        <label 
          htmlFor={inputProps.id} 
          className="block font-semibold text-gray-700"
        >
            {label} {inputProps.required && <span className="text-red-400">*</span>}
        </label>
      }
      <textarea 
        className="
          w-full
          px-[20px]
          py-[10px]
          bg-[#FAFBFE]
          border
          focus:border-[#AF90EB]
          focus:outline-none
          rounded-lg

        "
        {...inputProps} 
      />
    </div>
  );
}

export default InputArea;
