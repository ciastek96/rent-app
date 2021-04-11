import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, Redirect } from 'react-router-dom';
import FileBase from 'react-file-base64';
import styled from 'styled-components';
import Input from '../components/atoms/Input/Input';
import Select from '../components/atoms/Select/Select';
import { addProduct, updateProduct } from '../actions';
import { bruttoToNetto } from '../utils/getPrices';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import InnerTemplate from '../templates/InnerTemplate';
import Spinner from '../components/atoms/Spinner/Spinner';
import ErrorParagraph from '../components/atoms/ErrorParagraph/ErrorParagraph';
import Button from '../components/atoms/Button/Button';
import ImageUploader from '../components/atoms/ImageUploader/ImageUploader';
import MessageBox from '../components/atoms/MessageBox/MessageBox';
import { routes } from '../routes/routes';

const ButtonsWrapper = styled.div`
  display: flex;
  margin: 15px 0;
`;

const StyledButton = styled(Button)`
  margin-left: 15px;
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

const ProductFormView = ({ match, user: { userID } }) => {
  const { id } = match.params;
  const isNewProduct = id ? 0 : 1;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const productValues = id && useSelector((state) => state.product.products.find((i) => i._id === id));
  const [selectedFile, setSelectedFile] = useState();
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(true);
  const [redirect, setRedirect] = useState(false);

  if (id && !productValues) {
    return (
      <MainTemplate>
        <Spinner />
      </MainTemplate>
    );
  }

  if (redirect) {
    return <Redirect to={routes.products} />;
  }

  return (
    <MainTemplate>
      <ItemsTemplate title={isNewProduct ? 'Nowy produkt' : 'Edycja produktu'}>
        <ButtonsWrapper>
          <Button as={Link} to={routes.products} secondary="true">
            Anuluj
          </Button>
          <StyledButton type="submit" form="newProductForm">
            {isNewProduct ? 'Dodaj' : 'Zapisz'}
          </StyledButton>
        </ButtonsWrapper>
      </ItemsTemplate>
      <InnerTemplate>
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
            brutto: productValues?.brutto || '',
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
            } else if (/[!^@#$%^&()+{}|";<>?~`|*]/.test(values.productName)) {
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
                  <ErrorMessage name="productName" component={ErrorParagraph} />
                </div>

                <div>
                  <Field as={Input} label="Cena brutto" id="brutto" name="brutto" type="number" min="0" autoComplete="new-password" />
                  <ErrorMessage name="brutto" component={ErrorParagraph} />
                </div>

                <div>
                  <Field as={Input} label="Stawka VAT" id="vat" name="vat" type="number" min="0" max="100" autoComplete="new-password" />
                  <ErrorMessage name="vat" component={ErrorParagraph} />
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
                  <ErrorMessage name="netto" component={ErrorParagraph} />
                </div>

                <div>
                  <Field as={Input} label="Ilość" id="quantity" name="quantity" type="number" min="0" autoComplete="new-password" />
                  <ErrorMessage name="quantity" component={ErrorParagraph} />
                </div>

                <div>
                  <Field as={Select} label="Jednostka" id="unit" name="unit">
                    <option value="szt">szt</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                    <option value="m2">m2</option>
                    <option value="m3">m3</option>
                  </Field>
                  <ErrorMessage name="unit" component={ErrorParagraph} />
                </div>

                <div>
                  <Field as={Input} label="Cena zakupu" id="price" name="price" type="number" min="0" autoComplete="new-password" />
                  <ErrorMessage name="price" component={ErrorParagraph} />
                </div>

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
                  <ErrorMessage name="dateOfPurchase" component={ErrorParagraph} />
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
                  <ErrorMessage name="dateOfLastInspection" component={ErrorParagraph} />
                </DateWrapper>
              </StyledForm>
            </>
          )}
        </Formik>
      </InnerTemplate>
    </MainTemplate>
  );
};

ProductFormView.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ProductFormView;
