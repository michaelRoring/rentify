import React from 'react';
import { ButtonIcon, InputEditable, InputSelect } from '.';
import { faCirclePlus, faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';

const TableTransactionDetails = (props) => {
  return (
    <table className="border border-slate-200">
      <thead>
        <tr>
          <th className="px-[20px] py-[12px] text-left">Nama Transaksi</th>
          <th className="px-[20px] py-[12px] text-left">Nominal (IDR)</th>
          <th className="px-[20px] py-[12px] text-left">
            <ButtonIcon icon={faCirclePlus} onClick={() => props.handleAddRowItem(props.index)}/>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.details.map((item, itemKey) => 
          <tr key={itemKey} className="odd:bg-[#F4F7FC] even:bg-white">
            <td className="text-left">
              <InputEditable 
                id="name" 
                name="name"
                placeholder="Nama transaksi..."
                value={item.name}
                onChange={(e) => props.handleEditItem(props.index, itemKey, e)}
              />
            </td>
            <td className="text-left">
              <InputEditable 
                id="value_idr" 
                name="value_idr"
                placeholder="000"
                value={item.value_idr}
                onChange={(e) => props.handleEditItem(props.index, itemKey, e)}
              />
            </td>
            <td className="px-[20px] py-[12px] text-left">
              <ButtonIcon icon={faTrash} onClick={() => props.handleDeleteItem(props.index, itemKey)}/>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TableTransactionDetails;
