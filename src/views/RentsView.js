import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getStatus } from '../utils/getStatus';
import ItemsTemplate from '../templates/ItemsTemplate';
import RentItem from '../components/molecules/RentItem/RentItem';
import MainTemplate from '../templates/MainTemplate';
import RentFilter from '../components/molecules/RentFilter/RentFilter';
import NoResults from '../components/atoms/NoResults/NoResults';
import { routes } from '../routes/routes';

const ALL = 'ALL';

const RentsView = () => {
  const rentsList = useSelector((state) => state.rent.rents.filter((i) => i.isFinished === false));
  const [activeView, setActiveView] = useState(ALL);

  const handleChange = (e) => {
    const { value } = e.target;
    setActiveView(value);
  };

  return (
    <MainTemplate>
      <ItemsTemplate title="Wypożyczenia" path={routes.newRent} />
      <RentFilter handleChange={handleChange} />
      {rentsList.length > 0 ? (
        rentsList.map((rentValues) => {
          const { dateOfRent, dateOfReturn, isFinished, _id } = rentValues;
          const status = getStatus(dateOfRent, dateOfReturn, isFinished);
          if (status === activeView || activeView === ALL) {
            return <RentItem values={rentValues} key={_id} />;
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
