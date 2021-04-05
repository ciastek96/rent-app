import { useEffect } from 'react';

export const useDetectOutsideClick = (ref, handler) => {
  const handleMouse = (e) => {
    if (!ref.current || ref.current.contains(e.target)) {
      return;
    }
    handler(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleMouse);

    return () => {
      document.removeEventListener('click', handleMouse);
    };
  }, []);
};
