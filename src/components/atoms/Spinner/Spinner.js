import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactComponent as SpinnerIcon } from '../../../assets/icons/svg/spinner/circle-o-notch.svg';

const InnerWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledSpinnerIcon = styled(SpinnerIcon)`
  width: 24px;
  height: 24px;
  display: inline-block;
  fill: hsla(0, 0%, 0%, 0.7);
`;

const Spinner = () => (
  <InnerWrapper
    as={motion.div}
    animate={{ rotate: 360 }}
    transition={{
      duration: 0.75,
      loop: Infinity,
      ease: 'linear',
    }}
  >
    <StyledSpinnerIcon />
  </InnerWrapper>
);

export default Spinner;
