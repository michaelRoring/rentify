import React, { useState } from 'react';
import { ButtonIcon, InputSelect, SpinAnimation } from '.';
import Link from 'next/link';
import moment from 'moment';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'react-js-pagination';

const TableTransaction = ({data, isLoading, ...props}) => {
  const [activePage, setActivePage] = useState(1);
  const [limitPage, setLimitPage] = useState(5);

  const [filteredData, setFilteredData] = useState(data);

  // Menghitung indeks data awal dan akhir
  const startIndex = (activePage - 1) * limitPage;
  const endIndex = Math.min(startIndex + limitPage, data.length - 1);

  const handleChangePagination = (pageNumber) => {
    console.log(pageNumber);
    setActivePage(pageNumber)
  }

  if(isLoading) {
    return (
      <div className="flex justify-center gap-2 py-[40px] font-semibold">
        <SpinAnimation /> Loading...
      </div>
    )
  }

  return (
    <div>
      <table className="border border-slate-200 w-full my-[20px]">
        <thead>
          <tr>
            <th className="px-[20px] py-[12px] text-left">No.</th>
            <th className="px-[20px] py-[12px] text-left">Deskripsi</th>
            <th className="px-[20px] py-[12px] text-left">Code</th>
            <th className="px-[20px] py-[12px] text-left">Rate Euro</th>
            <th className="px-[20px] py-[12px] text-left">Date Paid</th>
            <th className="px-[20px] py-[12px] text-left">Kategori</th>
            <th className="px-[20px] py-[12px] text-left">Nama Transaksi</th>
            <th className="px-[20px] py-[12px] text-left">Nominal</th>
            <th className="px-[20px] py-[12px] text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, key) =>
            <tr key={key} className="odd:bg-[#F4F7FC] even:bg-white">
              <td className="px-[20px] py-[12px] text-left">{key + 1}</td>
              <td className="px-[20px] py-[12px] text-left">{row.transaction_header.description}</td>
              <td className="px-[20px] py-[12px] text-left">{row.transaction_header.code}</td>
              <td className="px-[20px] py-[12px] text-left">{row.transaction_header.rate_euro}</td>
              <td className="px-[20px] py-[12px] text-left">{moment(row.transaction_header.date_paid).format('DD, MMM YYYY')}</td>
              <td className="px-[20px] py-[12px] text-left">{row.category.name}</td>
              <td className="px-[20px] py-[12px] text-left">{row.name}</td>
              <td className="px-[20px] py-[12px] text-left">{row.value_idr}</td>
              <td className="px-[20px] py-[12px] text-left">
                <div className="flex gap-[20px]">
                  <ButtonIcon icon={faTrash} onClick={() => props.handleDelete(row.id)}/>
                  <Link href={`/transactions/edit/${row.id}`}>
                    <ButtonIcon icon={faPen}/>
                  </Link>
                </div>
              </td>
            </tr>
          ).slice(startIndex, endIndex)}
        </tbody>
      </table>
      <div className="flex justify-between">
        <div className="flex w-[50%] gap-[10px] items-center">
          <div className="w-[15%]">
            <InputSelect 
              options={[
                {id: 5, name: '5'},
                {id: 10, name: '10'},
                {id: 20, name: '20'},
              ]}
              onChange={(e) => setLimitPage(e.target.value)}
            />
          </div>
          <div >Menampilkan {limitPage} dari {data.length} data </div>
        </div>
        <Pagination 
          activePage={activePage}
          itemsCountPerPage={limitPage}
          totalItemsCount={data.length}
          pageRangeDisplayed={5}
          onChange={handleChangePagination}
          innerClass="flex"
          linkClass="w-[45px] h-[45px] flex items-center justify-center border-r border-y"
          activeLinkClass="bg-[#AF90EB] text-white"
          linkClassFirst="rounded-l-xl"
          linkClassLast="rounded-r-xl"
        />
      </div>
    </div>
  );
}

export default TableTransaction;
