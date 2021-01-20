import moment from 'moment';

export function getStatus(dateOfRent, dateOfReturn, isFinished) {
  const statusList = ['active', 'coming', 'ended', 'finished'];
  const [active, coming, ended, finished] = statusList;
  let status = active;

  const today = moment();
  const startDay = moment(dateOfRent);
  const endDay = moment(dateOfReturn);

  if (isFinished) status = finished;
  else if (startDay.diff(today, 'days') > 0) status = coming;
  else if (startDay.diff(today, 'days') === 0 && today.diff(endDay, 'days') !== 0) status = coming;
  else if (today.diff(endDay, 'days') > 0) status = ended;
  else status = active;

  return status;
}
