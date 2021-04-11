import { useState } from 'react';

const Toggle = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return props.render({ isOpen, setIsOpen });
};

export default Toggle;
