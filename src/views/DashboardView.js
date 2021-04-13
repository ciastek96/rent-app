import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainTemplate from '../templates/MainTemplate';
import MessageBox from '../components/atoms/MessageBox/MessageBox';
import { getStatus } from '../utils/getStatus';
import MyCalendar from '../components/organisms/MyCalendar/MyCalendar';
import Boxes from '../components/organisms/Boxes/Boxes';

const DashboardView = () => {
  const rent = useSelector((state) => state.rent);
  const rentsList = useSelector((state) => state.rent.rents?.filter((i) => i.isFinished === false));
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(true);
  const history = useHistory();
  const events = rentsList?.map((item, i) => ({
    id: i,
    title: item.client.label,
    start: new Date(item.dateOfRent),
    end: new Date(item.dateOfReturn),
    status: getStatus(item.dateOfRent, item.dateOfReturn, false),
  }));

  if (history.location && history.location.state && history.location.state.from) {
    const state = { ...history.location.state };
    delete state.from;
    history.replace({ ...history.location, state });
    history.go(0);
  }

  return (
    <MainTemplate>
      {/* {rent.loading && <Spinner />} */}
      {rent.error && isMessageBoxOpen && <MessageBox type="error" value="Wystąpił błąd. Spróbuj ponownie." setIsOpen={setIsMessageBoxOpen} />}
      <h2>Baza danych</h2>
      <Boxes />
      <h2>Kalendarz</h2>
      <MyCalendar events={events} />
    </MainTemplate>
  );
};

export default DashboardView;
