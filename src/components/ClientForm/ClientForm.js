import React from 'react';
import { PropTypes } from 'prop-types';
import { ErrorMessage } from 'formik';
import Input from '../Input/Input';

const ClientForm = ({ formik, setClientValues, clientValues }) => (
  <>
    <Input
      label="Imię"
      id="name"
      name="name"
      type="text"
      autocomplete="off"
      // onChange={(e) => setClientValues({ ...clientValues, name: e.target.value })}
      onChange={formik.handleChange}
      value={formik.values.name}
      required
    />
    {formik.errors.name ? <div>{formik.errors.name}</div> : null}
    <Input
      label="Nazwisko"
      id="surname"
      name="surname"
      type="text"
      autocomplete="off"
      onChange={formik.handleChange}
      value={formik.values.surname}
      // onChange={(e) => setClientValues({ ...clientValues, surname: e.target.value })}
      required
    />
    {formik.errors.surname ? <div>{formik.errors.surname}</div> : null}
    <Input
      label="Adres e-mail"
      id="email"
      name="email"
      type="email"
      autocomplete="off"
      // onChange={(e) => setClientValues({ ...clientValues, email: e.target.value })}
      onChange={formik.handleChange}
      value={formik.values.email}
      required
    />
    {formik.errors.email ? <div>{formik.errors.email}</div> : null}
    <Input
      label="Telefon"
      id="phone"
      name="phone"
      type="text"
      autocomplete="off"
      // onChange={(e) => setClientValues({ ...clientValues, phone: e.target.value })}
      onChange={formik.handleChange}
      value={formik.values.phone}
      required
    />
    {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
    <Input label="NIP" id="nip" type="text" onChange={(e) => setClientValues({ ...clientValues, nip: e.target.value })} autocomplete="off" />
    <Input
      label="Miasto"
      id="city"
      name="city"
      type="text"
      // onChange={(e) => setClientValues({ ...clientValues, address: { ...clientValues.address, city: e.target.value } })}
      onChange={formik.handleChange}
      value={formik.values.address.city}
    />
    {formik.errors.city ? <div>{formik.errors.city}</div> : null}
    <Input
      label="Ulica"
      id="street"
      name="street"
      type="text"
      // onChange={(e) => setClientValues({ ...clientValues, address: { ...clientValues.address, street: e.target.value } })}
      onChange={formik.handleChange}
      value={formik.values.address.street}
    />
    {formik.errors.street ? <div>{formik.errors.street}</div> : null}
    <Input
      label="Kod pocztowy"
      id="postalCode"
      name="postalCode"
      type="text"
      // onChange={(e) => setClientValues({ ...clientValues, address: { ...clientValues.address, postalCode: e.target.value } })}
      onChange={formik.handleChange}
      value={formik.values.address.postalCode}
    />
    {formik.errors.postalCode ? <div>{formik.errors.postalCode}</div> : null}
    <Input
      label="Rabat"
      id="discount"
      name="discount"
      type="number"
      min="0"
      max="100"
      step="5"
      // onChange={(e) => setClientValues({ ...clientValues, discount: e.target.value })}
      value={formik.values.discount}
      onChange={formik.handleChange}
    />
    {formik.errors.discount ? <div>{formik.errors.discount}</div> : null}
  </>
);

ClientForm.propTypes = {
  clientValues: PropTypes.shape({
    name: '',
    surname: '',
    email: '',
    phone: '',
    nip: '',
    address: {
      city: '',
      street: '',
      postalCode: '',
    },
    discount: '',
  }).isRequired,
  setClientValues: PropTypes.func.isRequired,
  formik: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ClientForm;
