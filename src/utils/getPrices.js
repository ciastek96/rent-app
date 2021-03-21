export function bruttoToNetto(brutto, vat) {
  const netto = (brutto / (1 + vat / 100)).toFixed(2);
  return netto;
}

export const getNetto = (values, rentsDuration) => {
  const netto = values
    .map((product) => (product.qty ? product.netto * product.qty : product.netto))
    .reduce((sum = 0, i) => sum + i)
    .toFixed(2);
  return (netto * rentsDuration).toFixed(2);
};

export const getBrutto = (values, rentsDuration) => {
  const brutto = values
    .map((product) => (product.qty ? product.brutto * product.qty : product.brutto))
    .reduce((sum = 0, i) => sum + i)
    .toFixed(2);
  return (brutto * rentsDuration).toFixed(2);
};

export const getVAT = (values, rentDuration) => {
  const VAT = (getBrutto(values, rentDuration) - getNetto(values, rentDuration)).toFixed(2);
  return VAT;
};

export const getDiscount = (values, rentDuration) => {
  const discount = (getBrutto(values.products, rentDuration) * (values.client.discount / 100)).toFixed(2);
  return discount;
};

export const getFinalPrice = (values, rentDuration) => {
  const brutto = getBrutto(values.products, rentDuration);
  const price = (brutto - (brutto * values.client.discount) / 100).toFixed(2);
  return price;
};
