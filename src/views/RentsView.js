import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ItemsTemplate from '../templates/ItemsTemplate';
import RentItem from '../components/RentItem/RentItem';
import MainTemplate from '../templates/MainTemplate';
import Spinner from '../components/Spinner/Spinner';
import MessageBox from '../components/MessageBox/MessageBox';
import { routes } from '../routes/routes';

const RentsView = () => {
  const rent = useSelector((state) => state.rent);
  const rentsList = useSelector((state) => state.rent.rents.filter((i) => i.isFinished === false));
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(true);

  return (
    <MainTemplate>
      <ItemsTemplate title="Wypożyczenia" path={routes.newRent} />
      {rent.loading && <Spinner />}
      {rent.error && isMessageBoxOpen && <MessageBox type="error" value="Wystąpił błąd. Spróbuj ponownie." setIsOpen={setIsMessageBoxOpen} />}
      {rent.success && isMessageBoxOpen && <MessageBox type="success" value="Dane zostały zapisane pomyślnie." setIsOpen={setIsMessageBoxOpen} />}
      {rentsList.length > 0 ? (
        rentsList.map(({ _id, client, dateOfRent, dateOfReturn, products, isFinished, brutto, netto, vat, price, advance, discount, rentsDurr }) => (
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
            discount={discount}
            rentsDurr={rentsDurr}
          />
        ))
      ) : (
        <p>Brak wyników...</p>
      )}
    </MainTemplate>
  );
};

export default RentsView;
