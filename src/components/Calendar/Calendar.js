import 'react-big-calendar/lib/css/react-big-calendar.css';
import React from 'react';
import styled from 'styled-components';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pl';

const views = ['month', 'week'];

console.log(Views);

const now = new Date();

const events = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2020, 12, 20),
    end: new Date(2020, 12, 31),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2020, 12, 22),
    end: new Date(2020, 12, 24),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2020, 12, 22),
    end: new Date(2020, 12, 29),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2020, 12, 6, 0, 0, 19),
    end: new Date(2020, 12, 13, 0, 0, 22),
  },
];

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'white',
    },
  });

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  margin: 45px 0;
  padding: 25px;
  border-radius: 5px;
`;

const MyCalendar = (props) => {
  const localizer = momentLocalizer(moment);
  return (
    <Wrapper>
      <Calendar
        localizer={localizer}
        step={30}
        views={views}
        showMultiDayTimes
        events={events}
        defaultDate={now}
        style={{ height: 500 }}
        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
        }}
        eventPropGetter={(event, start, end, isSelected) => {
          const newStyle = {
            backgroundColor: '#F0F0F0',
            borderRadius: '5px',
            color: 'black',
            border: 'none',
          };

          if (event.isMine) {
            newStyle.backgroundColor = 'lightgreen';
          }

          return {
            className: '',
            style: newStyle,
          };
        }}
      />
    </Wrapper>
  );
};

export default MyCalendar;
