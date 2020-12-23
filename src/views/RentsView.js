import React from 'react';
import { useSelector } from 'react-redux';
import ItemsTemplate from '../templates/ItemsTemplate';
import RentItem from '../components/RentItem/RentItem';
import MainTemplate from '../templates/MainTemplate';
import { routes } from '../routes/routes';

const RentsView = () => {
  const rentsList = useSelector(({ rents }) => rents.filter((rent) => rent.isFinished === false));
  return (
    <MainTemplate>
      <ItemsTemplate title="Wypożyczenia" path={routes.newRent} />
      {rentsList.map(({ _id, client, dateOfRent, dateOfReturn, products, isFinished }) => (
        <RentItem
          key={_id}
          id={_id}
          title={_id}
          dateOfRent={dateOfRent}
          dateOfReturn={dateOfReturn}
          isFinished={isFinished}
          client={client}
          products={products}
        />
      ))}
      {rentsList <= 0 && <p>Brak wyników...</p>}
    </MainTemplate>
  );
};

export default RentsView;
