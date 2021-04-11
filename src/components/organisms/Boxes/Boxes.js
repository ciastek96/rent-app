import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Box from '../../atoms/Box/Box';
import { routes } from '../../../routes/routes';
import { ReactComponent as PersonIcon } from '../../../assets/icons/svg/interfaces/male.svg';
import { ReactComponent as ProductIcon } from '../../../assets/icons/svg/interfaces/archive.svg';
import { ReactComponent as RentIcon } from '../../../assets/icons/svg/interfaces/key.svg';

const BoxGrid = styled.div`
  display: grid;
  margin: 30px auto 15px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(50px, 300px));
  justify-content: space-evenly;

  .icon {
    width: 30px;
    fill: ${({ theme }) => theme.green};
  }
`;

const Boxes = () => {
  const productsListLen = useSelector((state) => state.product.products?.length);
  const clientListLen = useSelector((state) => state.client.clients?.length);
  const rentsListLen = useSelector((state) => state.rent.rents?.filter((i) => !i.isFinished).length);

  return (
    <BoxGrid>
      <Box path={routes.rents} title="Wypożyczenia" value={rentsListLen}>
        <RentIcon className="icon" />
      </Box>
      <Box path={routes.products} title="Produkty" value={productsListLen}>
        <ProductIcon className="icon" />
      </Box>
      <Box path={routes.clients} title="Klienci" value={clientListLen}>
        <PersonIcon className="icon" />
      </Box>
    </BoxGrid>
  );
};

export default Boxes;
