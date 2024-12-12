export const filterData = (data, { startDate, endDate, category, search }) => {
  return data.filter(item => {
    const datePaid = new Date(item.transaction_header.date_paid);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const categoryMatch = category ? item.transaction_category_id === parseInt(category) : true;
    const searchMatch = search ?
      item.transaction_header.code.toLowerCase().includes(search.toLowerCase()) ||
      item.transaction_header.description.toLowerCase().includes(search.toLowerCase()) ||
      item.transaction_header.rate_euro.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.value_idr.toString().includes(search) :
      true;
    
    const dateMatch = (!start || datePaid >= start) && (!end || datePaid <= end);
    
    return dateMatch && categoryMatch && searchMatch;
  });
};

export const filterDataRecap = (data, { startDate, endDate, category, search }) => {
  return data.filter(item => {
    const datePaid = new Date(item.date_paid);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const categoryMatch = category ? item.transaction_category_id === parseInt(category) : true;
    const searchMatch = search ?
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.total_value_idr.toString().includes(search) :
      true;
    
    const dateMatch = (!start || datePaid >= start) && (!end || datePaid <= end);
    
    return dateMatch && categoryMatch && searchMatch;
  });
};
