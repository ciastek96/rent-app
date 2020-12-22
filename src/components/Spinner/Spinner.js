import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactComponent as SpinnerIcon } from '../../assets/icons/svg/spinner/spinner.svg';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: hsla(0, 0%, 0%, 0.5);
  z-index: 999;
`;

const StyledSpinner = styled.div`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Spinner = () =>
  ReactDOM.createPortal(
    <Wrapper>
      <StyledSpinner
        as={motion.div}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          loop: Infinity,
          ease: 'linear',
        }}
      >
        <SpinnerIcon />
      </StyledSpinner>
    </Wrapper>,
    document.getElementById('portal'),
  );

export default Spinner;
