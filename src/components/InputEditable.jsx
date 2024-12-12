import { useState, useRef } from 'react';

const InputEditable = ({...props}) => {
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => {
    setIsEditable(true);
    inputRef.current.select();
  };

  const handleBlur = () => {
    setIsEditable(false);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      readOnly={!isEditable}
      onClick={handleFocus}
      onBlur={handleBlur}
      {...props}
      className={` 
        w-full
        px-[20px]
        py-[10px]
        border
        focus:outline-none
        ${isEditable 
          ? 'bg-[#FAFBFE] border-[#AF90EB]' 
          : 'bg-transparent border-transparent'}`
        }
    />
  );
};

export default InputEditable;
