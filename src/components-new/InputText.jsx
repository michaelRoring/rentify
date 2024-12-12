import React from 'react';
import Icon from './Icon';

const InputText = ({withIcon, label, ...inputProps}) => {
  return (
    <div className="flex flex-col gap-[10px]">
      {label && 
        <label htmlFor={inputProps.id}>
          {label}{" "}
          {inputProps.required && <span className="text-red-500">*</span>}
        </label>}
      <div className="relative">
        {withIcon &&
          <div className="absolute left-[16px] top-[12px]">
            <Icon name={withIcon}/>
          </div>
        }
        <input 
          className={`
            ${withIcon ? 'pl-[50px]' : 'pl-[16px]'}
            w-full
            pr-[16px]
            py-[10px]
            border
            border-[#ffffff20]
            rounded-[6px]
            !bg-transparent
            focus:outline-none
            placeholder:text-[#ffffff70]
            font-inter
          `}
          {...inputProps}
        />
      </div>
    </div>
  );
}

export default InputText;
