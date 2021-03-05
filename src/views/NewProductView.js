import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, Redirect } from 'react-router-dom';
import FileBase from 'react-file-base64';
import styled from 'styled-components';
import Input from '../components/Input/Input';
import Select from '../components/Select/Select';
import { addProduct, updateProduct } from '../actions';
import { bruttoToNetto } from '../utils/bruttoToNetto';
import MainTemplate from '../templates/MainTemplate';
import Spinner from '../components/Spinner/Spinner';
import Button from '../components/Button/Button';
import ImageUploader from '../components/ImageUploader/ImageUploader';
import MessageBox from '../components/MessageBox/MessageBox';
import { routes } from '../routes/routes';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  h2::first-letter {
    text-transform: uppercase;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  margin: 15px 0;
`;

const StyledButton = styled(Button)`
  margin-left: 15px;
`;

const Wrapper = styled.div`
  max-width: 1024px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-bottom: 65px;
  padding: 25px;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 45px;
`;

const ClientInfo = styled.div`
  margin-left: 45px;

  h2 {
    color: ${({ theme }) => theme.lightGray};
    margin-bottom: 0;
  }

  h4 {
    margin-right: 18px;
  }

  span {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ImageWrapper = styled.div`
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Error = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  padding: 0 25px;
`;

const DateWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 45px;
  grid-gap: 0 45px;

  @media (max-width: 620px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Label = styled.p`
  margin: 8px 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-family: 'Montserrat', sans-serif;
  color: black;
`;

const NewProductView = ({ match, user: { userID } }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const products = id ? useSelector((state) => state.product) : null;
  const productValues = products ? useSelector((state) => state.product.products.find((i) => i._id === id)) : null;
  const [selectedFile, setSelectedFile] = useState();
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(true);
  const isNewProduct = id ? 0 : 1;
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to={routes.products} />;
  }

  return (
    <MainTemplate>
      <StyledHeader>
        <h2>{isNewProduct ? 'Nowy produkt' : 'Edytuj'}</h2>
        <ButtonsWrapper>
          <Button as={Link} to={routes.products} secondary="true">
            Anuluj
          </Button>
          <StyledButton type="submit" form="newProductForm">
            {isNewProduct ? 'Dodaj' : 'Zapisz'}
          </StyledButton>
        </ButtonsWrapper>
      </StyledHeader>
      <Wrapper>
        {products?.loading && <Spinner />}
        {products?.error && isMessageBoxOpen && <MessageBox type="error" value="Wystąpił błąd. Spróbuj ponownie." setIsOpen={setIsMessageBoxOpen} />}
        {products?.success && isMessageBoxOpen && (
          <MessageBox type="success" value="Dane zostały zapisane pomyślnie." setIsOpen={setIsMessageBoxOpen} />
        )}
        <Formik
          initialValues={{
            productName: productValues?.productName || '',
            price: productValues?.price || '',
            vat: productValues?.vat || 23,
            brutto: productValues?.brutto || 0,
            quantity: productValues?.quantity || 1,
            unit: productValues?.unit || 'szt',
            dateOfPurchase: productValues?.dateOfPurchase && productValues?.dateOfPurchase !== null ? new Date(productValues.dateOfPurchase) : '',
            dateOfLastInspection:
              productValues?.dateOfLastInspection && productValues?.dateOfLastInspection !== null ? new Date(productValues.dateOfLastInspection) : '',
            selectedFile: productValues?.selectedFile || '',
          }}
          validate={(values) => {
            const errors = {};

            if (!values.productName) {
              errors.productName = 'Pole wymagane.';
            } else if (values.productName.length < 4) {
              errors.productName = 'Pole powinno zawierać minimum 4 znaki.';
            } else if (values.productName.length > 256) {
              errors.productName = 'Pole powinno zawierać maksimum 256 znaków.';
            } else if (/[0-9!^@#$%^&()+{}|";<>?~`|*]/.test(values.productName)) {
              errors.productName = 'Użyto zabronionego znaku specjalnego.';
            }

            if (!values.brutto) {
              errors.brutto = 'Pole wymagane.';
            } else if (!/^[0-9]+([.][0-9]+)?$/.test(values.brutto)) {
              errors.brutto = 'Podana cena jest niepoprawna.';
            }

            if (!values.vat) {
              errors.vat = 'Pole wymagane.';
            } else if (!/(100)|(0*\d{1,2})$/.test(values.vat)) {
              errors.vat = 'Podana cena jest niepoprawna.';
            }

            if (!values.quantity) {
              errors.quantity = 'Pole wymagane.';
            }

            if (!values.unit) {
              errors.unit = 'Pole wymagane.';
            }

            return errors;
          }}
          onSubmit={(values) => {
            // console.log({ ...values, selectedFile });
            if (isNewProduct) {
              dispatch(addProduct({ userID, ...values, selectedFile }));
              setRedirect(true);
            } else {
              dispatch(updateProduct(id, { userID, ...values, selectedFile }));
              setIsMessageBoxOpen(true);
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <>
              <InnerWrapper>
                <ImageWrapper>
                  <ImageUploader image={!selectedFile ? productValues?.selectedFile : selectedFile} setSelectedFile={setSelectedFile} />
                  <FileBase type="file" id="image" multiple={false} accept="image/*" onDone={({ base64 }) => setSelectedFile(base64)} />
                </ImageWrapper>

                <ClientInfo>
                  <h2>{values?.productName || '  '}</h2>
                  <h4>{values.brutto && `${values.brutto} zł brutto / doba`}</h4>
                </ClientInfo>
              </InnerWrapper>
              <StyledForm id="newProductForm">
                <div>
                  <Field as={Input} label="Nazwa" id="productName" name="productName" type="text" autoComplete="new-password" />
                  <ErrorMessage name="productName" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Cena brutto" id="brutto" name="brutto" type="number" min="0" autoComplete="new-password" />
                  <ErrorMessage name="brutto" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Stawka VAT" id="vat" name="vat" type="number" min="0" max="100" autoComplete="new-password" />
                  <ErrorMessage name="vat" component={Error} />
                </div>

                <div>
                  <Input
                    label="Cena netto"
                    id="netto"
                    disabled
                    name="netto"
                    type="text"
                    min="0"
                    value={bruttoToNetto(values.brutto, values.vat)}
                    autoComplete="new-password"
                  />
                  <ErrorMessage name="netto" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Ilość" id="quantity" name="quantity" type="number" min="0" autoComplete="new-password" />
                  <ErrorMessage name="quantity" component={Error} />
                </div>

                <div>
                  <Field as={Select} label="Jednostka" id="unit" name="unit">
                    <option value="szt">szt</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                    <option value="m2">m2</option>
                    <option value="m3">m3</option>
                  </Field>
                  <ErrorMessage name="unit" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Cena zakupu" id="price" name="price" type="number" min="0" autoComplete="new-password" />
                  <ErrorMessage name="price" component={Error} />
                </div>

                {/* <div>
                  <Field as={Input} label="Data zakupu" id="dateOfPurchase" name="dateOfPurchase" type="date" />
                  <ErrorMessage name="dateOfPurchase" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Data ostatniego przeglądu" id="dateOfLastInspection" name="dateOfLastInspection" type="date" />
                  <ErrorMessage name="dateOfLastInspection" component={Error} />
                </div> */}

                <DateWrapper>
                  <Label>Data zakupu</Label>

                  <DatePicker
                    selected={values.dateOfPurchase}
                    dateFormat="MMMM d, yyyy"
                    className="form-control"
                    name="dateOfPurchase"
                    onChange={(date) => setFieldValue('dateOfPurchase', date)}
                    customInput={<Field as={Input} autoComplete="new-password" />}
                  />
                  <ErrorMessage name="dateOfPurchase" component={Error} />
                </DateWrapper>

                <DateWrapper>
                  <Label>Data ostatniego przeglądu</Label>

                  <DatePicker
                    selected={values.dateOfLastInspection}
                    dateFormat="MMMM d, yyyy"
                    className="form-control"
                    name="dateOfLastInspection"
                    onChange={(date) => setFieldValue('dateOfLastInspection', date)}
                    customInput={<Field as={Input} autoComplete="new-password" />}
                  />
                  <ErrorMessage name="dateOfLastInspection" component={Error} />
                </DateWrapper>
              </StyledForm>
            </>
          )}
        </Formik>
      </Wrapper>
    </MainTemplate>
  );
};

NewProductView.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default NewProductView;
