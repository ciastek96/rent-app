import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getStatus } from '../utils/getStatus';
import ItemsTemplate from '../templates/ItemsTemplate';
import RentItem from '../components/RentItem/RentItem';
import MainTemplate from '../templates/MainTemplate';
import Spinner from '../components/Spinner/Spinner';
import Select from '../components/Select/Select';
import MessageBox from '../components/MessageBox/MessageBox';
import { routes } from '../routes/routes';

const SelectWrapper = styled.div`
  max-width: 160px;
  display: flex;
`;

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
      <SelectWrapper>
        <label>
          <Select onChange={handleChange}>
            <option value="all">Wszystkie</option>
            <option value="ended">Nieoddane</option>
            <option value="active">W trakcie</option>
            <option value="coming">Nadchodzące</option>
          </Select>
        </label>
      </SelectWrapper>
      {rentsList.length > 0 ? (
        rentsList.map(({ _id, client, dateOfRent, dateOfReturn, products, isFinished, brutto, netto, vat, price, advance, discount, rentsDurr }) => {
          const status = getStatus(dateOfRent, dateOfReturn, isFinished);
          if (status === activeView || activeView === 'all') {
            return (
              <RentItem
                key={_id}
                id={_id}
                title={_id}
                dateOfRent={dateOfRent}
                dateOfReturn={dateOfReturn}
                isFinished={isFinished}
                status={status}
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
            );
          }
          return ' ';
        })
      ) : (
        <p>Brak wyników...</p>
      )}
    </MainTemplate>
  );
};

export default RentsView;
