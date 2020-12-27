import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { Link, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import Input from '../components/Input/Input';
import Select from '../components/Select/Select';
import { updateProduct } from '../actions';
import MainTemplate from '../templates/MainTemplate';
import Button from '../components/Button/Button';
import Spinner from '../components/Spinner/Spinner';
import ImageUploader from '../components/ImageUploader/ImageUploader';
import { routes } from '../routes/routes';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h2::first-letter {
    text-transform: uppercase;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  margin-left: 15px;
`;

const Wrapper = styled.div`
  max-width: 1024px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-bottom: 65px;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 45px;
`;

const ImageWrapper = styled.div`
  min-height: 200px;
  display: flex;
  flex-direction: column;
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

const Error = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  padding: 0 25px;
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 45px;
`;

const Label = styled.p`
  margin: 8px 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-family: 'Montserrat', sans-serif;
  color: black;
`;

const DateWrapper = styled.div`
  padding: 0 25px;

  .react-datepicker-wrapper {
    width: 100%;
  }
`;

const EditProductView = ({ match }) => {
  const { id } = match.params;
  const productValues = useSelector(({ products }) => products.find((product) => product._id === id));
  const [selectedFile, setSelectedFile] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  if (!productValues) {
    return (
      <MainTemplate>
        <Spinner />
      </MainTemplate>
    );
  }
  return (
    <MainTemplate>
      <StyledHeader>
        <h2>Edytuj produkt</h2>
        <ButtonsWrapper>
          <Button as={Link} to={routes.products} secondary="true">
            Anuluj
          </Button>
          <StyledButton type="submit" form="editProductForm">
            Zatwierdź
          </StyledButton>
        </ButtonsWrapper>
      </StyledHeader>
      <Wrapper>
        <Formik
          initialValues={{
            productName: productValues.productName,
            price: productValues.price,
            quantity: productValues.quantity,
            unit: productValues.unit,
            dateOfPurchase: productValues.dateOfPurchase === null ? '' : new Date(productValues.dateOfPurchase),
            dateOfLastInspection: productValues.dateOfLastInspection === null ? '' : new Date(productValues.dateOfLastInspection),
          }}
          validate={(values) => {
            const errors = {};

            if (!values.productName) {
              errors.productName = 'Pole wymagane.';
            } else if (values.productName.length < 4) {
              errors.productName = 'Pole powinno zawierać minimum 4 znaki.';
            } else if (values.productName.length > 256) {
              errors.productName = 'Pole powinno zawierać maksimum 256 znaków.';
            }

            if (!values.price) {
              errors.price = 'Pole wymagane.';
            } else if (!/^[0-9]+([.][0-9]+)?$/.test(values.price)) {
              errors.price = 'Podana cena jest niepoprawna.';
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
            dispatch(updateProduct(id, { ...values, selectedFile }));
            history.go(0);
          }}
        >
          {({ values, setFieldValue }) => (
            <>
              <InnerWrapper>
                <ImageWrapper>
                  <ImageUploader image={!selectedFile ? productValues.selectedFile : selectedFile} setSelectedFile={setSelectedFile} />
                  <FileBase
                    onChange={() => console.log('changed')}
                    type="file"
                    id="image"
                    multiple={false}
                    accept="image/*"
                    onDone={({ base64 }) => setSelectedFile(base64)}
                  />
                </ImageWrapper>
                <ClientInfo>
                  <h2>{productValues.productName}</h2>
                  <h4>{`${productValues.price} zł brutto / doba`}</h4>
                </ClientInfo>
              </InnerWrapper>
              <StyledForm id="editProductForm">
                <div>
                  <Field as={Input} label="Nazwa" id="productName" name="productName" type="text" autoComplete="new-password" />
                  <ErrorMessage name="productName" component={Error} />
                </div>
                <div>
                  <Field as={Input} label="Cena za dobę" id="price" name="price" type="number" min="0" autoComplete="new-password" />
                  <ErrorMessage name="price" component={Error} />
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
                {/* <div>
                  <Field as={Input} format="2020-12-23T00:00:00.000" label="Data zakupu" id="dateOfPurchase" name="dateOfPurchase" type="date" />
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

EditProductView.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditProductView;
