import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainTemplate from '../templates/MainTemplate';
import { getStatus } from '../utils/getStatus';
import MyCalendar from '../components/organisms/MyCalendar/MyCalendar';
import Boxes from '../components/organisms/Boxes/Boxes';

const DashboardView = () => {
  const rentsList = useSelector((state) => state.rent.rents?.filter((i) => i.isFinished === false));
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
      <h2>Baza danych</h2>
      <Boxes />
      <h2>Kalendarz</h2>
      <MyCalendar events={events} />
    </MainTemplate>
  );
};

export default DashboardView;
