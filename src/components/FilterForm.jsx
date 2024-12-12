import React, { useEffect, useState } from 'react';
import { Button, InputSelect, InputText } from '.';
import axios from 'axios';
import moment from 'moment';

const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN
const maxDate = moment().format('YYYY-MM-DD')
const maxDateMinOne = moment().subtract(1, 'days').format('YYYY-MM-DD')
const minDate = moment().subtract(7, 'days').format('YYYY-MM-DD')

const FilterForm = ({onFilter}) => {
  const [categories, setCategories] = useState([]);

  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  const getCategories = async () => {
    try {
      const {data} = await axios.get(`${API_URL}/categories`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      })
      setCategories(data)
    }
    catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories()
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ startDate, endDate, category, search });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col md:flex-row flex-wrap items-center gap-[10px]">
      <div className="w-full md:w-auto md:flex-auto">
        <InputText 
          type="date"
          placeholder="dd/mm/yyyy"
          max={maxDateMinOne}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>to</div>
      <div className="w-full md:w-auto md:flex-auto">
        <InputText 
          type="date"
          placeholder="dd/mm/yyyy"
          max={maxDate}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="w-full md:w-auto md:flex-auto">
        <InputSelect 
          options={categories}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="w-full md:w-auto md:flex-auto md:w-[15%]">
        <InputText 
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Button type="submit" label="Search"/>
    </form>
  );
}

export default FilterForm;
