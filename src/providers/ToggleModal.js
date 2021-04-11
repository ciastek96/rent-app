import { useState } from 'react';

const toggleModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return props.render({ isModalOpen, setIsModalOpen });
};

export default toggleModal;
