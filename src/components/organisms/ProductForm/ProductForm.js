import React from 'react';
import Input from '../../atoms/Input/Input';

const ProductForm = () => (
  <>
    <Input label="Nazwa produktu" id="name" type="text" autocomplete="off" required />
    <Input label="Wartość netto" id="surname" type="text" autocomplete="off" required />
    <Input label="Wartość brutto" id="email" type="email" autocomplete="off" required />
    <Input label="Ilość" id="phone" type="text" autocomplete="off" required />
    <Input label="Jednostka" id="nip" type="text" autocomplete="off" />
  </>
);

export default ProductForm;
