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
      {rentsList.length > 0 ? (
        rentsList.map(({ _id, client, dateOfRent, dateOfReturn, products, isFinished, brutto, netto, vat, price, advance }) => (
          <RentItem
            key={_id}
            id={_id}
            title={_id}
            dateOfRent={dateOfRent}
            dateOfReturn={dateOfReturn}
            isFinished={isFinished}
            client={client}
            products={products}
            brutto={brutto}
            netto={netto}
            price={price}
            vat={vat}
            advance={advance}
          />
        ))
      ) : (
        <p>Brak wyników...</p>
      )}
    </MainTemplate>
  );
};

export default RentsView;
