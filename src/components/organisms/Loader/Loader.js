import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Spinner from '../../atoms/Spinner/Spinner';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  // background-color: #000000;
  background-image: linear-gradient(45deg, hsla(0, 0%, 0%, 0.3) 0%, hsla(0, 0%, 25%, 0.3) 74%);
  backdrop-filter: blur(2.5px);
  z-index: 990;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Loader = () =>
  ReactDOM.createPortal(
    <Wrapper>
      <InnerWrapper>
        <Spinner />
      </InnerWrapper>
    </Wrapper>,
    document.getElementById('portal'),
  );

export default Loader;
