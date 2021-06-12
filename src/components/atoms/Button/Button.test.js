import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Button from './Button';
import { theme } from '../../../theme/theme';

describe('Button Component', () => {
  it('Renders children text', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Button>Hello</Button>
      </ThemeProvider>,
    );

    getByText('Hello');
  });
});
