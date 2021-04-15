import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Notification = (props) => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const content = useSelector(({ notification }) => notification.content);

  useEffect(() => {
    if (content) {
      setIsNotificationVisible(true);
      setTimeout(() => setIsNotificationVisible(false), 5000);
    } else setIsNotificationVisible(false);
  }, [content]);

  return props.render({ isNotificationVisible, setIsNotificationVisible });
};

export default Notification;
