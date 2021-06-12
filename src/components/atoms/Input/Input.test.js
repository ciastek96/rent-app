import React from 'react';
import { ThemeProvider } from 'styled-components';
import { fireEvent, render } from '@testing-library/react';
import Input from './Input';
import { theme } from '../../../theme/theme';

describe('Input component', () => {
  it('renders properly', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Input />
      </ThemeProvider>,
    );
    expect(getByTestId('sample-input')).toBeInTheDocument();
  });

  it('renders properly with placeholder', () => {
    const placeholderText = 'placeholder text';
    const { getByPlaceholderText } = render(
      <ThemeProvider theme={theme}>
        <Input placeholder={placeholderText} />
      </ThemeProvider>,
    );
    expect(getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });
  it('renders properly with label', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <Input id="Name" label="Name" />
      </ThemeProvider>,
    );
    expect(getByLabelText('Name')).toBeInTheDocument();
  });
  it('display proper value', () => {
    const name = 'Name';
    const inputValue = 'test value';
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <Input id={name} label={name} />
      </ThemeProvider>,
    );

    fireEvent.change(getByLabelText(name), { target: { value: inputValue } });

    expect(getByLabelText(name)).toHaveValue(inputValue);
  });
});
