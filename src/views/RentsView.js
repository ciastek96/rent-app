import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getStatus } from '../utils/getStatus';
import ItemsTemplate from '../templates/ItemsTemplate';
import RentItem from '../components/RentItem/RentItem';
import MainTemplate from '../templates/MainTemplate';
import Spinner from '../components/Spinner/Spinner';
import RentFilter from '../components/RentFilter/RentFilter';
import MessageBox from '../components/MessageBox/MessageBox';
import NoResults from '../components/NoResults/NoResults';
import { routes } from '../routes/routes';

const RentsView = () => {
  const rent = useSelector((state) => state.rent);
  const rentsList = useSelector((state) => state.rent.rents.filter((i) => i.isFinished === false));
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(true);
  const [activeView, setActiveView] = useState('all');

  const handleChange = (e) => {
    const { value } = e.target;
    setActiveView(value);
  };

  return (
    <MainTemplate>
      <ItemsTemplate title="Wypożyczenia" path={routes.newRent} />
      {rent.loading && <Spinner />}
      {rent.error && isMessageBoxOpen && <MessageBox type="error" value="Wystąpił błąd. Spróbuj ponownie." setIsOpen={setIsMessageBoxOpen} />}
      {rent.success && isMessageBoxOpen && <MessageBox type="success" value="Dane zostały zapisane pomyślnie." setIsOpen={setIsMessageBoxOpen} />}
      <RentFilter handleChange={handleChange} />
      {rentsList.length > 0 ? (
        rentsList.map((rentValues) => {
          const { dateOfRent, dateOfReturn, isFinished } = rentValues;
          const status = getStatus(dateOfRent, dateOfReturn, isFinished);
          if (status === activeView || activeView === 'all') {
            return <RentItem values={rentValues} />;
          }
          return null;
        })
      ) : (
        <NoResults />
      )}
    </MainTemplate>
  );
};

export default RentsView;
