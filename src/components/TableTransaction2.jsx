import { useState } from 'react';
import FilterForm from './FilterForm';
import DataTable from 'react-data-table-component';
import { filterData } from '@/utils/filterData';
import { Button, ButtonIcon, Card } from '.';
import Link from 'next/link';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const TableTransaction2 = ({data, pending, ...props}) => {
  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = (filters) => {
    const result = filterData(data, filters);
    setFilteredData(result);
  };

  const columns = [
    { name: 'No.', selector: row => row.number, sortable: true },
    { name: 'Deskripsi', selector: row => row.transaction_header.description, sortable: true },
    { name: 'Code', selector: row => row.transaction_header.code, sortable: true },
    { name: 'Euro Rate', selector: row => row.transaction_header.rate_euro, sortable: true },
    { name: 'Date paid', selector: row => moment(row.transaction_header.date_paid).format('DD, MMM YYYY'), sortable: true },
    { name: 'Category', selector: row => row.category.name, sortable: true },
    { name: 'Nama Transaksi', selector: row => row.name, sortable: true },
    { name: 'Nominal (IDR)', selector: row => row.value_idr, sortable: true },
    { name: 'Aksi', selector: row => (
      <div className="flex gap-[20px]">
        <ButtonIcon icon={faTrash} onClick={() => props.handleDelete(row.id)}/>
        <Link href={`/transactions/edit/${row.transaction_header.id}`}>
          <ButtonIcon icon={faPen}/>
        </Link>
      </div>
    ) },
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
        <div className={`flex flex-wrap gap-[20px] ${props.readOnlyTable ? 'md:justify-end' : 'md:justify-between'}`}>
          {!props.readOnlyTable &&
            <Link href="/transactions/create">
              <Button color="primary" label="Tambah Transaksi"/>
            </Link>
          }
          <FilterForm onFilter={handleFilter} />
        </div>
        <Card>
          <div className="custom-table">
            <DataTable
              customStyles={tableCustomStyles}
              columns={
                props.readOnlyTable 
                  ? columns.filter(row => row.name != 'Aksi') 
                  : columns
              }
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

export default TableTransaction2;
