import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Loading = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const accountLoading = useSelector(({ account }) => account.loading);
  const clientLoading = useSelector(({ client }) => client.loading);
  const rentLoading = useSelector(({ rent }) => rent.loading);
  const productLoading = useSelector(({ product }) => product.loading);
  const usersLoading = useSelector(({ users }) => users.loading);

  useEffect(() => {
    if (accountLoading || clientLoading || rentLoading || productLoading || usersLoading) setIsLoading(true);
    else setIsLoading(false);
  });

  return props.render({ isLoading, setIsLoading });
};

export default Loading;
