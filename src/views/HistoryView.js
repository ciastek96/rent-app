import React from 'react';
import { useSelector } from 'react-redux';
import ItemsTemplate from '../templates/ItemsTemplate';
import RentItem from '../components/RentItem/RentItem';
import MainTemplate from '../templates/MainTemplate';

const HistoryView = () => {
  const rentsList = useSelector(({ rent }) => rent.rents.filter((i) => i.isFinished === true));

  return (
    <MainTemplate>
      <ItemsTemplate title="Historia" />
      {rentsList.length > 0 ? rentsList.map((rentValues) => <RentItem values={rentValues} />) : <p>Brak wyników...</p>}
    </MainTemplate>
  );
};

export default HistoryView;
