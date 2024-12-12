import { useState } from 'react';
import FilterForm from './FilterForm';
import DataTable from 'react-data-table-component';
import { filterDataRecap } from '@/utils/filterData';
import { Button, ButtonIcon, Card } from '.';
import Link from 'next/link';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const TableTransactionRecap = ({data, pending, ...props}) => {
  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = (filters) => {
    const result = filterDataRecap(data, filters);
    setFilteredData(result);
  };

  const columns = [
    { name: 'No.', selector: row => row.number, sortable: true },
    { name: 'Tanggal', selector: row => moment(row.date_paid).format('DD, MMM YYYY'), sortable: true },
    { name: 'Kategori', selector: row => row.category, sortable: true },
    { name: 'Nominal (IDR)', selector: row => row.total_value_idr, sortable: true },
  ];

  const tableCustomStyles = {
    headRow: {
      style: {
        backgroundColor: '#F4F8FF'
      },
    },
    rows: {
      style: {
        backgroundColor: "#FFFFFF"
      },
      stripedStyle: {
        backgroundColor: "#F4F8FF"
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-wrap md:justify-end gap-[20px]">
          <FilterForm onFilter={handleFilter} />
        </div>
        <Card>
          <div className="custom-table">
            <DataTable
              customStyles={tableCustomStyles}
              columns={columns}
              data={filteredData}
              progressPending={pending}
              pagination
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TableTransactionRecap;
