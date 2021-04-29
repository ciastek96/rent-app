import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetNotification } from '../actions';

const Notification = (props) => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const dispatch = useDispatch();

  const toastNotification = useSelector(({ notification }) => notification);

  useEffect(() => {
    if (toastNotification.content) {
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
        dispatch(resetNotification());
      }, 5000);
    } else setIsNotificationVisible(false);
  }, [toastNotification]);

  return props.render({ toastNotification, isNotificationVisible, setIsNotificationVisible });
};

export default Notification;
