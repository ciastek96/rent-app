import React from 'react';
import Input from '../Input/Input';

const ClientForm = () => (
  <>
    <Input label="Imię" id="name" type="text" autocomplete="off" required />
    <Input label="Nazwisko" id="surname" type="text" autocomplete="off" required />
    <Input label="Adres e-mail" id="email" type="email" autocomplete="off" required />
    <Input label="Telefon" id="phone" type="text" autocomplete="off" required />
    <Input label="NIP" id="nip" type="text" autocomplete="off" />
    <Input label="Miasto" id="city" type="text" />
    <Input label="Adres" id="address" type="text" />
    <Input label="Kod pocztowy" id="postalCode" type="text" />
    <Input label="Rabat" id="discount" type="number" min="0" max="100" value="0" />
  </>
);

export default ClientForm;
