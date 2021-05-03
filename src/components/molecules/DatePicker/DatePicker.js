import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Field } from 'formik';
import Input from '../../atoms/Input/Input';

registerLocale('pl', pl);

export const MyDatePicker = ({ ...props }) => (
  <DatePicker
    {...props}
    locale="pl"
    style={{ backgroundColor: 'red' }}
    dateFormat="dd MMM yyyy"
    closeOnScroll="true"
    className="form-control"
    customInput={<Field as={Input} />}
  />
);
