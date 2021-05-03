import React, { useContext } from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import styled from 'styled-components';
import { MyDatePicker as DatePicker } from '../../molecules/DatePicker/DatePicker';
import Input from '../../atoms/Input/Input';
import ProductsCard from '../ProductsCard/ProductsCard';
import ErrorParagraph from '../../atoms/ErrorParagraph/ErrorParagraph';
import Summary from '../../molecules/Summary/Summary';
import { RentContext } from '../../../context/RentContext';
import { theme as appTheme } from '../../../theme/theme';

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
  border-radius: 10px;
  margin: 0;
`;

const DateWrapper = styled.div`
  .react-datepicker {
    transform: scale(1.2);
  }
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

const selectTheme = (theme) => ({
  ...theme,
  borderRadius: '10px',
  padding: '15px 0',
  color: 'black',
  colors: {
    ...theme.colors,
    primary: appTheme.lightGray,
    primary75: appTheme.default,
    primary50: appTheme.default,
    primary25: appTheme.default,
    neutral20: appTheme.lightGray,
    neutral10: appTheme.default,
  },
});

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
            name="dateOfRent"
            selected={values.dateOfRent}
            startDate={values.dateOfRent}
            endDate={values.dateOfReturn}
            onChange={(date) => {
              setFieldValue('dateOfRent', date);
              getRentDuration(date, values.dateOfReturn);
            }}
          />
          <ErrorMessage name="dateOfRent" component={ErrorParagraph} />
        </DateWrapper>

        <DateWrapper>
          <p>Data oddania</p>
          <DatePicker
            selectsEnd
            name="dateOfReturn"
            selected={values.dateOfReturn}
            startDate={values.dateOfRent}
            endDate={values.dateOfReturn}
            minDate={values.dateOfRent}
            onChange={(date) => {
              setFieldValue('dateOfReturn', date);
              getRentDuration(values.dateOfRent, date);
            }}
          />
          <ErrorMessage name="dateOfReturn" component={ErrorParagraph} />
        </DateWrapper>
      </GridWrapper>

      <SelectWrapper>
        <StyledSelect
          name="client"
          theme={(theme) => selectTheme(theme)}
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
            theme={(theme) => selectTheme(theme)}
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
