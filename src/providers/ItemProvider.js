import { useState } from 'react';
import { useDispatch } from 'react-redux';

const ItemProvider = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    setIsMenuOpen(false);
    setIsModalOpen(true);
  };

  const onConfirm = (callback) => {
    dispatch(callback);
    setIsModalOpen(false);
  };

  return props.render({ isModalOpen, setIsModalOpen, isMenuOpen, setIsMenuOpen, handleDelete, onConfirm });
};

export default ItemProvider;
