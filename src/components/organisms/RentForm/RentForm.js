import React, { useContext } from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';
import ProductsCard from '../ProductsCard/ProductsCard';
import ErrorParagraph from '../../atoms/ErrorParagraph/ErrorParagraph';
import Summary from '../../molecules/Summary/Summary';
import { RentContext } from '../../../context/RentContext';

const StyledForm = styled(Form)`
  padding-bottom: 45px;

  h4 {
    margin-top: 0;
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 45px;

  @media (max-width: 620px) {
    grid-gap: 0;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StyledSelect = styled(Select)`
  font-size: 14px;
  margin: 0;
`;

const DateWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
    margin-bottom: 8px;
  }

  p {
    margin: 15px 0px;
  }
`;

const SelectWrapper = styled.div`
  padding: 15px 0;
`;

const RentForm = () => {
  const { values, productsList, clientsList, cartItems, setCartItems, rentValue, setRentValue, setFieldValue, getRentDuration } = useContext(
    RentContext,
  );
  return (
    <StyledForm id="newRentForm" autoComplete="new-password">
      <GridWrapper>
        <DateWrapper>
          <p>Data wypożyczenia</p>

          <DatePicker
            selectsStart
            selected={values.dateOfRent}
            startDate={values.dateOfRent}
            endDate={values.dateOfReturn}
            dateFormat="MMMM d, yyyy"
            className="form-control"
            name="dateOfRent"
            onChange={(date) => {
              setFieldValue('dateOfRent', date);
              getRentDuration(date, values.dateOfReturn);
            }}
            customInput={<Field as={Input} />}
          />
          <ErrorMessage name="dateOfRent" component={ErrorParagraph} />
        </DateWrapper>

        <DateWrapper>
          <p>Data oddania</p>
          <DatePicker
            selectsEnd
            selected={values.dateOfReturn}
            startDate={values.dateOfRent}
            endDate={values.dateOfReturn}
            minDate={values.dateOfRent}
            dateFormat="MMMM d, yyyy"
            className="form-control"
            name="dateOfReturn"
            onChange={(date) => {
              setFieldValue('dateOfReturn', date);
              getRentDuration(values.dateOfRent, date);
            }}
            customInput={<Field as={Input} autoComplete="new-password" />}
          />
          <ErrorMessage name="dateOfReturn" component={ErrorParagraph} />
        </DateWrapper>
      </GridWrapper>

      <SelectWrapper>
        <StyledSelect
          name="client"
          placeholder="Wybierz klienta"
          options={clientsList.map(({ name, surname, _id, ...clientValues }) => ({
            value: `${name} ${surname}`,
            label: `${name} ${surname}`,
            _id,
            ...clientValues,
          }))}
          onChange={(client) => setFieldValue('client', client)}
        />
        <ErrorMessage name="client" component={ErrorParagraph} />
      </SelectWrapper>

      {values.client && (
        <SelectWrapper>
          <StyledSelect
            isMulti
            placeholder="Wybierz produkty"
            name="products"
            options={productsList.map(({ productName, _id, ...productValue }) => ({
              value: productName,
              label: productName,
              productName,
              _id,
              qty: 1,
              ...productValue,
            }))}
            onChange={(products) => {
              setCartItems(products);
              setFieldValue('products', products);
            }}
          />
          <ErrorMessage name="products" component={ErrorParagraph} />
        </SelectWrapper>
      )}

      {values.products && values.products.length > 0 && (
        <>
          <ProductsCard
            values={values.products}
            setRentValue={setRentValue}
            rentValue={rentValue}
            setFieldValue={setFieldValue}
            cartItems={cartItems}
          />

          <div>
            <Field as={Input} label="Kaucja zwrotna" id="advance" name="advance" type="number" autoComplete="new-password" />
            <ErrorMessage name="advance" component={ErrorParagraph} />
          </div>

          <Summary />
        </>
      )}
    </StyledForm>
  );
};

export default RentForm;
