export function convertTransactionDetails(data) {
  const result = [];

  data.forEach(item => {
      let category = result.find(cat => cat.transaction_category_id === item.transaction_category_id);

      if (!category) {
          category = {
              transaction_category_id: item.transaction_category_id,
              details: []
          };
          result.push(category);
      }

      category.details.push({
          id: item.id,
          name: item.name,
          value_idr: item.value_idr
      });
  });

  return result;
}