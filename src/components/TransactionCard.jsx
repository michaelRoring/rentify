import React from 'react';
import { ButtonIcon, InputEditable, InputSelect, TableTransactionDetails } from '.';
import { faCirclePlus, faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';

const TransactionCard = (props) => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-4 border border-slate-200 rounded-xl px-[30px] py-[60px]">
      <div className="col-span-1">
        <label htmlFor="transaction_category_id" className="block font-semibold text-gray-700 mb-[10px] md:mb-0 md:mt-3">Category</label>
      </div>
      <div className="col-span-3 flex flex-col gap-[40px]">
        <div className="absolute right-[20px] top-[20px]">
          {props.index > 0 &&
            <ButtonIcon 
              icon={faCircleXmark} 
              onClick={() => props.handleDeleteRowDetails(props.index)} 
            />
          }
        </div>
        <InputSelect 
          id="transaction_category_id"
          name="transaction_category_id"
          options={props.categories}
          value={props.transaction_category_id}
          onChange={(e) => props.handleChangeCategory(props.index, e)}
        />
        <TableTransactionDetails {...props}/>
      </div>
    </div>
  );
}

export default TransactionCard;
