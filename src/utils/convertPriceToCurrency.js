export const convertPriceToCurrency = (maticValueString, maticPriceInUsd) => {
  // console.log('maticValueString', maticValueString);
  // console.log('maticPriceInUsd', maticPriceInUsd);
  // Konversi nilai string ke angka
  const maticValue = parseFloat(maticValueString);
  // console.log('maticValue',maticValue);
  
  // Hitung nilai USD
  const usdValue = maticValue * maticPriceInUsd;
  // console.log('usdValue',usdValue.toFixed(8));
  return usdValue.toFixed(8)
}