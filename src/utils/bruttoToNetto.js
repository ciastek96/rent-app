export function bruttoToNetto(brutto, vat) {
  const netto = (brutto / (1 + vat / 100)).toFixed(2);
  return netto;
}
