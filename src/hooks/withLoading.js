import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner/Spinner';

function withLoading(Component) {
  function HOC(props) {
    const [isLoading, setIsLoading] = useState();

    return (
      <>
        {isLoading && <Spinner />}
        <Component {...props} />
      </>
    );
  }
  return HOC;
}

export default withLoading;
