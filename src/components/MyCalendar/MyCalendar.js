import 'react-big-calendar/lib/css/react-big-calendar.css';
import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pl';

const views = ['month'];
const now = new Date();

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  margin: 45px 0;
  padding: 25px;
  border-radius: 5px;

  .rbc-toolbar-label {
    color: ${({ theme }) => theme.darkGray};
    font-weight: 500;
    &::first-letter {
      text-transform: uppercase;
    }
  }

  .rbc-date-cell {
    font-family: 'Roboto';
    color: ${({ theme }) => theme.gray};
    font-size: 12px;
  }
  .rbc-header {
    padding: 20px 0;
    color: ${({ theme }) => theme.darkGray};
    font-size: 12px;
    text-transform: uppercase;
  }
  .rbc-off-range-bg {
    background: ${({ theme }) => theme.default};
    background: repeating-linear-gradient(45deg, white, white 12px, #efefef 12px, #efefef 14px);
  }

  .rbc-today {
    background-color: ${({ theme }) => theme.default};
  }

  .rbc-now {
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 400;
  }

  .rbc-agenda-table {
    background-color: ${({ theme }) => theme.default};
  }
`;

const MyCalendar = ({ events }) => {
  const localizer = momentLocalizer(moment);
  return (
    <Wrapper>
      <Calendar
        localizer={localizer}
        step={180}
        views={views}
        showMultiDayTimes
        events={events}
        defaultDate={now}
        style={{ minHeight: 800 }}
        eventPropGetter={() => {
          const newStyle = {
            backgroundColor: '#5F5F5F',
            background: 'linear-gradient(225deg, rgba(21,184,113,1) 0%, rgba(15,137,85,1) 100%)',
            borderRadius: '5px',
            fontSize: '14px',
            fontFamily: 'Roboto',
            fontWeight: '400',
            // padding: '5px',
            color: 'white',
            border: 'none',
          };

          return {
            className: '',
            style: newStyle,
          };
        }}
      />
    </Wrapper>
  );
};

MyCalendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
};

MyCalendar.defaultProps = {
  events: [],
};

export default MyCalendar;
